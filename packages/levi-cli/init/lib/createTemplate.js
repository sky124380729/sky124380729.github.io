import path from 'node:path'
import { homedir } from 'node:os' // 主目录，兼容windows和mac
import { log, makeList, makeInput, getLatestVersion } from '@levi-cli/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE = [
  { name: 'vue3项目模板', value: 'template-vue3', npmName: '@imooc.com/template-vue3', version: '1.0.0' },
  { name: 'react18项目模板', value: 'template-react18', npmName: '@imooc.com/template-react18', version: '1.0.0' }
]
const ADD_TYPE = [
  { name: '项目', value: ADD_TYPE_PROJECT },
  { name: '页面', value: ADD_TYPE_PAGE }
]
// 缓存目录
const TEMP_HOME = '.cli-levi'

// 获取创建类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT
  })
}

// 获取项目名称
function getAddName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: '',
    validate(v) {
      return v.length > 0 ? true : '项目名称必须输入'
    }
  })
}

// 选择项目模板
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板'
  })
}

// 安装缓存目录
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

export default async function createTemplate(name, options) {
  const { type = null, template = null } = options
  let addType // 项目类型
  let addName // 项目名称
  let selectedTemplate // 项目模板
  if (type) {
    addType = type
  } else {
    addType = await getAddType()
  }
  log.verbose('addType', addType)
  if (addType === ADD_TYPE_PROJECT) {
    if (name) {
      addName = name
    } else {
      addName = await getAddName()
    }
    log.verbose('addName', addName)
    if (template) {
      selectedTemplate = ADD_TEMPLATE.find((tp) => tp.value === template)
      if (!selectedTemplate) {
        throw new Error(`项目模板 ${template} 不存在`)
      }
    } else {
      const addTemplate = await getAddTemplate()
      selectedTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate)
      log.verbose('addTemplate', addTemplate)
    }
    log.verbose('selectedTemplate', selectedTemplate)
    // 尝试获取最新版本号
    const latestVersion = await getLatestVersion(selectedTemplate.npmName)
    log.verbose('latestVersion', latestVersion)
    selectedTemplate.version = latestVersion
    const targetPath = makeTargetPath()
    return {
      type: addType,
      name: addName,
      template: selectedTemplate,
      targetPath
    }
  } else {
    throw new Error(`创建的项目类型 ${addType} 不支持`)
  }
}
