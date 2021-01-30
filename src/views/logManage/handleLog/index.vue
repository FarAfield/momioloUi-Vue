<template>
  <div>
    <common-table :tableProps="tableProps" :fetchParams="fetchParams"></common-table>
  </div>
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
    return {}
  },
  computed: {
    ...mapGetters({
      pageData: 'base/pageData',
    }),
    columns() {
      return [
        {
          title: '序号',
          dataIndex: 'no',
          width: '8%',
          customRender: (text, record, index) => {
            return index + 1 + (this.pageData.pagination.current - 1) * this.pageData.pagination.pageSize
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
          // customRender: (text) => <a onClick={() => handleDetailParams(text)}>{text}</a>,
        },
        {
          title: '操作返回',
          dataIndex: 'handleResponse',
          width: '16%',
          ellipsis: true,
          // customRender: (text) => <a onClick={() => handleDetailResult(text)}>{text}</a>,
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
      return {
        showSizeChanger: true,
        showQuickJumper: true,
        ...this.pageData.pagination,
        showTotal: () => (
          <span>
            共&nbsp;{this.pageData.pagination.total === undefined ? 0 : this.pageData.pagination.total}&nbsp;条
          </span>
        ),
      }
    },
    tableProps() {
      return {
        columns: this.columns,
        dataSource: this.pageData.list,
        pagination: this.paginationProps,
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
  created() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
