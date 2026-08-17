# dsh-wsl-workspace-picker

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

Enhanced workspace-directory browser for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web UI: quick access to `/mnt` Windows drives, full breadcrumb ancestry from the filesystem root, and an always-visible path input.

| [中文说明](README.zh.md) |

## Why

The stock in-app directory picker (the dialog behind the sidebar workspaces "+" button and the conversation-hero workspace picker) starts at the Linux home directory and **folds its breadcrumbs at home**. Under WSL, Windows drives live at `/mnt/c`, `/mnt/d`, … — reachable only by typing a path into a barely visible pencil-glyph editor that most users never find, and never clickable through the breadcrumbs at all.

This plugin shadows the stock dialog with a single-pane browser that makes every path reachable:

- **Quick-access chips** — Home, `/`, `/mnt`, `/mnt/c`, `/mnt/d`, `/mnt/e`, `/mnt/f` — one click to any Windows drive under WSL.
- **An always-visible path input** — type any absolute path (e.g. `/mnt/d/projects`) and press Enter.
- **Full breadcrumb ancestry from `/`** — click up and down through the whole filesystem; no more home-folding dead end.
- **New-folder creation** and a **hidden-files toggle**, like the stock dialog.

## Install

```sh
dsh plugin --profile web add dsh-wsl-workspace-picker
```

Restart `dsh web` and refresh the browser page. Open the workspace picker via the sidebar workspaces "+" button (or the conversation-hero workspace picker) — the enhanced dialog appears in place of the stock one.

Uninstall:

```sh
dsh plugin --profile web remove dsh-wsl-workspace-picker
```

## How it works

The browser half of this dual-face package registers into both `directoryFlow` slots (`sidebar.workspaces.directoryFlow` and `conversation.hero.workspace.directoryFlow`) at slot priority **−10**. DSH's slot system is shadowing: the lowest-priority occupant of a slot renders, so priority −10 replaces the stock browse dialog (registered at priority 0) in both entry points. The stock plugin stays loaded and untouched, and uninstalling this plugin restores it.

The listing itself reuses the host's existing `browse` capability over the client runtime (`ctx.workspaces.listDirectory` / `createDirectory`) — no host-side code, no filesystem access of its own.

```
dsh-wsl-workspace-picker/
├── package.json      # dsh.bundle.patch + dsh.client (dual-face declaration)
├── cordis.patch.yml  # loader-entry insertion
└── lib/
    ├── index.js      # host half (empty apply)
    └── client.js     # browser half (hand-written __ModuleLoader__ bundle)
```

The client bundle is hand-written CJS against the shell's module table (`react`, `react/jsx-runtime`, `@deepseek-ai/dsh-client-ui-primitives`, …) — no build step required.

## Compatibility

- DeepSeek Harness `0.1.0-rc.6` and later (web profile)
- Any host where `/mnt/<drive>` Windows mounts exist (WSL); on other hosts the chips simply list directories that may not exist
- Locales: English, 简体中文 (follows your UI language)

## Security & scope

Pure UI plugin. It adds no host-side behavior, opens no network connections, and only lists/creates directories through the same host `browse` capability the stock dialog already uses — with whatever file-sandbox policy your profile has in effect.

## License

MIT
