<template>
  <a-spin :spinning="loading">
    <a-tree :selectable="false" :treeData="renderTreeNodes">
      <span slot="customTitle" slot-scope="item">
        <a-tag :color="TYPE[item.resourceType]['color']">{{ TYPE[item.resourceType]['value'] }}</a-tag>
        {{ item.resourceName }}
        <a-switch
          :default-checked="item.sysRoot === 'N'"
          @change="(checked, event) => onChange(checked, event, item.sid)"
        >
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>
      </span>
    </a-tree>
  </a-spin>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const TYPE = {
  1: { value: '菜单', color: '#1890ff' },
  2: { value: '页面', color: '#f5222d' },
  3: { value: '按钮', color: '#52c41a' },
}
export default {
  name: 'MenuConfig',
  data() {
    return {
      TYPE,
      menuData: [],
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getData'],
    }),
    renderTreeNodes() {
      const transformData = (array) => {
        return array.map((item) => {
          if (item?.children?.length) {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
            item.children = transformData(item.children)
          } else if (item?.buttonChildren?.length) {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
            item.children = transformData(item.buttonChildren)
          } else {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
          }
          return item
        })
      }
      return transformData(this.menuData)
    },
  },
  methods: {
    ...mapActions({
      getData: 'base/getData',
    }),
    searchMenuData() {
      this.getData({ url: '/resource/findMenuTree' }).then((res) => {
        this.menuData = res.data || []
      })
    },
    onChange(checked, e, sid) {
      e.stopPropagation()
      this.$message.info('敬请期待!')
    },
  },
  mounted() {
    this.searchMenuData()
  },
}
</script>

<style lang="less" scoped>
/deep/ .ant-tree-title {
  button {
    margin-left: 4px;
    border-radius: 24px !important;
  }
}
</style>
