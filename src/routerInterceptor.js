import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { isLogin, storageClear } from './utils/util'


NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/result/success'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if(isLogin()){
    // 登陆状态下不会跳到登陆页
    if(to.path === '/user/login'){
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // 只存在默认路由则重新抓取信息
      if(Object.keys(store.getters['login/menuData']).length === 1){
        // 获取登陆用户信息
        store.dispatch('login/findCurrentInfo')
        //获取菜单信息
        store.dispatch('login/findCurrentMenu').then(menuData => {
          if (menuData?.length) {
            router.addRoutes(menuData)
          }
          // 获取信息后自动重定向到该地址
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  } else {
    if(to.path === '/user/login'){
      next()
    } else {
      storageClear()
      next({ path: '/user/login' })
    }
    NProgress.done()
  }
})


router.afterEach(() => {
  NProgress.done() // finish progress bar
})
