<template>
  <a-card>
    <search-form @handleSaveFormValues="handleSaveFormValues" @handleFormReset="handleFormReset" />
    <div class="add-button">
      <a-button @click="handleOpen()" icon="plus" type="primary" v-action="'dataDictionary_create'"> 新增 </a-button>
    </div>
    <table-list :formValues="formValues" @handleEdit="handleEdit" @handleDelete="handleDelete" />
    <common-modal-form
      :visible="visible"
      :formData="formData"
      :saveUrl="['/dataDictionary/create', '/dataDictionary/update']"
      :formItems="formItems"
      :handleCallback="handleSearch(formValues)"
      :handleCancel="handleCancel"
    />
  </a-card>
</template>

<script>
import SearchForm from './SearchForm'
import TableList from './TableList'
import CommonModalForm from '../../../components/Momiolo/CommonModalForm'
import { mapActions } from 'vuex'
export default {
  name: 'DataDictionary',
  components: {
    'search-form': SearchForm,
    'table-list': TableList,
    'common-modal-form': CommonModalForm,
  },
  data() {
    return {
      formValues: {},
      visible: false,
      formData: {},
    }
  },
  computed: {
    formItems() {
      return [
        {
          key: 'rootName',
          title: '根名称',
          type: 'input',
          rules: [{ max: 20, message: '最大字符长度20' }],
          maxLength: 20,
          readOnly: [false, true],
        },
        {
          key: 'dictCode',
          title: '字典编码',
          type: 'input',
          rules: [
            { required: true, message: '请输入字典编码' },
            { max: 20, message: '最大字符长度20' },
          ],
          maxLength: 20,
          readOnly: [false, true],
        },
        {
          key: 'dictKey',
          title: '字典key',
          type: 'input',
          rules: [
            { required: true, message: '请输入字典key' },
            { max: 20, message: '最大字符长度20' },
          ],
          maxLength: 20,
        },
        {
          key: 'dictValue',
          title: '字典value',
          type: 'input',
          rules: [
            { required: true, message: '请输入字典value' },
            { max: 200, message: '最大字符长度200' },
          ],
        },
        {
          key: 'dictDesc',
          title: '字典描述',
          type: 'textArea',
          rules: [{ max: 200, message: '最大字符长度200' }],
          maxLength: 200,
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postData: 'base/postData',
    }),
    handleSearch(params = {}) {
      this.getPage({ url: '/dataDictionary/findByPage', ...params })
    },
    handleSaveFormValues(v) {
      this.formValues = v
      this.handleSearch(v)
    },
    handleFormReset() {
      this.formValues = {}
      this.handleSearch()
    },
    handleEdit(record) {
      this.handleOpen(record)
    },
    handleDelete(record) {
      this.postData({ url: '/dataDictionary/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch(this.formValues)
      })
    },
    handleOpen(record = {}) {
      this.visible = true
      this.formData = record
    },
    handleCancel() {
      this.visible = false
      this.formData = {}
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style type="less" scoped>
.add-button {
  display: flex;
  margin-bottom: 12px;
}
</style>
