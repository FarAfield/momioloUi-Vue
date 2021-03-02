<template>
  <page-loading v-if="permissions.length === 0" />
  <page-header-wrapper v-else-if="isExit" :breadcrumb="breadcrumbProps">
    <router-view :key="routeKey" />
  </page-header-wrapper>
  <page-header-wrapper v-else>
    <router-view :key="routeKey" />
  </page-header-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLoading from '../components/PageLoading'
export default {
  name: 'PageView',
  components: {
    'page-loading': PageLoading,
  },
  provide() {
    return { permissions: this.permissions }
  },
  computed: {
    ...mapGetters({
      breadcrumbData: 'global/breadcrumbData',
      permissions: 'login/permissions',
      routeKey: 'global/routeKey',
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
