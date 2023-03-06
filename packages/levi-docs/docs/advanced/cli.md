# 关于CLI

- 命令行UI交互标准[ANSI escape code](https://handwiki.org/wiki/ANSI_escape_code)

```js
// 这里的 \x1B[ 是固定的，后面内容在 https://handwiki.org/wiki/ANSI_escape_code 查询
// 这里的 m 代表渲染属性
// %s 用来传递一个参数，例如下面的 your name 就是替换 %s 的
// 这里的 \x1B[0m 是为了恢复终端显示颜色的
console.log('\x1B[31m%s\x1B[0m', 'Levi')
```

- shell、bash、cli关系图

  ![image](/assets/imgs/CLI.png)

- 直接执行`vue create vue-test-app`的原理

  ![image](/assets/imgs/CLI2.jpg)

  - 在终端输入 `vue create vue-test-app`
  - 终端解析出`vue`命令
  - 终端在环境变量中找到`vue`命令
  - 终端根据`vue`命令链接到实际文件`vue.js`
  - 终端利用`node`执行`vue.js`
  - `vue.js`解析`command/options`
  - `vue.js`执行`command`
  - 执行完毕，退出执行

- 为什么`vue`命令可以直接执行`vue.js`文件，而不是使用`node vue.js`

  原因就是以下的第一行，告诉操作系统在环境变量中找`node`命令，操作系统通过`node`命令去执行文件

  ```js
  #!/usr/bin/env node

  console.log(1)
  ```

- 脚手架的本质就是客户端，这里讲的客户端并不是指的我们编写的代码本身是客户端，而是`node`是客户端

- 软连接是可以嵌套的，因此比如不想使用`vue`命令，可以再创建一个`vue2`软连接指向`vue`

## 如何本地调试脚手架

- 方式一：比如`cli`目录下有个脚手架项目叫做`levi-cli-test`，那么在`cli`目录下执行`npm install -g levi-cli-test`，`npm`会自动将`软链`指向本地目录
- 方式二：直接在`levi-cli-test`项目下执行`npm link`

## yargs使用示例

::: code-group
<<< @/../../cli/levi-cli-test/bin/index.js
:::
