<template>
  <a-table
    :columns="tableProps.columns"
    :dataSource="tableProps.dataSource"
    :loading="tableProps.loading"
    :pagination="tableProps.pagination"
    :rowKey="tableProps.rowKey"
    @change="change"
  >
  </a-table>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CommonTable',
  props: {
    fetchParams: {
      type: Object,
      default() {
        return { type: '', url: '', extraArgs: {} }
      },
    },
    formValues: {
      type: Object,
      default() {
        return {}
      },
    },
    tableProps: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postPage: 'base/postPage',
    }),
    change(pagination, filters, sorter) {
      const params = {
        url: this.fetchParams.url,
        current: pagination.current,
        size: pagination.pageSize,
        ...this.formValues,
        ...filters,
        ...this.extraArgs,
      }
      if (this.fetchParams.type.includes('getPage')) {
        this.getPage(params)
      } else if (this.fetchParams.type.includes('postPage')) {
        this.postPage(params)
      }
    },
  },
}
</script>

<style scoped></style>
