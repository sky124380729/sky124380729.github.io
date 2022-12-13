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
// #endregion promise

export function testCase(MyPromise) {
  let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功')
    }, 2000)
  })
  promise.then(
    (value) => {
      console.log(value)
    },
    (reason) => {
      console.log(reason)
    }
  )
}

export default MyPromise
