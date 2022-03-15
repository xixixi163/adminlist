import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = {
  token: localStorage.getItem("openid") || ''
};
const merchars = ''

const state = {
  userInfo,
  merchars
}

export default new Vuex.Store({
  state,
  actions: {
    users (user) {
      //			console.log(user)
      user.commit('usersinfo')
    },
    merchars (merchar) {
      merchar.commit('sendMerchars')
    }
  },
  mutations: {
    usersinfo (state) {
      state.userInfo = {
        token: localStorage.getItem("openid") || ''
      }
      //			console.log(state.userInfo)
    },
    sendMerchars (state, params) {
      state.merchars = params
    }
  }
})
