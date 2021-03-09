<template>
  <a-form :form="form" v-bind="formItemLayout" @submit="onFinish">
    <a-row :gutter="24">
      <a-col v-for="(item, index) in searchItems" :key="index" :span="item.span || 8">
        <a-form-item v-if="item.type === 'input'" :label="item.title">
          <a-input
            :allowClear="true"
            v-decorator="[`${item.key}`, { rules: item.rules || [] }]"
            :placeholder="`请输入${typeof item.title === 'string' ? item.title : ''}`"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8" :offset="offset">
        <div class="searchAndReset">
          <a-button type="primary" icon="search" html-type="submit"> 查询 </a-button>
          <a-button icon="reload" @click="onReset"> 重置 </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
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
import { mapActions } from 'vuex'
import { filterObj } from '../../../utils/util'
export default {
  name: 'CommonSearchForm',
  props: {
    fetchParams: {
      type: Object,
      required: true,
      default() {
        return {
          type: '',
          url: '',
          extraArgs: {},
        }
      },
    },
    searchItems: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    initValue: {
      type: Object,
      default() {
        return {}
      },
    },
    saveFormValues: Function,
    handleFormReset: Function,
    handleFieldsValue: Function,
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    ...mapActions({
      getPage: 'base/getPage',
      postPage: 'base/postPage',
    }),
    onFinish() {
      const {
        form: { validateFields },
        handleFieldsValue,
        saveFormValues,
        fetchParams: { type, url, extraArgs },
        getPage,
        postPage,
      } = this
      validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
        // 自定义数据处理
        const values = handleFieldsValue ? handleFieldsValue(fieldsValue) : fieldsValue
        if (!values || typeof values !== 'object') return
        // 数据为空处理
        for (const v in values) {
          if (!values[v] || !values[v].toString().trim()) {
            values[v] = undefined
          }
        }
        // 保存搜索条件
        saveFormValues && saveFormValues(values)
        if (type === 'base/getPage') {
          getPage({ url, ...values, ...extraArgs })
        } else if (type === 'base/postPage') {
          postPage({ url, ...values, ...extraArgs })
        }
      })
    },
    onReset() {
      const {
        form: { resetFields },
        handleFormReset,
        fetchParams: { type, url, extraArgs },
        getPage,
        postPage,
      } = this
      resetFields()
      handleFormReset && handleFormReset()
      if (type === 'base/getPage') {
        getPage({ url, ...extraArgs })
      } else if (type === 'base/postPage') {
        postPage({ url, ...extraArgs })
      }
    },
  },
  computed: {
    offset() {
      return 16 - (this.searchItems.length % 3) * 8
    },
  },
  mounted() {
    const {
      initValue,
      form: { setFieldsValue },
      fetchParams: { type, url, extraArgs },
      searchItems,
      getPage,
      postPage,
    } = this
    // 存在initValue执行初始化查询
    if (Object.keys(initValue).length) {
      setFieldsValue(filterObj(initValue, searchItems.map(i => i.key)))
      if (type === 'base/getPage') {
        getPage({ url, ...initValue, ...extraArgs })
      } else if (type === 'base/postPage') {
        postPage({ url, ...initValue, ...extraArgs })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.searchAndReset {
  float: right;
  margin-right: 14%;
  button {
    margin-right: 12px;
  }
}
</style>
