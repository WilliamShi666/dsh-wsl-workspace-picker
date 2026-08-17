// dsh-wsl-workspace-picker — dialog styles.
//
// Class names are prefixed `qwp_` to avoid collisions; colors ride the same
// --dsw-alias-* design tokens the stock browser uses, with hard-coded
// fallbacks. The <style> tag is injected once per page load, tagged so the
// web shell's HMR bookkeeping can claim it.

export const CSS_TEXT = `
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

const TAG_ID = "dsh-wsl-workspace-picker/EnhancedDirectoryBrowser.css";

/** Inject the dialog stylesheet once per page load (idempotent). */
export function injectStyles(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(TAG_ID)}]`) !== null) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-wsl-workspace-picker";
  tag.dataset.pluginCss = TAG_ID;
  tag.textContent = CSS_TEXT;
  document.head.appendChild(tag);
}
