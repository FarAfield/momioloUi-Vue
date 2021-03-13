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
      <a-button @click="handleJumpPage({}, 'create')" icon="plus" type="primary" v-action="'role_create'">
        新增
      </a-button>
    </div>
    <table-list
      :loading="loading"
      :form-values="formValues"
      @handleDelete="handleDelete"
      @handleJumpPage="handleJumpPage"
    />
  </a-card>
</template>

<script>
import TableList from './TableList'
import CommonSearchForm from '../../../components/Momiolo/CommonSearchForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Role',
  components: {
    'common-search-form': CommonSearchForm,
    'table-list': TableList,
  },
  data() {
    return {
      formValues: {},
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getPage'],
    }),
    searchItems() {
      const STATUS = [
        { value: '0', label: '正常' },
        { value: '1', label: '锁定' },
      ]
      return [
        {
          key: 'roleName',
          title: '角色名称',
          type: 'input',
        },
        {
          key: 'roleStatus',
          title: '角色状态',
          type: 'select',
          selectOptions: STATUS,
        },
      ]
    },
    fetchParams() {
      return { type: 'base/getPage', url: '/role/findByPage' }
    },
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postData: 'base/postData',
    }),
    handleSearch() {
      this.getPage({ url: '/role/findByPage', ...this.formValues })
    },
    handleSaveFormValues(v) {
      this.formValues = { ...this.formValues, ...v }
    },
    handleFormReset() {
      this.formValues = {}
    },
    handleDelete(record) {
      this.postData({ url: '/role/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch()
      })
    },
    handleJumpPage(record, type) {
      if (type === 'create') {
        this.$router.push({ path: '/system/updateRole' })
      } else if (type === 'update') {
        this.$router.push({ path: '/system/updateRole', query: { sid: record.sid } })
      } else if (type === 'detail') {
        this.$router.push({ path: '/system/updateRole', query: { sid: record.sid, disabled: true } })
      }
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
