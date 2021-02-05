<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '720px' }">
      <div class="account-settings-info-main">
        <div class="account-settings-info-left">
          <a-menu mode="inline" :selectedKeys="selectedKeys" type="inner">
            <a-menu-item v-for="item in menuMap" :key="item.value" @click="onClick">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ pageTitle }}</span>
          </div>
          <div v-if="selectedKeys[0] === 'base'">
            <Base />
          </div>
          <div v-else-if="selectedKeys[0] === 'security'">
            <Security />
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { RouteView } from '@/layouts'
import Base from './Base'
import Security from './Security'

export default {
  components: {
    RouteView,
    Base,
    Security,
  },
  mixins: [],
  data() {
    return {
      menuMap: [
        { value: 'base', label: '基本设置' },
        { value: 'security', label: '修改密码' },
        { value: 'binding', label: '账号绑定' },
        { value: 'notification', label: '新消息通知' },
      ],
      selectedKeys: ['base'],
    }
  },
  computed: {
    pageTitle: function () {
      return this.menuMap.find((i) => i.value === this.selectedKeys[0]).label
    },
  },
  methods: {
    onClick({ item, key }) {
      this.selectedKeys = [key]
    },
  },
}
</script>

<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
