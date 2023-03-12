import path from 'node:path'
import chalk from 'chalk'
import semver from 'semver'
import { program } from 'commander'
import { dirname } from 'dirname-filename-esm'
import fse from 'fs-extra'
import { log } from '@levi-cli/utils'

// 以下步骤都是为了读取package.json
const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJsonSync(pkgPath)

// 允许的node最低版本
const LOWEST_NODE_VERSION = '14.0.0'

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

export default function createCLI() {
  log.success('version', pkg.version)

  // 脚手架注册
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开始debug模式', false)
    .hook('preAction', preAction)

  // 监听debug命令的状态
  program.on('option:debug', function () {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode!')
    }
  })

  // 监听未知的命令
  program.on('command:*', function (obj) {
    log.error('未知的命令：' + obj[0])
  })

  return program
}
