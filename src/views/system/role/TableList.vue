<template>
  <a-table v-bind="tableProps" @change="change" :loading="loading">
    <span slot="roleStatus" slot-scope="text">
      <a-badge
        :status="text ? 'error' : 'success'"
        :text="
          getValueByKey(
            [
              { value: '0', label: '正常' },
              { value: '1', label: '锁定' },
            ],
            ['value', 'label'],
            String(text)
          )
        "
      >
      </a-badge>
    </span>
    <span slot="action" slot-scope="text, record" class="action-btns">
      <template>
        <a-button
          :ghost="true"
          type="primary"
          @click="handleJumpPage(record, 'update')"
          v-action="'role_update'"
          size="small"
        >
          编辑
        </a-button>
        <a-button
          :ghost="true"
          type="primary"
          @click="handleJumpPage(record, 'detail')"
          v-action="'role_detail'"
          size="small"
        >
          详情
        </a-button>
        <a-popconfirm
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
          v-action="'role_delete'"
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
          title: '角色名称',
          dataIndex: 'roleName',
          width: '15%',
        },
        {
          title: '角色简介',
          dataIndex: 'roleDesc',
          width: '25%',
          ellipsis: true,
        },
        {
          title: '角色状态',
          dataIndex: 'roleStatus',
          width: '10%',
          scopedSlots: { customRender: 'roleStatus' },
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
    getValueByKey,
    change(pagination, filters, sorter) {
      const { formValues } = this
      const params = {
        url: '/role/findByPage',
        current: pagination.current,
        size: pagination.pageSize,
        ...filters,
        ...formValues,
      }
      this.getPage(params)
    },
    handleJumpPage(record, type) {
      this.$emit('handleJumpPage', record, type)
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
