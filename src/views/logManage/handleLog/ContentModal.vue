<template>
  <a-modal :title="title" :visible="visible" @cancel="handleCancel" width="50%">
    <template slot="footer">
      <a-button key="back" @click="handleCancel" type="primary"> 返回 </a-button>
    </template>
    <a-textarea :value="value" autosize="true" />
  </a-modal>
</template>

<script>
const formatJson = (json, options) => {
  let reg,
    formatted = '',
    pad = 0
  const PADDING = ''
  options = options || {}
  options.newlineAfterColonIfBeforeBraceOrBracket = options.newlineAfterColonIfBeforeBraceOrBracket === true
  options.spaceAfterColon = options.spaceAfterColon !== false
  if (typeof json !== 'string') {
    json = JSON.stringify(json)
  } else {
    json = JSON.parse(json)
    json = JSON.stringify(json)
  }
  reg = /([\{\}])/g
  json = json.replace(reg, '\r\n$1\r\n')
  reg = /([\[\]])/g
  json = json.replace(reg, '\r\n$1\r\n')
  reg = /(\,)/g
  json = json.replace(reg, '$1\r\n')
  reg = /(\r\n\r\n)/g
  json = json.replace(reg, '\r\n')
  reg = /\r\n\,/g
  json = json.replace(reg, ',')
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g
    json = json.replace(reg, ':{')
    reg = /\:\r\n\[/g
    json = json.replace(reg, ':[')
  }
  if (options.spaceAfterColon) {
    reg = /\:/g
    json = json.replace(reg, ':')
  }
  json.split('\r\n').forEach((node) => {
    let i = 0,
      indent = 0,
      padding = ''

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1
      }
    } else {
      indent = 0
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING
    }
    formatted += `${padding + node}\r\n`
    pad += indent
  })
  return formatted
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
      type: Object,
      default() {
        return {}
      },
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
