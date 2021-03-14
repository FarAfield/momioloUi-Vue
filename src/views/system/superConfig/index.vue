<template>
  <a-card style="min-height: 500px">
    <a-row :gutter="24">
      <a-col :span="12">
      </a-col>
      <a-col :span="12"> <menu-config></menu-config></a-col>
    </a-row>
  </a-card>
</template>

<script>
import MenuConfig from './MenuConfig'
export default {
  name: 'SuperConfig',
  components: {
    'menu-config': MenuConfig,
  },
}
</script>

<style scoped></style>
