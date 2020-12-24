<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a v-for="item in copyRightConfig" :key="item.title" :href="item.href">{{ item.title }}</a>
    </template>
    <template v-slot:copyright>
      <div class="copyright">
        Copyright &copy;{{ new Date().getFullYear() }} {{ copyRight }}
      </div>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import { copyRightConfig, copyRight } from '../../utils/constant'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  },
  data(){
    return {
      copyRightConfig,
      copyRight
    }
  }
}
</script>
