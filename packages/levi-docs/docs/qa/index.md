# Q&A

[[toc]]

## Windows Powershell禁止运行脚本

> 普通模式下

```sh
Start-Process powershell -Verb runAs
set-ExecutionPolicy RemoteSigned
Y
```

> 管理员模式下

```sh
set-ExecutionPolicy RemoteSigned
Y
```

## 镜像设置

- `npm`镜像

```sh
npm config set registry https://registry.npmmirror.com/
```

- `yarn`镜像

```sh
yarn config set registry https://registry.npmmirror.com/
```

- `pnpm`镜像

```sh
pnpm config set registry https://registry.npmmirror.com/
```

- `nvm`镜像:

```sh
nvm node_mirror https://npmmirror.com/mirrors/node/
```

## Windows10下更换Git用户名或密码

- 打开`控制面板`
- 找到`用户账户`
- 找到`管理windows凭据`

## Windows下安装nvm，使用`nvm use`切换不成功问题解决

nodejs 目录换一个就好

## 自定义imports引用

> 不加#其实也可以，但是使用#比较直观，表示是自定义库

::: code-group

```json [package.json]
{
  "imports": {
    "#ansi-styles": "./source/vendor...",
    "#supports-colors": {
      // 针对node
      "node": "./source/vendor...",
      // 针对浏览器
      "default": "./source/vendor..."
    }
  }
}
```

```js [main.js]
import ansiStyles from '#ansi-styles'
import supportsColor from '#supports-color'
```

:::

## npm使用esm方式到处，在node环境如何直接使用

文件名称改为`.mjs`执行`node`即可

::: code-group

```js [index.mjs]
import chalk from 'chalk'
console.log(chalk.red('Levi'))
```

```bash
node index.mjs
```

:::

## nvm切换node version之后 npm全局包不能共用

可以试一下将npm缓存和安装包的路径挂载到原有的缓存和全局安装包路径上

```sh
npm config set prefix "....." // 原安装包路径
npm config set cache "...." // 原缓存路径
```

