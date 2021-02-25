const state = () => ({
  breadcrumbData: [], // 面包屑数据
})
const getters = {
  breadcrumbData: (state) => state.breadcrumbData,
}
const mutations = {
  updateBreadcrumbData(state, payload) {
    state.breadcrumbData = payload.breadcrumbData
  },
  update(state, payload) {
    // 直接使用解构赋值{...state,...payload}不会触发响应式系统更新
    Object.keys(payload).forEach((i) => {
      state[i] = payload[i]
    })
  },
}
const actions = {}

export default { state, getters, mutations, actions }
