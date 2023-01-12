# Design-Patterns

[[toc]]

## 发布订阅模式

> 发布订阅概述...

```js
class EventEmitter {
  constructor() {
    this.subs = Object.create(null)
  }
  // 注册事件
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }
  // 触发事件
  $emit(eventType) {
    if(this.subs[eventType]) {
      this.subs[eventType].forEach(handler => {
        handler()
      })
    }
  }
}

// 测试
const em = new EventEmitter()
em.$on('click',()=>{
  console.log('click1')
})
em.$on('click',()=>{
  console.log('click2')
})
em.$emit('click')

```

## 观察者模式

> 观察者模式概述...

```js
// 发布者-目标
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = []
  }
  // 添加订阅者
  addSub(sub) {
    if(sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发布通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 订阅者-观察者
class Watcher {
  update() {
    console.log('update')
  }
}
// 测试
let dep = new Dep()
let watcher = new Watcher()
dep.addSub(watcher)
dep.notify()
```
