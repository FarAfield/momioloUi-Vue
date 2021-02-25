<template>
  <page-header-wrapper v-if="isExit" :breadcrumb="breadcrumbProps">
    <router-view />
  </page-header-wrapper>
  <page-header-wrapper v-else>
    <router-view />
  </page-header-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageView',
  computed: {
    ...mapGetters({
      breadcrumbData: 'global/breadcrumbData',
    }),
    breadcrumbProps() {
      return this.breadcrumbData.length
        ? {
            props: {
              routes: this.breadcrumbData,
              itemRender: ({ route, params, routes, paths, h }) => {
                return routes.indexOf(route) !== 0
                  ? h('span', {}, route.breadcrumbName)
                  : h('router-link', { attrs: { to: '/' } }, route.breadcrumbName)
              },
            },
          }
        : null
    },
    isExit() {
      return !!this.breadcrumbData.length
    },
  },
}
</script>
