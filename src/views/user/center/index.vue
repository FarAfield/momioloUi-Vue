<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :span="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="currentUser.userAvatar || nickNameAndAvatar[1]" />
            </div>
            <div class="username">{{ currentUser.userName || nickNameAndAvatar[0] }}</div>
            <div class="bio">{{ sexName }}</div>
          </div>
          <div class="account-center-detail">
            <p><i class="title"></i>手机号：{{ currentUser.userMobile }}</p>
            <p><i class="group"></i>地址：{{ currentUser.userLocation }}</p>
            <p>
              <i class="address"></i>
              <span>邮箱：{{ currentUser.userMail }}</span>
            </p>
          </div>
          <a-divider />
          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="tag in tags">
                <a-tooltip :key="tag" :title="tag">
                  <a-tag>{{ `${tag.slice(0, 20)}...` }}</a-tag>
                </a-tooltip>
              </template>
            </div>
          </div>
          <a-divider :dashed="true" />
          <div class="account-center-team">
            <div class="teamTitle">风格</div>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in list" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="17">
        <a-card style="width: 100%; min-height: 720px" :bordered="false">
          <Project />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Project from './Project'
import { nickNameAndAvatar } from '@/utils/constant'

export default {
  components: {
    Project,
  },
  data() {
    return {
      nickNameAndAvatar,
      tags: [],
      list: [],
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'login/currentUser',
    }),
    sexName() {
      return this.currentUser.userSex ? (this.currentUser.userSex === '0' ? '男' : '女') : ''
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto 20px;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }
  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
