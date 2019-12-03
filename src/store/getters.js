const getters = {
  uid: state => state.user.uid, // 用户id
  token: state => state.user.token, // 用户令牌
  userInfo: state => state.user.userInfo, // 用户所有信息
  routers: state => state.power.routers // 路由表
}
export default getters
