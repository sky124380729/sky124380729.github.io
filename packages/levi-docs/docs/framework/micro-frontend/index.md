# Micro Frontend

## 实现方式对比

### iframe

优势：

- 技术成熟
- 支持页面嵌入
- 天然支持运行沙箱隔离、独立运行

劣势：

- 页面之间可以是不同的域名（比如鉴权，跨域处理就很麻烦）
- 需要对应的设计一套应用通讯机制，如何监听、传参格式等内容
- 应用加载、渲染、缓存等体系的实现相对麻烦

### web component

优势：

- 支持自定义元素
- 支持`shadow dom`，并可通过关联进行控制
- 支持`template`和`slot`，引入自定义组件内容

劣势：

- 接入微前端需要重写当前项目
- 生态系统不完善，技术过新容易出现兼容性问题
- 整体架构设计复杂，组件与组件之间拆分过细时，容易造成通讯和控制繁琐

### 自研框架

- 路由分发式
- 主应用控制路由匹配和子应用加载，共享依赖加载
- 子应用做功能，并接入主应用实现主子控制和联动

优势

- 高度定制化，满足需要做兼容的一切场景
- 独立的通信机制和沙箱运行环境，可解决应用之间相互影响的问题
- 支持不同技术栈子应用，可无缝实现页面无渲染刷新

劣势

- 技术实现难度较高
- 需要设计一套定制的通信机制
- 首次加载会出现资源过大的情况

## 实现形式

- 单实例：即同一时刻，只有一个子应用被展示，子应用具备一个完整的应用生命周期
- 多实例：通常基于`url`的变化来做子应用的切换

## 微前端架构优势

- 与技术栈无关
- 主框架不限制接入应用的技术栈，微应用具备完全自主权
- 独立开发、独立部署
- 增量升级
- 微前端是一种非常好的实施`渐进式重构`的手段和策略
- 微应用仓库独立，前后端可独立开发，主框架自动完成同步更新
- 独立运行时
- 每个为应用之间状态隔离，运行时状态不共享

## 微前端劣势

- 接入难度较高
- 应用场景-移动端少、管理端多

## 架构设计

![micro-frontend](/assets/imgs/micro-frontend.png)

获取所有项目目录并启动脚本

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
