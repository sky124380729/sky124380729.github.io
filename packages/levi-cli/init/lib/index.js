import Command from '@levi-cli/command'
import { log } from '@levi-cli/utils'

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

export default Init
