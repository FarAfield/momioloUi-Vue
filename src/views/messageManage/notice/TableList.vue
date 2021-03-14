<template>
  <a-table v-bind="tableProps" @change="change" :loading="loading">
    <span slot="type" slot-scope="text">{{ getValueByKey(TYPE, ['value', 'label'], text) }}</span>
    <span slot="action" slot-scope="text, record" class="action-btns">
      <template>
        <a-button :ghost="true" type="primary" @click="handleEdit(record)" v-action="'notice_update'" size="small">
          编辑
        </a-button>
        <a-popconfirm
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
          v-action="'notice_delete'"
        >
          <a-button :ghost="true" type="danger" size="small"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </span>
  </a-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getValueByKey } from '../../../utils/util'
const TYPE = [
  { value: '1', label: '类型一' },
  { value: '2', label: '类型二' },
  { value: '3', label: '类型三' },
]
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
  data() {
    return {
      TYPE,
    }
  },
  computed: {
    ...mapGetters({
      pageData: 'base/pageData',
    }),
    columns() {
      return [
        {
          title: '公告标题',
          dataIndex: 'title',
          width: '10%',
          ellipsis: true,
        },
        {
          title: '公告类型',
          dataIndex: 'type',
          width: '10%',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '公告内容',
          dataIndex: 'content',
          width: '30%',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          width: '15%',
        },
        {
          title: '更新时间',
          dataIndex: 'updateDate',
          width: '15%',
        },
        {
          title: '操作',
          dataIndex: '操作',
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
    getValueByKey,
    change(pagination, filters, sorter) {
      const { formValues } = this
      const params = {
        url: '/notice/findByPage',
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
