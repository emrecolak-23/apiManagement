import axios from "axios"
import { header } from "../constant"

export default {
  namespaced: true,
  state: {
    logs: []
  },
  getters: {
    allLogs: state => state.logs,
    appLog: state => state.logs.filter(log => log.type == 'app'),
    authLog: state => state.logs.filter(log => log.type == 'auth')
  },
  mutations: {
    setLogs(state, data) {
      state.logs = data.logs
    }
  },
  actions: {
    async getLogs(vuexContext,limit) {
      const response = await axios.get(`/logs?limit=${limit}`, {
          headers: header
      })
      vuexContext.commit('setLogs', response.data)
    },
    async removeAllLogs(vuexContext) {
      const response = await axios.delete(`/logs`, {
        headers: {
          "userId": localStorage.userId
        }
      });
      if (response.status == 200) {
        vuexContext.commit('setLogs', {logs: []});
        return [true, response.data.message]
      } else {
        return [false,response.data.message]
      }

    }

  }
}