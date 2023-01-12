# Rollup

[[toc]]

## 基本配置

::: code-group

```js [rollup.config.js]
import { defineConfig } from 'rollup'
export default defineConfig({
  input: "./src/main.js",
  output: [
    {
      format: "umd",
      name: "Levi",
      file: "dist/levi.umd.js"
    },
    {
      format: "cjs",
      file: "dist/levi.cjs.js"
    },
    {
      format: "es",
      file: "dist/levi.es.js"
    },
    {
      format: "iife",
      file: "dist/levi.browser.js"
    },
  ]
})
```

:::

## 项目级配置

::: code-group

```js [rollup.config.js]
import { defineConfig } from 'rollup'
// rollup官方插件
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import image from '@rollup/plugin-image'
// import strip from '@rollup/plugin-strip'
// 社区插件
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  // rollup默认是打包esm文件的，如果源码中使用到了cjs，需要使用此插件。
  // 注意自己写的代码必须使用esm，也就是导入的时候还是需要使用esm的方式导入
  commonjs(),
  // image插件
  image(),
  // 去除全局的console.log，不过要搞清楚它的删除机制，不然容易出错，所以不是很建议使用
  // 建议通过eslint来控制console.log而不是使用该插件
  // strip(),
  // 如果我们打包的库需要用到node_modules里面的代码，需要安装此插件
  resolve(),
  // 对typescript的支持，注意此时需要同时安装typescript和tslib这两个库
  // 这里如果项目根目录有ts.config.json的话，那么会被这个插件所引用，也就是会自动生效，webpack同理
  // 其实这边也可以使用babel来支持ts
  // 一般情况下，需要类型校验就用typescript这个插件，不需要的话就用babel提供的typescript语法支持
  // 顺便一提，rollup-plugin-typescript2这个库用的也比较多，其他的和上面讲述的一致，
  // 与官方的不同时会输出typescript类型错误相关信息，比官方的功能要稍微多一些
  // vue-next用的是rollup-plugin-typescript2
  typescript(),
  // 由于打包进去的vue源码用到了process.env相关变量，所以要用到replace这个插件，在webpack中是使用DefinePlugin来配置
  // 这里如果直接使用production，rollup会把它当做变量来寻找，因此要用stringify来给它转成字符串
  replace({
    preventAssignment: true,
    // 'process.env.NODE_ENV': JSON.stringify('production')
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  // 转换es6代码用
  // 这里注意要安装@babel/core和预设集@babel/preset-env，并创建babel.config.js才生效
  babel({
    // 这里不填会给出一个警告(默认就是bundled)
    // 转换es6语法的时候会有很多辅助函数，这里配置bundled的意思是只生成一个辅助函数
    babelHelpers: "bundled"
  }),
  // 处理css，社区对于rollup一般直接使用postcss
  postcss(),
  // 处理vue文件，注意默认安装此插件是支持vue3的，要指定低版本安装，这里使用的是4.6.1
  // 这里其实还依赖vue-template-compiler
  vue(),
]

if(isProduction) {
  plugins.push(
    // 代码压缩工具，这里的rollup-plugin-terser实际上就是terser库对于rollup的支持，本质还是terser
    terser()
  )
} else {
  const devPlugins = [
    // 开启本地服务
    serve({
      open: true, // 是否打开浏览器
      port: 6543, // 监听端口号
      contentBase: '.' // 服务于哪个文件夹，.表示当前文件夹。该配置和webpack有所区别
    }),
    // 热更新，和webpack的hmr有所区别，这里需要配置rollup的--watch属性，参考pkg.json的serve命令
    livereload()
  ]
  plugins.push(...devPlugins)
}

export default defineConfig({
  input: "./src/main.js",
  output: [
    {
      format: "umd",
      name: "Levi",
      file: "dist/levi.umd.js",
      // 需要和external配合使用，要告诉rollup排除的包对应的全局变量叫什么
      globals: {
        "lodash": "_"
      }
    }
  ],
  // watch: {},
  // 打包的时候需要排除的包
  external: ["lodash"],
  plugins
})

:::
