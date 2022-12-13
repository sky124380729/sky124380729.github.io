// #region promise
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
  // 成功回调
  // successCallback = undefined // [!code --]
  successCallback = [] // [!code ++]
  // 失败回调
  // failCallback = undefined // [!code --]
  failCallback = [] // [!code ++]
  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在 如果存在 调用
    // this.successCallback && this.successCallback(this.value) // [!code --]
    while (this.successCallback.length) this.successCallback.shift()(this.value) // [!code ++]
  }
  reject = (reason) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.reason) // [!code --]
    while (this.failCallback.length) this.failCallback.shift()(this.value) // [!code ++]
  }
  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    } else {
      // 等待
      // 将成功回调和失败回调存储起来
      // this.successCallback = successCallback // [!code --]
      this.successCallback.push(successCallback) // [!code ++]
      // this.failCallback = failCallback // [!code --]
      this.failCallback.push(failCallback) // [!code ++]
    }
  }
}
// #endregion promise

export function testCase(MyPromise) {
  let promise = new MyPromise((resolve) => {
    setTimeout(() => {
      resolve('成功')
    }, 2000)
  })
  promise.then((value) => {
    console.log(value, 1)
  })
  promise.then((value) => {
    console.log(value, 2)
  })
  promise.then((value) => {
    console.log(value, 3)
  })
}

export default MyPromise
