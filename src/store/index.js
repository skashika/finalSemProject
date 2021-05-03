import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSpeech: ''
  },
  mutations: {
    updateUserSpeech(state, userSpeech){
      state.userSpeech = userSpeech
    }
  },
  actions: {
  },
  modules: {
  }
})
