import createInitCommand from '@levi-cli/init'
import createCLI from './createCLI.js'
import './exception.js'

export default function () {
  const program = createCLI()

  // 注册command
  createInitCommand(program)

  program.parse(process.argv)
}
