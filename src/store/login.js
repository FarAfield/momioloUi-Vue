import { getData, postData } from '../api/base'
import { setToken, storageClear } from '../utils/util'
import { message } from 'ant-design-vue'
import { constantRouterMap, generatorDynamicRouter } from '../router/generator-routers'
import { resetRouter } from '../router'

const state = () => ({
  currentUser: {},
  menuData: constantRouterMap,
  addMenuData: [],
  permissions: [],
})
const getters = {
  currentUser: (state) => state.currentUser,
  menuData: (state) => state.menuData,
  addMenuData: (state) => state.addMenuData,
  permissions: (state) => state.permissions,
}
const mutations = {
  updateCurrentUser(state, payload) {
    state.currentUser = payload.currentUser
    state.permissions = payload.permissions
  },
  addRouter(state, payload) {
    state.menuData = constantRouterMap.concat(payload.menuData)
    state.addMenuData = payload.menuData
  },
  deleteRouter(state) {
    state.menuData = constantRouterMap
    state.addMenuData = []
  },
}
const isSuccess = (response) => response?.statusCode === '0'
const errorMessage = (response) => response?.statusMessage && message.error(response.statusMessage)
const actions = {
  async login({ commit, state, dispatch }, payload) {
    const response = await postData(Object.assign(payload, { url: '/account/login' }))
    if (isSuccess(response)) {
      message.success('🎉 🎉 🎉  登录成功！')
      setToken(response.data.token)
    }
    return new Promise((resolve) => resolve(response))
  },
  async logout({ commit }) {
    const response = await postData({ url: '/account/logout' })
    if (isSuccess(response)) {
      message.success('退出登录成功！')
      resetRouter()
      storageClear()
      commit('deleteRouter')
    } else {
      errorMessage(response)
      throw new Error()
    }
    return new Promise((resolve) => resolve(response))
  },
  async findCurrentInfo({ commit }) {
    const response = await getData({ url: '/account/findCurrentInfo' })
    if (isSuccess(response)) {
      commit('updateCurrentUser', {
        currentUser: response.data,
        permissions: response.data?.permissions || [],
      })
    } else {
      errorMessage(response)
    }
  },
  async findCurrentMenu({ commit }) {
    const response = await getData({ url: '/resource/findCurrentMenu' })
    if (isSuccess(response)) {
      const menuData = generatorDynamicRouter(response.data.children || [])
      commit('addRouter', {
        menuData,
      })
      return new Promise((resolve) => resolve(menuData))
    } else {
      errorMessage(response)
      throw new Error()
    }
  },
}

export default { state, getters, mutations, actions }
