/*****
 * Created with WebStorm.
 * Date : 2018/1/25.
 * Author : Ztr.
 * Update: Hsingyin
 * Func : 全局封装Axios
 ******/
import Axios from 'axios'
import store from '../store/index'
import api from '../config/api'
import router from '../router'
import { Toast, Indicator } from 'mint-ui'

// 全局请求接口配置信息
Axios.defaults.baseURL = api.base
// Axios.defaults.headers['Content-Type'] = 'multipart/form-data'
Axios.defaults.headers['Content-Type'] = api.contentType
Axios.defaults.timeout = 60 * 1000
// Axios.defaults.headers.common['X-Requested-with'] = "XMLHttpRequest"

let _haveLoading = true
let _isShow = false
// Request拦截器
Axios.interceptors.request.use(
  config => {
    let _timestamp = +new Date() + ''
    // 注入token
    if (store.getters.token) {
      config.data['sessionId'] = store.getters.token
    }
    if (config.method === 'post') {
      config.data['version'] = '1.0.0'
      config.data['timestamp'] = _timestamp
      config.data['extra'] = {}
      config.data['encType'] = 'plain'
      config.data['signType'] = 'plain'
      config.data['signData'] = {}
      config.data['encData'] = {}
    }
    if (config.method === 'get') {
      if (store.getters.token) {
        config.params['token'] = store.getters.token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// Response拦截器
Axios.interceptors.response.use(
  response => {
    // 处理关闭loading
    _haveLoading && (Indicator.close())
    // axios默认请求判断状态
    if (response.status === 200) {
      // 成功过滤处理，返回数据对象，属性信息走配置文件的配置

      if (!api.responseConfig.isOK(response.data) || api.responseConfig.errorCodes.indexOf(response.data[api.responseConfig['code']]) >= 0) {
        // 请求出错，统一处理
        if (!_isShow) {
          _isShow = true
          Toast({ message: `${response.data[api.responseConfig.msg] || '请求数据出错'}`, duration: 2000, className: 'mini-warning' })
          setTimeout(() => {
            if (api.responseConfig.errorCodes.includes(response.data[api.responseConfig['code']])) {
              api.responseConfig.errorCallback(store, router)
            }
            _isShow = false
          }, 1200)
        }
        return Promise.reject(response.data)
      } else {
        try {
          return Promise.resolve(response.data[api.responseConfig.data])
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      return Promise.reject(response.data[api.responseConfig.data])
    }
  },
  error => {
    // 处理关闭loading
    _haveLoading && (Indicator.close())
    if (error.response) {
      // 处理错误状态码
      switch (error.response.status) {
        case 401:
          break
        default:
          break
      }
    }
    return Promise.reject(error.response.data)
  })

// 包装https请求方法，做统一的请求控制
export default function https ({ url = api.url, isLoading = true, method = 'POST', transType = '', params = {} }) {
  _haveLoading = isLoading
  if (isLoading) {
    Indicator.open({ text: '数据处理中...' })
  }
  return new Promise((resolve, reject) => {
    let _axiosConfig = {
      method: method,
      params: {},
      data: {},
      url: url
    }

    if (method.toUpperCase() === 'GET') {
      // _axiosConfig['params']['serviceId'] = serviceId;
      _axiosConfig['params']['param'] = params
    } else {
      _axiosConfig['data']['transType'] = transType
      _axiosConfig['data']['data'] = params
    }

    Axios(_axiosConfig).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
