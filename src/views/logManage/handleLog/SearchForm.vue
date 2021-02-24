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
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12" style="margin-left: -4%">
        <a-form-item label="操作时间">
          <a-range-picker
            :show-time="{ format: 'HH:mm:ss' }"
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            v-decorator="['rangeTime']"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8" :offset="4">
        <a-form-item class="search" :wrapper-col="{ span: 20 }">
          <a-button type="primary" icon="search" html-type="submit"> 查询 </a-button>
          <a-button icon="reload" @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment'
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
        if (values?.rangeTime?.length) {
          values.startTime = moment(values.rangeTime[0]).format('YYYY-MM-DD HH:mm:ss')
          values.endTime = moment(values.rangeTime[1]).format('YYYY-MM-DD HH:mm:ss')
          delete values.rangeTime
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
