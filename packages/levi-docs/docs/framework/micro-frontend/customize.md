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
