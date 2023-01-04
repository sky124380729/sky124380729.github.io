/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start

var MyQueue = function () {
  this.stackI = []
  this.stackO = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stackI.push(x)
}

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (!this.stackO.length) {
    while (this.stackI.length) {
      const item = this.stackI.pop()
      this.stackO.push(item)
    }
  }
  return this.stackO.pop()
}

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  const item = this.pop()
  this.stackO.push(item)
  return item
}

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stackI.length === 0 && this.stackO.length === 0
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
