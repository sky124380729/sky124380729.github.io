# 关于微前端的理解与实现

## 微前端概述

1. 什么是微前端(**what**)

微前端是一种类似于微服务的架构，是一种由独立交付的多个前端应用组成整体的架构风格，将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的应用，而在用户看来仍然是内聚的单个产品。有一个基座应用（主应用），来管理各个子应用的加载和卸载。

![image](./1.webp)

微前端的三大核心原则：`独立开发`、`独立运行`、`独立部署`

2. 为什么要使用微前端(**why**)

- 2.1 增量迁移

迁移是一项非常耗时且艰难的任务，比如有一个管理系统使用 AngularJS 开发维护已经有三年时
间，但是随时间的推移和团队成员的变更，无论从开发成本还是用人需求上，AngularJS 已经不能
满足要求，于是团队想要更新技术栈，想在其他框架中实现新的需求，但是现有项目怎么办？直接
迁移是不可能的，在新的框架中完全重写也不太现实。

- 2.2 独立发布

在目前的单页应用架构中，使用组件构建用户界面，应用中的每个组件或功能开发完成或者bug修
复完成后，每次都需要对整个产品重新进行构建和发布，任务耗时操作上也比较繁琐。
在使用了微前端架构后，可以将不能的功能模块拆分成独立的应用，此时功能模块就可以单独构建
单独发布了，构建时间也会变得非常快，应用发布后不需要更改其他内容应用就会自动更新，这意
味着你可以进行频繁的构建发布操作了。

- 2.3 允许单个团队做出技术决策

因为微前端构架与框架无关，当一个应用由多个团队进行开发时，每个团队都可以使用自己擅长的
技术栈进行开发，也就是它允许适当的让团队决策使用哪种技术，从而使团队协作变得不再僵硬。

3. 如何使用微前端(**how**)

- 3.1 多个微应用如何进行组合？

在微前端架构中，除了存在多个微应用以外，还存在一个`容器应用`，每个微应用都需要被注册到容器应用中。

微前端中的每个应用在浏览器中都是一个独立的`JavaScript模块`，通过`模块化`的方式被容器应用启动和运行。

使用模块化的方式运行应用可以防止不同的微应用在同时运行时发生冲突。

- 3.2 在微应用中如何实现路由？

在微前端架构中，当路由发生变化时，容器应用首先会拦截路由的变化，根据路由匹配微前端应用，当匹配到微应用以后，再启动微应用路由，匹配具体的页面组件。

- 3.3 微应用与微应用之间如何实现状态共享？

在微应用中可以通过`发布订阅模式`实现状态共享

- 3.4 微应用与微应用之间如何实现框架和库的共享？

通过`import-map`和`webpack`中的`externals`属性。

## 前置知识

### 模块化方案

