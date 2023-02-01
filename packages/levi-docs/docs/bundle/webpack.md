# Webpack

[[toc]]

## 认识Webpack

webpack is a `static module bundler` for `modern` JavaScript applications.

事实上随着前端的快速发展，目前前端的开发已经变的越来越复杂了

- 比如开发过程中我们需要通过`模块化`的方式来开发
- 比如也会使用一些`高级的特性来加快我们的开发效率或者安全性`，比如通过ES6+、TypeScript开发脚本逻辑，通过sass、less等方式来编写css样式代码
- 比如开发过程中，我们还希望`实时的监听文件的变化`来并且反映到浏览器上，提高开发的效率
- 比如开发完成后我们还需要`将代码进行压缩、合并以及其他相关的优化`
- etc...

但是对于很多的前端开发者来说，并不需要思考这些问题，日常的开发中根本就没有面临这些问题

- 这是因为目前前端开发我们通常都会直接使用三大框架来开发：`Vue、React、Angular`
- 但是事实上，这三大框架的创建过程我们都是`借助于脚手架（CLI）`的
- 事实上Vue-CLI、create-react-app、Angular-CLI都是基于`Webpack`来帮助我们支持模块化、less、TypeScript、打包优化等的

## Webpack的安装

webpack的安装分为两个: `webpack`,`webpack-cli`

- 执行`webpack`命令，会执行`node_modules`目录下的`.bin`目录下的`webpack`
- `webpack`在执行时是依赖`webpack-cli`的，如果没有安装就会报错
- 而`webpack-cli`中执行代码时，才是真正利用`webpack`进行编译和打包的过程
- 所以在安装`webpack`时，我们需要同时安装`webpack-cli`

  :::tip
  这里需要注意的是，第三方脚手架比如(vue-cli)事实上是没有使用`webpack-cli`的，而是类似于自己的`vue-service-cli`的东西
  :::


## 默认打包

直接在目录下运行`webpack`命令，如果没有`src/index.js`，会报错，成功的话会生成一个`dist`文件夹，里面的代码被压缩和丑化了，但是其中引入存在`ES6`语法，比如箭头函数等，这是因为默认情况下
`webpack`并不清楚我们打包后的文件是否要转换`ES5`，后续需要我们通过`babel`进行转换和设置

当然，我们可以通过配置来指定入口，出口，指定配置文件等

```bash
npx webpack --entry ./src/main.js --output-path ./build --config wk.config.js
```

## webpakc-loader

### loader是什么？

- loader可以用于对`模块的源代码`进行转换
- 我们可以将`css文件看成一个模块`，我们是`通过import来加载这个模块`的
- 在加载这个模块时，`webpack`其实并不知道如何对其进行加载，我们必须指定对应的`loader`来完成这个功能

### 如何使用loader

- 内联方式（使用较少，因为不方便管理）

  ```js
  import 'css-loader!../css/style.css'
  ```

- CLI方式（webpack5中不再使用）
- 配置方式

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
  externals: {
    // 如果使用 webpack 这样的模块捆绑包，这可能会导致 Vue 的源代码绑定到插件中，
    // 而且通常情况下，这并不是你所期望的，防止这种情况发生的一种常见做法是配置模块绑定器以将Vue从最终捆绑中排除
    vue: 'Vue'
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
