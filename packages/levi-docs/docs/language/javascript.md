# Javascript

[[toc]]

## call,apply,bind

- apply通常用在需要数组转换为参数列表形式的参数传递

```js
const arr = ['foo', 'bar', 'baz']
console.log.apply(console, arr)
```

- bind也可以改变this，区别是不会调用函数

```js
// 柯里化
function fn(a, b, c) {}
const f = fn.bind(fn, 1)
f(2, 3)
```

## 前端对于斐波那契的思考

- 基础斐波那契

```js
function fib(n) {
  if(n === 1 || n === 2) return 1
  else return fib(n - 2) + fib(n - 1)
}
```

:::info
这时候你会发现当n跟大的时候，执行速度非常慢，甚至直接导致程序崩溃
:::

- 使用缓存优化的斐波那契

```js
const cache = [] // [!code hl]
function fib(n) {
  if(cache[n] !== undefined) return cache[n]
  if(n === 1 || n === 2) return (cache[n] = 1)
  else return (cache[n] = fib(n - 1) + fib(n - 2))
}
```

:::info
这时候你又发现cache应该是局部变量，不应该暴露在全局，这时候你又想到了闭包
:::

- 使用闭包保护缓存

```js
function createFib() {
  const cache = [] // [!code hl]
  function fib(n) {
    if (cache[n] !== undefined) return cache[n]
    if (n === 1 || n === 2) return (cache[n] = 1)
    else return (cache[n] = fib(n - 1) + fib(n - 2))
  }
  return fib
}

const fib = createFib()
fib(100)
```

:::info
到这一步，实际上已经很OK了，但是在`es6`中，可以使用别的办法去优化函数，使其更简洁
:::

<!-- - 尾调用优化

> 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function fib(n, ac1 = 1, ac2 = 2) {
  if(n === 1 || n === 2) return ac2
  return fib(n - 1, ac2, ac1 + ac2)
}
```

尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

两个方法可以解决这个问题：

- 在尾递归函数之外，再提供一个正常形式的函数。比如以下的阶乘函数：

```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
```

上面代码通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了

:::tip
函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

```js
function currying(fn, n) {
  return function (m) {
  return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
```

:::

- ES6 的函数默认值

```js
function fibonacci(n) {
  let a = 1, b = 1, c = 1
  for(let i = 2; i <= n; i++) {
  c = a + b
  a = b
  b = c
  }
  return c
}
``` -->

## event.target 和 event.currentTarget的区别

- `event.target` 返回的是当前点击元素的节点
- `event.currentTarget` 返回的始终是绑定事件的节点

## 闭包的作用

- 可以通过闭包返回的函数或者方法，来修改函数内部的数据
- 创建一个私有空间，保护数据，外部想要访问数据，只能通过函数提供的方法，在提供的方法，可以设置一些校验规则，让数据变得更加安全

## js的作用域是词法作用域(代码在写好的时候，变量的作用域就已经确定了)

```js
var num = 123;
function f1(){
  console.log(num);
}
function f2(){
  var num = 456;
  f1();
}
f2(); //123
```

## js是单线程的

```js
for(var i=0;i<arr.length;i++){
  setTimeout(function(){
    console.log(i)
  },0)
}
```

执行结果全是0，这是why？

- 先把主任务(代码任务执行完毕)
- 再去执行次要的任务(包括setTimeout和setInterval的回调)

类似的

```js
for(var i=0;i<div.length;i++){
  div[i].onclick = function(){
    alert("我是第"+i+"个div");
  }
}
```

这里的alert出来的都是i的最后一个值,why?
这是因为点击的时候代码已经执行完毕了，i已经变成最后一个了，除非你在代码执行的过程中点击(这是做不到的)

## 伪数组特点

- 必须要有length属性
- 如果length属性值是0，那么这个对象有没有元素无所谓
- 如果length属性值不为0，那么这个对象一定有（length-1）为下标的属性值

## &&和||小技巧

> 基础用法

```js
if(a>=5) {
  alert(1)
}
```

可以简化成

```js
a >= 5 && alert(1)
```

> 假如我们有一个需求，
> 速度(speed)为5显示1个箭头(num)；
> 速度为10显示2个箭头；
> 速度为12显示3个箭头；
> 速度为15显示4个箭头；
> 其他都显示都显示0各箭头。

传统的if elseif else 写法太low
改进版的switch case 稍微进步一点，还是很low
是时候用一行代码搞定了！

```js
var num = (speed == 5 && 1) || (speed == 10 && 2) ||(speed == 15 && 3) ||(speed == 20 && 4) || 0
```

让我们来更进一步

```js
var num = {'5':1,'10':2,'15':3,'20':4}[speed] || 0;
```

如果是判断区间的话则使用之前的方法

```js
var num = (speed > 20 && 4) || (speed > 15 && 3) || (speed > 10 && 2) || (speed > 5 && 1) || 0
```

## 生成uuid

```js
function generateUUID() {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

```

## promise封装异步队列

> 使用forEach函数

```js
function queue(things) {
  let promise = Promise.resolve()
  things.forEach((thing) => {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(thing)
          resolve()
        }, 1000)
      })
    })
  })
}
```

> 使用reduce函数

```js
function queue(things) {
  things.reduce((promise, thing) => {
    return promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(thing)
          resolve()
        }, 1000)
      })
    })
  }, Promise.resolve())
}
```

## js平滑滚动到顶部

- 最简单的方法(苹果上有毒)

  ```js
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
  ```

- 最终方案

  ```js
  const scrollToTop = () => {
  const sTop = document.documentElement.scrollTop || document.body.scrollTop
  if (sTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, sTop - sTop / 8)
    }
  }
  scrollToTop()
  ```

## 两个并发执行的请求

```js
// 错误
await a()
await b()
// 相当于
a().then(() => b())
```

```js
// 正确
await Promise.all([a(), b()])
```

## 移除匿名事件绑定

```js
const ownAddEventListener = (scope, type, handler, capture) => {
  scope.addEventListener(type, handler, capture);
  return () => {
    scope.removeEventListener(type, handler, capture);
  }
}
// 然后，您可以像这样删除事件监听器：
// Add event listener
const disposer = ownAddEventListener(document.body, 'scroll', () => {
  // do something
}, false);
// Remove event listener
disposer();
```

## some和every函数可以提前停止循环

## 数组变成hashMap实现性能优化

> 例如对数组的操作

```js

