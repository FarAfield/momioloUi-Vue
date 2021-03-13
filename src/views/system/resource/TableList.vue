<template>
  <a-table v-bind="tableProps" :loading="loading">
    <span slot="resourceName" slot-scope="text, record">
      <span v-if="record.resourceType === 1">
        <a-tag color="rgba(24,157,255)">菜单</a-tag>
        {{ text }}
      </span>
      <span v-else-if="record.resourceType === 2">
        <a-tag color="rgba(249,138,144)">路由</a-tag>
        {{ text }}
      </span>
      <template v-else></template>
    </span>
    <div slot="resourceType" slot-scope="text, record">
      <div v-if="record.children && record.children.length">
        <a-tag color="rgba(250,157,57)" v-for="item in record.children" :key="item.sid" style="margin: 6px">{{
          item.resourceName
        }}</a-tag>
      </div>
      <div v-else-if="record.buttonChildren && record.buttonChildren.length">
        <a-popconfirm
          v-for="(item, index) in record.buttonChildren"
          :key="item.sid"
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(item)"
          v-action="'resource_move'"
        >
          <a-tag
            :id="'tag' + index"
            color="rgba(107,204,60)"
            style="margin: 6px"
            :closable="closable"
            @close="onClose($event, index)"
            >{{ item.resourceName }}</a-tag
          >
        </a-popconfirm>
      </div>
      <template v-else></template>
    </div>
    <span slot="action" slot-scope="text, record" class="action-btns">
      <template>
        <a-button
          v-if="record.resourceType !== 3"
          :ghost="true"
          type="primary"
          @click="handleModalOpen(record, 'create')"
          v-action="'resource_create'"
          size="small"
        >
          新增
        </a-button>
        <a-button
          :ghost="true"
          type="primary"
          @click="handleModalOpen(record, 'update')"
          v-action="'resource_update'"
          size="small"
        >
          编辑
        </a-button>
        <a-popconfirm
          v-if="record.showUp"
          title="是否确认上移？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleMove(record, 'up')"
          v-action="'resource_move'"
        >
          <a-button :ghost="true" type="primary" size="small"> 上移 </a-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="record.showDown"
          title="是否确认下移？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleMove(record, 'down')"
          v-action="'resource_move'"
        >
          <a-button :ghost="true" type="primary" size="small"> 下移 </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
          v-action="'resource_delete'"
        >
          <a-button :ghost="true" type="danger" size="small"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </span>
    <div style="display: flex; justify-content: center; align-items: center" slot="footer">
      <a-button
        :ghost="true"
        icon="plus"
        type="primary"
        @click="handleModalOpen({}, 'firstLevel')"
        v-action="'resource_create'"
      >
        新增一级菜单
      </a-button>
    </div>
  </a-table>
</template>

<script>
export default {
  name: 'TableList',
  inject: ['permissions'],
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    loading: Boolean,
  },
  computed: {
    columns() {
      return [
        {
          title: '菜单名称',
          dataIndex: 'resourceName',
          width: '30%',
          scopedSlots: { customRender: 'resourceName' },
        },
        {
          title: '下级功能清单',
          dataIndex: 'resourceType',
          width: '50%',
          scopedSlots: { customRender: 'resourceType' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
    tableProps() {
      const { columns, list } = this
      return {
        columns,
        dataSource: list,
        pagination: false,
        rowKey: (record) => record.sid,
      }
    },
    closable() {
      return this.permissions.includes('resource_delete')
    },
  },
  methods: {
    handleModalOpen(record = {}, type) {
      this.$emit('handleModalOpen', record, type)
    },
    handleMove(record, type) {
      this.$emit('handleMove', record, type)
    },
    handleDelete(record) {
      this.$emit('handleDelete', record)
    },
    onClose(e, i) {
      e.preventDefault()
      const event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      document.getElementById('tag' + i).dispatchEvent(event)
    },
  },
}
</script>

<style lang="less" scoped>
.action-btns {
  button {
    margin: 6px 12px 6px 0;
  }
}
</style>
