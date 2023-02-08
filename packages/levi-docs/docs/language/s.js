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
