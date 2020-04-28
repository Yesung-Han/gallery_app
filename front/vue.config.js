const path = require('path')

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/': {
        target: 'http://localhost:8001/',
        changeOrigin: true,
        pathRewrite:{
          "^/": '/'
        }
      },
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}