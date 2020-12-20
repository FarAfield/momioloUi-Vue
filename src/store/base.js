import { getData, postData } from '../api/base'

const state = () => ({
  pageUrl: undefined,
    pageData: {
    list: [],
      pagination: {}
  },
  data: {}
})
const getters = {
  pageUrl: state => state.pageUrl,
  pageData: state => state.pageData,
  data: state => state.data
}
const mutations = {
 update (state, payload) {
   state = { ...state, ...payload }
 }
}
const isSuccess = (response) => response?.statusCode === '0'
const errorMessage = (response) =>
  response?.statusMessage && message.error(response.statusMessage)
const actions = {
   async getData ({ commit, state }, payload) {
      const response = await getData(payload)
      if (isSuccess(response)) {
       commit('update',{
         data: response
       })
        return new Promise((resolve) => resolve(response))
     }
  },
   async postData ({ commit, state }, { type, ...rest }) {
    const response = await postData(rest)
    if (isSuccess(response)) {
      commit('update',{
        data: response
      })
      return new Promise((resolve) => resolve(response))
    }
  }
}
export default { state, getters, mutations, actions }
