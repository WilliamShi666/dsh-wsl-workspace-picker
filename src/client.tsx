// dsh-wsl-workspace-picker — browser half (TypeScript source).
//
// Enhanced in-app workspace-directory browser, shadowing the stock dialog
// (slot priority −10) in both directory-flow holes:
// - quick-access chips: Home, /, /mnt, /mnt/c … /mnt/f — one click to any
//   Windows drive under WSL;
// - an always-visible path input (type /mnt/d/projects, press Enter);
// - full breadcrumb ancestry from the filesystem root (the stock dialog
//   folds them at home, which made /mnt unreachable by clicking);
// - new-folder creation and the hidden-files toggle, like the stock dialog.
//
// Built by scripts/build.mjs into lib/client.js — a CJS bundle wrapped in
// the window.__ModuleLoader__.load handoff. Runtime imports stay external
// and resolve through the web shell's module table.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  IconCheckOutline16,
  IconChevronRightOutline14,
  IconFolderClose16,
  IconPlusOutline16,
  Modal
} from "@deepseek-ai/dsh-client-ui-primitives";
import type { DirectoryListing } from "@deepseek-ai/dsh-api-remotes/client";
import type { ClientContext } from "@deepseek-ai/dsh-client-runtime/client";
import { injectStyles } from "./styles.js";

/** One child-directory row of a listing level. */
type DirectoryEntry = DirectoryListing["entries"][number];

// ── structural faces of the injected services (ClientContext is a cordis
//    Context; these narrow the shape this plugin actually uses) ────────────

interface SlotRegistryLike {
  inject(key: string, callback: () => Generator | void): void;
  register(options: { name: string; inject?: () => unknown; priority?: number }, component: unknown): unknown;
}

interface WorkspacesLike {
  listDirectory(path: string | undefined, signal: AbortSignal): Promise<DirectoryListing>;
  createDirectory(path: string, name: string): Promise<string>;
}

interface LocaleLike {
  register(namespace: string, locale: string, dict: Record<string, string>): () => void;
  bind(namespace: string): (key: string, params?: Record<string, unknown>) => string;
}

interface ClientCtx {
  slots: SlotRegistryLike;
  workspaces: WorkspacesLike;
  locale: LocaleLike;
  effect(fn: () => unknown, name?: string): void;
}

// ── owner conversation of the directory-flow holes ─────────────────────────

interface DirectoryFlowProps {
  open: boolean;
  busy: boolean;
  listDirectory: (path: string | undefined, signal: AbortSignal) => Promise<DirectoryListing>;
  createDirectory: (path: string, name: string) => Promise<string>;
  t: (key: string, params?: Record<string, unknown>) => string;
  onPicked: (path: string) => void;
  onCancel: () => void;
}

// ── helpers ────────────────────────────────────────────────────────────────

/** Join truthy class names. */
function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Failure text for a listing/create call. */
function failureText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** The level's platform separator, inferred from the home path the host stamped. */
function separatorOf(listing: DirectoryListing): string {
  return listing.home.includes("\\") ? "\\" : "/";
}

/** Whether a listing currently shows the given path (chip highlighting). */
function currentOf(level: DirectoryListing | null, path: string | undefined): boolean {
  if (level === null) return false;
  return path === undefined ? level.path === level.home : level.path === path;
}

// ── the browser dialog ─────────────────────────────────────────────────────

interface BrowserProps {
  open: boolean;
  busy: boolean;
  listDirectory: DirectoryFlowProps["listDirectory"];
  createDirectory: DirectoryFlowProps["createDirectory"];
  t: DirectoryFlowProps["t"];
  onOpen: (path: string) => void;
  onClose: () => void;
}

