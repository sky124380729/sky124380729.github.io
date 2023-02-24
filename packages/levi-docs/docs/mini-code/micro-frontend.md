# Micro-Frontend

[[toc]]

## 整体架构设计

![micro-frontend](/assets/imgs/micro-frontend.png)

## javascript沙箱隔离

- 通过`snapshot`方式实现沙箱隔离(详见下文)

- 通过`proxy`方式实现沙箱隔离(详见下文)

## css沙箱隔离

- `css modules`

  ::: code-group

  ```js [webpack.config.js]
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(cs|scs)s$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              module: true // [!code hl]
            }
          }]
        }
      ]
    }
  }
  ```

  :::

- `shadow dom` 很完美，但是是比较新的API，hmm...现在都2023了，应该用起来没啥毛病了吧...

  <<< @/public/demos/shadow-dom.html

  <iframe width="100%" src="/notebook/demos/shadow-dom.html"></iframe>

- `minicss` MiniCssExtractPlugin

  使用的是`MiniCssExtractPlugin`将css文件打包成单独的文件，由于在是在子应用中加载`link`标签，所以子应用卸载之后`link`也会消失，实现了沙箱隔离

  but...多个子应用同时存在怎么办...

- css-in-js

## 父子应用通信

- props
- CustomEvent

  ```js
  // add an appropriate event listener
  obj.addEventListener('cat', function(e) {
    process(e.detail)
  })

  // create and dispatch the event
  var event = new CustomEvent('cat', {
    detail: {
      hazcheeseburger: true
    }
  })
  obj.dispatchEvent(event)
  ```

## 子应用间通信

- props
  - 子应用1 - 父应用交互 - 子应用2
- customevent

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
  service: path.join(__dirname, '../service'),
  main: path.join(__dirname, '../main')
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

## vue-cli + vue3创建的主应用

> 微前端框架内容(文件夹名才能为micro，与src平级，后续单独拉出npm包发布)

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

:::

:::code-group

```js [customevent/index.js]
export class Custom {
  // 事件监听
  on(name, cb) {
    window.addEventListener(name, e => cb(e.detail))
  }
  // 事件触发
  emit(name, data) {
    const event = new CustomEvent(name, {
      detail: data
    })
    window.dispatchEvent(event)
  }
}
```

:::

::: code-group

```js [lifecycle/index.js]
// 子应用生命周期
import { findAppByRoute } from '../utils'
import { getMainLifecycle } from '../const/mainLifecycle'
import { loadHtml } from '../loader'

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
  if(prevApp && prevApp.unmount) {
    // 沙箱销毁
    if(prevApp.proxy) {
      prevApp.proxy.inactive()
    }
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
  // 获取子应用的内容
  const subApp = await loadHtml(app)
  subApp && subApp.beforeLoad && subApp.beforeLoad()
  return subApp
}

export const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })
  // 对应执行一下主应用的生命周期
  await runMainLifecycle('mounted')
}

export const destroyed = async (app) => {
  app && app.unmount && app.unmount()
  // 对应执行一下主应用的生命周期
  await runMainLifecycle('destroyed')
}

export const runMainLifecycle = async (type) => {
  const mainLife = getMainLifecycle()
  // 等待所有的生命周期执行完成
  await Promise.all(mainLife[type].map(async => await item()))
}
```

:::

::: code-group

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

```js [utils/fetchResource.js]
export const fetchResource = (url) => fetch(url).then(async res => await res.text())
```

:::

::: code-group

