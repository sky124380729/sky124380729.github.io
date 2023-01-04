# Javascript

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
    if(cache[n] !== undefined) return cache[n]
    if(n === 1 || n === 2) return (cache[n] = 1)
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
