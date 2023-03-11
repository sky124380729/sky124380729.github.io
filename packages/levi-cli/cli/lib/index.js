const commander = require('commander')
const semver = require('semver')
const chalk = require('chalk')
const createInitCommand = require('@levi-cli/init')
const { log, isDebug } = require('@levi-cli/utils')
const { program } = commander
const pkg = require('../package.json')

// 允许的node最低版本
const LOWEST_NODE_VERSION = '24.0.0'

function checkNodeVersion() {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red(`levi 需要安装 ${LOWEST_NODE_VERSION} 以上版本的Node.js`))
  }
}

function preAction() {
  // 检查node版本
  checkNodeVersion()
}

// 全局做异常监听，这样控制台就不会打印整个错误栈了
process.on('uncaughtException', (e) => {
  if (isDebug()) {
    console.log(e)
  } else {
    console.log(e.message)
  }
})

module.exports = function () {
  log.success('version', pkg.version)

  // 脚手架注册
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开始debug模式', false)
    .hook('preAction', preAction)

  // 注册command
  createInitCommand(program)

  program.parse(process.argv)
}
