# Promise

[[toc]]

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

<script setup>
import { testCase as baseTest } from '../snippets/promise/base.js'
import { testCase as asyncTest } from '../snippets/promise/async.js'
import { testCase as multiCallsTest } from '../snippets/promise/multi-calls.js'
import { testCase as chainTest } from '../snippets/promise/chain.js'
import { testCase as chainAsyncTest } from '../snippets/promise/chain-async.js'
import { testCase as chainCycleTest } from '../snippets/promise/chain-cycle.js'
</script>

## 最基本的实现

<<< @/snippets/promise/base.js#promise

<playground module="promise/base" :code="baseTest"></playground>

## 加入异步

以上代码，对于executor中的函数是异步的时候，就不生效了，这个时候我们要增加对于异步的处理

<<< @/snippets/promise/async.js#promise

<playground module="promise/async" :code="asyncTest"></playground>

## 多次调用

一个promise示例，可能多次调用then方法，如果不对代码进行改造，只会执行最后一个then的内容

<<< @/snippets/promise/multi-calls.js#promise

<playground module="promise/multi-calls" :code="multiCallsTest"></playground>

## 支持链式调用

promise示例不仅可以多次调用，还支持链式调用

<<< @/snippets/promise/chain.js#promise

<playground module="promise/chain" :code="chainTest"></playground>

## then回调中返回promise的情况

<<< @/snippets/promise/chain-async.js#promise

<playground module="promise/chain-async" :code="chainAsyncTest"></playground>

## 处理promise循环调用自身的边界逻辑判断

<<< @/snippets/promise/chain-cycle.js#promise

<playground module="promise/chain-cycle" :code="chainCycleTest"></playground>

## 未完待续~

## 完整的代码

<<< @/snippets/promise/index.js
