import { UserLayout, BasicLayout } from '../layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/user/Login')
      },
    ]
  },
]

const transferMenu = (menuData=[],parentPath='') => {
  return menuData.filter(i => i.resourceType !== 3).map(item => {
    const path = `${parentPath}/${item.resourceCode}`
    const currentRouter = {
      path,
      // 路由名称，唯一
      name: `${item.resourceCode}`,
      // 该路由对应页面的组件 (动态加载)
      component:(() => import(`@/views/${path}`)),
      // meta: 页面标题, 菜单图标
      meta: {
        title: `${item.resourceName}`,
        icon: `${item.resourceIcon}`,
      },
      hidden: item.resourceType === 2, // 隐藏路由
    }
    if (item.children && item.children.length) {
      currentRouter.children = transferMenu(item.children, path).length ? transferMenu(item.children, path) : null
    }
    return { ...item,...currentRouter }
  })
}

const notFoundRouter = {
  key: '404',
  name:'404',
  path: '*',
  component: BasicLayout,
  meta:{ title:'404'},
  hidden: true
}
/**
 * 动态生成菜单
 */
export const generatorDynamicRouter = (menuData=[]) => {
  const rootRouter = [{
    key: 'root',
    name: 'index',
    path: '/',
    component: BasicLayout,
    meta: { title: '首页' },
    children: transferMenu(menuData)
  }]
  rootRouter.push(notFoundRouter)
  console.log(rootRouter,'转换后的router')
  return rootRouter
}
