import { getData, postData } from '../api/base'

const state = {
  pageUrl: undefined,
    pageData: {
    list: [],
      pagination: {}
  },
  data: {}
}
const getters = {
  pageUrl: state => state.pageUrl,
  pageData: state => state.pageData,
  data: state => state.data
}
const mutations = {
  // 默认必须以payload形式触发
 update (state, { type, data }) {
   return {
     ...state,
     ...data
   }
 }
}
const isSuccess = (response) => response.statusCode === '0'
const actions = {
   async getData ({ commit, state }, { type, rest }) {
      const response = await getData(rest)
      if (isSuccess(response)) {
       commit({
         type: 'update',
         data: response
       })
        return new Promise((resolve) => resolve(response))
     }
  },
   async postData ({ commit, state }, { type, rest }) {
    const response = await postData(rest)
    if (isSuccess(response)) {
      commit({
        type: 'update',
        data: response
      })
      return new Promise((resolve) => resolve(response))
    }
  }
}

export default { state, getters, mutations, actions }
