import { getData, postData } from '../api/base'
import { setToken, storageClear } from '../utils/util'
import { message } from 'ant-design-vue'
import { constantRouterMap, generatorDynamicRouter } from '../router/generator-routers'

const state = () => ({
  currentUser: {},
  menuData:constantRouterMap,
  addMenuData:[],
  permissions: []
})
const getters = {
  currentUser: state => state.currentUser,
  menuData: state => state.menuData,
  addMenuData: state => state.addMenuData,
  permissions: state => state.permissions
}
const mutations = {
  updateCurrentUser (state, payload) {
    state.currentUser = payload.currentUser
  },
  addRouter (state, payload) {
    console.log('store add开始',payload)
    state.menuData = constantRouterMap.concat(payload.menuData)
    state.addMenuData = payload.menuData
  }
}
const isSuccess = (response) => response?.statusCode === '0'
const errorMessage = (response) =>
  response?.statusMessage && message.error(response.statusMessage)
const actions = {
  async login ({ commit, state, dispatch }, payload) {
    const response = await postData(Object.assign(payload,{ url: '/account/login'}))
    if (isSuccess(response)) {
      message.success('🎉 🎉 🎉  登录成功！')
      setToken(response.data.token)
    }
    return new Promise(resolve => resolve(response))
  },
  async logout () {
    const response = await postData({ url: '/account/logout'})
    if (isSuccess(response)) {
      message.success('🎉 🎉 🎉  退出登录成功！')
      storageClear()
    } else {
      errorMessage(response)
    }
    return new Promise(resolve => resolve(response))
  },
  async findCurrentInfo ({ commit }) {
    const response = await getData({ url: '/account/findCurrentInfo'})
    if (isSuccess(response)) {
      commit('updateCurrentUser',{
        currentUser: response.data
      })
    } else {
      errorMessage(response)
    }
  },
  async findCurrentMenu ({ commit }) {
    const response = await getData({ url: '/resource/findCurrentMenu'})
    if (isSuccess(response)) {
      const menuData = generatorDynamicRouter(response.data.children || [])
      commit('addRouter',{
        menuData,
      })
      return new Promise(resolve => resolve(menuData))
    } else {
      errorMessage(response)
    }
  }
}

export default { state, getters, mutations, actions }