function EnhancedDirectoryBrowser({ open, busy, listDirectory, createDirectory, onOpen, onClose, t }: BrowserProps) {
  const [level, setLevel] = useState<DirectoryListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [pathDraft, setPathDraft] = useState<string | null>(null);
  const [folderDraft, setFolderDraft] = useState<string | null>(null);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const requestSeq = useRef(0);
  const scanController = useRef<AbortController | null>(null);

  useEffect(() => () => {
    requestSeq.current += 1;
    scanController.current?.abort();
  }, []);

  /** Newer intent wins: invalidate the pending listing's settlement AND abort its wire request. */
  const supersede = useCallback(() => {
    scanController.current?.abort();
    scanController.current = null;
    return ++requestSeq.current;
  }, []);

  /** List one level; `announce` surfaces failures as the dialog's alert. */
  const land = useCallback((path: string | undefined, announce: boolean) => {
    const seq = supersede();
    const controller = new AbortController();
    scanController.current = controller;
    setLoading(true);
    if (announce) setError(null);
    listDirectory(path, controller.signal).then((next) => {
      if (seq !== requestSeq.current) return;
      setLevel(next);
      setLoading(false);
      setError(null);
      setPathDraft(null);
    }, (reason: unknown) => {
      if (seq !== requestSeq.current) return;
      setLoading(false);
      if (announce) setError(failureText(reason));
    });
  }, [supersede, listDirectory]);

  /** Committed navigation (Enter, a crumb, a chip): failures surface. */
  const navigate = useCallback((path: string | undefined) => land(path, true), [land]);

  /** Enter one listed folder row. */
  const enter = useCallback((entry: DirectoryEntry) => land(entry.path, false), [land]);

  useEffect(() => {
    if (open) {
      setLevel(null);
      setShowHidden(false);
      setCreatingFolder(false);
      setFolderDraft(null);
      setCreateError(null);
      setPathDraft(null);
      navigate(undefined);
      return;
    }
    supersede();
    setLoading(false);
    setError(null);
    setPathDraft(null);
    setFolderDraft(null);
    setCreateError(null);
  }, [open, navigate, supersede]);

  /** The chip row: host home, the filesystem root, /mnt, and the WSL drive mounts. */
  const quickEntries: Array<{ name: string; path: string | undefined }> = [
    { name: t("browser.home"), path: undefined },
    { name: "/", path: "/" },
    { name: "/mnt", path: "/mnt" },
    { name: "/mnt/c", path: "/mnt/c" },
    { name: "/mnt/d", path: "/mnt/d" },
    { name: "/mnt/e", path: "/mnt/e" },
    { name: "/mnt/f", path: "/mnt/f" }
  ];

  const sep = level === null ? "/" : separatorOf(level);
  const draft = pathDraft ?? (level === null ? "" : level.path.endsWith(sep) ? level.path : `${level.path}${sep}`);
  const crumbs = level?.crumbs ?? [];
  const visible = level === null ? [] : level.entries.filter((entry) => showHidden || !entry.hidden);
  const parentInert = busy || creatingFolder;

  const confirmCreate = () => {
    if (level === null || folderDraft === null || creatingFolder) return;
    const name = folderDraft.trim();
    if (name === "") return;
    setCreatingFolder(true);
    setCreateError(null);
    createDirectory(level.path, name).then((createdPath) => {
      setCreatingFolder(false);
      setFolderDraft(null);
      land(createdPath, false);
    }, (reason: unknown) => {
      setCreatingFolder(false);
      setCreateError(failureText(reason));
    });
  };

  if (!open) return null;
  const targetPath = level?.path ?? null;
  const targetName = level === null ? "" : crumbs[crumbs.length - 1]?.name ?? level.path;

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          if (folderDraft === null && !busy) onClose();
        }}
        title={t("browser.title")}
        className={cx("qwp_dialog")}
        headless
      >
        <div className="qwp_header">
          <h2 className="qwp_title">{t("browser.title")}</h2>
          <div className="qwp_pathRow">
            <input
              className="qwp_pathInput"
              value={draft}
              aria-label={t("browser.editPath")}
              placeholder={t("browser.pathPlaceholder")}
              autoFocus
              disabled={parentInert}
              onChange={(event) => setPathDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && draft.trim() !== "") navigate(draft.trim());
              }}
            />
          </div>
          <div className="qwp_quickBar">
            <span className="qwp_quickLabel">{t("browser.quickAccess")}</span>
            {quickEntries.map((quick) => (
              <button
                key={quick.path ?? "home"}
                type="button"
                className={cx("qwp_chip", currentOf(level, quick.path) && "qwp_chipActive")}
                disabled={parentInert || loading}
                onClick={() => navigate(quick.path)}
              >
                {quick.name}
              </button>
            ))}
          </div>
          <div className="qwp_crumbBar">
            <span className="qwp_crumbTrail" role="navigation">
              {crumbs.map((crumb, index) => (
                <span key={crumb.path} className="qwp_crumbSeat">
                  {index > 0 && <IconChevronRightOutline14 size={12} className="qwp_crumbChevron" />}
                  <button
                    type="button"
                    className="qwp_crumb"
                    disabled={parentInert || loading}
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.name}
                  </button>
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="qwp_content">
          {visible.map((entry) => (
            <button key={entry.path} type="button" className="qwp_row" disabled={parentInert} onClick={() => enter(entry)}>
              <IconFolderClose16 size={16} className="qwp_rowIcon" />
              <span className="qwp_rowName">{entry.name}</span>
              <IconChevronRightOutline14 size={12} className="qwp_rowChevron" />
            </button>
          ))}
          {loading && (
            <div className="qwp_status" role="status">
              {t("browser.loading")}
            </div>
          )}
          {!loading && level !== null && level.truncated && (
            <div className="qwp_status" role="status">
              {t("browser.truncated")}
            </div>
          )}
          {!loading && level !== null && visible.length === 0 && error === null && (
            <div className="qwp_status">{t("browser.noEntries")}</div>
          )}
          {error !== null && (
            <div className="qwp_error" role="alert">
              {error}
            </div>
          )}
        </div>
        <div className="qwp_footerBar">
          <Button
            variant="outline"
            icon={<IconPlusOutline16 size={14} />}
            disabled={targetPath === null || loading || parentInert}
            onClick={() => {
              setFolderDraft("");
              setCreateError(null);
            }}
          >
            {t("browser.newFolder")}
          </Button>
          <button
            type="button"
            className={cx("qwp_showHidden", showHidden && "qwp_showHiddenActive")}
            aria-pressed={showHidden}
            disabled={parentInert}
            onClick={() => setShowHidden((prev) => !prev)}
          >
            {t("browser.showHidden")}
            {showHidden && <IconCheckOutline16 size={14} />}
          </button>
          <span className="qwp_footerGap" />
          <Button variant="outline" disabled={parentInert} onClick={onClose}>
            {t("browser.cancel")}
          </Button>
          <Button
            variant="primary"
            disabled={targetPath === null || loading || parentInert}
            onClick={() => {
              if (targetPath !== null) onOpen(targetPath);
            }}
          >
            {t("browser.open")}
          </Button>
        </div>
      </Modal>
      <Modal
        open={folderDraft !== null}
        onClose={() => {
          if (!creatingFolder) setFolderDraft(null);
        }}
        title={t("browser.newFolder")}
        className={cx("qwp_createDialog")}
        headless
      >
        <div className="qwp_createBody">
          <h3 className="qwp_createTitle">{t("browser.newFolder")}</h3>
          <p className="qwp_createIn">{t("browser.createIn", { name: targetName })}</p>
          <input
            className="qwp_createInput"
            value={folderDraft ?? ""}
            aria-label={t("browser.folderName")}
            placeholder={t("browser.untitledFolder")}
            autoFocus
            disabled={creatingFolder}
            onChange={(event) => setFolderDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                confirmCreate();
              }
              if (event.key === "Escape") {
                event.stopPropagation();
                if (!creatingFolder) setFolderDraft(null);
              }
            }}
          />
          {createError !== null && (
            <div className="qwp_error" role="alert">
              {createError}
            </div>
          )}
          <div className="qwp_createActions">
            <Button variant="outline" disabled={creatingFolder} onClick={() => setFolderDraft(null)}>
              {t("browser.cancel")}
            </Button>
            <Button
              variant="primary"
              disabled={creatingFolder || folderDraft === null || folderDraft.trim() === ""}
              onClick={confirmCreate}
            >
              {t("browser.create")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

// ── flow occupant: adapts the hole's owner conversation onto the dialog ────

function EnhancedDirectoryFlow(props: DirectoryFlowProps) {
  return (
    <EnhancedDirectoryBrowser
      open={props.open}
      busy={props.busy}
      listDirectory={props.listDirectory}
      createDirectory={props.createDirectory}
      t={props.t}
      onOpen={props.onPicked}
      onClose={props.onCancel}
    />
  );
}

// ── plugin body ────────────────────────────────────────────────────────────

/** Locale namespace owning the enhanced browser dialog's copy. */
const LOCALE_NS = "dsh-wsl-workspace-picker";

/** Required services (cordis fiber inject): the slot registry, the wire-facing workspace service, and locale. */
export const inject: string[] = ["slots", "workspaces", "locale"];

/**
 * Client plugin body: register the dialog's dictionaries and the enhanced
 * flow into both directory-flow holes through `slots.inject()` (the holes
 * are declared by ui-workspace, which may activate later). Priority −10
 * shadows the stock browse dialog (registered at 0; lowest priority wins)
 * in both entry points.
 */
export function apply(ctx: ClientContext): void {
  const client = ctx as unknown as ClientCtx;
  const { slots, workspaces, locale } = client;
  ctx.effect(() => {
    const disposers: Array<() => void> = [];
    const dictionaries: Array<[string, Record<string, string>]> = [
      ["zh", {
        "browser.title": "选择工作区目录",
        "browser.home": "主目录",
        "browser.quickAccess": "快捷访问",
        "browser.pathPlaceholder": "输入绝对路径后回车，如 /mnt/d/projects",
        "browser.newFolder": "新建文件夹",
        "browser.folderName": "文件夹名称",
        "browser.createIn": "在\"{name}\"中新建文件夹",
        "browser.untitledFolder": "未命名文件夹",
        "browser.create": "创建",
        "browser.cancel": "取消",
        "browser.open": "打开",
        "browser.editPath": "编辑路径",
        "browser.loading": "加载中…",
        "browser.truncated": "文件夹过多，仅显示开头部分。",
        "browser.showHidden": "显示隐藏文件",
        "browser.noEntries": "此目录下没有子文件夹"
      }],
      ["en", {
        "browser.title": "Select Workspace Directory",
        "browser.home": "Home",
        "browser.quickAccess": "Quick access",
        "browser.pathPlaceholder": "Type an absolute path and press Enter, e.g. /mnt/d/projects",
        "browser.newFolder": "New folder",
        "browser.folderName": "Folder name",
        "browser.createIn": "New folder in \"{name}\"",
        "browser.untitledFolder": "Untitled folder",
        "browser.create": "Create",
        "browser.cancel": "Cancel",
        "browser.open": "Open",
        "browser.editPath": "Edit path",
        "browser.loading": "Loading…",
        "browser.truncated": "Too many folders to list; only the beginning is shown.",
        "browser.showHidden": "Show hidden files",
        "browser.noEntries": "No subfolders in this directory"
      }]
    ];
    try {
      for (const [localeName, dict] of dictionaries) disposers.push(locale.register(LOCALE_NS, localeName, dict));
    } catch (error) {
      for (const dispose of disposers.reverse()) dispose();
      throw error;
    }
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "dsh-wsl-workspace-picker: dialog dictionaries");

  injectStyles();

  const injected = () => ({
    listDirectory: (path: string | undefined, signal: AbortSignal) => workspaces.listDirectory(path, signal),
    createDirectory: (path: string, name: string) => workspaces.createDirectory(path, name),
    t: locale.bind(LOCALE_NS)
  });

  slots.inject("conversation.hero.workspace.directoryFlow", () =>
    slots.inject("sidebar.workspaces.directoryFlow", function* () {
      yield slots.register({
        name: "conversation.hero.workspace.directoryFlow",
        inject: injected,
        priority: -10
      }, EnhancedDirectoryFlow);
      yield slots.register({
        name: "sidebar.workspaces.directoryFlow",
        inject: injected,
        priority: -10
      }, EnhancedDirectoryFlow);
    })
  );
}
