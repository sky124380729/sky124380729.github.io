const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'system'
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    open: true,
    // 静态资源文件夹
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包时，不需要自动引入JS文件
      inject: false,
      // 使用微前端的方式，我们需要自己加载对应的js
      template: './src/index.html'
    })
  ],
  // 添加打包排除选项，微前端中需要使用公共的React，打包时候是不需要把这些公共的包打进来的
  externals: ['react', 'react-dom', 'react-router-dom']
}
