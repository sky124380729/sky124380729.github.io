import path from 'node:path'
import { execa } from 'execa'

const CLI = path.join(__dirname, '../bin/cli.js')
// eslint-disable-next-line prettier/prettier
const bin = () => (...args) => execa(CLI, args)

// 测试运行错误的命令
test('run error command', async () => {
  // 这里拿到错误输出的文本
  const { stderr } = await bin()('iii')
  expect(stderr).toContain('未知的命令：iii')
})

// 测试help命令不报错
test('should not throw error when use --help', async () => {
  let error = null
  try {
    await bin()('--help')
  } catch (e) {
    error = e
  }
  expect(error).toBe(null)
})

// 测试version正确显示
test('show correct version', async () => {
  // 这里拿到正常输入的文本
  const { stdout } = await bin()('-V')
  expect(stdout).toContain(require('../package.json').version)
})

// 测试是否正确开启debug模式
test('open debug mode', async () => {
  let error = null
  try {
    await bin()('--debug')
  } catch (e) {
    error = e
  }
  expect(error.message).toContain('launch debug mode')
})