```js [loader/index.js]
import { fetchResource } from '../utils/fetchResource'
import { sandBox } from '../sandbox'

// 加载html的方法
export const loadHtml = async (app) => {
  // 子应用需要显示的位置
  let container = app.container // #id内容
  // 入口
  let entry = app.entry
  const [dom, scripts] = await parseHtml(entry, app.name)
  const ct = document.querySelector(container)
  if(!ct) {
    throw Error('容器不存在，请检查')
  }
  ct.innerHTML = dom
  scripts.forEach(item => {
    sandBox(app, item)
  })
  return app
}

// 应用缓存(子应用的name作为key)
const cache = {}

export const parseHtml = async (entry, name) => {
  if(cache[name]) {
    return cache[name]
  }
  const html = await fetchResource(entry)
  let allScript = []
  const div = document.createElement('div')
  div.innerHTML = html
  // 处理标签、link、script(src,js)
  const [dom, scriptUrl, script] = await getResources(div, entry)
  // 获取所有外链的js资源
  const fetchedScripts = await Promise.all(scriptUrl.map(async item => fetchResource(item)))
  allScript = script.concat[fetchedScripts]
  // 添加进缓存
  cache[name] = [dom, allScript]
  return [dom, allScript]
}

export const getResources = async (root, entry) => {
  const scriptUrl = []
  const script = []
  const dom = root.outerHTML
  // 递归处理节点信息
  function deepParse(element) {
    const children = element.children
    const parent = element.parent
    // 第一步，处理script中的内容
    if(element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      if(!src) {
        script.push(element.outerHTML)
      }else {
        if(src.startsWith('http')) {
          scriptUrl.push(src)
        }else {
          // 这里是为了兼容子应用脚手架假如没有设置publicPath,加载的资源会是/static/这种形式
          scriptUrl.push(`http:${entry}/${src}`)
        }
      }
      if(parent) {
        parent.replaceChild(document.createComment('此js文件已经被微前端替换'), element)
      }
    }
  // 第二步，对link进行解析，link也会有js的内容
    if(element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
      if(href.endsWith('.js')) {
        if(href.startsWith('http')) {
          scriptUrl.push(href)
        }else {
          scriptUrl.push(`http:${entry}/${href}`)
        }
      }
    }
    // 第三步，递归处理子节点
    for(let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }
  }
  deepParse(root)
  return [dom, scriptUrl, script]
}
```

```js [loader/prefetch.js]
import { getList } from '../const/subApps'
import { parseHtml } from './index'

export const prefetch = async () => {
  // 1. 获取所有子应用列表 - 不包括当前正在显示的
  const list = getList().filter(item => !window.location.pathname.startsWith(item.activeRule))
  // 2. 预加载所有剩下的子应用
  await Promise.all(list.map(async item => await parseHtml(item.entry, item.name)))
}
```

:::

::: code-group

```js [router/routerHandle.js]
import { isTurnChild } from '../utils'
import { lifecycle } from '../lifecycle'

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

:::

::: code-group

```js [store/index.js]
export const createStore = (initData = {}) => (() => {
  let store = initData
  // 管理所有的订阅者，依赖
  const observers = []
  // 获取store
  const getStore = () => store
  // 更新store
  const update = (value) => {
    // TODO: 这里目前只能比较基本数据类型
    if(value !== store) {
      // 执行store的操作
      const oldValue = store
      // 将store更新
      store = value
      // 通知所有订阅者
      observers.forEach(async fn => await fn(store, oldValue))
    }
  }
  // 添加订阅者
  const subscribe = (fn) => {
    observers.push(fn)
  }
  return {
    getStore,
    update,
    subscribe
  }
})()
```

:::

::: code-group

```js [sandbox/index.js]
import { performScriptForEval } from './performScript'
// import { SnapShotSandbox } from './snapShotSandbox'
import { ProxySandbox } from './proxySandbox'

