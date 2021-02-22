<template>
  <a-card>
    <search-form @handleSaveFormValues="handleSaveFormValues" @handleFormReset="handleFormReset" />
    <table-list :formValues="formValues" />
  </a-card>
</template>

<script>
import SearchForm from './SearchForm'
import TableList from './TableList'
import { mapActions } from 'vuex'
export default {
  name: 'HandleLog',
  components: {
    'search-form': SearchForm,
    'table-list': TableList,
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
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
