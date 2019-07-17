module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter'
    },
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/demo2/': {
          target: 'http://127.0.0.1:3000',
          pathRewrite: {
            '^/demo2/': '/'
          }
        }
      }
    }
  }
}
