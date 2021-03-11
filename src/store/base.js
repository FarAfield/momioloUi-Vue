import { getData, postData } from '../api/base'

const state = () => ({
  pageUrl: undefined,
  pageData: {
    list: [],
    pagination: {},
  },
  data: {},
})
const getters = {
  pageUrl: (state) => state.pageUrl,
  pageData: (state) => state.pageData,
  data: (state) => state.data,
}
const mutations = {
  update(state, payload) {
    // 直接使用解构赋值{...state,...payload}不会触发响应式系统更新
    Object.keys(payload).forEach((i) => {
      state[i] = payload[i]
    })
  },
}
const isSuccess = (response) => response?.statusCode === '0'
const errorMessage = (response) => response?.statusMessage && message.error(response.statusMessage)
const actions = {
  async getPage({ commit, state }, payload) {
    if (state.pageUrl !== payload.url) {
      commit('update', {
        pageData: {
          list: [],
          pagination: {},
        },
        pageUrl: payload.url,
      })
    }
    const response = await getData(payload)
    if (isSuccess(response)) {
      const { records = [], total = 0, current = 1, size = 10 } = response.data
      const pageData = {
        list: records,
        pagination: {
          current,
          pageSize: size,
          total,
        },
      }
      commit('update', {
        pageData,
      })
      return new Promise((resolve) => resolve(response))
    } else {
      commit('update', {
        pageData: state.pageData,
      })
    }
  },
  async postPage({ commit, state }, payload) {
    if (state.pageUrl !== payload.url) {
      commit('update', {
        pageData: {
          list: [],
          pagination: {},
        },
        pageUrl: payload.url,
      })
    }
    const response = await postData(payload)
    if (isSuccess(response)) {
      const { records = [], total = 0, current = 1, size = 10 } = response.data
      const pageData = {
        list: records,
        pagination: {
          current,
          pageSize: size,
          total,
        },
      }
      commit('update', {
        pageData,
      })
      return new Promise((resolve) => resolve(response))
    } else {
      commit('update', {
        pageData: state.pageData,
      })
    }
  },
  async getData({ commit, state }, payload) {
    const response = await getData(payload)
    if (isSuccess(response)) {
      commit('update', {
        data: response,
      })
      return new Promise((resolve) => resolve(response))
    } else {
      errorMessage(response)
    }
  },
  async postData({ commit, state }, { type, ...rest }) {
    const response = await postData(rest)
    if (isSuccess(response)) {
      commit('update', {
        data: response,
      })
      return new Promise((resolve) => resolve(response))
    } else {
      errorMessage(response)
    }
  },

  async getDataWithRes({ commit, state }, payload) {
    const response = await getData(payload)
    commit('update', {
      data: response,
    })
    return new Promise((resolve) => resolve(response))
  },
  async postDataWithRes({ commit, state }, { type, ...rest }) {
    const response = await postData(rest)
    commit('update', {
      data: response,
    })
    return new Promise((resolve) => resolve(response))
  },

  /**================   只提供给公共组件使用  ====================*/
  async commonPostData({ commit, state }, { type, ...rest }) {
    const response = await postData(rest)
    return new Promise((resolve) => resolve(response))
  },
}
export default { state, getters, mutations, actions }
