<template>
  <a-card>
    <common-search-form
      :search-items="searchItems"
      :fetch-params="fetchParams"
      :save-form-values="handleSaveFormValues"
      :handle-form-reset="handleFormReset"
    >
    </common-search-form>
    <div class="add-button">
      <a-button @click="handleModalOpen()" icon="plus" type="primary" v-action="'account_create'"> 新增 </a-button>
    </div>
    <table-list
      :form-values="formValues"
      @handleModalOpen="handleModalOpen"
      @handleDelete="handleDelete"
      @handleLock="handleLock"
      @handleUnlock="handleUnlock"
      @handleReset="handleReset"
    />
    <common-modal-form
      :visible="visible"
      :form-data="formData"
      :save-url="['/account/create', '/account/update']"
      :form-items="formItems"
      :handle-callback="handleCallback"
      :handle-cancel="handleCancel"
      :handle-fields-value="handleFieldsValue"
      :map-props-to-fields="mapPropsToFields"
    />
  </a-card>
</template>

<script>
import TableList from './TableList'
import CommonModalForm from '../../../components/Momiolo/CommonModalForm'
import CommonSearchForm from '../../../components/Momiolo/CommonSearchForm'
import { mapActions } from 'vuex'
import md5 from 'md5'
export default {
  name: 'Account',
  components: {
    'common-search-form': CommonSearchForm,
    'common-modal-form': CommonModalForm,
    'table-list': TableList,
  },
  data() {
    return {
      formValues: {},
      visible: false,
      formData: {},
      roleOption: [],
      orgTree: [],
    }
  },
  computed: {
    formItems() {
      return [
        {
          key: 'accountName',
          title: '登录账号',
          type: 'input',
          rules: [
            { required: true, message: '请输入登录账号' },
            { pattern: /^[0-9A-Za-z]{6,20}$/, message: '账号必须为6-20位数字或字母，区分大小写' },
          ],

          maxLength: 20,
          readOnly: [false, true],
        },
        {
          key: 'accountPassword',
          title: '登录密码',
          type: 'input',
          rules: [
            { required: true, message: '请输入登录密码' },
            { pattern: /^[0-9A-Za-z]{6,12}$/, message: '密码必须为6-12位数字或字母，区分大小写' },
          ],
          maxLength: 12,
          hide: Object.keys(this.formData).length,
        },
        {
          key: 'orgSid',
          title: '组织',
          type: 'treeSelect',
          rules: [{ required: true, message: '请选择组织' }],
          treeData: this.orgTree,
        },
        {
          key: 'roleSid',
          title: '角色',
          type: 'select',
          mode: 'multiple',
          rules: [{ required: true, message: '请选择角色' }],
          selectOptions: this.roleOption,
          keyValue: ['sid', 'roleName'],
        },
      ]
    },
    searchItems() {
      return [
        {
          key: 'accountName',
          title: '登陆账号',
          type: 'input',
        },
        {
          key: 'userName',
          title: '账号名称',
          type: 'input',
        },
        {
          key: 'accountStatus',
          title: '账号状态',
          type: 'select',
          selectOptions: [
            { value: '0', label: '正常' },
            { value: '1', label: '锁定' },
          ],
        },
        {
          key: 'roleName',
          title: '所属角色',
          type: 'select',
          selectOptions: this.roleOption,
          keyValue: ['roleName', 'roleName'],
        },
        {
          key: 'orgName',
          title: '所属组织',
          type: 'input',
        },
        {
          key: 'userMobile',
          title: '手机号码',
          type: 'input',
        },
      ]
    },
    fetchParams() {
      return { type: 'base/getPage', url: '/account/findByPage' }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postData: 'base/postData',
      getDataWithRes: 'base/getDataWithRes',
    }),
    transferTree(list = []) {
      return list.map((item) => {
        const obj = {}
        obj.title = item.orgName
        obj.value = item.sid
        if (item.orgChildList?.length) {
          obj.children = this.transferTree(item.orgChildList)
        }
        return obj
      })
    },
    handleSearch() {
      this.getPage({ url: '/account/findByPage', ...this.formValues })
    },
    handleGetOption() {
      this.getDataWithRes({ url: '/role/findRoleList' }).then((res) => {
        if (res.statusCode === '0') {
          this.roleOption = res.data
        }
      })
      this.getDataWithRes({ url: '/org/findOrgTree' }).then((res) => {
        if (res.statusCode === '0') {
          this.orgTree = this.transferTree([res.data])
        }
      })
    },
    handleCallback() {
      this.handleSearch()
    },
    handleCancel() {
      this.visible = false
      this.formData = {}
    },
    handleSaveFormValues(v) {
      this.formValues = { ...this.formValues, ...v }
    },
    handleFormReset() {
      this.formValues = {}
    },
    handleDelete(record) {
      this.postData({ url: '/account/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch()
      })
    },
    handleModalOpen(record = {}) {
      this.visible = true
      this.formData = record
    },
    handleFieldsValue(values) {
      if (Object.keys(this.formData).length === 0) {
        values.accountPassword = md5(values.accountPassword)
      }
      return values
    },
    mapPropsToFields(values) {
      values.roleSid = values?.roleSid?.split(',')?.map(Number) || []
      return values
    },
    handleLock(record) {
      this.postData({ url: '/account/lock', sid: record.sid }).then((res) => {
        this.$message.success('锁定成功')
        this.handleSearch()
      })
    },
    handleUnlock(record) {
      this.postData({ url: '/account/unlock', sid: record.sid }).then((res) => {
        this.$message.success('解锁成功')
        this.handleSearch()
      })
    },
    handleReset(record) {
      this.postData({ url: '/account/resetPassword', sid: record.sid, accountPassword: md5('123456') }).then((res) => {
        this.$message.success('重置密码成功')
        this.handleSearch()
      })
    },
  },
  mounted() {
    this.handleSearch()
    this.handleGetOption()
  },
}
</script>

<style lang="less" scoped>
.add-button {
  display: flex;
  margin-bottom: 12px;
}
</style>
