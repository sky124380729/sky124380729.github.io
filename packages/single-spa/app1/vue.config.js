const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: 'app1',
      libraryTarget: 'umd',
      globalObject: 'window'
    },
    devServer: {
      port: 10801,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
})
