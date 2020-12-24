<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :handleCollapse="handleCollapse"
    v-bind="settings"
    :mediaQuery="query"
    :handleMediaQuery="handleMediaQuery"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="../assets/logo-white.svg" alt="logo">
        <h1>{{ title }}</h1>
      </div>
    </template>
    <template v-slot:headerContentRender>
      <div>
        <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px;cursor: pointer;" @click="() => { $message.info('只是一个DEMO') }" />
        </a-tooltip>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  name: 'BasicLayout',
  components: {
    RightContent,
    GlobalFooter,
  },
  data () {
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
        hideCopyButton: false
      },
    }
  },
  computed: {
    ...mapGetters({
      mainMenu:'login/addMenuData'
    }),
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/')?.children
  },
  mounted () {
  },
  methods: {
    handleCollapse (val) {
      this.collapsed = val
    },
    handleMediaQuery (val) {
      this.query = val
    },
  }
}
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
