#!/usr/bin/env node

import importLocal from 'import-local'
import { log } from '@levi-cli/utils'
import { filename } from 'dirname-filename-esm'
import entry from '../lib/index.js'

// 判断是否能加载到本地版本的当前文件，如果可以则使用本地版本的
// 比如全局和本地都有tsc这个命令，优先使用本地的
const __filename = filename(import.meta)
if (importLocal(__filename)) {
  log.info('cli', '使用本地 levi 版本 ')
} else {
  entry(process.argv.slice(2))
}
