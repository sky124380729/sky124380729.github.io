const log = require('npmlog')
const isDebug = require('./isDebug')

// 调试模式下才会显示 verbose 的打印
if (isDebug()) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}

// 这里是命令行加前缀
log.heading = 'Levi'

// 新增一个级别，这里2000就是等级，这里和info是一样的
log.addLevel('success', 2000, { fg: 'white', bg: 'green', bold: true })

module.exports = log
