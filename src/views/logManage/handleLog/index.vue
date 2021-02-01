<template>
  <common-table :tableProps="tableProps" :fetchParams="fetchParams">
    <a slot="handleParams" slot-scope="text">{{ text }}</a>
    <a slot="handleResponse" slot-scope="text">{{ text }}</a>
  </common-table>
</template>

<script>
import CommonTable from '../../../components/Momiolo/CommonTable'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HandleLog',
  components: {
    'common-table': CommonTable,
  },
  data() {
    return {
      formValues: {},
      contentConfig: { title: '', visible: false, text: {} },
    }
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
        showTotal: () => <span>共&nbsp;{pagination.total === undefined ? 0 : pagination.total}&nbsp;条</span>,
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
    fetchParams() {
      return {
        type: 'base/getPage',
        url: '/handleLog/findByPage',
      }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
    }),
    handleSearch() {
      this.getPage({ url: '/handleLog/findByPage' })
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
