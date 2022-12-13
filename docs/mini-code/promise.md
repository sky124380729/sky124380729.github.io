# Promise

[[toc]]

<!-- <script>
import Editor from '../components/editor.vue'
import { testCase } from '../snippets/promise/base.js'

</script>
<Editor module="../snippets/promise/base.js" :code="testCase" /> -->

<script>
import { testCase } from '../snippets/promise/base.js'
</script>

<playground :code="testCase"></playground>

## 基本概念

- Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行

- Promise 中有三个状态 分别为 成功 fulfilled 失败 rejected 等待 pending

  - pending -> fulfilled
  - pending -> rejected
  - 一旦状态确定就不可更改

- resolve和reject函数是用来更改状态的

  - resolve -> fulfilled
  - reject -> rejected

- then方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败，调用失败的回调函数 then方法是定义在原型对象中的

- then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败的原因

## 最基本的实现

<<< @/snippets/promise/base.js#promise

<script setup>
// import MyPromise from '../snippets/promise/base.js'
</script>

<playground :code="testCase"></playground>

## 加入异步

以上代码，对于executor中的函数是异步的时候，就不生效了，这个时候我们要增加对于异步的处理

```js
// 定义常量一是为了复用，而是为了编译器能有提示

const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  // 成功回调 // [!code ++]
  successCallback = undefined // [!code ++]
  // 失败回调 // [!code ++]
  failCallback = undefined // [!code ++]
  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在 如果存在 调用 // [!code ++]
    this.successCallback && this.successCallback(this.value) // [!code ++]
  }
  reject = (reason) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在 如果存在 调用 // [!code ++]
    this.failCallback && this.failCallback(this.reason) // [!code ++]
  }
  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    } else {
      // 等待
      // 将成功回调和失败回调存储起来 // [!code ++]
      this.successCallback = successCallback // [!code ++]
      this.failCallback = failCallback // [!code ++]
    }
  }
}
```

## 完整的代码

<<< @/snippets/promise/index.js
