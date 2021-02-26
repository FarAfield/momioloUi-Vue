<template>
  <a-modal :title="title" :visible="visible" @cancel="handleCancel" width="50%">
    <template slot="footer">
      <a-button key="back" @click="handleCancel" type="primary"> 返回 </a-button>
    </template>
    <a-textarea :value="value" autoSize />
  </a-modal>
</template>

<script>
const formatJson = (str) => {
  const stack = []
  let tmpStr = ''
  const len = str.length

  for (let i = 0; i < len; i++) {
    //当遇到结构块起始结构
    if (str[i] === '{' || str[i] === '[') {
      tmpStr += str[i] + '\n'
      stack.push(str[i])
      tmpStr += '\t'.repeat(stack.length)
    } else if (str[i] === ']' || str[i] === '}') {
      stack.pop()
      tmpStr += '\n' + '\t'.repeat(stack.length) + str[i]
    } else if (str[i] === ',') {
      tmpStr += str[i] + '\n' + '\t'.repeat(stack.length)
    } else {
      tmpStr += str[i]
    }
  }
  return tmpStr
}
export default {
  name: 'ContentModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      validator: function () {
        return true
      },
      default: '{}',
    },
  },
  computed: {
    value() {
      return formatJson(this.text)
    },
  },
  methods: {
    handleCancel() {
      this.$emit('onCancel')
    },
  },
}
</script>

<style scoped></style>