const posts = [{ ...post }, { ...post }]

// 查找数据
const currentFile = posts.find( post => post.id === currentId)

// 修改一个数据
posts.map(post => {
  if(post.id === currentId) {
    return newPost
  }else {
    return post
  }
})

// 删除一个数据
posts.filter( post => post.id !== currentId )

```

> 转换成hashMap之后

```js
const posts = {
  '1': { ...post },
  '2': { ...post }
}

// 查找数据
const currentFile = posts[currentId]

// 修改一个数据
posts[currentId].title = 'new title'

// 删除一个数据
delete posts[currentId]

```

## 关于纯函数

### 概念

- 纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用。类似于数学中的函数(用来描述输入和输出之间的关系)，y=f(x)
- lodash是一个纯函数的功能库，提供了对数组，数字，对象，字符串，函数等操作的一些方法
- 数组的slice和splice分别是：纯函数和不纯的函数

### 好处

- 可缓存：因为纯函数对相同的输入始终由相同的结果，所以可以把纯函数的结果缓存起来

```js
// 求圆的面积
function getArea(r) {
  return Math.PI * r * r
}
// 模拟一个memoize函数
function memoize(fn) {
  let cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(this, arguments)
    return cache[key]
  }
}
const getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
```

- 可测试：纯函数让测试更方便
- 并行处理：在多线程环境下并行操作共享内存数据可能出现意外情况，纯函数不需要访问共享的内存数据，所以并行环境下可以任意运行纯函数(Web Worker)

## 柯里化

当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数以后永远不变)，然后返回一个新的函数接收剩余的参数，返回结果

```js
function getSum(a, b, c) {
  return a + b + c
}

function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    return func(...args)
  }
}

const c = curry(getSum)
console.log(c(1, 2, 3))
console.log(c(1)(2, 3))
console.log(c(1)(2)(3))
```

## 函数组合

- 函数组合(compose):如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
- 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终的结果
- 函数组合默认是从右到左执行
- 要满足结合律(数学上的)

```js
function flowRight(...fns) {
  return function (value) {
    while (fns.length) {
      const fn = fns.pop()
      value = fn(value)
    }
    return value
  }
}

