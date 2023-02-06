const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入模块联邦插件
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: 7082,
    open: true
  },
  plugins: [
    // 将cart自身当做模块暴露出去
    new ModuleFederationPlugin({
      // 模块文件名称，其他应用引入当前模块时需要加载的文件的名字
      filename:'remoteEntry.js',
      // 模块名称，具有唯一性，相当于single-spa中的组织名称
      // 目前标注@deprecated，后续需要查查文档
      name: 'cart',
      // 当前导出模块的内容
      exposes: {
        // react17+要加上./
        "./index": "./src/bootstrap"
      },
      // 如果多个子应用都使用了相同的包，为了不让他们重复加载，可以将他们设置为共享模块
      shared: {
        faker: {
          // 如果各个子应用faker版本不一致的情况下使用高版本，低版本的会报出警告
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}