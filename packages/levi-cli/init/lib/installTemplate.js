import path from 'node:path'
import fse from 'fs-extra'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'
import { log } from '@levi-cli/utils'

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template)
  const fileList = fse.readdirSync(originFile)
  const spinner = ora('正在拷贝模板文件...').start()
  fileList.map((file) => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  spinner.stop()
  log.success('模板拷贝成功')
}

export default function installTemplate(selectedTemplate, opts) {
  const { force = false } = opts
  const { targetPath, name, template } = selectedTemplate
  const rootDir = process.cwd()
  // 确保目录存在，不存在就创建它
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录下已存在 ${installDir} 文件夹`)
      return
    } else {
      // 安装目录已经存在，并且force选项打开了，则移除之前的安装目录
      fse.removeSync(installDir)
      // 确保目录存在，不存在就创建它
      fse.ensureDirSync(installDir)
    }
  } else {
    fse.ensureDirSync(installDir)
  }
  copyFile(targetPath, template, installDir)
}
