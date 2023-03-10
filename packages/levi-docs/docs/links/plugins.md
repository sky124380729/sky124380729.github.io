# Plugins

> 收集一些优秀的插件/npm包

[[toc]]

## [minimist](https://www.npmjs.com/package/minimist) -> 解析参数选项

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

## [nanoid](https://www.npmjs.com/package/nanoid) -> 比uuid更轻量的nanoid

```js
import { nanoid } from 'nanoid'
model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
```

## [ora](https://www.npmjs.com/package/ora) -> 终端loading显示

![image](/assets/imgs/ora.svg)

```js
import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';
}, 1000);
```

## [bl](https://www.npmjs.com/package/bl) -> 输入输出流控制

```js
import { BufferListStream } from 'bl'

const bl = new BufferListStream()
bl.append(Buffer.from('abcd'))
bl.append(Buffer.form('efgh'))

console.log(bl.length)
console.log(bl.toString()) // 输出流
```

::: tip 使用场景
比如执行某个命令时阻止控制台输入，命令程序执行完毕之后将输入的流再输出到控制台
:::

## [mongoose](https://www.npmjs.com/package/mongoose) -> node.js的MongoDB库

> Mongoose为模型提供了一种直接的，基于scheme结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

## [plop](https://www.npmjs.com/package/plop) -> 微型生成器框架

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

## [markdown it](https://github.com/markdown-it/markdown-it) -> markdown转html

```js
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

## [jsap](https://github.com/greensock/GSAP) -> JS动画库

```js
gsap.to('#logo', { duration: 1, x: 800 })
const tl = gsap.timeline()
tl.to('.circs', { rotation: 180, opacity: 1, stagger: 0.2 })
tl.to('.words', { duration: 1, scale: 1, opacity: 1 })
```

## [browser-sync](https://www.npmjs.com/package/browser-sync) -> 多浏览器同步

![browser-sync](/assets/imgs/browser-sync.gif)

## [driver.js](https://www.npmjs.com/package/driver.js) -> 新手引导插件

![driver.js](/assets/imgs/driver-js.png)

## [storybook](https://github.com/storybookjs/storybook) -> 故事书

![storybook](/assets/imgs/storybook.gif)

## [classnames](https://www.npmjs.com/package/classnames) -> 创建类名的函数

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

## [xgplayer](https://www.npmjs.com/package/xgplayer) -> 视频播放插件

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

## [mirror-config-china](https://www.npmjs.com/package/mirror-config-china) -> 下载比较慢的包的镜像

> 为中国内地的Node.js开发者准备的镜像配置，大大提高node模块安装速度

```bash
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
# 检查是否安装成功
npm config list
```

## [print-js](https://printjs.crabbly.com/) -> 打印插件

![print-js](/assets/imgs/print-js.jpg)

## [ts-node](https://www.npmjs.com/package/ts-node) -> node环境下运行ts

```bash
# Locally in your project.
npm install -D typescript
npm install -D ts-node
```

## [dotenv](https://github.com/motdotla/dotenv) -> 读取.env文件到环境变量的process.env中

```bash
# install locally (recommended)
npm install dotenv --save
```

::: code-group

```bash [.env]
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

:::

## node热更新

### [nodemon](https://github.com/remy/nodemon)

```bash
npm install --save-dev nodemon
nodemon ./server.js localhost 8080
```

### [node-dev](https://github.com/fgnass/node-dev)

```bash
npm install --save-dev node-dev
node-dev server.js
# for typescript
npm install --save-dev ts-node
node-dev src/server.ts
```

## [plugin-dynamic-import-vars](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars) -> rollup动态导入

::: code-group

```bash
npm install @rollup/plugin-dynamic-import-vars --save-dev
```

```js [import.js]
function importLocale(locale) {
  return import(`./locales/${locale}.js`);
}
```

```js [rollup.config.js]
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

export default {
  plugins: [
    dynamicImportVars({
      // options
    })
  ]
}
```

:::

## [inquirer](https://www.npmjs.com/package/inquirer) -> 命令行常用交互

```js
import inquirer from 'inquirer'

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
```

## [import-local](https://www.npmjs.com/package/import-local) -> 脚手架优先加载本地版本

> 比如全局安装了tsc，本地项目中也有tsc，优先使用本地的，主要还是给脚手架工具开发者来使用

```js
import importLocal from 'import-local';

if (importLocal(import.meta.url)) {
  console.log('Using local version of this package');
} else {
  // Code for both global and local version here…
}
```
