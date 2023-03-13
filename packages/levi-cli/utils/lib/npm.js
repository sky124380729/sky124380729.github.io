import urlJoin from 'url-join'
import axios from 'axios'
import ora from 'ora'
import log from './log.js'

function getNpmInfo(npmName) {
  // 这里用的npm源
  const registry = 'https://registry.npmjs.org/'
  // const registry = 'https://registry.npmmirror.com/'
  const url = urlJoin(registry, npmName)
  const spinner = ora('正在获取模板包的最新版本...').start()
  return axios.get(url).then((response) => {
    try {
      spinner.stop()
      return response.data
    } catch (err) {
      spinner.stop()
      return Promise.reject(err)
    }
  })
}

export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('没有 latest 版本号')
      return Promise.reject(newError('没有 latest 版本号'))
    }
    return data['dist-tags'].latest
  })
}