const isCheckLifecycle = lifecycle => lifecycle && lifecycle.bootstrap && lifecycle.mount && lifecycle.unmount
// 子应用生命周期和环境变量设置
export const sandBox = (app, script) => {
  const proxy = new ProxySandbox()
  // 如果app上不存在这个对象，就赋值给app
  if(!app.proxy) {
    app.proxy = proxy
  }
  // 1. 设置环境变量
  window.__MICRO_WEB__ = true
  // 2. 运行js文件
  const lifecycle = performScriptForEval(script, app.name, app.proxy.proxy)
  // 库模式下window.vue3只是暴露了export的内容，需要将export导出的生命周期挂载到app应用中
  // 生命周期，挂载到app上，这样就可以在lifecycle中调用了
  if(isCheckLifecycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}
```

```js [sandbox/performScript.js]
export const performScriptForFunction = (script, appName, global) => {
  // new Function本身就是一个函数体，所以外层不需要再用函数包裹
  /* const scriptText = ` // [!code --]
    ${script} // [!code --]
    return window['${appName}'] // [!code --]
  ` */
  // 这里由于直接传global进去是个字符串会报错，所以使用的hack机制，使用window.proxy存一下
  window.proxy = global
  const scriptText = `
    return ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  // return new Function(scriptText).call(global, global) // [!code --]
  return new Function(scriptText)() // [!code ++]
}

export const performScriptForEval = (script, appName, global) => {
  // 在子应用的配置文件中开启了库模式，所以会在window暴露一个window.vue3这样的模块
  // 这样就可以通过window.appName获取对应的内容
  // 通过包装一层函数，可以实现既执行了脚本，又能获取到window.appName
  /* const scriptText = ` // [!code --]
    () => { // [!code --]
      ${script} // [!code --]
      return window['${appName}'] // [!code --]
    } // [!code --]
  ` */
  window.proxy = global
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  // 这里的scriptText,使用eval之后还要对这个函数调用，使用call是为了修改this指向 // [!code --]
  // return eval(scriptText).call(global, global) // [!code --]
  return eval(scriptText) // [!code ++]
}
```

```js [sandbox/proxySandbox.js]
// 代理沙箱

// 子应用的沙箱容器
let defaultValue = {}

export class ProxySandbox {
  constructor() {
    this.proxy = null
    this.active()
  }
  // 沙箱激活
  active() {
    // 子应用需要设置属性
    this.proxy = new Proxy(window, {
      get(target, key) {
        // 这里直接这么写，浏览器可能会报`Uncaught TypeError: Illegal invocation`
        // 一般是由于代理函数之后this指向不对的问题
        if(typeof target[key] === 'function') {
          return target[key].bind(target)
        }
        return defaultValue[key] || target[key]
      },
      set(target, key, value) {
        defaultValue[key] = value
        return true
      }
    })
  }
  // 沙箱销毁
  inactive() {
    defaultValue = {}
  }
}
```

```js [sandbox/snapShotSandbox.js]
// 快照沙箱（对全局变量设置为快照的形式，子应用切换之后所有全局变量设置为初始值）
// 目前不推荐使用快照沙箱，原因有两点
// 1. 由于要对整个window进行快照设置，性能是比较差
// 2. 不支持多实例，一个页面显示多个子应用就不支持了
export class SnapShotSandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = window
    // 激活沙箱
    this.active()
  }
  // 沙箱激活
  active() {
    // 创建一个沙箱快照
    this.snapshot = new Map()
    // 遍历全局环境
    for(const key in window) {
      this.snapshot[key] = window[key]
    }
  }
  // 沙箱销毁
  inactive() {
    for(const key in window) {
      if(window[key] !== this.snapshot[key]) {
        // 还原操作
        window[key] = this.snapshot[key]
      }
    }
  }
}
```

<!-- ```js [sandbox/performScript.js]
// 执行应用的 js 内容 new Function 篇
export const performScript = (script, appName, global) => {
  const scriptText =
    `try {
       ${script}
       return window['${appName}']
      } catch (err) {
          console.error('runScript error:' + err);
      }`;

  const performer = new Function(scriptText);
  return performer.call(global, global);
}

// 执行应用中的 js 内容 eval篇
export const performScriptForEval = (script, appName, global) => {
  const scriptText = `
    (() => () => {
      try {
        ${script}
        return window['${appName}']
      } catch (err) {
        console.error('runScript error:' + err);
      }
    })()
  `
  return (() => eval(scriptText))().call(global, global)
}
```

```js [sandbox/proxySandBox.js]
export const isFunction = (value) => typeof value === 'function';

// 代理沙箱
export class ProxySandBox {
  constructor() {
    this.proxy = window;
    this.active();
  }
  active() {
    const proxy = window;

    const draftValue = Object.create(Object.getPrototypeOf(proxy))

    this.proxy = new Proxy(proxy, {
      get(target, propKey) {
        // 函数做特殊处理
        if (isFunction(draftValue[propKey])) {
          return draftValue[propKey].bind(proxy)
        }
        if (isFunction(target[propKey])) {
          return target[propKey].bind(proxy)
        }

        return draftValue[propKey] || target[propKey]
      },
      set(target, propKey, value) {
        draftValue[propKey] = value
        return true
      }
    })
  }
  inactive() {
    console.log('关闭沙箱');
  }
}
```

```js [sandbox/sandbox.js]
import { ProxySandBox } from './proxySandBox';
import { findAppByName } from '../util';
import { performScriptForEval } from './performScript';

// 检测是否漏掉了生命周期方法
export const lackOfLifecycle = (lifecycles) => !lifecycles ||
  !lifecycles.bootstrap ||
  !lifecycles.mount ||
  !lifecycles.unmount;

// 创建沙箱环境
export const sandbox = (script, appName) => {
  // 获取当前子应用
  const app = findAppByName(appName);

  // 创建沙箱环境
  const global = new ProxySandBox();

  // 设置微前端环境
  window.__MICRO_WEB__ = true;

  // 获取子应用生命周期
  const lifeCycles = performScriptForEval(script, appName, global.proxy);

  app.sandBox = global;

  // 检查子应用是否包含必须的方法
  const isLack = lackOfLifecycle(lifeCycles)
  if (isLack) {
    return;
  }

  app.bootstrap = lifeCycles.bootstrap;
  app.mount = lifeCycles.mount;
  app.unmount = lifeCycles.unmount;
}
```

```js [sandbox/snapshotSandBox.js]
// 快照沙箱
export class SnapShotSandBox {
  constructor() {
    this.proxy = window;
    this.active();
  }
  active() {
    this.snapshot = new Map(); // 创建 window 对象的快照
    for (const key in window) {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty(key)) {
        // 将window上的属性进行拍照
        this.snapshot[key] = window[key];
      }
    }
  }
  inactive() {
    for (const key in window) {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty(key)) {
        // 将上次快照的结果和本次window属性做对比
        if (window[key] !== this.snapshot[key]) {
          // 还原window
          window[key] = this.snapshot[key];
        }
      }
    }
  }
}
``` -->

:::

::: code-group

```js [start.js]
// 微前端框架入口文件
import { getList, setList } from './const/subApps'
import { setMainLifecycle } from './const/lifecycle'
import { currentApp } from './utils'
import { rewriteRouter } from './router/rewriteRouter'
import { prefetch } from './loader/prefetch'
import { Custom } from './cutomevent'

const custom = new Custom()

/* custom.on('test', (data) => {
  console.log(data)
}) */

// 这样可以在子应用获取custom内容
window.custom = custom

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
  // 预加载 - 加载接下来的所有子应用，但是不显示
  prefetch()
}
```

:::

::: code-group

```js [index.js]
export { registerMicroApps, start } from './start'
export { createStore } from './store'
```

:::

> 主应用相关内容(src目录下)

::: code-group

```js [store/sub.js]
import * as appInfo from '../store'

export const subNavList = [
  {
    name: 'react15',
    activeRule: '/react15',
    container: '#micro-container',
    entry: '//localhost:9002/',
    appInfo
  },
  {
    name: 'react16',
    activeRule: '/react16',
    container: '#micro-container',
    entry: '//localhost:9003/',
    appInfo
  },
  {
    name: 'vue2',
    activeRule: '/vue2',
    container: '#micro-container',
    entry: '//localhost:9004/',
    appInfo
  },
  {
    name: 'vue3',
    activeRule: '/vue3',
    container: '#micro-container',
    entry: '//localhost:9005/',
    appInfo
  },
]
```

```js [util/index.js]
import { registerMicroApps, start, createStore } from '../../micro'

// 以下store是测试代码，实际开发中是主子应用之间的数据监听
const store = createStore()

const storeData = store.getStore()

store.subscribe((newValue, oldValue) => {
  console.log(newValue, oldValue)
})

store.update({
  // 目前框架内部是全量替换的，所以这里先要把原始数据加进来
  ...storeData,
  a: 1
})

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

## vue-cli + vue2创建的子应用

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

export const mount = (app) => {
  // 通过props传递下来的
  app.appInfo.header.changeHeader(false)
  // 通过customevent传递数据上去
  window.custom.emit('test', { a: 1 })
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
  publicPath: 'http://localhost:9004', // 如果不加publicPath，项目引入的资源是/static这种形式的，如果加上，项目引入的资源会变成http://localhost:9004/static这种形式
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

## vue-cli + vue3创建的子应用

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

## webpack + react15创建的子应用

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

## webpack + react16创建的子应用

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

## 关于qiankun

- 其内部也是对`single-spa`的封装

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

- Uncaught TypeError: Illegal invocation？

  这种错误一般都是调用浏览器内部函数的时候`this`指向不对的问题导致的

- 文中的`libraryTarget`报出警告?

  上述的方案相对不是最新的，`webpack`官方有下面这句话，可以自行尝试

  :::warning
  Please use `output.library.type` instead as we might drop support for `output.libraryTarget` in the future.
  :::
