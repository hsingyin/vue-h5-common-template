import Vue from 'vue'
import Vuex from 'vuex'
import _user from './modules/user' // 用户信息
import _power from './modules/power' // 权限
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import getters from './getters'

Vue.use(Vuex)
// modules留着扩展
const store = new Vuex.Store({
  modules: {
    user: _user,
    power: _power
  },
  getters: getters,
  plugins: [createPersistedState({
    key: 'VUEX',
    paths: ['user.token', 'user.appUserId', 'user.userInfo'], // 添加需要持久保存到本地的数据 格式：模块.state
    // storage: window.sessionStorage
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1 / 12 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})

export default store
