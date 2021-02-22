import { UserLayout, BasicLayout, PageView } from '../layouts'

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/user/login'),
      },
    ],
  },
]

const transferMenu = (menuData = [], parentPath = '') => {
  return menuData
    .filter((i) => i.resourceType !== 3)
    .map((item) => {
      const path = `${parentPath}/${item.resourceCode}`
      const currentRouter = {
        path,
        // 路由名称，唯一
        name: `${item.resourceCode}`,
        // meta: 页面标题, 菜单图标
        meta: {
          title: `${item.resourceName}`,
          icon: 'unordered-list', // 此处可自定义图标
        },
        hidden: item.resourceType === 2, // 隐藏路由
      }
      const dynamicLoad = !item?.children?.length
        ? {
            // 该路由对应页面的组件 (动态加载)
            component: () => import(`@/views${path}`),
          }
        : { component: PageView }
      if (item?.children?.length) {
        currentRouter.children = transferMenu(item.children, path).length ? transferMenu(item.children, path) : null
      }
      return { ...item, ...currentRouter, ...dynamicLoad }
    })
}

const notFoundRouter = {
  key: '404',
  name: '404',
  path: '*',
  component: BasicLayout,
  meta: { title: '404' },
  hidden: true,
}
const otherRouterMap = {
  path: '/user',
  component: BasicLayout,
  hidden: false,
  children: [
    {
      path: '/user/center',
      name: 'center',
      meta: { title: '个人中心' },
      component: () => import('@/views/user/center'),
    },
    {
      path: '/user/settings',
      name: 'settings',
      meta: { title: '个人设置' },
      component: () => import('@/views/user/settings'),
    },
  ],
}

/**
 * 动态生成菜单
 */
export const generatorDynamicRouter = (menuData = []) => {
  const rootRouter = [
    {
      key: 'root',
      name: 'index',
      path: '/',
      component: BasicLayout,
      meta: { title: '首页' },
      children: transferMenu(menuData),
    },
  ]
  rootRouter.push(otherRouterMap)
  rootRouter.push(notFoundRouter)
  return rootRouter
}