- cjs(commonjs)

  `commonjs`是Node中的模块规范，通过`require`及`exports`进行导入导出 (进一步延伸的话，`module.exports`属于`commonjs2`)

  像`webpack`等打包工具运行在Node环境下，能够解析`cjs`模块，但是浏览器不能原生支持`cjs`模块

  比如，著名的全球下载量前10的模块[ms](https://npm.devtool.tech/ms)只支持`commonjs`，但并不影响它在前端项目中使用(比如通过`webpack`)，但是你想通过`cdn`的方式直接在浏览器中引入，估计就会出问题了

  ```js
  // sum.js
  exports.sum = (x, y) => x + y

  // index.js
  const { sum } = require("./sum.js")
  ```

  由于 cjs 为动态加载，可直接 require 一个变量

  ```js
  var a = 'moduleName'
  require(`./${a}`)
  ```

- esm (es module)

  `esm`是`tc39`对于`ECMAScript`的模块话规范，正因是语言层规范，因此在**Node及浏览器**中均会支持。

  它使用`import/export`进行模块导入导出.

  ```js
  // sum.js
  export const sum = (x, y) => x + y

  // index.js
  import { sum } from "./sum"
  ```

  `esm`为**静态导入**，正因如此，可在编译期进行`Tree Shaking`，减少 js 体积。

  如果需要**动态导入**，`tc39`为动态加载模块定义了API: `import(module)` 。可将以下代码粘贴到控制台执行

  ```js
  const ms = await import("https://cdn.skypack.dev/ms@latest")

  ms.default(1000)
  ```

  esm 是未来的趋势，目前一些 CDN 厂商，前端构建工具均致力于 cjs 模块向 esm 的转化，比如 skypack、 snowpack、vite 等。

  目前，在浏览器与 node.js 中均原生支持 esm。

  ::: tip
  - cjs 模块输出的是一个值的拷贝，esm 输出的是值的引用
  - cjs 模块是运行时加载，esm 是编译时加载（支持`Tree Shaking`）
  :::

  ::: details 关于编译时加载

  ```js
  // 由于是编译时加载是静态分析，因此不支持动态导入
  // ok
  import('./test.js')
  // not ok
  const path = '/.test.js'
  import(path)
  ```

  :::

- umd(Universal Module Definition)

  一种兼容`cjs`,`amd`,`cmd`的模块，既可以在`node/webpack`环境中被`require`引用，也可以在浏览器中直接用`CDN`被`script.src`引入。

  ```js
  (function(root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      console.log('是commonjs模块规范，nodejs环境')
      module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      console.log('是AMD模块规范，如require.js')
      define(factory)
    } else if (typeof define === 'function' && define.cmd) {
      console.log('是CMD模块规范，如sea.js')
      define(function(require, exports, module) {
        module.exports = factory()
      })
    } else {
      console.log('没有模块环境，直接挂载在全局对象上')
      root.umdModule = factory();
    }
  }(this, function() {
    return {
      name: '我是一个umd模块'
    }
  }))
  ```

###  Import Maps

在支持`type="module"`的浏览器中尝试写如下标签

```html
<script type="module">
  import moment from "moment";
  import { partition } from "lodash";
</script>
```
这样写会报错，原因是在浏览器中，`import`必须给出`相对或绝对的URL路径`。没有任何路径的模块被称为`裸（bare）模块`。在`import`中不允许这种模块。

某些环境，像`Node.js`或者打包工具允许没有任何路径的裸模块，因为它们有自己查找模块的方法。但是浏览器尚不支持裸模块。

但是如果有了`Import Maps`

```html
<script type="importmap">
  {
    "imports": {
      "moment": [
      // 这里提供了兜底方案，如果CDN挂了会回退引用本地版本
      "https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.4/locale/zh-cn.js",
      "/node_modules/moment/src/moment.js"
      ],
      "lodash": "/node_modules/lodash-es/lodash.js"
    }
  }
</script>

<script type="module">
  import moment from "moment"
  import { partition } from "lodash"
</script>
```

上面的写法就能被解析为：

```html
<script type="module">
  import moment from "/node_modules/moment/src/moment.js"
  import { partition } from "/node_modules/lodash-es/lodash.js"
</script>
```

目前关于`Import Maps`的兼容性：

![image](./2.jpg)

### SystemJS

`SystemJS`是一个**动态模块加载器**，它能够将原生`ES modules`转换成[System.register module format](https://github.com/systemjs/systemjs/blob/main/docs/system-register.md)来兼容那么不支持原生模块的浏览器

简单点来说，就是有了`SystemJS`就可以在浏览器中使用各种模块化方式(包括`esm`,`cjs`,`amd`,`cmd`等)

CDN引入

```html
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
```

引入主文件后，就可以使用了

```html
// systemjs也支持通过下面的方式定义资源 ，用来给资源定义一个key
<script type="systemjs-importmap">
  {
    "imports": {
      "vue": "https://cdn.bootcss.com/vue/2.6.11/vue.js"
    }
  }
</script>

<script>
  // 通过systemjs来引入别的文件
  System.import('./test.js')
  // 直接通过名称引用
  System.import('vue')
</script>
```


## 开源微前端框架

### [single-spa](https://single-spa.js.org/)

> `single-spa`推荐使用`浏览器内ES模块 + import maps` (或者`SystemJS`填充这些，如果你需要更好的浏览器支持)的设置

`single-spa`是一个将多个单页面应用聚合为一个整体应用的`JavaScript`微前端框架

- 核心原理

在`基座 (主) 应用`中注册所有 App 的路由，single-spa 保存各子应用的路由映射关系，充当微前端控制器`Controler`，当对应的`URL`变换时，除了匹配`基座应用`本身的路由外，还会匹配 子应用 路由并加载渲染子应用

![image](./3.jpg)

子应用会经过如下过程:

1. 下载 (loaded)
2. 初始化 (initialized)
3. 挂载 (mounted)
4. 卸载 (unmounted)

`single-spa` 还会通过**生命周期**为这些过程提供对应的**钩子函数**。

- 基座应用配置

::: code-group

```js [main.js]
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa'

Vue.config.productionTip = false

const mountApp = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    // 通过插入script标签的方式挂载子应用
    const firstScript = document.getElementsByTagName('script')[0]
    // 挂载子应用
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

const loadApp = (appRouter, appName) => {
  // 远程加载子应用
  return async () => {
    //手动挂载子应用
    await mountApp(appRouter + '/js/chunk-vendors.js') // [!code hl]
    await mountApp(appRouter + '/js/app.js') // [!code hl]
    // 获取子应用生命周期函数
    return window[appName]
  }
}

// 子应用列表
const appList = [
  {
    // 子应用名称
    name: 'app1',
    // 挂载子应用
    app: loadApp('http://localhost:8083', 'app1'), // [!code hl]
    // 匹配该子路由的条件
    activeWhen: location => location.pathname.startsWith('/app1'), // [!code hl]
    // 传递给子应用的对象
    customProps: {}
  },
  {
    name: 'app2',
    app: loadApp('http://localhost:8082', 'app2'),
    activeWhen: location => location.pathname.startsWith('/app2'),
    customProps: {}
  }
]

// 注册子应用
appList.map(item => {
  registerApplication(item) // [!code hl]
})

// 注册路由并启动基座
new Vue({
  router,
  mounted() {
    start()
  },
  render: h => h(App)
}).$mount('#app')
```

:::

构建基座的核心是：配置子应用信息，通过`registerApplication`注册子应用，在基座工程挂载阶段`start`启动基座

- 子应用配置

::: code-group

```js [main.js]
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  el: '#microApp',
  router,
  render: h => h(App)
}

// 支持应用独立运行、部署，不依赖于基座应用
// 如果不是微应用环境，即启动自身挂载的方式
if (!process.env.isMicro) {
  // delete appOptions.el
  new Vue(appOptions).$mount('#app')
}
// 基于基座应用，导出生命周期函数
const appLifecycle = singleSpaVue({
  Vue,
  appOptions
})

// 抛出子应用生命周期
// 启动生命周期函数
export const bootstrap = (props)  => {
  console.log('app2 bootstrap')
  return appLifecycle.bootstrap(() => { })
}
// 挂载生命周期函数
export const mount = (props) => {
  console.log('app2 mount')
  return appLifecycle.mount(() => { })
}
// 卸载生命周期函数
export const unmount = (props) => {
  console.log('app2 unmount')
  return appLifecycle.unmount(() => { })
}
```

```js [vue.config.js]
const package = require('./package.json')

module.exports = {
  // 告诉子应用在这个地址加载静态资源，否则会去基座应用的域名下加载
  publicPath: '//localhost:8082', // [!code hl]
  // 开发服务器
  devServer: {
    port: 8082,
    // 这里注意要支持跨域，否则主应用访问不到
    headers: {
      'Access-Control-Allow-Origin': '*', // [!code hl]
    },
  },
  configureWebpack: {
    // 导出umd格式的包，在全局对象上挂载属性package.name，基座应用需要通过这个
    // 全局对象获取一些信息，比如子应用导出的生命周期函数
    output: {
      // library的值在所有子应用中需要唯一
      // library: package.name,
      // libraryTarget: 'umd'
      library: {
        name: package.name, // [!code hl]
        type: 'umd' // [!code hl]
      }
    }
}
```

```bash [.env.micro]
NODE_ENV=development
VUE_APP_BASE_URL=/app2
isMicro=true
```

:::

::: details 为何要设置library?

webpack打包出来的代码默认是以下形式的

```js
(function() {})()
```

如果设置了library.name，就相当于以下代码

```js
var app2 = (function() {})()
```

因此就可以直接访问`window.app2`

:::

### [qiankun](https://qiankun.umijs.org/zh/guide)

`qiankun`是一个基于`single-spa`的微前端实现库，目的是提供更简单、无痛的构建一个生产可用微前端架构系统。

那么我们有`single-spa`这种微前端解决方案，为什么还需要`qiankun`呢?

相比于`single-spa`，`qiankun`他解决了JS沙盒环境，不需要我们自己去进行处理。在single-spa的开发过程中，我们需要自己手动的去写调用子应用JS的方法（如上面的 `createScript`方法），而`qiankun`不需要，乾坤只需要你传入响应的apps的配置即可，会帮助我们去加载。
