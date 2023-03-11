#!/usr/bin/env node

const importLocal = require('import-local')
const { log } = require('@levi-cli/utils')
const entry = require('../lib/index')

// 判断是否能加载到本地版本的当前文件，如果可以则使用本地版本的
// 比如全局和本地都有tsc这个命令，优先使用本地的
if (importLocal(__filename)) {
  log.info('cli', '使用本地 levi 版本 ')
} else {
  entry(process.argv.slice(2))
}
