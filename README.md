# lerna

Lerna 是一个工具，它优化了使用 git 和 npm 管理多包存储库的工作流


### 背景

1.将一个大的package分割成一些小的packcage便于分享

2.在多个git仓库中更改容易变得混乱且难以跟踪

3.在多个git仓库中维护测试繁琐

### 优点

- 各个包相互独立，便于发版、分享
- 在同一个存储库便于调试

---

### 两种工作模式

#### Fixed/Locked mode (default)

vue,babel都是用这种，在publish的时候,所有的包版本都会更新，并且包的版本都是一致的，版本号维护在lerna.jon的version中

#### Independent mode

`lerna init --independent`

独立模式，每个package都可以有自己的版本号。版本号维护在各自package.json的version中。每次发布前都会提示已经更改的包，以及建议的版本号或者自定义版本号。这种方式相对第一种来说，更灵活

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
