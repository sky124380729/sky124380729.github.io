const { log } = require('@levi-cli/utils')
const Command = require('@levi-cli/command')

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    // 这里是个二位数组
    return [
      ['-f, --force', '是否强制更新', false]
      // ['-t --test', '是否是测试', false]
    ]
  }

  action(name, opts) {
    log.verbose('init', name, opts)
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

module.exports = Init
