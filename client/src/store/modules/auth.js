// Import Packages
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: (state) => state.user
  },
  mutations: {
    setUser: (state, user) => state.user = user
  },
  actions: {
    async authorize(vuexContext, token) {
      let user = await axios.get(`/auth/auth-callback/me?token=${token}`)
      if (user.data.auth) {
        vuexContext.commit('setUser', user.data.auth.userToken);
        localStorage.token = token
        localStorage.userId = user.data.auth.userId

        return true
      }
    }
  }
}