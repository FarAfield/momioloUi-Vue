<template>
  <a-card>
    <search-form @handleSaveFormValues="handleSaveFormValues" @handleFormReset="handleFormReset" />
    <table-list :form-values="formValues" @onOpen="onOpen" />
    <content-modal v-bind="contentConfig" @onCancel="onCancel" />
  </a-card>
</template>

<script>
import SearchForm from './SearchForm'
import TableList from './TableList'
import ContentModal from './ContentModal'
import { mapActions } from 'vuex'
export default {
  name: 'HandleLog',
  components: {
    'search-form': SearchForm,
    'table-list': TableList,
    'content-modal': ContentModal,
  },
  data() {
    return {
      formValues: {},
      contentConfig: { title: '', visible: false, text: {} },
    }
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
    }),
    handleSearch(params = {}) {
      this.getPage({ url: '/handleLog/findByPage', ...params })
    },
    handleSaveFormValues(v) {
      this.formValues = v
      this.handleSearch(v)
    },
    handleFormReset() {
      this.formValues = {}
      this.handleSearch()
    },
    onOpen({ title, text }) {
      this.contentConfig = { title, visible: true, text }
    },
    onCancel() {
      this.contentConfig = { title: '', visible: false, text: {} }
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
