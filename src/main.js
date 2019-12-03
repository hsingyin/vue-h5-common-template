import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/flexible'
import api from '@/config/api'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 样式
import './assets/less/index.less'
// 挂载请求信息
import * as $http from './services'

Vue.use(MintUI)
Vue.prototype.$api = api
Vue.prototype.$http = $http
Vue.prototype.$store = store

Vue.config.productionTip = false

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (api.tokenCheck) {
    if (store.getters.token) {
      // 如果在白名单中
      // if (api.routerWhiteList.indexOf(to.name) >= 0) {
      //   next()
      // } else {
      //   next({
      //     name: 'login'
      //   })
      // }
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
