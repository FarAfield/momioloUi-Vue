<template>
  <a-card>
    <common-search-form
      :search-items="searchItems"
      :fetch-params="fetchParams"
      :save-form-values="handleSaveFormValues"
      :handle-form-reset="handleFormReset"
      :handle-fields-value="handleFieldsValue"
    >
    </common-search-form>
    <table-list :form-values="formValues" @onOpen="onOpen"> </table-list>
    <content-modal v-bind="contentConfig" @onCancel="onCancel"> </content-modal>
  </a-card>
</template>

<script>
import TableList from './TableList'
import CommonSearchForm from '../../../components/Momiolo/CommonSearchForm'
import ContentModal from './ContentModal'
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'HandleLog',
  components: {
    'common-search-form': CommonSearchForm,
    'table-list': TableList,
    'content-modal': ContentModal,
  },
  data() {
    return {
      formValues: {},
      contentConfig: { title: '', visible: false, text: {} },
    }
  },
  computed: {
    searchItems() {
      return [
        {
          title: '操作账号',
          type: 'input',
          key: 'accountName',
        },
        {
          title: '操作模块',
          type: 'input',
          key: 'handleModule',
        },
        {
          title: '操作方法',
          type: 'input',
          key: 'handleMethod',
        },
        {
          title: '操作结果',
          type: 'select',
          key: 'handleResult',
          selectOptions: [
            { value: '0', label: '成功' },
            { value: '1', label: '失败' },
            { value: '2', label: '异常' },
          ],
        },
        {
          title: '操作入参',
          type: 'input',
          key: 'handleParams',
        },
        {
          type: 'blank',
          key: 'blank1',
          span: 8,
        },
        {
          title: '操作时间',
          type: 'rangePicker',
          key: 'handleDateRange',
          span: 12,
          showTime: true,
        },
        {
          type: 'blank',
          key: 'blank2',
          span: 4,
        },
      ]
    },
    fetchParams() {
      return { type: 'base/getPage', url: '/handleLog/findByPage' }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
    }),
    handleSearch() {
      this.getPage({ url: '/handleLog/findByPage', ...this.formValues })
    },
    handleSaveFormValues(v) {
      this.formValues = { ...this.formValues, ...v }
    },
    handleFormReset() {
      this.formValues = {}
    },
    onOpen({ title, text }) {
      this.contentConfig = { title, visible: true, text }
    },
    onCancel() {
      this.contentConfig = { title: '', visible: false, text: {} }
    },
    handleFieldsValue(values) {
      if (values?.handleDateRange?.length) {
        values.startTime = moment(values.handleDateRange[0]).format('YYYY-MM-DD HH:mm:ss')
        values.endTime = moment(values.handleDateRange[1]).format('YYYY-MM-DD HH:mm:ss')
        delete values.handleDateRange
      }
      return values
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
