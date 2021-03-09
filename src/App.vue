<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import themeColor from './components/ThemeSetting/themeColor'
export default {
  data() {
    return {
      zhCN,
    }
  },
  mounted() {
    themeColor.changeColor(localStorage.getItem('primaryColor') || '#1890ff')
  }
}
</script>
