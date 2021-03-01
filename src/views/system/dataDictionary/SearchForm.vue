<template>
  <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="根名称">
          <a-input v-decorator="['rootName']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="字典编码">
          <a-input v-decorator="['dictCode']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="字典key">
          <a-input v-decorator="['dictKey']" placeholder="请输入" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="字典value">
          <a-input v-decorator="['dictValue']" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="字典描述">
          <a-input v-decorator="['dictDesc']" placeholder="请输入" />
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
        this.$emit('handleSaveFormValues', values)
      })
    },
    handleReset() {
      this.form.resetFields()
      this.$emit('handleFormReset')
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
