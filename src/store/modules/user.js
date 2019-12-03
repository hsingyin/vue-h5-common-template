const user = {
  state: {
    appUserId: '',
    token: '',
    userInfo: ''
  },
  mutations: {
    setAppUserId: (state, appUserId) => {
      state.appUserId = appUserId
    },
    setToken: (state, token) => {
      state.token = token
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
  }
}

export default user
