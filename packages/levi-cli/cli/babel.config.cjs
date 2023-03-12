/**
 * 此文件是为了能让jest支持esm
 * jest默认集成了babel，所以可以直接添加该babel.config.js文件
 * 我们在异步环境下使用必须让babel.config.js改名成babel.config.cjs
 */

module.exports = {
  presets: [['@babel/preset-env']]
}
