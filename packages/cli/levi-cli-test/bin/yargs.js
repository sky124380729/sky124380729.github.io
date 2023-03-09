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
