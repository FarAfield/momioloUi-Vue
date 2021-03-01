<template>
  <a-modal :title="formData.sid ? '编辑' : '新增'" :visible="visible" @cancel="handleCancel">
    <div slot="footer" class="saveAndCancel">
      <a-button key="back" @click="handleCancel" icon="close"> 取消 </a-button>
      <a-button key="ok" @click="handleOk" type="primary" icon="check"> 保存 </a-button>
    </div>
    <a-form :form="form" v-bind="formItemLayout">
      <a-form-item label="根名称">
        <a-input
          v-decorator="['rootName', { rules: [{ max: 20, message: '最大字符长度20' }] }]"
          :maxLength="20"
          :disabled="!!formData.sid"
        />
      </a-form-item>
      <a-form-item label="字典编码">
        <a-input
          v-decorator="[
            'dictCode',
            {
              rules: [
                { required: true, message: '请输入字典编码' },
                { max: 20, message: '最大字符长度20' },
              ],
            },
          ]"
          :maxLength="20"
          :disabled="!!formData.sid"
        />
      </a-form-item>
      <a-form-item label="字典key">
        <a-input
          v-decorator="[
            'dictKey',
            {
              rules: [
                { required: true, message: '请输入字典key' },
                { max: 20, message: '最大字符长度20' },
              ],
            },
          ]"
          :maxLength="20"
        />
      </a-form-item>
      <a-form-item label="字典value">
        <a-input
          v-decorator="[
            'dictValue',
            {
              rules: [
                { required: true, message: '请输入字典value' },
                { max: 200, message: '最大字符长度200' },
              ],
            },
          ]"
          :maxLength="200"
        />
      </a-form-item>
      <a-form-item label="字典描述">
        <a-input v-decorator="['dictDesc', { rules: [{ max: 200, message: '最大字符长度200' }] }]" :maxLength="200" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { filterObj } from '../../../utils/util'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}
export default {
  name: 'ModalForm',
  props: {
    visible: Boolean,
    formData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        this.$emit('handleOk', values)
      })
    },
    handleCancel() {
      this.$emit('handleCancel')
    },
  },
  watch: {
    formData(val) {
      if (this.visible) {
        const result = filterObj(val, ['rootName', 'dictCode', 'dictKey', 'dictValue', 'dictDesc'])
        setTimeout(() => {
          this.form.setFieldsValue(result)
        }, 100)
      } else {
        this.form.resetFields()
      }
    },
  },
}
</script>

<style type="less" scoped>
.saveAndCancel {
  text-align: center;
  button {
    margin-right: 12px;
  }
}
</style>
