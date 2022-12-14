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
  successCallback = []
  // 失败回调
  failCallback = []
  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在 如果存在 调用
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }
  reject = (reason) => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在 如果存在 调用
    while (this.failCallback.length) this.failCallback.shift()(this.value)
  }
  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let result = successCallback(this.value)
        // resolvePromise(result, resolve, reject) // [!code --]
        resolvePromise(promise2, result, resolve, reject) // [!code ++]
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })
    return promise2
  }
}

// 判断 x 的值是普通值还是promise对象
// 如果是普通值 直接调用resolve
// 如果是promise对象 查看promise对象返回的结果
// 再根据promise对象的返回的结果 决定调用resolve 还是reject
// function resolvePromise(x, resolve, reject) { // [!code --]
// eslint-disable-next-line prettier/prettier
function resolvePromise(promise2, x, resolve, reject) { // [!code ++]
  // eslint-disable-next-line prettier/prettier
  if (promise2 === x) { // [!code ++]
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>')) // [!code ++]
  } // [!code ++]
  if (x instanceof MyPromise) {
    // promise对象
    // x.then(value => resolve(value), reject => reject(reason))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}
// #endregion promise

export function testCase(MyPromise) {
  let promise = new MyPromise((resolve) => {
    resolve('成功')
  })
  promise
    .then((value) => {
      console.log(value)
      return new MyPromise((resolve) => {
        resolve('other')
      })
    })
    .then((value) => {
      console.log(value)
    })
}

export default MyPromise
