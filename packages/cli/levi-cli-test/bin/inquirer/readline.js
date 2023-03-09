const readline = require('readline')

const rl = readline.createInterface({
  // 指定输入为系统输入流
  input: process.stdin,
  // 指定输出为系统输出流
  output: process.stdout
})

rl.question('your name:', (answer) => {
  console.log(answer)
  rl.close()
})
