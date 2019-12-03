/** ***
 * Created with Visual Studio Code
 * Date : 2019/11/28
 * Author : Hsingyin
 * Func : 配置文件
 ******/

// 是否是生产环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// 请求地址
const base = IS_PROD ? window.ServerConfig.base : window.ServerConfig.baseTest

// 完整请求地址
const url = base + '/ec/gateway'

// 数据传输类配置
const contentType = 'application/json' // form提交数据：application/x-www-form-urlencoded

// token校验
const tokenCheck = false

// 统一请求配置
const responseConfig = {
  // 响应代码
  code: 'code',
  // 响应数据
  data: 'data',
  // 错误提示信息
  msg: 'message',
  // 加密数据
  encode: 'encData',
  // 签名数据
  signData: 'signData',
  // 响应是否是成功的
  isOK: function (response) {
    return response instanceof Object && response['code'] === 0
  },
  // tokenCheck为true时，token验证不通过时返回的异常码， 出现这种情况情况下将直接执行回调errorCallBack
  errorCodes: [500023],
  errorCallback: function () {
    // token过期后,自定义处理,或返回错误
  }
}

// 提示语
const waitTips = '敬请期待'

export default {
  base,
  url,
  contentType,
  tokenCheck,
  responseConfig,
  waitTips
}
