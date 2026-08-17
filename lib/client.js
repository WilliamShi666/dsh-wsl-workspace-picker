window.__ModuleLoader__.load({
	id: "dsh-wsl-workspace-picker",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		"use strict";
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
		
		// src/client.tsx
		var client_exports = {};
		__export(client_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = __toCommonJS(client_exports);
		var import_react = require("react");
		var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		
		// src/styles.ts
		var CSS_TEXT = `
		.qwp_dialog.qwp_dialog{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);gap:0;width:min(680px,100%);height:min(560px,100dvh - 32px);padding:0}
		.qwp_header{border-bottom:1px solid var(--dsw-alias-border-l3,#333);flex-direction:column;flex:none;gap:8px;padding:16px 14px 8px 24px;display:flex}
		.qwp_title{min-height:28px;color:var(--dsw-alias-label-primary,#eee);align-items:flex-end;margin:0;font-size:16px;font-weight:510;line-height:24px;display:flex}
		.qwp_pathRow{display:flex;align-items:center;gap:8px;min-width:0}
		.qwp_pathInput{flex:1 1 auto;min-width:0;border:1px solid var(--dsw-alias-border-l2,#444);border-radius:6px;padding:5px 9px;background:transparent;color:var(--dsw-alias-label-primary,#eee);font-size:13px;line-height:18px;outline:none}
		.qwp_pathInput:focus{border-color:var(--dsw-alias-border-l1,#888)}
		.qwp_quickBar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-height:24px}
		.qwp_quickLabel{color:var(--dsw-alias-label-tertiary,#999);font-size:12px;font-weight:500;margin-right:2px}
		.qwp_chip{border:1px solid var(--dsw-alias-border-l2,#444);border-radius:6px;padding:2px 9px;background:transparent;color:var(--dsw-alias-label-secondary,#bbb);font-size:12px;font-weight:500;line-height:18px;cursor:pointer;white-space:nowrap}
		.qwp_chip:hover{background:var(--dsw-alias-bg-l2,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
		.qwp_chipActive{background:var(--dsw-alias-bg-l2,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
		.qwp_crumbBar{box-sizing:border-box;display:flex;align-items:center;gap:4px;min-height:24px;min-width:0;overflow-x:auto;scrollbar-width:none}
		.qwp_crumbTrail{scrollbar-width:none;flex:0 auto;align-items:center;gap:4px;min-width:0;display:flex;overflow-x:auto}
		.qwp_crumbSeat{flex:none;align-items:center;gap:4px;min-width:0;display:inline-flex}
		.qwp_crumb{text-overflow:ellipsis;white-space:nowrap;max-width:180px;color:var(--dsw-alias-label-tertiary,#999);cursor:pointer;background:0 0;border:none;padding:0;font-size:13px;font-weight:500;line-height:20px;overflow:hidden}
		.qwp_crumb:hover{color:var(--dsw-alias-label-primary,#eee)}
		.qwp_crumbChevron{color:var(--dsw-alias-label-tertiary,#999);flex:none}
		.qwp_content{flex:1 1 0;min-height:0;overflow-y:auto;padding:8px 8px 12px;display:flex;flex-direction:column;gap:2px}
		.qwp_row{display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:none;background:transparent;border-radius:6px;padding:6px 10px;color:var(--dsw-alias-label-primary,#eee);font-size:13px;line-height:20px;cursor:pointer}
		.qwp_row:hover{background:var(--dsw-alias-bg-l2,rgba(255,255,255,.06))}
		.qwp_rowIcon{color:var(--dsw-alias-label-tertiary,#999);flex:none}
		.qwp_rowName{flex:1 1 auto;min-width:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
		.qwp_rowChevron{color:var(--dsw-alias-label-tertiary,#999);flex:none}
		.qwp_status{color:var(--dsw-alias-label-tertiary,#999);font-size:13px;padding:10px 12px}
		.qwp_error{color:var(--dsw-alias-label-danger,#e5484d);font-size:13px;padding:10px 12px;white-space:pre-wrap}
		.qwp_footerBar{border-top:1px solid var(--dsw-alias-border-l3,#333);display:flex;align-items:center;gap:8px;padding:12px 14px 12px 24px}
		.qwp_footerGap{flex:1}
		.qwp_showHidden{border:1px solid var(--dsw-alias-border-l2,#444);border-radius:6px;padding:3px 10px;background:transparent;color:var(--dsw-alias-label-secondary,#bbb);font-size:12px;font-weight:500;line-height:18px;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
		.qwp_showHiddenActive{background:var(--dsw-alias-bg-l2,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
		.qwp_createDialog.qwp_createDialog{width:min(420px,100%)}
		.qwp_createBody{display:flex;flex-direction:column;gap:10px;padding:4px 2px}
		.qwp_createTitle{color:var(--dsw-alias-label-primary,#eee);margin:0;font-size:14px;font-weight:600;line-height:20px}
		.qwp_createIn{color:var(--dsw-alias-label-secondary,#bbb);margin:0;font-size:13px;line-height:18px}
		.qwp_createInput{border:1px solid var(--dsw-alias-border-l2,#444);border-radius:6px;padding:5px 9px;background:transparent;color:var(--dsw-alias-label-primary,#eee);font-size:13px;line-height:18px;outline:none}
		.qwp_createInput:focus{border-color:var(--dsw-alias-border-l1,#888)}
		.qwp_createActions{display:flex;justify-content:flex-end;gap:8px}
		`;
		var TAG_ID = "dsh-wsl-workspace-picker/EnhancedDirectoryBrowser.css";
		function injectStyles() {
		  if (typeof document === "undefined") return;
		  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(TAG_ID)}]`) !== null) return;
		  const tag = document.createElement("style");
		  tag.dataset.plugin = "dsh-wsl-workspace-picker";
		  tag.dataset.pluginCss = TAG_ID;
		  tag.textContent = CSS_TEXT;
		  document.head.appendChild(tag);
		}
		
		// src/client.tsx
		var import_jsx_runtime = require("react/jsx-runtime");
		function cx(...parts) {
		  return parts.filter(Boolean).join(" ");
		}
		function failureText(error) {
		  return error instanceof Error ? error.message : String(error);
		}
		function separatorOf(listing) {
		  return listing.home.includes("\\") ? "\\" : "/";
		}
		function currentOf(level, path) {
		  if (level === null) return false;
		  return path === void 0 ? level.path === level.home : level.path === path;
		}
		function EnhancedDirectoryBrowser({ open, busy, listDirectory, createDirectory, onOpen, onClose, t }) {
		  const [level, setLevel] = (0, import_react.useState)(null);
		  const [loading, setLoading] = (0, import_react.useState)(false);
		  const [error, setError] = (0, import_react.useState)(null);
		  const [showHidden, setShowHidden] = (0, import_react.useState)(false);
		  const [pathDraft, setPathDraft] = (0, import_react.useState)(null);
		  const [folderDraft, setFolderDraft] = (0, import_react.useState)(null);
		  const [creatingFolder, setCreatingFolder] = (0, import_react.useState)(false);
		  const [createError, setCreateError] = (0, import_react.useState)(null);
		  const requestSeq = (0, import_react.useRef)(0);
		  const scanController = (0, import_react.useRef)(null);
		  (0, import_react.useEffect)(() => () => {
		    requestSeq.current += 1;
		    scanController.current?.abort();
		  }, []);
		  const supersede = (0, import_react.useCallback)(() => {
		    scanController.current?.abort();
		    scanController.current = null;
		    return ++requestSeq.current;
		  }, []);
		  const land = (0, import_react.useCallback)((path, announce) => {
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
		    }, (reason) => {
		      if (seq !== requestSeq.current) return;
		      setLoading(false);
		      if (announce) setError(failureText(reason));
		    });
		  }, [supersede, listDirectory]);
		  const navigate = (0, import_react.useCallback)((path) => land(path, true), [land]);
		  const enter = (0, import_react.useCallback)((entry) => land(entry.path, false), [land]);
		  (0, import_react.useEffect)(() => {
		    if (open) {
		      setLevel(null);
		      setShowHidden(false);
		      setCreatingFolder(false);
		      setFolderDraft(null);
		      setCreateError(null);
		      setPathDraft(null);
		      navigate(void 0);
		      return;
		    }
		    supersede();
		    setLoading(false);
		    setError(null);
		    setPathDraft(null);
		    setFolderDraft(null);
		    setCreateError(null);
		  }, [open, navigate, supersede]);
		  const quickEntries = [
		    { name: t("browser.home"), path: void 0 },
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
		    }, (reason) => {
		      setCreatingFolder(false);
		      setCreateError(failureText(reason));
		    });
		  };
		  if (!open) return null;
		  const targetPath = level?.path ?? null;
		  const targetName = level === null ? "" : crumbs[crumbs.length - 1]?.name ?? level.path;
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
		      import_dsh_client_ui_primitives.Modal,
		      {
		        open,
		        onClose: () => {
		          if (folderDraft === null && !busy) onClose();
		        },
		        title: t("browser.title"),
		        className: cx("qwp_dialog"),
		        headless: true,
		        children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_header", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "qwp_title", children: t("browser.title") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_pathRow", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		              "input",
		              {
		                className: "qwp_pathInput",
		                value: draft,
		                "aria-label": t("browser.editPath"),
		                placeholder: t("browser.pathPlaceholder"),
		                autoFocus: true,
		                disabled: parentInert,
		                onChange: (event) => setPathDraft(event.target.value),
		                onKeyDown: (event) => {
		                  if (event.key === "Enter" && draft.trim() !== "") navigate(draft.trim());
		                }
		              }
		            ) }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_quickBar", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qwp_quickLabel", children: t("browser.quickAccess") }),
		              quickEntries.map((quick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		                "button",
		                {
		                  type: "button",
		                  className: cx("qwp_chip", currentOf(level, quick.path) && "qwp_chipActive"),
		                  disabled: parentInert || loading,
		                  onClick: () => navigate(quick.path),
		                  children: quick.name
		                },
		                quick.path ?? "home"
		              ))
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_crumbBar", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qwp_crumbTrail", role: "navigation", children: crumbs.map((crumb, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "qwp_crumbSeat", children: [
		              index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { size: 12, className: "qwp_crumbChevron" }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		                "button",
		                {
		                  type: "button",
		                  className: "qwp_crumb",
		                  disabled: parentInert || loading,
		                  onClick: () => navigate(crumb.path),
		                  children: crumb.name
		                }
		              )
		            ] }, crumb.path)) }) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_content", children: [
		            visible.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "qwp_row", disabled: parentInert, onClick: () => enter(entry), children: [
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderClose16, { size: 16, className: "qwp_rowIcon" }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qwp_rowName", children: entry.name }),
		              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { size: 12, className: "qwp_rowChevron" })
		            ] }, entry.path)),
		            loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_status", role: "status", children: t("browser.loading") }),
		            !loading && level !== null && level.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_status", role: "status", children: t("browser.truncated") }),
		            !loading && level !== null && visible.length === 0 && error === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_status", children: t("browser.noEntries") }),
		            error !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_error", role: "alert", children: error })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_footerBar", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		              import_dsh_client_ui_primitives.Button,
		              {
		                variant: "outline",
		                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: 14 }),
		                disabled: targetPath === null || loading || parentInert,
		                onClick: () => {
		                  setFolderDraft("");
		                  setCreateError(null);
		                },
		                children: t("browser.newFolder")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
		              "button",
		              {
		                type: "button",
		                className: cx("qwp_showHidden", showHidden && "qwp_showHiddenActive"),
		                "aria-pressed": showHidden,
		                disabled: parentInert,
		                onClick: () => setShowHidden((prev) => !prev),
		                children: [
		                  t("browser.showHidden"),
		                  showHidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, { size: 14 })
		                ]
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qwp_footerGap" }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: parentInert, onClick: onClose, children: t("browser.cancel") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		              import_dsh_client_ui_primitives.Button,
		              {
		                variant: "primary",
		                disabled: targetPath === null || loading || parentInert,
		                onClick: () => {
		                  if (targetPath !== null) onOpen(targetPath);
		                },
		                children: t("browser.open")
		              }
		            )
		          ] })
		        ]
		      }
		    ),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      import_dsh_client_ui_primitives.Modal,
		      {
		        open: folderDraft !== null,
		        onClose: () => {
		          if (!creatingFolder) setFolderDraft(null);
		        },
		        title: t("browser.newFolder"),
		        className: cx("qwp_createDialog"),
		        headless: true,
		        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_createBody", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "qwp_createTitle", children: t("browser.newFolder") }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "qwp_createIn", children: t("browser.createIn", { name: targetName }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		            "input",
		            {
		              className: "qwp_createInput",
		              value: folderDraft ?? "",
		              "aria-label": t("browser.folderName"),
		              placeholder: t("browser.untitledFolder"),
		              autoFocus: true,
		              disabled: creatingFolder,
		              onChange: (event) => setFolderDraft(event.target.value),
		              onKeyDown: (event) => {
		                if (event.key === "Enter") {
		                  event.preventDefault();
		                  confirmCreate();
		                }
		                if (event.key === "Escape") {
		                  event.stopPropagation();
		                  if (!creatingFolder) setFolderDraft(null);
		                }
		              }
		            }
		          ),
		          createError !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "qwp_error", role: "alert", children: createError }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qwp_createActions", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: creatingFolder, onClick: () => setFolderDraft(null), children: t("browser.cancel") }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		              import_dsh_client_ui_primitives.Button,
		              {
		                variant: "primary",
		                disabled: creatingFolder || folderDraft === null || folderDraft.trim() === "",
		                onClick: confirmCreate,
		                children: t("browser.create")
		              }
		            )
		          ] })
		        ] })
		      }
		    )
		  ] });
		}
		function EnhancedDirectoryFlow(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		    EnhancedDirectoryBrowser,
		    {
		      open: props.open,
		      busy: props.busy,
		      listDirectory: props.listDirectory,
		      createDirectory: props.createDirectory,
		      t: props.t,
		      onOpen: props.onPicked,
		      onClose: props.onCancel
		    }
		  );
		}
		var LOCALE_NS = "dsh-wsl-workspace-picker";
		var inject = ["slots", "workspaces", "locale"];
		function apply(ctx) {
		  const client = ctx;
		  const { slots, workspaces, locale } = client;
		  ctx.effect(() => {
		    const disposers = [];
		    const dictionaries = [
		      ["zh", {
		        "browser.title": "\u9009\u62E9\u5DE5\u4F5C\u533A\u76EE\u5F55",
		        "browser.home": "\u4E3B\u76EE\u5F55",
		        "browser.quickAccess": "\u5FEB\u6377\u8BBF\u95EE",
		        "browser.pathPlaceholder": "\u8F93\u5165\u7EDD\u5BF9\u8DEF\u5F84\u540E\u56DE\u8F66\uFF0C\u5982 /mnt/d/projects",
		        "browser.newFolder": "\u65B0\u5EFA\u6587\u4EF6\u5939",
		        "browser.folderName": "\u6587\u4EF6\u5939\u540D\u79F0",
		        "browser.createIn": '\u5728"{name}"\u4E2D\u65B0\u5EFA\u6587\u4EF6\u5939',
		        "browser.untitledFolder": "\u672A\u547D\u540D\u6587\u4EF6\u5939",
		        "browser.create": "\u521B\u5EFA",
		        "browser.cancel": "\u53D6\u6D88",
		        "browser.open": "\u6253\u5F00",
		        "browser.editPath": "\u7F16\u8F91\u8DEF\u5F84",
		        "browser.loading": "\u52A0\u8F7D\u4E2D\u2026",
		        "browser.truncated": "\u6587\u4EF6\u5939\u8FC7\u591A\uFF0C\u4EC5\u663E\u793A\u5F00\u5934\u90E8\u5206\u3002",
		        "browser.showHidden": "\u663E\u793A\u9690\u85CF\u6587\u4EF6",
		        "browser.noEntries": "\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u5B50\u6587\u4EF6\u5939"
		      }],
		      ["en", {
		        "browser.title": "Select Workspace Directory",
		        "browser.home": "Home",
		        "browser.quickAccess": "Quick access",
		        "browser.pathPlaceholder": "Type an absolute path and press Enter, e.g. /mnt/d/projects",
		        "browser.newFolder": "New folder",
		        "browser.folderName": "Folder name",
		        "browser.createIn": 'New folder in "{name}"',
		        "browser.untitledFolder": "Untitled folder",
		        "browser.create": "Create",
		        "browser.cancel": "Cancel",
		        "browser.open": "Open",
		        "browser.editPath": "Edit path",
		        "browser.loading": "Loading\u2026",
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
		    listDirectory: (path, signal) => workspaces.listDirectory(path, signal),
		    createDirectory: (path, name) => workspaces.createDirectory(path, name),
		    t: locale.bind(LOCALE_NS)
		  });
		  slots.inject(
		    "conversation.hero.workspace.directoryFlow",
		    () => slots.inject("sidebar.workspaces.directoryFlow", function* () {
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
		
		return module.exports;
	}
});
