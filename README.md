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



### 初始化项目

```javascript
npm install -g lerna // 这里是全局安装，也可以安装为项目开发依赖，使用全局方便后期使用命令行
mkdir lerna-repo
cd lerna-repo
lerna init // 初始化一个lerna项目结构，如果希望各个包使用单独版本号可以加 -i | --independent
```

### 标准的 lerna 目录结构

- 每个单独的包下都有一个 package.json 文件
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

### 启用 yarn Workspaces （强烈建议）

Workspaces can only be enabled in private projects.

默认是 npm, 每个子 package 下都有自己的 node_modules，通过这样设置后，会把所有的依赖提升到顶层的node_modules中，并且在node_modules中链接本地的package，便于调试

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

### 常用命令


#### lerna init

初始化lerna项目
- -i, --independent 独立版本模式

#### lerna create <name> [loc]

创建一个packcage

- --access        When using a scope, set publishConfig.access value  [可选值: "public", "restricted"] [默认值: public]
- --bin           Package has an executable. Customize with --bin <executableName> 
- --description   Package description [字符串]
- --dependencies  A list of package dependencies [数组]
- --es-module     Initialize a transpiled ES Module  [布尔]
- --homepage      The package homepage, defaulting to a subpath of the root pkg.homepage [字符串]
- --keywords      A list of package keywords  [数组]
- --license       The desired package license (SPDX identifier) [字符串] [默认值: ISC]
- --private       Make the new package private, never published to any external registry [布尔]
- --registry      Configure the package's publishConfig.registry  [字符串]
- --tag           Configure the package's publishConfig.tag [字符串]
- -y, --yes       Skip all prompts, accepting default values [布尔]


#### lerna bootstrap

将本地package链接在一起并安装依赖

执行该命令式做了一下四件事：

1.为每个package安装依赖
2.链接相互依赖的库到具体的目录，例如：如果lerna1下有lerna2，且版本刚好为本地版本，那么会在node_modules中链接本地项目，如果版本不满足，需按正常依赖安装
3.在bootstraped packages中 执行 `npm run prepublish`
4.在bootstraped packages中 执行 `npm run prepare`

##### Command Options

- --hoist             匹配 [glob] 依赖 提升到根目录 [默认值: '**'], 包含可执行二进制文件的依赖项还是必须安装在当前package的node_modules下，以确保npm脚本的运行
- --nohoist           和上面刚好相反 [字符串]
- --ignore-prepublish 在bootstraped packages中不再运行prepublish生命周期中的脚本 [布尔]
- --ignore-scripts    在bootstraped packages中不再运行任何生命周期中的脚本 [布尔]
- --npm-client        使用的npm客户端(npm, yarn, pnpm, ...) [字符串]  
- --registry          为npm设置registry [字符串]
- --strict            在bootstrap的过程中不允许发出警告，避免花销更长的时间或者导致其他问题 [布尔]
- --use-workspaces    启用yarn的workspaces模式 [布尔]
- --force-local       无论版本范围是否匹配，强制本地同级链接 [布尔] ?
- --contents          子目录用作任何链接的源。必须适用于所有包装 [字符串] [默认值: .] ?

##### Filter Options

- --scope             为匹配到的package安装依赖 [字符串]
- --ignore            和上面正相反 [字符串]
- --no-private        排除private的packcage
- --since             包含从指定的[ref]依赖改变的packages，如果没有[ref]，默认是最近的tag ?
- --exclude-dependents   当使用—since运行命令时，排除所有传递依赖项，覆盖默认的“changed”算法 [布尔] ?
- --include-dependents   启动命令式包含所有传递的依赖项，无视 --scope, --ignore, or --since [布尔] ?
- --include-dependencies 启动命令式包含所有传递的依赖项，无视 --scope, --ignore, or --since [布尔] ?
- --include-merged-tags  在使用—since运行命令时，包含来自合并分支的标记 [布尔] ?

#### lerna version