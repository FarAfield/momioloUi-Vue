<template>
  <page-header-wrapper v-if="isExit" :breadcrumb="breadcrumbProps" :title="breadcrumbData[breadcrumbData.length - 1]['breadcrumbName']">
    <a-spin :spinning="permissions.length === 0">
      <router-view :key="routeKey" />
    </a-spin>
  </page-header-wrapper>
  <page-header-wrapper v-else>
    <a-spin :spinning="permissions.length === 0">
      <router-view :key="routeKey" />
    </a-spin>
  </page-header-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageView',
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