const reverse = (arr) => arr.reverse()

const first = (arr) => arr[0]

const toUpper = (s) => s.toUpperCase()

const f = flowRight(toUpper, first, reverse)

// 满足结合律
// const f = flowRight(flowRight(toUpper, first), reverse)
console.log(f(['hello', 'world', 'john']))
```

## loadsh/fp

- loadsh的fp模块提供了实用的对 **函数式编程友好** 的方法
- 提供了不可变 **auto-curried iteratee-first data-list** 的方法

```js
// loadsh 模块
const _ = require('lodash')

_.map(['a', 'b', 'c'], _.toUpper)
_.map(['a', 'b', 'c'])

// loadsh/fp 模块

const fp = require('lodash/fp')

fp.map(fp.toUpper,['a','b','c'])
fp.map(fp.toUpper)(['a','b','c'])

fp.split(' ', 'Hello World')
fp.split(' ')('Hello World')

```

## Point Free

> 我们可以把数据处理的过程定义成与数据无关的合成预算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数

- 不需要指明处理的数据
- 只需要合成运算过程
- 需要定义一些辅助的基本运算函数

```js
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))
```

## Functor(函子)

- 容器:包含值和值的变形关系(这个变形关系就是函数)
- 函子:是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理(变形关系)

```js
class Container {
  static of(value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}

let r = Container.of(5)
  .map((x) => x + 2)
  .map((x) => x * x)
```

## JSON.stringify(value\[, replacer \[, space]])

- value 将要序列化成 一个 JSON 字符串的值。
- replacer 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
- space 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

```js
const o = {
  a: function() {},
  b: undefined,
  c: null
}
JSON.stringify(o) // "{"c":null}"
```

## ES MODULES基本特性

```html
<script type="module"></script>
```

- 自动采用严格模式
- 每个ESM模块都是单独的私有作用域
- ESM是通过CORS去请求外部JS模块的
- ESM的script标签会延迟执行脚本，类似于添加defer属性

## 关于export

```js
const name = 'levi'
const age = 18
// 此处不能误解为导出对象字面量，而这是一个固定的语法
// 因此导入的时候也是固定语法， 不能解构
export { name, age }
// 而如果要导出对象字面量则需要加default
export default { name, age }
```

```js
// a.js
// 导出的是引用，这里和node的commonjs不一样
var name = 'jack'
export { name }
setTimeout(function() {
  name = 'levi'
}, 1000)
```

```js
import { name } from './a.js'
name = 'tom' // 这里会报错，因为模块是只读的
console.log(name) // jack
setTimeout(function() {
  console.log(name) // levi
}, 1500)

```

## 关于ESM和CJS

### 区别

- ESM可以导入commonJs模块
- commonJs不可以导入ESM
- commonJs始终只会导出一个默认成员

### ESM中如何获取`__filename` 和 `__dirname`

```js
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename, __dirname)
```

### ESM如何获取`package.json`，或者说如何获取`json`文件

```js
import fse from 'fs-extra'

const pkg = fse.readJsonSync(path.resolve(__dirname, './package.json'))
console.log(pkg.version)
```

## nodejs中`cjs`和`esm`混合开发

### 为什么会存在`cjs`和`esm`混合开发？

`npm`模块有的使用`cjs`有的使用`esm`，导致`esm`和`cjs`混合开发成为`node`项目必须考虑的问题

### cjs中如何运行esm的模块

```js
const cjs = require('cjs')
import('esm').then(res => res.default()) // [!code hl]
```

```js
(async function() {
  const cjs = require('cjs')
  const esm = await import('esm') // [!code hl]
})()
```

### esm中如何运行cjs[推荐]

可以直接使用，也就是源码要用`esm`开发

:::warning
这里注意使用`esm`的时候，导入文件要加后缀

```js
// error
import a from './a'
// ok
import a from './a.js'
```

:::

## ESNEXT

### 模板字符串的高级用法

// 可以实现多语言或者检查不安全字符，或者实现小型模板引擎

```js
const name = 'tom'
const gender = true

function myTagFunc(strings, name ,gender) {
  const sex = gender ? 'man' : 'woman'
  // console.log(strings, name, gender)
  return strings[0] + name + strings[1] + sex + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}`
```

### Symbol(最主要的作用就是为对象添加独一无二的属性标识符)

