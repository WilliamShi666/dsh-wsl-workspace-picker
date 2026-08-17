# dsh-quick-workspace-picker

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DeepSeek Harness Web UI 增强版工作区目录选择器：一键直达 `/mnt` Windows 盘符、从文件系统根目录开始的完整面包屑、常显路径输入框。

| [English](README.md) |

## 为什么需要它

DSH 自带的目录选择对话框（侧边栏工作区"+"按钮和对话页工作区选择器背后的对话框）默认打开 Linux 主目录，并且**面包屑在"主目录"处截断**。在 WSL 下，Windows 盘位于 `/mnt/c`、`/mnt/d`……只能通过面包屑旁一个极不显眼的铅笔图标输入路径才能到达——大多数用户根本找不到它，面包屑也永远点不到 `/mnt`。

本插件以单栏浏览器遮蔽（shadow）原版对话框，让所有路径都触手可及：

- **快捷访问行** — 主目录、`/`、`/mnt`、`/mnt/c`、`/mnt/d`、`/mnt/e`、`/mnt/f`，WSL 下任意 Windows 盘一键直达。
- **常显路径输入框** — 直接输入绝对路径（如 `/mnt/d/projects`）回车跳转。
- **从 `/` 开始的完整面包屑** — 整个文件系统上下点击，不再被主目录截断。
- **新建文件夹** 和 **显示隐藏文件** 开关，与原版一致。

## 安装

```sh
dsh plugin --profile web add dsh-quick-workspace-picker
```

重启 `dsh web` 并刷新浏览器页面。通过侧边栏工作区"+"按钮（或对话页工作区选择器）打开选择器，即可看到增强版对话框。

卸载：

```sh
dsh plugin --profile web remove dsh-quick-workspace-picker
```

## 工作原理

本插件（dual-face 包）的浏览器半注册到两个 `directoryFlow` 槽位（`sidebar.workspaces.directoryFlow` 与 `conversation.hero.workspace.directoryFlow`），槽位优先级 **−10**。DSH 槽位系统是遮蔽制：同槽位中优先级最低的 occupant 生效，因此 −10 会替换原版浏览对话框（优先级 0）。原版插件保持加载、不受影响，卸载本插件即可还原。

目录列表复用 host 端现有的 `browse` 能力（经客户端运行时 `ctx.workspaces.listDirectory` / `createDirectory`）——无任何 host 侧代码，不自行访问文件系统。

```
dsh-quick-workspace-picker/
├── package.json      # dsh.bundle.patch + dsh.client（dual-face 声明）
├── cordis.patch.yml  # loader 条目插入
└── lib/
    ├── index.js      # host 半（空 apply）
    └── client.js     # 浏览器半（手写 __ModuleLoader__ bundle）
```

client bundle 为手写 CJS，依赖 shell 模块表（`react`、`react/jsx-runtime`、`@deepseek-ai/dsh-client-ui-primitives` 等），无需构建步骤。

## 兼容性

- DeepSeek Harness `0.1.0-rc.6` 及以上（web profile）
- 存在 `/mnt/<盘符>` Windows 挂载的主机（WSL）；其他主机上快捷 chip 只是列出可能不存在的目录
- 语言：English、简体中文（跟随 UI 语言）

## 安全与范围

纯 UI 插件。无 host 侧行为、不发起任何网络连接，仅通过原版对话框同款的 host `browse` 能力列目录/建目录，受当前 profile 的文件沙箱策略约束。

## 许可证

MIT
