// Import Packages
import axios from "axios"
import { header } from "../constant"
export default {
  namespaced: true,
  state: {
    allApps: [],
    app: {},
    appLogs: [],
    appLogsGroup: []
  },
  getters: {
    _allApps: state => state.allApps,
    _app: state => state.app,
    _appLogs: state => state.appLogs,
    _allowList: state => state.app.allowList,
    _appLogsGroup: state => state.appLogsGroup
  },
  mutations: {
    setAllApps(state, appData) {
      state.allApps = appData
    },
    setApp(state, appData) {
      state.app = appData
    },
    setAppLogs(state, logData) {
      state.appLogs = logData
    },
    setAllowList(state, allowData) {
      state.app.allowList.push(allowData)
    },
    setBlockList(state, blockData) {
      state.app.blockList.push(blockData)
    },
    deleteAllowList(state, allowData) {
      state.app.allowList = state.app.allowList.filter(allow => allow != allowData)
    },
    deleteBlockList(state, blockedData) {
      state.app.blockList = state.app.blockList.filter(block => block != blockedData)
    },
    deleteApp(state, deletedAppSlug) {
      state.allApps = state.allApps.filter(app => app.slug != deletedAppSlug)
    },
    setAppLogGroup(state, logGroupData) {
      state.appLogsGroup = logGroupData
    }
  },
  actions: {

    async createApp(vuexContext, {appName, appApiKey, appDescription}) {
      try{
          const response = await axios.post('/app', 
        JSON.stringify({name: appName, apiKey: appApiKey, description: appDescription})
        ,{
          headers: header
        })
        return [true, response.data.message]
      } catch(error) {
        return [false, error.response.data.message]
      }

    },
    async getAllApps(vuexContext) {
       try {
        const response = await axios.get('/app', {
          headers: header
        })
        vuexContext.commit('setAllApps', response.data)
       } catch(error) {
        // Redirect not found page
        return [false, error.response.data.message]
       }

    },
    async getApp(vuexContext, slug) {
      try {
        const response = await axios.get(`/app/${slug}`, {
          headers: header
        })
        vuexContext.commit('setApp', response.data[0])
      } catch(error) {
        // Redirect not found page
        return [false, error.response.data.message]
      }
    },

    async getAppLog(vuexContext, slug) {
      try {
        
        const response = await axios.get(`/app/logs/${slug}`, {
          headers: header
        })
        vuexContext.commit('setAppLogs', response.data)
      } catch(error) {
        // Redirect not found page
        return [false, error.response.data.message]
      }
    },
    async updateApp(_, data) {
      try {
        const response = await axios.put(`/app/${data.slug}`, data.data, {
          headers: header
        })
        return [true, response.data.message]
      } catch(error) {
        return [false, error.response.data.message]
      } 
    },
    async addAllowList(vuexContext, data) {
      try {
        const response = await axios.post(`/app/add-to-allow/${data.slug}`, data, {
          headers: header
        })
        if(response) {
          vuexContext.commit('setAllowList', data.ipAdress)
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async addBlockList(vuexContext, data) {
      try {
        const response = await axios.post(`/app/add-to-block/${data.slug}`, data, {
          headers:header
        })  
        if(response) {
          vuexContext.commit('setBlockList', data.ipAdress)
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async removeAllowList(vuexContext, data) {
      try {
        const response = await axios.post(`/app/remove-to-allow/${data.slug}`, data, {
          headers: header
        })
        if(response) {
          vuexContext.commit('deleteAllowList', data.ipAdress)
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async removeBlockList(vuexContext, data) {
      try {
        const response = await axios.post(`/app/remove-to-block/${data.slug}`, data, {
          headers: header
        })
        if(response) {
          vuexContext.commit('deleteBlockList', data.ipAdress)
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async deleteApp(vuexContext, slug) {
      try {
        const response = await axios.delete(`/app/${slug}`, {
          headers: {
            userId: localStorage.userId
          }
        })
        if (response) {
          vuexContext.commit('deleteApp', slug)
          return [true, response.data.message]
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async getLogsGroup(vuexContext, id) {
      try {

        const response = await axios.get(`http://localhost:3000/app/logs-date/${id}`)
        if (response.data.length) {
          vuexContext.commit('setAppLogGroup', response.data)
          return true
        } else {
          return false
        }
        
      } catch(error) {
        return [false, error.response.data.message]
      }
    },
    async deleteAllApps(vuexContext) {
      try {
        const result = await axios.delete('/app/all', {
          headers: header
        })
        if (response.status == 200) {
          vuexContext.commit('setAllApps', [])
          return true
        }
      } catch(error) {
        return [false, error.response.data.message]
      }
    }

  }
}