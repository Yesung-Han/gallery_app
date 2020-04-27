const path = require('path')

module.exports = {
  outputDir : path.resolve(__dirname, "../../back/public/"),
  devServer: {
    historyApiFallback: true,
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