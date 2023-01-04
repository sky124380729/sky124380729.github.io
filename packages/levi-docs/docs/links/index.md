# Links

## 优秀的开源库

## 优秀的npm包

- 解析参数选项：[minimist](https://www.npmjs.com/package/minimist)

```js
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
```

```bash
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

```bash
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

## 优秀的网站

- 算法可视化：[visualgo](https://visualgo.net/zh)
- 阴影样式示例：[box-shadow-demos](https://getcssscan.com/css-box-shadow-examples)

## 优秀的博客