对于版本问题，可以使用[npm-check-updates](https://libraries.io/npm/npm-check-updates)工具进行管理：

```sh
# 安装npm-check-updates
npm install -g npm-check-updates
# 更新所有全局包
ncu -g -u
```

## Windows11终端，执行npm install package时报错

- 问题产生：不识别Linux格式的相对路径，如：../pathname。
- 问题解决：降低Node版本至16.13.2。该版本以上至最新18.4.0版本在执行包的安装时都会报上述错误。

## npm和yarn镜像

```bash
# npm
npm config set registry https://registry.npmmirror.com
# yarn
yarn config set registry https://registry.npmmirror.com
```

## ssh免密登录配置

- 使用PuTTYgen Generate生成公钥和私钥，注意生成的时候鼠标要移动
- 将生成的公钥拷贝到记事本中，并打开服务器
- \~/.ssh目录下的authorized\_keys,如果没有该文件则创建
- putty 登录到服务器

```bash
# 修改权限
chmod 700 /root/.ssh
# 切换到.ssh目录
cd ~/.ssh
# 装了vim的话可以使用vim,没有的话使用vi
vi authorized_keys
# 复制刚才在记事本粘贴的公钥，在这里使用鼠标右键粘贴
# 按下esc
# 输入:wp
# 回车
```

- PuTTYgen Conversions菜单导出私钥，到某个目录下面，此处命名为id\_rsa
- 公钥也保存一份到该目录下（刚才记事本的内容），命名为id\_rsa.pub
- scp免密将本地文件拷贝到服务器

```bash
cd dist && scp -P 服务器端口号 -i 私钥的位置 -r * 用户名@服务器IP:服务器项目地址
```

## Less如何引入全局样式

> Used for global import to avoid the need to import each style file separately
> reference: Avoid repeated reference

```js
hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`
```

## Uncaught TypeError: Illegal invocation?

这种错误一般都是调用浏览器内部函数的时候`this`指向不对的问题导致的

```js
let defaultValue = {}
this.proxy = new Proxy(window, {
  get(target, key) {
    if(typeof target[key] === 'function') {
      return target[key].bind(target) // [!code hl]
    }
    return defaultValue[key] || target[key]
  },
  set(target, key, value) {
    defaultValue[key] = value
    return true
  }
})
```

## 插件模式下无法访问$route

```js
// vue示例下
this.$router.currentRoute()
```

## 路由配置的技巧

```js{7}
{
  path: '/',
  component: Layout,
  children: [
    {
      name: 'index',
      path: '', // 注意这里
      component: Index
    },
    {
      name: 'detail',
      path: 'detail/:id',
      props: true,
      component: Detail
    }
  ]
}
```

## vue-router hash和history的区别

- Hash模式是基于锚点，以及onhaschange事件

- History模式是基于HTML5中的History API
  - history.pushState() IE10以后才支持
  - history.replaceState()

## nginx常用命令

```bash
# 启动
start nginx
# 重启
nginx -s reload
# 停止
nginx -s stop
```

## 跨域的解决方式

- webpack-dev-serve 的 proxy 进行代理
- 后台开启 cors （不需要前端做任何改动）
- 使用 nginx 转发请求

## npm发布流程

- 注册npm账号
- 登录npm账号

  ```bash
  # 登录
  npm login
  # 检查当前登录状态
  npm whoami
  ```

- 修改版本号

  ```bash
  # patch
  npm version patch
  # minor
  npm version minor
  # major
  npm version major
  ```

- 发布/取消发布

  ```bash
  # 发布
  npm publish
  # 取消发布
  npm unpublish
  ```

## 如何调试源码

- 找到package.json  import导入的就是module字段的文件，require导入的就是main字段的文件，没有module的话就是main
- 找到对应源码的位置打印或者debugger
- 重启dev

## axios取消请求的使用场景

- 当在输入框输入值需要发送请求的时候，我们一般用`debounce`在前端做延迟防止连续发送
- 但是有一种情况，就是用户输入的比较慢，同时发送了很多请求，但是接口返回又比较慢，存在先发送的请求后返回的情况，这个时候后请求的数据可能被先请求的数据的返回结果覆盖了，这个时候我们就需要用到取消请求。一旦有新的请求发送，就取消之前已经发送出去的请求

## 使用swiper字体模糊

```js
var swiper = new Swiper('.swiper-container', {
  roundLengths : true, //防止文字模糊
});
```

## 关于dpr

```js
// 屏幕物理像素   /   逻辑像素
screen.with / document.documentElement.clientWidth === devicePixelRatio
```

## element-ui `default-expanded-keys` 变化时候树不重新渲染

用一个参数控制该树组件的渲染，先置为false把树组件销毁掉，然后设置其default-expanded-keys，接着在this.\$nextTick中把参数改回true重新渲染即可

## el-tree的checkbox半选回显

el-tree的checkbox半选回显一直是一个非常头疼的问题，如果父子节点是关联的(即check-strictly)，回显的时候==setCheckedKeys==一定要把所有的父节点的id给干掉，有三种方式：

- 假如后台是树处理后的列表，需要后台标识一下是不是叶子节点
- 假如后台给的就是过滤后的树，前端则需要把这棵树所有叶子节点递归出来
- vue-element-admin的方法控制check-Sticky

  ```js
  this.checkStrictly = true
  this.role = deepClone(scope.row)
  this.$nextTick(() => {
  const routes = this.generateRoutes(this.role.routes)
  this.$refs.tree.setCheckedNodes(this.generateArr(routes))
  // set checked state of a node not affects its father and child nodes
  this.checkStrictly = false
  })
  ```

## 使用dart-sass(即sass)替代node-sass之后，/deep/选择器不生效

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

::: warning
有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。
:::

## 关于peerDependencies

- peerDependencies 表明当前包需要安装的依赖，没有这里面的包那么这个包不起作用，这样npm i 这个包的时候，peerDependencies的内容不会被自动安装，会输出warning日志，提示你需要在你项目里面自己安装这两个依赖， 那在开发包的时候没有了这个依赖不能跑了怎么办，把他们从dependencies移动到devDependencies即可
- [对peerDependencies的理解](https://xwenliang.cn/p/5af2a97d5a8a996548000003)
- [探讨npm依赖管理之peerDependencies](https://www.cnblogs.com/wonyun/p/9692476.html)

## 为什么不用undefined而使用void 0

局部作用域中`undefined`会被重写，为了不被重写并减少字节(很多压缩工具的做法),会把`undefined`改为`void 0`，因为`void`进行求值返回的都是`undefined`

## node-sass安装失败

```bash
npm uninstall node-sass
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

## npx是什么

- 像vue-cli , create-react-app 之类的脚手架工具，一般只需要安装一次，如果装在全局造成资源浪费。所以，可以使用`npx create-react-app my-app`命令来执行
- 还可以调用项目内部的模块，之前执行模块需要`node_modules/.bin/mocha --version`或者加到package.json的scripts里面，npx的话`npx mocha --version`就可以了

## 自己写的npm包怎么在发布前在项目中引入

- 假如包名叫做`levi-element`
- 首先在包的项目中输入`npm link`
- 然后在应用中输入`npm link levi-element`好像是相对路径
- 然后在应用中的`package.json`依赖中加入`levi-element`,版本号随便写，为了方便测试的时候`import`得到
