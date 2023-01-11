# Customize(自研微前端框架)

## 整体架构设计

![micro-frontend](/assets/imgs/micro-frontend.png)

## 脚本示例

> 获取所有项目目录并启动脚本

```js
const childProcess = require('child_process')
const path = require('path')

const filePath = {
  vue2: path.join(__dirname, '../vue2'),
  vue3: path.join(__dirname, '../vue3'),
  react15: path.join(__dirname, '../react15'),
  react16: path.join(__dirname, '../react15'),
}

// cd 子应用的目录 npm start 启动项目

function runChild() {
  Object.values(filePath).forEach(item => {
    childProcess.spawn(`cd ${item} && npm start`,
     { stdio: "inherit", shell: true }
    )
  })
}
```

## 简易实现

### vue-cli + vue3创建的主应用

> 微前端框架内容(文件夹名才能为micro，与src平级)

::: code-group

```js [const/subApps.js]
let list = []

export const getList = () => list

export const setList = (appList) => list = appList
```

```js [const/mainLifecycle.js]
// 主应用生命周期
let lifecycle = {}

export const getMainLifecycle = () => lifecycle

export const setMainLifecycle = (data) => lifecycle = data
```

```js [lifecycle/index.js]
// 子应用生命周期
import { findAppByRoute } from '../utils'
import { getMainLifecycle } from '../const/mainLifecycle'

export const lifecycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)
  // 获取要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)
  // 如果没有下一个子应用，不需要继续执行，因为没有下一个子应用，不需要加载任何东西
  if(!nextApp){
    return
  }
  // 如果有上一个子应用，需要调用上一个子应用的销毁方法
  if(prevApp && prevApp.destroyed) {
    await destroyed(prevApp)
  }
  // 执行下一个子应用的beforeLoad方法
  const app = await beforeLoad(nextApp)
  // 执行mounted方法
  await mounted(app)
}

export const beforeLoad = async (app) => {
  // 先让主应用的生命周期执行
  await runMainLifecycle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad()
  const appContext = null
  return appContext
}

export const mounted = async (app) => {
  app && app.mounted()

  await runMainLifecycle('mounted')
}

export const destroyed = async (app) => {
  app && app.destroyed && app.destroyed()
  // 对应执行一下主应用的生命周期
  await runMainLifecycle('destroyed')
}

export const runMainLifecycle = async (type) => {
  const mainLife = getMainLifecycle()
  // 等待所有的生命周期执行完成
  await Promise.all(mainLife[type].map(async => await item()))
}
```

```js [utils/index.js]
import { getList } from '../const/subApps'

// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}

// 获取当前子应用
export const currentApp = () => {
  const currentUrl = window.location.pathname
  return filterApp('activeRule', currentUrl)
}

// 根据router获取子应用
export const findAppByRoute = (router) => {
  return filterApp('activeRule', router)
}

const filterApp = (key, value) => {
  const currentApp = getList().filter(item => item[key] === value)
  return currentApp && currentApp.length ? currentApp[0] : {}
}

// 子应用是否做了切换
const const isTurnChild = () => {
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__
  // 为了防止在同一个子应用中路由发生变化重复执行事件，此处加一个判断
  if(window.__CURRENT_SUB_APP__ === window.location.pathname) {
    return false
  }
  // 处理一下pathname /react15/ -> /react15
  const currentApp = window.location.pathname.match(/\/\w+/)
  if(!currentApp) {
    return
  }
  window.__CURRENT_SUB_APP__ === currentApp[0]
  return true
}
```

```js [router/routerHandle.js]
import { isTurnChild } from '../utils'
import { lifecycle } from '.../lifecycle'

export const turnApp = async () => {
  if(isTurnChild()) {
    // 微前端的生命周期执行
    await lifecycle()
  }
}
```

```js [router/rewriteRouter.js]
import { patchRouter } from '../utils'
import { turnApp } from './routerHandle'

// 重写window的路由跳转
export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')
  window.addEventListener('micro_push', turnApp)
  window.addEventListener('micro_replace', turnApp)
  // 监听浏览器的前进后退按钮
  window.onpopstate = function() {
    turnApp()
  }
}
```

```js [start.js]
// 微前端框架入口文件
import { getList, setList } from './const/subApps'
import { setMainLifecycle } from './const/lifecycle'
import { currentApp } from './utils'
import { rewriteRouter } from './router/rewriteRouter'

rewriteRouter()

export const registerMicroApps = (appList, lifecycle) => {
  setList(appList)
  setMainLifecycle(lifecycle)
}

// 启动微前端框架
export const start = () => {
  // 首先验证当前子应用列表是否为空
  const apps = getList()
  if(!apps.length) {
    throw Error('子应用列表为空，请正确注册')
  }
  // 有子应用的内容，查找到符合当前路由的子应用
  const app = currentApp()

  if(app) {
    const { pathname, hash } = window.location
    const url = pathname + hash
    window.history.pushState('', '', url)
    // 这里是为了防止多次触发turnApp，打个标记
    window.__CURRENT_SUB_APP__ = app.activeRule
  }
}
```

```js [index.js]
export { registerMicroApps, start } from './start'
```

:::

> 主应用内容(src目录下)

::: code-group

```js [store/sub.js]
export const subNavList = [
  {
    name: 'react15',
    activeRule: '/react15',
    container: '#micro-container',
    entry: '//localhost:9002/'
  },
  {
    name: 'react16',
    activeRule: '/react16',
    container: '#micro-container',
    entry: '//localhost:9003/'
  },
  {
    name: 'vue2',
    activeRule: '/vue2',
    container: '#micro-container',
    entry: '//localhost:9004/'
  },
  {
    name: 'vue3',
    activeRule: '/vue3',
    container: '#micro-container',
    entry: '//localhost:9005/'
  },
]
```

