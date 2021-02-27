<template>
  <div class="ant-pro-pages-account-projects-cardList">
    <a-list :loading="loading" :data-source="list" :grid="{ gutter: 24, column: 4 }">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card class="ant-pro-pages-account-projects-card" hoverable>
          <img slot="cover" :src="item.cover" :alt="item.title" />
          <a-card-meta :title="item.title">
            <template slot="description">
              <ellipsis :length="50">{{ item.description }}</ellipsis>
            </template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { Ellipsis } from '@/components'

export default {
  name: 'Project',
  components: {
    Ellipsis,
  },
  data() {
    return {
      list: [],
      loading: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetch('https://proapi.azurewebsites.net//api/fake_list').then(async (res) => {
        this.list = (await res.json()).slice(0,8)
        this.loading = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-pages-account-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }
  }
}
</style>
