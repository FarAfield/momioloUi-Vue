import Vue from 'vue'
import Vuex from 'vuex'
import createLoadingPlugin from './createLoadingPlugin'
import global from './global'
import base from './base'
import login from './login'

/**
 *  ① this.$store.dispatch({
 *    type:'base/getData',  （带命名空间）
 *    ...rest
 *  }) 写法，与react中dva写法一致
 *
 *  ②其次也可以使用引入的方式  (目前采用这种方式，带命名空间的map)
 *  ...mapActions({
 *    getData: 'base/getData' (带命名空间)
 *  })
 *  getData({ ...rest })
 *
 *  ③若采用全局注册写法那么可以写成 (考虑扩展性，不进行全局注册)
 *  ...mapActions(['getData','postData'])
 *
 *  更加详细文档  https://vuex.vuejs.org/zh/
 */

Vue.use(Vuex)
const modules = { global, base, login }
//禁止全局注册，改为带命名空间注册
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default new Vuex.Store({
  modules,
  plugins:[createLoadingPlugin()]
})
