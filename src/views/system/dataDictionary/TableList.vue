<template>
  <a-table v-bind="tableProps" @change="change" :loading="loading">
    <span slot="action" slot-scope="text, record" class="action-btns">
      <template>
        <a-button
          :ghost="true"
          type="primary"
          @click="handleEdit(record)"
          v-action="'dataDictionary_update'"
          size="small"
        >
          编辑
        </a-button>
        <a-popconfirm
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
          v-action="'dataDictionary_delete'"
        >
          <a-button :ghost="true" type="danger" size="small"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </span>
  </a-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TableList',
  props: {
    formValues: {
      type: Object,
      default() {
        return {}
      },
    },
    loading: Boolean,
  },
  computed: {
    ...mapGetters({
      pageData: 'base/pageData',
    }),
    columns() {
      return [
        {
          title: '根名称',
          dataIndex: 'rootName',
          width: '15%',
        },
        {
          title: '字典编码',
          dataIndex: 'dictCode',
          width: '15%',
        },
        {
          title: '字典key',
          dataIndex: 'dictKey',
          width: '15%',
        },
        {
          title: '字典value',
          dataIndex: 'dictValue',
          width: '15%',
          ellipsis: true,
        },
        {
          title: '字典描述',
          dataIndex: 'dictDesc',
          width: '25%',
          ellipsis: true,
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
    paginationProps() {
      const {
        pageData: { pagination },
      } = this
      return {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
        showTotal: (total) => <span>共&nbsp;{total === undefined ? 0 : total}&nbsp;条</span>,
      }
    },
    tableProps() {
      const {
        columns,
        pageData: { list },
        paginationProps,
      } = this
      return {
        columns,
        dataSource: list,
        pagination: paginationProps,
        rowKey: (record) => record.sid,
      }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
    }),
    change(pagination, filters, sorter) {
      const { formValues } = this
      const params = {
        url: '/dataDictionary/findByPage',
        current: pagination.current,
        size: pagination.pageSize,
        ...filters,
        ...formValues,
      }
      this.getPage(params)
    },
    handleEdit(record) {
      this.$emit('handleModalOpen', record)
    },
    handleDelete(record) {
      this.$emit('handleDelete', record)
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
