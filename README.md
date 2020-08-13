# lerna

Lerna 是一个工具，它优化了使用 git 和 npm 管理多包存储库的工作流

### 优点

- 各个包相互独立，便于发版、分享
- 在同一个存储库便于调试

### 标准的 lerna 目录结构

- 每个单独的包下都有一个 package.json 文件
- 必须存在 LICENSE 文件
- 如果包名是带 scope 的，例如@test/lerna，package.json 中，必须配置"publishConfig": {"access": "public"}

```
my-lerna-repo/
  package.json
  lerna.json
  LICENSE
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

### 启用 yarn Workspaces

Workspaces can only be enabled in private projects.

默认是 npm, 而且每个子 package 都有自己的 node_modules，通过这样设置后，只有顶层有一个 node_modules

注意：必须是 private 项目才可以开启 workspaces

```json
// package.json

"private": true,
  "workspaces": [
    "packages/*"
  ],

// lerna.json

"useWorkspaces": true,
"npmClient": "yarn",
```
