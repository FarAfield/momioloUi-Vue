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
      <a-button @click="handleModalOpen()" icon="plus" type="primary" v-action="'dataDictionary_create'"> 新增 </a-button>
    </div>
    <table-list :form-values="formValues" @handleModalOpen="handleModalOpen" @handleDelete="handleDelete" />
    <common-modal-form
      :visible="visible"
      :form-data="formData"
      :save-url="['/dataDictionary/create', '/dataDictionary/update']"
      :form-items="formItems"
      :handle-callback="handleCallback"
      :handle-cancel="handleCancel"
    />
  </a-card>
</template>

<script>
import TableList from './TableList'
import CommonModalForm from '../../../components/Momiolo/CommonModalForm'
import CommonSearchForm from '../../../components/Momiolo/CommonSearchForm'
import { mapActions } from 'vuex'
export default {
  name: 'DataDictionary',
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
    searchItems() {
      return [
        {
          key: 'rootName',
          title: '根名称',
          type: 'input',
        },
        {
          key: 'dictCode',
          title: '字典编码',
          type: 'input',
        },
        {
          key: 'dictKey',
          title: '字典key',
          type: 'input',
        },
        {
          key: 'dictValue',
          title: '字典value',
          type: 'input',
        },
        {
          key: 'dictDesc',
          title: '字典描述',
          type: 'input',
        },
      ]
    },
    fetchParams() {
      return { type: 'base/getPage', url: '/dataDictionary/findByPage' }
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
    handleCallback() {
      this.handleSearch(this.formValues)
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
      this.postData({ url: '/dataDictionary/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch(this.formValues)
      })
    },
    handleModalOpen(record = {}) {
      this.visible = true
      this.formData = record
    },

  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style lang="less" scoped>
.add-button {
  display: flex;
  margin-bottom: 12px;
}
</style>
