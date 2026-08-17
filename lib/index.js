// dsh-quick-workspace-picker — host half.
//
// Pure UI plugin: the empty apply exists so the plugin appears in the host
// cordis.yml / Loader; the browser half ships via exports["./client"],
// discovered through the package.json dsh.client declaration (same dual-face
// shape as @deepseek-ai/dsh-client-ui-directory-picker-browse).
/** Host plugin body — no host-side behavior for this surface plugin. */
function apply() {}
//#endregion
export { apply };
