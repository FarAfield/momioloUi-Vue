<template>
  <a-table v-bind="tableProps" @change="change">
    <span slot="accountStatus" slot-scope="text">
      <a-badge v-if="text === 0" status="success" text="正常" />
      <a-badge v-else-if="text === 1" status="error" text="锁定" />
    </span>
    <span slot="roleName" slot-scope="text">
      <template v-if="text">
        <a-tag
          v-for="(t, index) in text.split(',')"
          :key="index"
          color="purple"
          style="
             {
              margin: 2px 4px;
            }
          "
          >{{ t }}</a-tag
        >
      </template>
    </span>
    <span slot="orgName" slot-scope="text">
      <template v-if="text">
        <a-tag color="green">{{ text }}</a-tag>
      </template>
    </span>
    <span slot="action" slot-scope="text, record" class="action-btns">
      <template>
        <a-button ghost type="primary" @click="handleEdit(record)" v-action="'account_update'" size="small">
          编辑
        </a-button>
        <a-popconfirm
          v-if="record.accountStatus !== 1"
          title="是否确认锁定？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleLock(record)"
          v-action="'account_lock'"
        >
          <a-button ghost type="primary" size="small"> 锁定 </a-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="record.accountStatus !== 0"
          title="是否确认解锁？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleUnlock(record)"
          v-action="'account_unlock'"
        >
          <a-button ghost type="primary" size="small"> 解锁 </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="该账号的密码将会被重置为123456，是否确认？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleReset(record)"
          v-action="'account_reset'"
        >
          <a-button ghost type="primary" size="small"> 重置密码 </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="是否确认删除？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
          v-action="'account_delete'"
        >
          <a-button ghost type="danger" size="small"> 删除 </a-button>
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
  },
  computed: {
    ...mapGetters({
      pageData: 'base/pageData',
    }),
    columns() {
      return [
        {
          title: '登录账号',
          dataIndex: 'accountName',
          width: '12%',
        },
        {
          title: '账号名称（昵称）',
          dataIndex: 'userName',
          width: '12%',
        },
        {
          title: '账号状态',
          dataIndex: 'accountStatus',
          width: '10%',
          scopedSlots: { customRender: 'accountStatus' },
        },
        {
          title: '所属角色',
          dataIndex: 'roleName',
          width: '12%',
          scopedSlots: { customRender: 'roleName' },
        },
        {
          title: '所属组织',
          dataIndex: 'orgName',
          width: '12%',
          scopedSlots: { customRender: 'orgName' },
        },
        {
          title: '手机号',
          dataIndex: 'userMobile',
          width: '12%',
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
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
    change(pagination, filters, sorter) {
      const { formValues } = this
      const params = {
        url: '/account/findByPage',
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
    handleLock(record) {
      this.$emit('handleLock', record)
    },
    handleUnlock(record) {
      this.$emit('handleUnlock', record)
    },
    handleReset(record) {
      this.$emit('handleReset', record)
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
