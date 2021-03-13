<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import { mapGetters } from 'vuex'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
  },
  data() {
    return {
      showMenu: true,
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
      }
    },
    ...mapGetters({
      currentUser: 'login/currentUser',
    }),
  },
}
</script>
