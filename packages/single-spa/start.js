const childProcess = require('child_process')
const path = require('path')

const filePath = {
  container: path.join(__dirname, './container'),
  app1: path.join(__dirname, './app1'),
  app2: path.join(__dirname, './app2')
}

// cd 子应用的目录 npm start 启动项目

function runChild() {
  Object.values(filePath).forEach((item) => {
    childProcess.spawn(`cd ${item} && npm run dev`, { stdio: 'inherit', shell: true })
  })
}

runChild()
