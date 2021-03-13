<template>
  <a-card>
    <table-list
      :loading="loading"
      :list="list"
      @handleModalOpen="handleModalOpen"
      @handleDelete="handleDelete"
      @handleMove="handleMove"
    />
    <common-modal-form
      :visible="visible"
      :form-data="formData"
      :save-url="['/resource/create', '/resource/update']"
      :form-items="formItems"
      :initial-values="configData.initialValues"
      :handle-callback="handleCallback"
      :handle-cancel="handleCancel"
    />
  </a-card>
</template>

<script>
import TableList from './TableList'
import CommonModalForm from '../../../components/Momiolo/CommonModalForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Resource',
  components: {
    'common-modal-form': CommonModalForm,
    'table-list': TableList,
  },
  data() {
    return {
      TYPE: [
        { value: 1, label: '菜单' },
        { value: 2, label: '路由' },
        { value: 3, label: '按钮' },
      ],
      list: [],
      visible: false,
      formData: {},
      configData: {
        resourceParentOptions: [],
        resourceTypeOptions: [],
        initialValues: {},
      },
      resourceType: undefined,
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getData'],
    }),
    formItems() {
      const { configData, formData, resourceType, onSelectChange } = this
      return [
        {
          key: 'resourceParentSid',
          title: '资源上级',
          type: 'select',
          rules: [{ required: true }],
          readOnly: [true, true],
          selectOptions: configData.resourceParentOptions,
          hide: Object.keys(formData).length,
        },
        {
          key: 'resourceName',
          title: '资源名称',
          type: 'input',
          rules: [
            { required: true, message: '请输入资源名称' },
            { max: 10, message: '最大字符长度10' },
          ],
          maxLength: 10,
        },
        {
          key: 'resourceCode',
          title: '资源编码',
          type: 'input',
          rules: [
            { required: true, message: '请输入资源编码' },
            { max: 45, message: '最大字符长度45' },
          ],
          readOnly: [false, true],
          maxLength: 45,
        },
        {
          key: 'resourceType',
          title: '资源类型',
          type: 'select',
          rules: [{ required: true, message: '请选择资源类型' }],
          readOnly: [false, true],
          selectOptions: configData.resourceTypeOptions,
          onSelectChange: (v) => onSelectChange(v),
        },
        {
          key: 'resourceIcon',
          title: '资源图标',
          type: 'input',
          rules: [{ max: 20, message: '最大字符长度20' }],
          hide: resourceType === 3 || resourceType === 2,
          maxLength: 20,
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      getData: 'base/getData',
      postData: 'base/postData',
    }),
    onSelectChange(v) {
      this.resourceType = v
    },
    handleSearch() {
      this.getData({ url: '/resource/findMenuTree' }).then((res) => {
        this.list = res.data
      })
    },
    handleDelete(record) {
      this.postData({ url: '/resource/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch()
      })
    },
    handleMove(record, type) {
      // type  =>  up  down
      this.postData({ url: '/resource/move', sid: record.sid, type }).then((res) => {
        this.$message.success(type === 'up' ? '上移成功' : '下移成功')
        this.handleSearch()
      })
    },
    handleModalOpen(record, type) {
      const { TYPE, list, getType } = this
      if (type === 'create') {
        this.visible = true
        this.configData = {
          resourceParentOptions: [{ value: record.sid, label: record.resourceName }],
          resourceTypeOptions: getType(record),
          initialValues: { resourceParentSid: record.sid },
        }
      } else if (type === 'update') {
        this.visible = true
        this.formData = record
        this.configData = {
          ...this.configData,
          resourceTypeOptions: this.TYPE,
        }
      } else if (type === 'firstLevel') {
        this.visible = true
        this.configData = {
          resourceParentOptions: [{ value: list?.[0]?.['resourceParentSid'], label: '根资源' }],
          resourceTypeOptions: TYPE.slice(0, 1),
          initialValues: { resourceParentSid: list?.[0]?.['resourceParentSid'] },
        }
      }
    },
    handleCallback() {
      this.handleSearch()
    },
    handleCancel() {
      this.visible = false
      this.formData = {}
      this.resourceType = undefined
    },
    getType(record) {
      const { TYPE } = this
      if (record.resourceType === 1) {
        // 不存在菜单/路由/按钮
        if (!record?.children?.length && !record?.buttonChildren?.length) {
          return TYPE
        }
        // 存在菜单/路由
        if (record?.children?.length && !record?.buttonChildren?.length) {
          return TYPE.slice(0, 2)
        }
        // 存在按钮
        if (!record?.children?.length && record?.buttonChildren?.length) {
          return TYPE.slice(2, 3)
        }
      } else if (record.resourceType === 2) {
        return TYPE.slice(2, 3)
      } else {
        return []
      }
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
