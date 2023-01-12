# Mini Vue2

> 简易vue2的实现

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 基础结构</title>
</head>
<body>

  <div id="app">
    <h1>差值表达式</h1>
    <h3>{{ msg }}</h3>
    <h3>{{ count }}</h3>
    <h1>v-text</h1>
    <div v-text="msg"></div>
    <h1>v-model</h1>
    <input type="text" v-model="msg">
    <input type="text" v-model="count">
  </div>

  <script src="./js/dep.js"></script>
  <script src="./js/watcher.js"></script>
  <script src="./js/compiler.js"></script>
  <script src="./js/observer.js"></script>
  <script src="./js/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue',
        count: 20,
        person: { name:'zs' }
      }
    })
    console.log(vm.msg)
  </script>
</body>
</html>
```

```js [vue.js]
class Vue {
  constructor(options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ?
          document.querySelector(options.el)  :
          options.el
    // 2.把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data)
    // 3.调用observer对象，监听数据的变化
    new Observer(this.$data)
    // 4.调用compiler对象，解析指令和差值表达式
    new Complier(this)
  }
  _proxyData(data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 把data的属性注入到vue实例中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if(newValue === data[key]) return
          data[key] = newValue
        }
      })
    })
  }
}
```

```js [observer.js]
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 1.判断data是否是对象
    if(!data || typeof data !== 'object') return
    // 2.遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  // 这里需要把val传进来，而不是使用obj[key]，如果使用后者，则会触发get进入无限循环
  defineReactive(obj, key, val) {
    let that = this
    // 负责收集依赖，并发送通知
    let dep = new Dep()
    // 如果val是对象，把val内部的属性也转换成响应式数据
    this.walk(val)
    // 收集依赖和派发通知
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if(newVal === val) return
        // 这里之所以可以直接这样设置，是使用了闭包的特性
        val = newValue
        // 递归
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}
```

```js [dep.js]
class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    if(sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发送通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```

```js [watcher.js]
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会调用addSub
    this.oldValue = vm[key]
    // 添加完之后置空，防止重复添加
    Dep.target = null
  }
  // 当数据发生变化的时候更新视图
  update() {
    let newValue = this.vm[this.key]
    if(this.oldValue === newValue) return
    this.cb(newValue)
  }
}
```

```js [compiler.js]
class Compiler {
  constructor(vm) {
    this.el = vm.el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if(this.isTextNode(node)) {
        this.compileText(node)
      } else if(this.isElementNode(node) => {
        // 处理元素节点
        this.compileElement(node)
      })
      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if(node.childNodes?.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否有指令
      let attrName = attr.name
      if(this.isDirective(attrName)) {
        // v-text -> text
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  // 编译文本节点，处理差值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if(reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      // 创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal
      })
    }
  }
  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
      return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
      return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
      return node.nodeType === 1
  }
  // 处理 v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newVal) => {
      node.textContent = newVal
    })
  }
  // 处理 v-model 指令
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newVal) => {
      node.value = newVal
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
}
```
