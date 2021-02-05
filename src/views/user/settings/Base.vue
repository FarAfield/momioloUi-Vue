<template>
  <div class="account-settings-info-view">
    <a-row :gutter="24">
      <a-col :span="14">
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-form-item label="昵称">
            <a-input
              v-decorator="['userName', { rules: [{ max: 8, message: '最大字符长度8' }] }]"
              placeholder="请输入昵称"
              allowClear
            />
          </a-form-item>
          <a-form-item label="手机号">
            <a-input
              v-decorator="['userMobile', { rules: [{ pattern: /^1\d{10}$/, message: '请输入合法的手机号' }] }]"
              placeholder="请输入手机号"
              allowClear
            />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group v-decorator="['userSex']">
              <a-radio :value="0"> 男 </a-radio>
              <a-radio :value="1"> 女 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input
              v-decorator="[
                'userMail',
                {
                  rules: [
                    { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入合法的邮箱' },
                  ],
                },
              ]"
              placeholder="请输入邮箱"
              allowClear
            />
          </a-form-item>
          <a-form-item label="地址">
            <a-input
              v-decorator="['userLocation', { rules: [{ max: 50, message: '最大字符长度50' }] }]"
              placeholder="请输入地址"
              allowClear
            />
          </a-form-item>
          <a-form-item label="头像链接">
            <a-input
              v-decorator="['userAvatar', { rules: [{ max: 1000, message: '最大字符长度1000' }] }]"
              placeholder="请输入头像链接Url"
              allowClear
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">更 新 设 置</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="8" :offset="2" :style="{ minHeight: '180px' }">
        <span>头像</span>
        <div><a-avatar :size="200" alt="avatar" :src="userAvatar" /></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { nickNameAndAvatar } from '@/utils/constant'
export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      userAvatar: nickNameAndAvatar[1],
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'login/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      postData: 'base/postData',
      findCurrentInfo: 'login/findCurrentInfo',
    }),
    handleSubmit: function (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        this.postData({ url: '/account/updateCurrentInfo', ...values }).then(() => {
          this.$message.success('更新设置成功')
          this.findCurrentInfo()
        })
      })
    },
  },
  mounted() {
    const { userName, userMobile, userSex, userMail, userLocation, userAvatar } = this.currentUser
    this.form.setFieldsValue({
      userName: userName || nickNameAndAvatar[0],
      userMobile,
      userSex,
      userMail,
      userLocation,
      userAvatar,
    })
    this.userAvatar = userAvatar || nickNameAndAvatar[1]
  },
  watch: {
    currentUser(newValue) {
      const { userAvatar } = newValue
      this.userAvatar = userAvatar || nickNameAndAvatar[1]
    },
  },
}
</script>

<style lang="less" scoped></style>
