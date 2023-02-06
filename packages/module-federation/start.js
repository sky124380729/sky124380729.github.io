const childProcess = require('child_process')
const path = require('path')

const filePath = {
  container: path.join(__dirname, './container'),
  cart: path.join(__dirname, './cart'),
  produts: path.join(__dirname, './products')
}

// cd 子应用的目录 npm start 启动项目

function runChild() {
  Object.values(filePath).forEach(item => {
    childProcess.spawn(`cd ${item} && npm start`,{ stdio: "inherit", shell: true })
  })
}

runChild()