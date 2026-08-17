// Build script: compiles src/ into the two published artifacts under lib/.
//
// - lib/client.js — the browser half: an ESBuild CJS bundle wrapped in the
//   window.__ModuleLoader__.load({ id, factory }) handoff the DSH web shell
//   expects. Runtime imports (react, @deepseek-ai/*) are external: they
//   resolve through the shell's module table at load time, exactly like the
//   official client bundles.
// - lib/index.js — the host half: a plain ESM bundle with the empty apply().
//
// Run with: node scripts/build.mjs   (npm run build)

import { build } from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";

const PLUGIN_ID = "dsh-wsl-workspace-picker";

/** Specifiers resolved by the web shell's module table, never bundled. */
const EXTERNALS = [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "@deepseek-ai/dsh-client-ui-primitives",
  "@deepseek-ai/dsh-client-runtime/client",
  "@deepseek-ai/dsh-client-locale",
  "@deepseek-ai/dsh-client-ui-slots"
];

await mkdir("lib", { recursive: true });

// ── browser half: CJS body inside the __ModuleLoader__ factory ─────────────
const clientResult = await build({
  entryPoints: ["src/client.tsx"],
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2020",
  external: EXTERNALS,
  write: false,
  logLevel: "warning"
});
const body = clientResult.outputFiles[0].text
  .split("\n")
  .map((line) => `\t\t${line}`)
  .join("\n");
const clientBundle = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(PLUGIN_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
${body}
\t\treturn module.exports;
\t}
});
`;
await writeFile("lib/client.js", clientBundle);

// ── host half: ESM bundle ──────────────────────────────────────────────────
const hostResult = await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  write: false,
  logLevel: "warning"
});
await writeFile("lib/index.js", hostResult.outputFiles[0].text);

console.log("built lib/client.js and lib/index.js");
