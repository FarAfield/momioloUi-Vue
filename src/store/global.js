const state = () => ({
  breadcrumbData: [], // 面包屑数据
  routeKey: Math.floor(Math.random()*100), // 当前全局路由的key
})
const getters = {
  breadcrumbData: (state) => state.breadcrumbData,
  routeKey:state => state.routeKey
}
const mutations = {
  updateBreadcrumbData(state, payload) {
    state.breadcrumbData = payload.breadcrumbData
  },
  updateRouteKey(state, payload) {
    state.routeKey = payload.routeKey
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
