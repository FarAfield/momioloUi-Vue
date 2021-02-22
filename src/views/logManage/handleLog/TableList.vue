<template>
  <a-table v-bind="tableProps" @change="change">
    <a slot="handleParams" slot-scope="text">{{ text }}</a>
    <a slot="handleResponse" slot-scope="text">{{ text }}</a>
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
  },
  computed: {
    ...mapGetters({
      pageData: 'base/pageData',
    }),
    columns() {
      const {
        pageData: { pagination },
      } = this
      return [
        {
          title: '序号',
          dataIndex: 'no',
          width: '8%',
          customRender: (text, record, index) => {
            return index + 1 + (pagination.current - 1) * pagination.pageSize
          },
        },
        {
          title: '操作账号',
          dataIndex: 'accountName',
          width: '12%',
        },
        {
          title: '操作模块',
          dataIndex: 'handleModule',
          width: '12%',
        },
        {
          title: '操作方法',
          dataIndex: 'handleMethod',
          width: '12%',
        },
        {
          title: '操作结果',
          dataIndex: 'handleResult',
          width: '8%',
        },
        {
          title: '操作入参',
          dataIndex: 'handleParams',
          width: '12%',
          ellipsis: true,
          scopedSlots: { customRender: 'handleParams' },
        },
        {
          title: '操作返回',
          dataIndex: 'handleResponse',
          width: '16%',
          ellipsis: true,
          scopedSlots: { customRender: 'handleResponse' },
        },
        {
          title: '操作异常',
          width: '8%',
          dataIndex: 'handleException',
        },
        {
          title: '操作时间',
          width: '12%',
          dataIndex: 'handleDate',
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
        url: '/handleLog/findByPage',
        current: pagination.current,
        size: pagination.pageSize,
        ...filters,
        ...formValues,
      }
      this.getPage(params)
    },
  },
}
</script>

<style scoped></style>
