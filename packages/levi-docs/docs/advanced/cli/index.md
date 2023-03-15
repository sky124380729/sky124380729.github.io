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

```js
#!/usr/bin/env node

const yargs = require('yargs/yargs')

const { hideBin } = require('yargs/helpers')

const dedent = require('dedent')

const arg = hideBin(process.argv)

const cli = yargs(arg)

cli
  .usage('Usage: levi [command] <options>')
  // 提示需要至少一个命令
  .demandCommand(1, 'A command i required. Pass --help to see all available commands')
  // 这里比如我有一个list命令，但是不小心输错了输成了lis，控制台会给出提示是否是使用list命令
  .recommendCommands()
  // 严格模式下，输错命令会报错
  .strict()
  // 这里其实就是定制自己的错误信息
  .fail((err, msg) => {
    console.error(err)
  })
  .alias('h', 'help')
  .alias('v', 'version')
  // cli.terminalWidth是控制台的宽度，这里实际上就是让提示文本宽度等于控制台宽度
  .wrap(cli.terminalWidth())
  // 自定义结尾的话语
  .epilogue(
    // dedent就是去掉缩进
    dedent`
      When a command fails, all logs are written to levi-debug.log in the current working directory,

      For more information, find our manual at https://github.com/sky124380729/sky124380729.github.io
    `
  )
  // 所有命令都可以用的参数
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd'
    }
  })
  // 逐个定义的参数，跟上面不同就是传递参数方式不同
  .option('registry', {
    type: 'string',
    describe: 'Define global registry',
    alias: 'r'
    // 可以隐藏，一般是开发者调试使用
    // hidden: true
  })
  // group可以将我们自己定义的的一些命令聚合起来
  .group(['debug'], 'Dev Options:')
  .group(['registry'], 'Extra Options:')
  // 激动人心的时刻到了
  // 这里就是我们定义的具体的命令
  .command(
    'init [name]',
    'Do init a project',
    (yargs) => {
      yargs.option('name', {
        type: 'string',
        describe: 'Name of a project',
        alias: 'n'
      })
    },
    (argv) => {
      console.log(argv)
    }
  )
  // 和以上是一样的
  .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'List local packages',
    builder: (yargs) => {
      console.log(yargs)
    },
    handler: (argv) => {
      console.log(argv)
    }
  }).argv

console.log('\x1B[2B%s', 'Levi')
```

## readline使用

```js
const readline = require('readline')

const rl = readline.createInterface({
  // 指定输入为系统输入流
  input: process.stdin,
  // 指定输出为系统输出流
  output: process.stdout
})

rl.question('your name:', (answer) => {
  console.log(answer)
  rl.close()
})
```

## 基础脚手架实现

<div class="filename">levi-cli/cli</div>

:::code-group
<<< @/../../levi-cli/cli/bin/cli.js
<<< @/../../levi-cli/cli/lib/index.js
<<< @/../../levi-cli/cli/lib/createCLI.js
<<< @/../../levi-cli/cli/lib/exception.js
:::

<div class="filename">levi-cli/command</div>

:::code-group
<<< @/../../levi-cli/command/lib/index.js
:::

<div class="filename">levi-cli/init</div>

:::code-group
<<< @/../../levi-cli/init/lib/index.js
<<< @/../../levi-cli/init/lib/createTemplate.js
<<< @/../../levi-cli/init/lib/downloadTemplate.js
<<< @/../../levi-cli/init/lib/installTemplate.js
:::

<div class="filename">levi-cli/utils</div>

:::code-group
<<< @/../../levi-cli/utils/lib/index.js
<<< @/../../levi-cli/utils/lib/inquirer.js
<<< @/../../levi-cli/utils/lib/isDebug.js
<<< @/../../levi-cli/utils/lib/log.js
<<< @/../../levi-cli/utils/lib/npm.js
<<< @/../../levi-cli/utils/lib/request.js
:::
