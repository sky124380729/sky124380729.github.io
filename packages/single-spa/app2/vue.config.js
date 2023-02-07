const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: 'app2',
      libraryTarget: 'umd',
      globalObject: 'window'
    },
    devServer: {
      port: 10802,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
})
