const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入模块联邦插件
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: 7080,
    open: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      // 配置导入模块映射
      remotes: {
        // 字符串"products"和被导入模块的name属性对应
        // 属性products是映射别名，是在当前应用中导入该模块时使用的名字
        products: "products@http://localhost:7081/remoteEntry.js",
        cart: "cart@http://localhost:7082/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}