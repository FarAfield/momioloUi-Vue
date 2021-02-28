<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      title="主题设置"
      @close="onClose"
      :closable="false"
      :visible="visible"
    >
      <div style="display: flex">
        <a-radio-group :value="value" button-style="solid" @change="onChange">
          <div
            v-for="(item, index) in ThemeConfig"
            :key="index"
            style="
              margin-top: 12px;
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <a-radio-button :value="item.key" :style="{ backgroundColor: item.key, borderColor: 'transparent' }">
              <a-icon
                type="check"
                v-if="value === item.key"
                style="font-size: 20px; color: white; margin-left: -8px; margin-right: -16px"
              />
            </a-radio-button>
          </div>
        </a-radio-group>
        <div>
          <div
            v-for="(item, index) in ThemeConfig"
            :key="index"
            style="
              margin-top: 12px;
              width: 80px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="setting-drawer-index-handle"
        @click="toggle"
        slot="handle"
        v-if="!visible"
        :style="{ backgroundColor:value }"
      >
        <a-icon type="setting" style="color: white"/>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { ThemeConfig } from '../../utils/constant'
import themeColor from './themeColor.js'

export default {
  data() {
    return {
      visible: false,
      value: localStorage.getItem('primaryColor') || '#1890ff', // 主题色
      ThemeConfig,
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
    toggle() {
      this.visible = !this.visible
    },
    onChange(e) {
      this.value = e.target.value
      localStorage.setItem('primaryColor', e.target.value)
      this.updateTheme(e.target.value)
    },
    updateTheme(newPrimaryColor) {
      const hideMessage = this.$message.loading('正在加载主题...')
      themeColor.changeColor(newPrimaryColor).finally(() => {
        setTimeout(() => {
          hideMessage()
        }, 3000)
      })
    },
  },
  mounted() {
    this.value = localStorage.getItem('primaryColor') || '#1890ff'
    themeColor.changeColor(localStorage.getItem('primaryColor') || '#1890ff')
  },
}
</script>

<style lang="less" scoped>
.setting-drawer-index-handle {
  position: absolute;
  bottom: 160px;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
}
</style>
