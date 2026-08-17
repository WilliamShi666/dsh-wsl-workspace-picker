window.__ModuleLoader__.load({
	id: "dsh-quick-workspace-picker",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region styles
		/**
		* Enhanced directory browser styles. Class names are prefixed `qwp_` to
		* avoid collisions; colors ride the same --dsw-alias-* design tokens the
		* stock browser uses, with hard-coded fallbacks.
		*/
		const CSS_TEXT = `
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
		const tagId = "dsh-quick-workspace-picker/EnhancedDirectoryBrowser.css";
		if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-quick-workspace-picker";
			tag.dataset.pluginCss = tagId;
			tag.textContent = CSS_TEXT;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region helpers
		/** Join truthy class names (tiny clsx replacement — clsx is not on the module table). */
		function cx(...parts) {
			return parts.filter(Boolean).join(" ");
		}
		/** Failure text for a listing/create call: the Host business message when typed, else the throw's text. */
		function failureText(error) {
			return error instanceof Error ? error.message : String(error);
		}
		/** The level's platform separator, inferred from the home path the host stamped. */
		function separatorOf(listing) {
			return listing.home.includes("\\") ? "\\" : "/";
		}
		/** Whether a listing currently shows the given path (for chip highlighting). */
		function currentOf(level, path) {
			return level !== null && (path === void 0 ? level.path === level.home : level.path === path);
		}
		//#endregion
		//#region EnhancedDirectoryBrowser
		/**
		* Enhanced in-app workspace-directory browser, shadowing the stock
		* dialog. Improvements over the stock browser:
		* - an always-visible path input (no hidden pencil glyph) — type any
		*   absolute path such as /mnt/d/projects and press Enter;
		* - a quick-access chip row: Home, /, /mnt, /mnt/c … /mnt/f, so Windows
		*   drives under WSL are one click away;
		* - breadcrumbs show the FULL ancestry from the filesystem root (the
		*   stock dialog folds them at the home directory, which made it
		*   impossible to click up to / and into /mnt);
		* - single-pane listing: clicking a folder enters it (no Miller
		*   two-column preview), keeping the dialog small and obvious.
		*
		* Pure consumer of the injected browse calls — the owning flow decides
		* what "Open" means.
		*/
		function EnhancedDirectoryBrowser({ open, busy, listDirectory, createDirectory, onOpen, onClose, t }) {
			const [level, setLevel] = react.useState(null);
			const [loading, setLoading] = react.useState(false);
			const [error, setError] = react.useState(null);
			const [showHidden, setShowHidden] = react.useState(false);
			const [pathDraft, setPathDraft] = react.useState(null);
			const [folderDraft, setFolderDraft] = react.useState(null);
			const [creatingFolder, setCreatingFolder] = react.useState(false);
			const [createError, setCreateError] = react.useState(null);
			const requestSeq = react.useRef(0);
			const scanController = react.useRef(null);
			react.useEffect(() => () => {
				requestSeq.current += 1;
				scanController.current?.abort();
			}, []);
			/** Newer intent wins: invalidate the pending listing's settlement AND abort its wire request. */
			const supersede = react.useCallback(() => {
				scanController.current?.abort();
				scanController.current = null;
				return ++requestSeq.current;
			}, []);
			/** List one level; `announce` surfaces failures as the dialog's alert. */
			const land = react.useCallback((path, announce) => {
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
			/** Committed navigation (Enter, a crumb, a chip): the editor closes, failures surface. */
			const navigate = react.useCallback((path) => land(path, true), [land]);
			/** Enter one listed folder row. */
			const enter = react.useCallback((entry) => land(entry.path, false), [land]);
			react.useEffect(() => {
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
			/** The chip row: host home, the filesystem root, /mnt, and the WSL drive mounts. */
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
			const crumbs = level === null ? [] : level.crumbs;
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
			const targetName = level === null ? "" : crumbs.at(-1)?.name ?? level.path;
			return react_jsx_runtime.jsxs(primitives.Modal, {
				open,
				onClose: () => {
					if (folderDraft === null && !busy) onClose();
				},
				title: t("browser.title"),
				className: cx("qwp_dialog"),
				headless: true,
				children: [react_jsx_runtime.jsxs("div", {
					className: "qwp_header",
					children: [react_jsx_runtime.jsx("h2", {
						className: "qwp_title",
						children: t("browser.title")
					}), react_jsx_runtime.jsx("div", {
						className: "qwp_pathRow",
						children: react_jsx_runtime.jsx("input", {
							className: "qwp_pathInput",
							value: draft,
							"aria-label": t("browser.editPath"),
							placeholder: t("browser.pathPlaceholder"),
							autoFocus: true,
							disabled: parentInert,
							onChange: (event) => {
								setPathDraft(event.target.value);
							},
							onKeyDown: (event) => {
								if (event.key === "Enter" && draft.trim() !== "") navigate(draft.trim());
							}
						})
					}), react_jsx_runtime.jsxs("div", {
						className: "qwp_quickBar",
						children: [react_jsx_runtime.jsx("span", {
							className: "qwp_quickLabel",
							children: t("browser.quickAccess")
						}), quickEntries.map((quick) => react_jsx_runtime.jsx("button", {
							type: "button",
							className: cx("qwp_chip", currentOf(level, quick.path) && "qwp_chipActive"),
							disabled: parentInert || loading,
							onClick: () => navigate(quick.path),
							children: quick.name
						}, quick.path ?? "home"))]
					}), react_jsx_runtime.jsx("div", {
						className: "qwp_crumbBar",
						children: react_jsx_runtime.jsx("span", {
							className: "qwp_crumbTrail",
							role: "navigation",
							children: crumbs.map((crumb, index) => react_jsx_runtime.jsxs("span", {
								className: "qwp_crumbSeat",
								children: [index > 0 && react_jsx_runtime.jsx(primitives.IconChevronRightOutline14, {
									size: 12,
									className: "qwp_crumbChevron"
								}), react_jsx_runtime.jsx("button", {
									type: "button",
									className: "qwp_crumb",
									disabled: parentInert || loading,
									onClick: () => navigate(crumb.path),
									children: crumb.name
								})]
							}, crumb.path))
						})
					})]
				}), react_jsx_runtime.jsxs("div", {
					className: "qwp_content",
					children: [visible.map((entry) => react_jsx_runtime.jsxs("button", {
						type: "button",
						className: "qwp_row",
						disabled: parentInert,
						onClick: () => enter(entry),
						children: [react_jsx_runtime.jsx(primitives.IconFolderClose16, {
							size: 16,
							className: "qwp_rowIcon"
						}), react_jsx_runtime.jsx("span", {
							className: "qwp_rowName",
							children: entry.name
						}), react_jsx_runtime.jsx(primitives.IconChevronRightOutline14, {
							size: 12,
							className: "qwp_rowChevron"
						})]
					}, entry.path)), loading && react_jsx_runtime.jsx("div", {
						className: "qwp_status",
						role: "status",
						children: t("browser.loading")
					}), !loading && level !== null && level.truncated && react_jsx_runtime.jsx("div", {
						className: "qwp_status",
						role: "status",
						children: t("browser.truncated")
					}), !loading && level !== null && visible.length === 0 && error === null && react_jsx_runtime.jsx("div", {
						className: "qwp_status",
						children: t("browser.noEntries")
					}), error !== null && react_jsx_runtime.jsx("div", {
						className: "qwp_error",
						role: "alert",
						children: error
					})]
				}), react_jsx_runtime.jsxs("div", {
					className: "qwp_footerBar",
					children: [react_jsx_runtime.jsx(primitives.Button, {
						variant: "outline",
						icon: react_jsx_runtime.jsx(primitives.IconPlusOutline16, { size: 14 }),
						disabled: targetPath === null || loading || parentInert,
						onClick: () => {
							setFolderDraft("");
							setCreateError(null);
						},
						children: t("browser.newFolder")
					}), react_jsx_runtime.jsx("button", {
						type: "button",
						className: cx("qwp_showHidden", showHidden && "qwp_showHiddenActive"),
						"aria-pressed": showHidden,
						disabled: parentInert,
						onClick: () => setShowHidden((prev) => !prev),
						children: [t("browser.showHidden"), showHidden && react_jsx_runtime.jsx(primitives.IconCheckOutline16, { size: 14 })]
					}), react_jsx_runtime.jsx("span", {
						className: "qwp_footerGap"
					}), react_jsx_runtime.jsx(primitives.Button, {
						variant: "outline",
						disabled: parentInert,
						onClick: onClose,
						children: t("browser.cancel")
					}), react_jsx_runtime.jsx(primitives.Button, {
						variant: "primary",
						disabled: targetPath === null || loading || parentInert,
						onClick: () => {
							if (targetPath !== null) onOpen(targetPath);
						},
						children: t("browser.open")
					})]
				}), react_jsx_runtime.jsx(primitives.Modal, {
					open: folderDraft !== null,
					onClose: () => {
						if (!creatingFolder) setFolderDraft(null);
					},
					title: t("browser.newFolder"),
					className: cx("qwp_createDialog"),
					headless: true,
					children: react_jsx_runtime.jsxs("div", {
						className: "qwp_createBody",
						children: [react_jsx_runtime.jsx("h3", {
							className: "qwp_createTitle",
							children: t("browser.newFolder")
						}), react_jsx_runtime.jsx("p", {
							className: "qwp_createIn",
							children: t("browser.createIn", { name: targetName })
						}), react_jsx_runtime.jsx("input", {
							className: "qwp_createInput",
							value: folderDraft ?? "",
							"aria-label": t("browser.folderName"),
							placeholder: t("browser.untitledFolder"),
							autoFocus: true,
							disabled: creatingFolder,
							onChange: (event) => {
								setFolderDraft(event.target.value);
							},
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
						}), createError !== null && react_jsx_runtime.jsx("div", {
							className: "qwp_error",
							role: "alert",
							children: createError
						}), react_jsx_runtime.jsxs("div", {
							className: "qwp_createActions",
							children: [react_jsx_runtime.jsx(primitives.Button, {
								variant: "outline",
								disabled: creatingFolder,
								onClick: () => setFolderDraft(null),
								children: t("browser.cancel")
							}), react_jsx_runtime.jsx(primitives.Button, {
								variant: "primary",
								disabled: creatingFolder || folderDraft === null || folderDraft.trim() === "",
								onClick: confirmCreate,
								children: t("browser.create")
							})]
						})]
					})
				})]
			});
		}
		//#endregion
		//#region flow
		/**
		* Flow occupant: adapts the hole's owner conversation onto the enhanced
		* browser dialog — a confirmed directory is the picked path, dismissal
		* is the cancellation.
		*/
		function EnhancedDirectoryFlow(props) {
			return react.createElement(EnhancedDirectoryBrowser, {
				open: props.open,
				busy: props.busy,
				listDirectory: props.listDirectory,
				createDirectory: props.createDirectory,
				t: props.t,
				onOpen: props.onPicked,
				onClose: props.onCancel
			});
		}
		//#endregion
		//#region plugin
		/** Locale namespace owning the enhanced browser dialog's copy. */
		const LOCALE_NS = "quick-workspace-picker";
		/** Required services (cordis fiber inject): the slot registry, the wire-facing workspace service, and locale. */
		const inject = [
			"slots",
			"workspaces",
			"locale"
		];
		/**
		* Client plugin body: register the dialog's dictionaries and the enhanced
		* flow into both directory-flow holes through `slots.inject()` (the holes
		* are declared by ui-workspace, which may activate later). Priority -10
		* shadows the stock browse dialog (registered at 0; lowest priority
		* wins) in both entry points.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => {
				const disposers = [];
				const dictionaries = [["zh", {
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
				}], ["en", {
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
				}]];
				try {
					for (const [locale, dict] of dictionaries) disposers.push(ctx.locale.register(LOCALE_NS, locale, dict));
				} catch (error) {
					for (const dispose of disposers.reverse()) dispose();
					throw error;
				}
				return () => {
					for (const dispose of disposers) dispose();
				};
			}, "quick-workspace-picker: dialog dictionaries");
			const injected = () => ({
				listDirectory: (path, signal) => ctx.workspaces.listDirectory(path, signal),
				createDirectory: (path, name) => ctx.workspaces.createDirectory(path, name),
				t: ctx.locale.bind(LOCALE_NS)
			});
			ctx.slots.inject("conversation.hero.workspace.directoryFlow", () => ctx.slots.inject("sidebar.workspaces.directoryFlow", function* () {
				yield ctx.slots.register({
					name: "conversation.hero.workspace.directoryFlow",
					inject: injected,
					priority: -10
				}, EnhancedDirectoryFlow);
				yield ctx.slots.register({
					name: "sidebar.workspaces.directoryFlow",
					inject: injected,
					priority: -10
				}, EnhancedDirectoryFlow);
			}));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
