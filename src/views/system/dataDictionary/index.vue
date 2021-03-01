<template>
  <a-card>
    <search-form @handleSaveFormValues="handleSaveFormValues" @handleFormReset="handleFormReset" />
    <div class="add-button">
      <a-button @click="handleOpen()" icon="plus" type="primary" v-action="'dataDictionary_create'"> 新增 </a-button>
    </div>
    <table-list :formValues="formValues" @handleEdit="handleEdit" @handleDelete="handleDelete" />
    <modal-form :visible="visible" :formData="formData" @handleCancel="handleCancel" @handleOk="handleOk" />
  </a-card>
</template>

<script>
import SearchForm from './SearchForm'
import TableList from './TableList'
import ModalForm from './ModalForm'
import { mapActions } from 'vuex'
export default {
  name: 'DataDictionary',
  components: {
    'search-form': SearchForm,
    'table-list': TableList,
    'modal-form': ModalForm,
  },
  data() {
    return {
      formValues: {},
      visible: false,
      formData: {},
    }
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
    handleOk(values) {
      const params = {
        url: this.formData.sid ? '/dataDictionary/update' : '/dataDictionary/create',
        ...this.formData,
        ...values,
      }
      this.postData(params).then((res) => {
        this.$message.success(this.formData.sid ? '编辑成功' : '新增成功')
        this.handleCancel()
        this.handleSearch(this.formValues)
      })
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
