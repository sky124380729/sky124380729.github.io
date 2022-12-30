/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start

var MyStack = function() {
  this.queueI = []
  this.queueO = []
};

/**
* @param {number} x
* @return {void}
*/
MyStack.prototype.push = function(x) {
  this.queueI.push(x)
};

/**
* @return {number}
*/
MyStack.prototype.pop = function() {
  if(!this.queueI.length) {
      ;[this.queueI, this.queueO] = [this.queueO, this.queueI]
  }
  while(this.queueI.length > 1) {
      this.queueO.push(this.queueI.shift())
  }
  return this.queueI.shift()
};

/**
* @return {number}
*/
MyStack.prototype.top = function() {
  const item = this.pop()
  this.queueI.unshift(item)
  return item
};

/**
* @return {boolean}
*/
MyStack.prototype.empty = function() {
  return this.queueI.length === 0 && this.queueO.length === 0
};

/**
* Your MyStack object will be instantiated and called as such:
* var obj = new MyStack()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.empty()
*/
// @lc code=end

