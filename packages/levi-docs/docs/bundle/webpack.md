# Webpack

[[toc]]

## Webpack配置参考

::: code-group

```js [webpack.config.js]
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    // 默认开启，如果不开启的话会刷新整个页面
    hot: true,
    port: 4566,
    // 开启gzip压缩
    compress: true,
    // 重定向到index.html
    historyApiFallback: true,
    proxy: {
      target: '/api',
      // pathRewrite:
      changeOrigin: true
    }
  },
  resolve: {
    alias: {
      '@': "src/",
      /**
       * 由于我们使用了打包工具，所以源码编译的事情交给webpack就好，我们不需要引入完整版的vue，这样可以减小打包体积
       * 只需要引入运行时的vue，即不需要compiler
       * 我看之前的文章说还需要添加vue/compiler-sfc这个plugin，目前我没添加该插件也能运行
       */
      // vue2 'vue/dist/vue.runtime.esm.js'
      // vue3 'vue/dist/vue.runtime.esm-bundler.js'
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    // 如果是文件夹，默认会去寻找index文件，这里默认值就是index，只是给个演示
    mainFiles: ['index'],
    extensions: ['.wasm','.ts', '.mjs', '.js', '.json']
  },
  module: {
    rules: [
      /* {
        test: /\.m?js/,
        use: {
          loader: 'babel-loader',
          // 使用babel.config.js来配置options
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }, */
      // 使用babel.config.js代替上面的配置
      {
        test: /\.m?js/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        use: [
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')
                ]
              }
            }

          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')
                ]
              }
            }

          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        // webpack 5的语法，不再需要file-loader，url-loader，raw-loader
        // type类型有asset/resouce对应file-loader,asset/inline对应url-loader,asset/source对应raw-loader
        // 直接设置asset在导出data URI和单独文件资源之间自动选择，这里演示一下
        type: 'asset',
        generator: {
          // 自定义文件路径和文件名，中括号使用的是placeholder语法
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          // 定义转换成data URL的范围，100K以下导出data URI，以上则原样导出资源
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      // 目前经过测试，不需要下面的代码字体也能生效
      // {
      //   test: /\.(woff2?|ept|ttf)$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: "font/[name].[hash:6][ext]"
      //   }
      // }
      /* ========== For Vue ========== */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins:[
    // 每次打包的时候先清空之前构建的目录，如(dist)
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      // 设置模板的地址
      template: './public/index.html'
    }),
    // 定义静态变量，这里注意写法
    new DefinePlugin({
      BASE_URL: '"./"',
      /* ========== For Vue ========== */
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    // 把public目录下的资源直接复制到dist中
    new CopyWebpackPlugin({
      patterns: [
        {
          // 要复制的目录
          from: 'public',
          // 复制到哪个目录
          to: './public',
          globOptions: {
            // 要忽略的文件/夹
            ignore: [
              '**/.DS_Store',
              // 这里因为我们使用了html-webpack-plugin，因此这里拷贝的时候要忽略掉
              '**/index.html'
            ]
          }
        }
      ]
    }),
    /* ========== For Vue ========== */
    new VueLoaderPlugin()
  ]
}
module.exports = config
```

:::
