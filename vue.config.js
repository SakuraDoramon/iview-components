const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'assets' + new Date().getTime(),
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
        .pre()
        .exclude
          .add(/node_modules/)
          .add(require('path').dirname(require.resolve('@vue/cli-service')))
          .end()
      .test(/\.(vue|(j|t)sx?)$/)
      .use('eslint-loader')
        .loader('eslint-loader')
        .options({
        })
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  // 打包时不生成.map文件
  productionSourceMap: true
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // ,devServer: {
  //   proxy: 'http://192.168.1.142:8380'
  // }
}
