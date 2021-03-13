<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :handleCollapse="handleCollapse"
    v-bind="settings"
    :mediaQuery="query"
    :handleMediaQuery="handleMediaQuery"
    :breadcrumbRender="itemRender"
    :siderWidth="210"
  >
    <template #menuHeaderRender>
      <div>
        <img src="../assets/logo-white.svg" alt="logo" />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <template #headerContentRender>
      <div>
        <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px; cursor: pointer" @click="reFlush" />
        </a-tooltip>
      </div>
    </template>
    <template #rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :theme="settings.theme" />
    </template>
    <theme-setting />
    <template #footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import ThemeSetting from '@/components/ThemeSetting'

export default {
  name: 'BasicLayout',
  components: {
    RightContent,
    GlobalFooter,
    ThemeSetting,
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      // 媒体查询
      query: {},
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        hideHintAlert: false,
        hideCopyButton: false,
      },
      itemRender: ({ route, params, routes, paths, h }) => {
        return routes.indexOf(route) !== 0
          ? h('span', {}, route.breadcrumbName)
          : h('router-link', { attrs: { to: '/' } }, route.breadcrumbName)
      },
    }
  },
  computed: {
    ...mapGetters({
      mainMenu: 'login/addMenuData',
    }),
  },
  created() {
    this.menus = this.mainMenu.find((item) => item.path === '/')?.children
  },
  methods: {
    ...mapMutations({
      updateRouteKey: 'global/updateRouteKey',
    }),
    handleCollapse(val) {
      this.collapsed = val
    },
    handleMediaQuery(val) {
      this.query = val
    },
    reFlush() {
      this.updateRouteKey({ routeKey: Math.floor(Math.random() * 100) })
    },
  },
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
