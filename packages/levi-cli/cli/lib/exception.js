import { isDebug, log } from '@levi-cli/utils'

function printErrorLog(e, type) {
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

// 全局做异常监听，这样控制台就不会打印整个错误栈了
process.on('uncaughtException', (e) => printErrorLog(e, 'error'))

// 监听Promise中的错误
process.on('unhandledRejection', (e) => printErrorLog(e, 'promise'))
