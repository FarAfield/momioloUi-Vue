import Vue from 'vue'
import store from '../../store'

/**
 *   自定义指令  权限   多权限时为并集
 *   用法   v-action= "'aa'"  ||  v-action="['aa','bb']"
 */
const action = Vue.directive('action', {
  inserted: function (el, binding) {
    const value = binding.value
    const actionName = Array.isArray(value) ? value : value.split(',')
    const permissions = store.getters['login/permissions']
    const hasPermission = actionName.some((i) => permissions.includes(i))
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },
})
export default action
