<template>
  <a-table v-bind="tableProps" @change="change"> </a-table>
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
      const {
        fetchParams: { type, url, extraArgs },
        formValues,
      } = this
      const params = {
        url,
        current: pagination.current,
        size: pagination.pageSize,
        ...filters,
        ...formValues,
        ...extraArgs,
      }
      if (type.includes('getPage')) {
        this.getPage(params)
      } else if (type.includes('postPage')) {
        this.postPage(params)
      }
    },
  },
}
</script>

<style scoped></style>
