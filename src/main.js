import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { ConfigProvider } from 'ant-design-vue'
import './global.less'
import './core/lazy_use'
import './routerInterceptor'

Vue.config.productionTip = false

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('a-config-provider', ConfigProvider)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