```js [util/index.js]
import { registerMicroApps, start } from '../../micro'

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        console.log('开始加载')
      }
    ],
    mounted: [
      () => {
        console.log('加载完成')
      }
    ],
    destroyed: [
      () => {
        console.log('下载完成')
      }
    ]
  })
  // 开启微前端框架
  start()
}
```

```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { subNavList } from './store/sub'
import { registerApp } from './util'

registerApp(subNavList)
createApp(App).use(router()).mount('#micro_web_main_app')
```

:::

### vue-cli + vue2创建的子应用

::: code-group

```js [main.js]
import Vue from 'vue'
import App from './App.vue'
import router from './router'

let instance = null

const render = () => {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 微前端环境下不自动render
if(!window.__MICRO_WEB__) {
  render()
}

// 微前端环境下暴露一组生命周期
// 由于在vue.config.js中配置了library: 'vue2'属性
// 因此以下方法可以通过window.vue2.bootstrap方式获取到

export const bootstrap = () => {
  console.log('开始加载')
}

export const mount = () => {
  render()
  console.log('渲染成功')
}

export const unmount = () => {
  console.log('卸载', instance)
}

```

```js [vue.config.js]
module.exports = {
  outputDir: 'dist', // 打包输出目录
  assetsDir: 'static', // 打包的静态资源目录
  filenameHashing: true, // 打包出来的文件，会带有hash信息
  publicPath: 'http://localhost:9004', //
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 本地服务的内容是拿的dist
    headers: {
      'Access-Control-Allow-Origin': '*' // 开发环境下允许跨域，主子应用直接可直接调用
    }
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd', // 把子应用打成umd库格式  commonjs 浏览器 node环境都可以使用
      filename: 'vue2.js',
      library: 'vue2', // 启用库模式， 可以直接访问window.vue2 可以看到是一个Module
      jsonFunction: `WebpackJsonp_${name}`
    }
  }
}
```

:::

### vue-cli + vue3创建的子应用

::: code-group

```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let instance = null

const render = () => {
  instance = createApp(App)
  instance.use(router).mount('#app')
}

// 微前端环境下不自动render
if(!window.__MICRO_WEB__) {
  render()
}

// 微前端环境下暴露一组生命周期
// 由于在vue.config.js中配置了library: 'vue3'属性
// 因此以下方法可以通过window.vue3.bootstrap方式获取到

export const bootstrap = () => {
  console.log('开始加载')
}

export const mount = () => {
  render()
  console.log('渲染成功')
}

export const unmount = () => {
  console.log('卸载', instance)
}

```

```js [vue.config.js]
module.exports = {
  outputDir: 'dist', // 打包输出目录
  assetsDir: 'static', // 打包的静态资源目录
  filenameHashing: true, // 打包出来的文件，会带有hash信息
  publicPath: 'http://localhost:9005',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 本地服务的内容是拿的dist
    headers: {
      'Access-Control-Allow-Origin': '*' // 开发环境下允许跨域，主子应用直接可直接调用
    }
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd', // 把子应用打成umd库格式  commonjs 浏览器 node环境都可以使用
      filename: 'vue3.js',
      library: 'vue3', // 启用库模式， 可以直接访问window.vue3 可以看到是一个Module
      jsonFunction: `WebpackJsonp_${name}`
    }
  }
}
```

:::

### webpack + react15创建的子应用

::: code-group

```jsx [main.jsx]
import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx'

const render = () => {
  ReactDOM.render((
    <BasicMap />
  ), document.getElementById('#app-react'))
}

// 微前端环境下不自动render
if(!window.__MICRO_WEB__) {
  render()
}

// 微前端环境下暴露一组生命周期
// 由于在webpack.config.js中配置了library: 'react15'属性
// 因此以下方法可以通过window.react15.bootstrap方式获取到

export const bootstrap = () => {
  console.log('开始加载')
}

export const mount = () => {
  render()
  console.log('渲染成功')
}

export const unmount = () => {
  console.log('卸载')
}

```

```js [webpack.config.js]
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react15.js',
    library: 'react15',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: 'http://localhost:9002/'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: path.join(__dirname, 'dist'),
    port: 9002,
    historyApiFallback: true,
    hot: true
  }
}
```

:::

### webpack + react16创建的子应用

::: code-group

```jsx [main.jsx]
import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx'

const render = () => {
  ReactDOM.render((
    <BasicMap />
  ), document.getElementById('#app-react'))
}

// 微前端环境下不自动render
if(!window.__MICRO_WEB__) {
  render()
}

// 微前端环境下暴露一组生命周期
// 由于在webpack.config.js中配置了library: 'react16'属性
// 因此以下方法可以通过window.react16.bootstrap方式获取到

export const bootstrap = () => {
  console.log('开始加载')
}

export const mount = () => {
  render()
  console.log('渲染成功')
}

export const unmount = () => {
  console.log('卸载')
}

```

```js [webpack.config.js]
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react16.js',
    library: 'react16',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: 'http://localhost:9003/'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: path.join(__dirname, 'dist'),
    port: 9003,
    historyApiFallback: true,
    hot: true
  }
}
```

:::

## Q&A

- 为什么设置了`library:'vue2'`就能在`window`下直接访问`vue2`?

  webpack打包出来的代码默认是以下形式的

  ```js
  (function() {})()
  ```

  如果设置了library，就相当于以下代码

  ```js
  var vue2 = (function() {})()
  ```

  因此可以在全局访问到vue2
