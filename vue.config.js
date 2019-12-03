// 参考配置
// https://cli.vuejs.org/zh/config/#integrity

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 是否需要开启cdn
const IS_NEED_CDN = false
// cdn
const cdn = {
  list: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'mint-ui': 'MINT'
  },
  css: [
    'https://cdn.bootcss.com/mint-ui/2.2.13/style.min.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
    'https://cdn.bootcss.com/mint-ui/2.2.13/index.js'
  ]
}
module.exports = {
  // 根据环境变量部署应用包时的基本 URL,生产环境需要替换成打包的路径
  publicPath: IS_PROD ? '/projectName/' : '/',

  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  // When building in multi-pages mode, the webpack config will contain different plugins
  // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
  // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  // pages: {},

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,


  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: (config) => {
    if (IS_PROD) {
      const plugins = []
      plugins.push(
        // 生产模式启用gzip压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240, // 只有大小大于该值的资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
      if (IS_NEED_CDN) {
        // cdn方式引入，不打包进去
        config.externals = cdn.list        
      }
      // 合并plugins
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
      // 去除webpack性能警告
      Object.assign(config, {
        performance: {
          hints:'warning',
          //入口起点的最大体积 整数类型（以字节为单位）
          maxEntrypointSize: 50000000,
          //生成文件的最大体积 整数类型（以字节为单位 300k）
          maxAssetSize: 30000000,
          //只给出 js 文件的性能提示
          assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
          }
        }
      })
    }
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    if (IS_PROD) {
      // 代码压缩
      config.optimization.minimize(true)
      // 代码分割，如果是多页面，可以取消 chunks，每个页面只对应一个单独的 JS / CSS
      config.optimization.splitChunks({
        chunks: 'all',
        // 可以配置具体规则
        cacheGroups: {}
      })
      if (IS_NEED_CDN) {
        // 注入cdn
        config.plugin('html')
          .tap(args => {
            args[0].cdn = cdn
            return args
        })        
      }
    }
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 如果你想去掉文件名中的 .module，可以设置 vue.config.js 中的 css.requireModuleExtension 为 false
    requireModuleExtension: true,
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: false,

    host: '127.0.0.1',

    port: 3000,

    https: false,

    hot: true,

    // hotOnly: false,
    // proxy: null
    proxy: {
      '/mock': {
        target: 'http://yapi.demo.qunar.com/mock/97590/',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
    // 简单mock
    // before: (app) => {
    //   app.post('/mock/login', (req, res) => {
    //     res.json({
    //       data: {
    //         flag: true
    //       },
    //       code: 0,
    //       message: 'success',
    //       success: true
    //     })
    //   })
    // }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
}
