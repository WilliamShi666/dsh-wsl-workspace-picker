# Changelog

All notable changes to dsh-wsl-workspace-picker are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Browser half rewritten in TypeScript (`src/client.tsx`, `src/styles.ts`)
  and compiled with ESBuild (`npm run build`); `npm run typecheck` runs
  `tsc --noEmit` against the official dsh type packages.
- Project scaffolded with a build pipeline: `scripts/build.mjs`, `tsconfig.json`,
  `package-lock.json`, and a CI workflow (typecheck + build + pack verification).

## [0.1.0] - 2026-08-17

### Added

- Enhanced workspace directory browser for the dsh web UI, shadowing the
  stock dialog (slot priority −10) in both `directoryFlow` entry points:
  - quick-access chips: Home, `/`, `/mnt`, `/mnt/c` … `/mnt/f`;
  - always-visible path input (Enter navigates to any absolute path);
  - full breadcrumb ancestry from the filesystem root;
  - new-folder creation and hidden-files toggle.
- Published to npm and open-sourced under MIT.