使用symbol定义私有成员，外部无法访问

```js
// a.js ==========================
const name = Symbol()
const person = {
  [name]: 'levi',
  say() {
    console.log(this[name])
  }
}
export default person
// b.js ==========================
import person from './a.js'
person.say()
```

Symbol.for

```js
console.log(
  Symbol() === Symbol(), // false
  Symbol('foo') === Symbol('foo'), // false
  Symbol.for('foo') === Symbol.for('foo') // true
)
```

Symbol.toStringTag

```js
const obj = {
  [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString()) // [object XObject]
```

Symbol类型的属性名通过`for in`、`Object.keys`、`JSON.Stringify`都获取不到

可以通过`Object.getOwnPropertySymbols`获取到

因此Symbol特别适合定义私有成员

### for of

遍历数组相比较于`forEach`，它可以通过`break`跳出循环。(`some`和`every`可以提前终止循环)

### 迭代器设计模式

```js
// 迭代器设计模式

// 场景：你我协同开发一个任务清单应用

// 我的代码 ================================

const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],
  // 普通模式
  each(callback) {
    const all = [].concat(this.life, this.learn, this.work)
    for (const item of all) {
      callback(item)
    }
  },
  // 迭代器模式
  [Symbol.iterator]() {
    const all = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next() {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}

// 你的代码 ================================
todos.each((item) => {
  console.log(item)
})

console.log('------------------------------')

for (const val of todos) {
  console.log(val)
}

```

### generator

应用1: 发号器

```js
function * createIdMaker() {
  let id = 1
  while(true) {
    yield id++
  }
}
const idMaker = createIdMaker()
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
```

应用2： 实现iterator方法

```js
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],
  [Symbol.iterator]: function *() {
    const all = [...this.life, ...this.learn, ...this.work]
    for(const item of all) {
      yield item
    }
  }
}

for(const item of todos) {
  console.log(item)
}
```

### Object转Map技巧

```js
const obj = { a: 1 }
console.log(new Map(Object.entries(obj)))
```

### padStart / padEnd

```js
const books = {
  html: 5,
  css: 16,
  javascript: 128
}

for(const [name, count] of books) {
  console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
}
// html------------|005
// css-------------|016
// javascript------|128
```

## 后端管理系统菜单树的设计

- 传给后端的时候后端需要存两个字段`checkedList`和`halfCheckedList`

```javascript
const handlePermissionSubmit = () => {
  const nodes = this.$refs.tree.getCheckedNodes()
  const halfKeys = this.$refs.tree.getHalfCheckedKeys()
  const checkedKeys = []
  const parentKeys = []
  nodes.map(node => {
  if(!node.children) {
    checkedKeys.push(node.id)
  }else {
    parentKeys.push(node.id)
  }
  const data = {
    id: this.roleId,
    permissionList: {
      checkedKeys,
      halfCheckedKeys: parentKeys.concat(halfKeys)
    }
  }
}
```

- 由于父子菜单是`check-strictly`，菜单下面有一个固定的`查看`按钮

## 性能优化

### javascript中的垃圾

- javascript内存管理是自动的
- 对象不再被引用时是垃圾
- 对象不能从根上(全局作用域)访问到时是垃圾

### 引用计数算法优点

- 发现垃圾时立即回收
- 最大限度减少程序卡顿时间

### 引用计数算法缺点

- 无法回收循环引用的对象
- 时间开销大

### 标记清除算法

- 核心思想：分标记和清除两个阶段完成
- 遍历所有对象找标记活动对象
- 遍历所有对象清除没有标记对象
- 回收相应的空间

### 标记清除算法优缺点

- 优点：相对于引用计数，解决了循环引用不能回收的问题
- 缺点：回收完的空间碎片化，不能让空间最大化使用

### 标记整理算法原理

- 标记整理可以看做是标记清除的增强
- 标记阶段的操作和标记清除算法一致
- 清除阶段会先执行整理，移动对象位置

## 关于JSON

> 理解JSON最关键的一点是要把它理解为一种数据格式，而不是编程语言

