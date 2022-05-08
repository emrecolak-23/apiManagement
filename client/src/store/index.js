import { createStore } from 'vuex'

// Import Modules
import auth from './modules/auth'
import log from './modules/log'
import app from './modules/app'

export default createStore({
  state: {
    alertData : {
      show: false,
      text: '',
      alertClass: ''
    }
  },
  getters: {
    alertData: state => state.alertData
  },
  mutations: {
    showAlert(state, alertInfo) {
      state.alertData = {
        show: true,
        text: alertInfo.text,
        alertClass: alertInfo.alertClass
      }
    },
    resetAlert(state) {
      state.alertData = {
        show: false,
        text: '',
        alertClass: ''
      }
    }
  },
  actions: {
  },
  modules: {
    auth,
    log,
    app
  }
})
