import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import './global.less' // global style

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Antd,
  render: h => h(App)
}).$mount('#app')