- JSON不可以设置`undefined`和`函数`
- 同一个对象中不允许出现两个相同的属性
- 对象和数组通常作为数组的顶级结构，然而直接写`5`或者`'Hello World!'`也是有效的JSON

  - JSON.stringify()

    - 第二个参数可以是数组或者函数，用来过滤属性，函数的话我们可以称之为替代函数(replacer)
    - 第三个参数可以控制字符串缩进，最大值是10(10个单位缩进)，也可以直接给字符串，同样最多可以给长度为10的字符串，多了自动截断

  - toJSON()方法

    - 有时候，对象需要在JSON.stringify()上自定义JSON序列化，可以使用此方法
    - 注意此方法不能使用箭头函数

  - JSON.parse()
    - 第二个参数可以是个函数，我们可以把它称之为还原函数(reviver)，与替代函数对应

## `MutationObserver` 和 `ResizeObserver`

- `ResizeObserver` 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。
- `MutationObserver` 和 `ResizeObserver` 接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。

## js使用类型声明获得提示

> [js-doc](http://shouce.jb51.net/jsdoc/tags-type.html)

```js
/** @type {import('caz').Template} */
module.exports = {
  name: 'sct',
  version: '0.1.0'
}
```

## 关于Reflect

```js
const p1 = {
  lastName: '张',
  firstName: '三',
  get fullName() {
    return this.lastName + this.firstName
  }
}

const p2 = {
  lastName: '李',
  firstName: '四',
  get fullName() {
    return this.lastName + this.firstName
  }
}

console.log(p1.fullName) // 张三
console.log(Reflect.get(p1, 'fullName')) // 张三
console.log(Reflect.get(p1, 'fullName', p2)) // 李四
```

由此可以看出，`Reflect.get`中，如果`target`对象中指定了`getter`，如上文的`get fullName()`， `receiver`则为`getter`调用时的`this`值

```js
const p1 = {
  lastName: '张',
  firstName: '三',
  get fullName() {
    return this.lastName + this.firstName
  }
}

const proxy = new Proxy(p1, {
  get(target, key, receiver) {
    console.log('getter行为被触发')
    return target[key]
  }
})

console.log(proxy.fullName) // 张三
```

这里可以看到`getter`行为被触发执行了**1**次，但是实际上，proxy.fullName触发了`getter`，
`fullName`中的`this`如果指向的是`proxy`的话，应该会执行**3**次才对

这里问题的关键就在于`this`的问题

所以我们一般会看到如下写法

```js
const p1 = {
  lastName: '张',
  firstName: '三',
  get fullName() {
    return this.lastName + this.firstName
  }
}

const proxy = new Proxy(p1, {
  get(target, key, receiver) {
    console.log('getter行为被触发')
    return Reflect.get(target, key, receiver)
  }
})

console.log(proxy.fullName) // 张三
```

这里通过`Reflect.get`的第三个参数，将**被代理对象**中`getter`方法的`this`指向转为了**代理对象**

总结来说，当我们希望监听代理对象的`getter`和`setter`时，**不应该**直接使用`target[key]`，因为它在某些时候，可能是不可靠的，如上例

利用`Reflect`使用`receiver`作为`this`，便可以达到预期的结果

## 关于WeakMap

- 弱引用： 不会影响垃圾回收机制。 即：`WeakMap`的key**不再存在任何引用时**，会直接被回收
- 强引用：会影响垃圾回收机制。 存在强引用的对象`永远不会被回收`

```js
let obj = {
  name: '张三'
}

const map = new Map()

map.set(obj, 'value')

obj = null

console.log(map)
```

这时我们发现，对于`obj`的引用置为`null`，也就是不再有着对于`obj`的引用，`map`中依然保存着`obj`对象，
这便是`强引用`影响了垃圾回收

```js
let obj = {
  name: '张三'
}

const map = new WeakMap()

map.set(obj, 'value')

obj = null

console.log(map)
```

我们发现，这时候打印`map`并没有任何内容，也就是`obj`被回收了，也就是`弱引用`不影响垃圾回收

::: tip
Vue中就是使用`WeakMap`将被代理对象存起来，一旦被代理对象被清空，`proxy`对象也就没有存在的价值了
:::

## 强制将函数转换为构造函数

```js
function Interface(options) {
  if(!this instanceof Interface) {
    return new Interface(options)
  }
  // ....
}
```

## class私有属性

```js
class Person {
  #name = 'Levi'
  getName() {
    return this.#name
  }
}

const p = new Person()
console.log(p.getName()) // Levi
console.log(p.#name) // Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```
