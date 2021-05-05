import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSpeech: '',
    insultFlag: false,
    identityAttackFlag: false,
    sexualExplicitFlag: false,
    threatFlag: false,
    toxicityFlag: false
  },
  mutations: {
    updateUserSpeech(state, userSpeech){
      state.userSpeech = userSpeech
    },
    updateInsultFlag(state, insultFlag){
      state.insultFlag = insultFlag
    },
    updateIdentityAttackFlag(state, identityAttackFlag){
      state.identityAttackFlag = identityAttackFlag
    },
    updateSexualExplicitFlag(state, sexualExplicitFlag){
      state.sexualExplicitFlag = sexualExplicitFlag
    },
    updateThreatFlag(state, threatFlag){
      state.threatFlag = threatFlag
    },
    updateToxicityFlag(state, toxicityFlag){
      state.toxicityFlag = toxicityFlag
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getUserSpeech: state => state.userSpeech,
    getInsultFlag: state => state.insultFlag,
    getIdentityAttackFlag: state => state.identityAttackFlag,
    getSexualExplicitFlag: state => state.sexualExplicitFlag,
    getThreatFlag: state => state.threatFlag,
    getToxicityFlag: state => state.toxicityFlag
  }
})
