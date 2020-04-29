const path = require('path')

let resDir = ""

if(process.env.DOCKER_COMPOSE){
  resDir = process.env.FRONT_BUILD_DIR;
}
else{
  resDir = path.resolve(__dirname, "./public/build");
}

module.exports = {
  outputDir : resDir,
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