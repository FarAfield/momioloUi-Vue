<template>
  <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="操作账号">
          <a-input v-decorator="['accountName']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="操作模块">
          <a-input v-decorator="['handleModule']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="操作方法">
          <a-input v-decorator="['handleMethod']" placeholder="请输入" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="操作结果">
          <a-select v-decorator="['handleResult']" placeholder="请选择">
            <a-select-option value="0"> 成功 </a-select-option>
            <a-select-option value="1"> 失败 </a-select-option>
            <a-select-option value="2"> 异常 </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="操作入参">
          <a-input v-decorator="['handleParams']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item class="search" :wrapper-col="{ span: 20 }">
          <a-button type="primary" icon="search" html-type="submit"> 查询 </a-button>
          <a-button icon="reload" @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    handleSaveFormValues: {
      type: Function,
      default: () => {},
    },
    handleFormReset: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        this.handleSaveFormValues(values)
      })
    },
    handleReset() {
      this.form.resetFields()
      this.handleFormReset()
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  text-align: right;
  button:first-of-type {
    margin-right: 12px;
  }
}
</style>
