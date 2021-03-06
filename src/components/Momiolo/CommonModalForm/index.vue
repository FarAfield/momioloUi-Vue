<template>
  <a-modal :title="modalTitle" :visible="visible" @cancel="onCancel" :footer="false">
    <a-form :form="form" v-bind="formItemLayout">
      <template v-for="item in formItems">
        <a-form-item :key="item.key" v-if="item.type === 'input' && !item.hide" :label="item.title">
          <a-input
            v-decorator="[`${item.key}`, { rules: item.rules || [] }]"
            :maxLength="item.maxLength || null"
            allowClear
            :placeholder="`请输入${typeof item.title === 'string' ? item.title : ''}`"
            :disabled="item.readOnly ? (Object.keys(formData).length ? item.readOnly[1] : item.readOnly[0]) : false"
          >
          </a-input>
        </a-form-item>
        <a-form-item :key="item.key" v-else-if="item.type === 'textArea' && !item.hide" :label="item.title">
          <a-textarea
            v-decorator="[`${item.key}`, { rules: item.rules || [] }]"
            :maxLength="item.maxLength || null"
            allowClear
            :autoSize="{ minRows: 4, maxRows: item.rows || 4 }"
            :placeholder="`请输入${typeof item.title === 'string' ? item.title : ''}`"
            :disabled="item.readOnly ? (Object.keys(formData).length ? item.readOnly[1] : item.readOnly[0]) : false"
          >
          </a-textarea>
        </a-form-item>
        <a-form-item :key="item.key" v-else-if="item.type === 'select' && !item.hide" :label="item.title">
          <a-select
            v-decorator="[`${item.key}`, { rules: item.rules || [] }]"
            allowClear
            showSearch
            :mode="item.mode || null"
            :onChange="item.onSelectChange || null"
            :filterOption="filterOption"
            placeholder="请选择"
            :getPopupContainer="getPopupContainer"
            :disabled="item.readOnly ? (Object.keys(formData).length ? item.readOnly[1] : item.readOnly[0]) : false"
          >
            <a-select-option
              v-for="o in item.selectOptions"
              :key="transferOption(o, item.keyValue, 'key')"
              :value="transferOption(o, item.keyValue, 'key')"
            >
              {{ transferOption(o, item.keyValue, 'value') }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :key="item.key" v-else-if="item.type === 'treeSelect' && !item.hide" :label="item.title">
          <a-tree-select
            v-decorator="[`${item.key}`, { rules: item.rules || [] }]"
            allowClear
            :showSearch="false"
            placeholder="请选择"
            :treeData="item.treeData || []"
            :replaceFields="item.replaceFields || null"
            :getPopupContainer="getPopupContainer"
            :treeDefaultExpandAll="true"
            :disabled="item.readOnly ? (Object.keys(formData).length ? item.readOnly[1] : item.readOnly[0]) : false"
          >
          </a-tree-select>
        </a-form-item>
        <template v-else> </template>
      </template>
      <div class="saveAndCancel">
        <a-button key="cancel" @click="onCancel" icon="close">{{ buttonName[1] }} </a-button>
        <a-button key="ok" @click="onFinish" type="primary" icon="check"> {{ buttonName[0] }} </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
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
import { filterObj } from '../../../utils/util'
import { mapActions } from 'vuex'
export default {
  name: 'CommonModalForm',
  props: {
    // visible
    visible: {
      type: Boolean,
      required: true,
    },
    // formData
    formData: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
    // 保存url
    saveUrl: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    // 列表项
    formItems: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    // 初始值
    initialValues: {
      type: Object,
      default() {
        return {}
      },
    },
    // 保存前自定义数据处理
    handleFieldsValue: Function,
    // 成功回调
    handleCallback: {
      type: Function,
      required: true,
      default() {},
    },
    // 取消
    handleCancel: {
      type: Function,
      required: true,
      default() {},
    },
    // 编辑时数据回显自定义处理
    mapPropsToFields: Function,
    // 标题
    title: {
      type: Array,
      default() {
        return ['新增', '编辑']
      },
    },
    // 按钮名称
    buttonName: {
      type: Array,
      default() {
        return ['保存', '取消']
      },
    },
    // 提示信息
    messageInfo: {
      type: Array,
      default() {
        return ['新增成功', '编辑成功']
      },
    },
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      loading: false,
    }
  },
  computed: {
    modalTitle() {
      const { formData, title } = this
      return Object.keys(formData).length ? title[1] : title[0]
    },
  },
  methods: {
    ...mapActions({
      commonPostData: 'base/commonPostData',
    }),
    onFinish() {
      const {
        form: { validateFields },
        handleFieldsValue,
        formData,
        saveUrl,
        commonPostData,
        messageInfo,
        handleCallback,
        onCancel,
      } = this
      validateFields((err, fieldsValue) => {
        if (err) return
        // 自定义数据处理
        const values = handleFieldsValue ? handleFieldsValue(fieldsValue) : fieldsValue
        if (!values || typeof values !== 'object') return
        // 数据为空处理
        for (const v in values) {
          if (!values[v] || !values[v].toString().trim()) {
            values[v] = undefined
          }
        }
        const resultData = { ...formData, ...values }
        const url = saveUrl.length === 1 ? saveUrl[0] : Object.keys(formData).length ? saveUrl[1] : saveUrl[0]
        this.loading = true
        commonPostData({ url, ...resultData }).then((res) => {
          this.loading = false
          if (res.statusCode === '0') {
            this.$message.success(Object.keys(formData).length ? messageInfo[1] : messageInfo[0])
            // 成功方法回调时支持入参判断属于什么操作
            handleCallback && handleCallback(Object.keys(formData).length ? 'create' : 'update')
            onCancel()
          } else {
            this.$message.error(res.statusMessage)
          }
        })
      })
    },
    onCancel() {
      const {
        form: { resetFields },
        handleCancel,
      } = this
      handleCancel()
      resetFields()
    },
    transferOption(item, keyValue = ['value', 'label'], type) {
      if (type === 'key') {
        return item[keyValue[0]]
      } else if (type === 'value') {
        return item[keyValue[1]]
      } else {
        return ''
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    getPopupContainer(triggerNode) {
      return triggerNode.parentNode
    },
  },
  watch: {
    visible(val) {
      if (val) {
        // 可在回显前进行数据自定义处理
        const result = filterObj(
          this.mapPropsToFields
            ? this.mapPropsToFields({ ...this.initialValues, ...this.formData })
            : { ...this.initialValues, ...this.formData },
          this.formItems.map((i) => i.key)
        )
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

<style lang="less" scoped>
.saveAndCancel {
  text-align: center;
  button {
    margin-right: 12px;
  }
}
</style>
