import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import './global.less'
import './core/lazy_use'
import './routerInterceptor'

Vue.config.productionTip = false

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
