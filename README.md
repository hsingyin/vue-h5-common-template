# vue-common-h5-template ![](https://api.travis-ci.org/hsingyin/vue-h5-common-template.svg?branch=master)
基于[vue-cli4](https://cli.vuejs.org/zh/) 搭建的初始H5模板，快速构建面向现代浏览器的H5初始工程

## 项目架构
### 框架
- vue
- vuex
- vue-router
### 请求库
- axios
### UI组件
- mint-ui  
### 插件
- vuex-persistedstate
- lib-flexible
- js-cookie

## 写在前面
升级到`vue-cli4`后许多配置都和`vue-cli2.x`时代不同，且相对`vue-cli3.x`又存在一些变化，需要踩坑。

### 新版CLI注意点

- #### webpack配置移除
许多之前的`build`文件等目录结构都变成内置在`node`模块里，我们可以显式指定一份`vue.config.js`配置文件在根目录，相反这种目录结构更加简洁明了。

- #### 静态资源目录变动

相对 `cli 2.x`, 新版的资源目录从原来的 `static`迁移至`public`，原来的模板文件 `index.html`，迁移至 `/public/index.html`
- #### [现代模式](https://cli.vuejs.org/zh/guide/browser-compatibility.html#%E7%8E%B0%E4%BB%A3%E6%A8%A1%E5%BC%8F)
> 现如今绝大多数现代浏览器都已经支持了原生的 ES2015，所以因为要支持更老的浏览器而为它们交付笨重的代码是一种浪费。Vue CLI 提供了一个“现代模式”帮你解决这个问题

可以向后兼容，用到了`<script type="module">`，需要配合始终开启的 CORS 进行加载
- #### 快速原型构建
可以直接针对单页面`.vue`文件直接启动一个服务，方便原型开发。

- #### GUI界面
你也可以通过 `vue ui`命令以图形化界面创建和管理项目，可以分析依赖包的大小，插件安装情况等。

### 项目特性
- **全局配置**：`src/config/api.js`，可以按需配置使用

- **请求封装**：`src/utils/https.js`，可以按需配置使用

- **环境变量**：目前只配置了生产环境`env.production`，可以按需配置使用

- **针对生产环境的构建流程配置和优化**：`cdn`加速，`chunks`分割，`gzip`压缩，`soureMap`默认关闭
- **持续集成**： 增加`Travis-CI`自动化打包docker镜像push到对应的[docker仓库](https://hub.docker.com/repository/docker/hsingyin/vue-h5-common-template)中，开箱即用
### 待实现特性

- [ ] 按需引入UI组件
- ~~px转rem无感~~
- [ ] 更新移动端dpr适配方案
- [x] 增加`docker` + `travis ci`持续集成
