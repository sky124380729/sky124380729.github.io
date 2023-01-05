# Links

## 优秀的开源项目

- 快速创建基于Ts的库：[typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)

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

- 微型生成器框架: [plop](https://www.npmjs.com/package/plop)

![plop](/assets/imgs/plop.gif)

```js
export default function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'controller name please'
    }],
    actions: [{
      type: 'add',
      path: 'src/{{name}}.js',
      templateFile: 'plop-templates/controller.hbs'
    }]
  })
};
```

- 多浏览器同步：[browser-sync](https://www.npmjs.com/package/browser-sync)

![browser-sync](/assets/imgs/browser-sync.gif)

- 新手引导插件：[driver.js](https://www.npmjs.com/package/driver.js)

![driver.js](/assets/imgs/driver-js.png)

- 故事书：[storybook](https://github.com/storybookjs/storybook)

![storybook](/assets/imgs/storybook.gif)

- 创建类名的函数：[classnames](https://www.npmjs.com/package/classnames)

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

- 视频播放插件 [西瓜播放器](https://www.npmjs.com/package/xgplayer)

```html
<div id="vs"></div>
```

```js
import Player from 'xgplayer'

const player = new Player({
  id: 'vs',
  url: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
})
```

## 优秀的网站

- 算法可视化：[visualgo](https://visualgo.net/zh)
- 阴影样式示例：[box-shadow-demos](https://getcssscan.com/css-box-shadow-examples)

## 优秀的博客
