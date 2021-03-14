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
      <a-button @click="handleModalOpen()" icon="plus" type="primary" v-action="'notice_create'"> 新增 </a-button>
    </div>
    <table-list
      :loading="loading"
      :form-values="formValues"
      @handleModalOpen="handleModalOpen"
      @handleDelete="handleDelete"
    />
    <common-modal-form
      :visible="visible"
      :form-data="formData"
      :save-url="['/notice/create', '/notice/update']"
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
import { mapActions, mapState } from 'vuex'
const TYPE = [
  { value: '1', label: '类型一' },
  { value: '2', label: '类型二' },
  { value: '3', label: '类型三' },
]
export default {
  name: 'Notice',
  components: {
    'common-search-form': CommonSearchForm,
    'common-modal-form': CommonModalForm,
    'table-list': TableList,
  },
  data() {
    return {
      TYPE,
      formValues: {},
      visible: false,
      formData: {},
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getPage'],
    }),
    formItems() {
      return [
        {
          key: 'title',
          title: '公告标题',
          type: 'input',
          rules: [
            { required: true, message: '请输入公告标题' },
            { max: 50, message: '最大字符长度50' },
          ],
        },
        {
          key: 'type',
          title: '公告类型',
          type: 'select',
          rules: [{ required: true, message: '请选择公告类型' }],
          selectOptions: this.TYPE,
        },
        {
          key: 'content',
          title: '公告内容',
          type: 'textArea',
          rules: [{ max: 500, message: '最大字符长度500' }],
        },
      ]
    },
    searchItems() {
      return [
        {
          key: 'title',
          title: '公告标题',
          type: 'input',
        },
        {
          key: 'type',
          title: '公告类型',
          type: 'select',
          selectOptions: this.TYPE,
        },
      ]
    },
    fetchParams() {
      return { type: 'base/getPage', url: '/notice/findByPage' }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postData: 'base/postData',
    }),
    handleSearch() {
      this.getPage({ url: '/notice/findByPage', ...this.formValues })
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
      this.postData({ url: '/notice/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch()
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
