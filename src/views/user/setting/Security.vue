<template>
  <div class="account-settings-info-view">
    <a-row :gutter="24">
      <a-col :span="14">
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-form-item label="原始密码">
            <a-input
              v-decorator="[
                'originalPassword',
                {
                  rules: [
                    { max: 20, message: '最大字符长度20' },
                    { required: true, message: '请输入原始密码' },
                    {
                      pattern: /^[0-9A-Za-z]{6,12}$/,
                      message: '密码必须为6-12位数字和字母，区分大小写',
                    },
                  ],
                },
              ]"
              placeholder="请输入原始密码"
              type="password"
              allowClear
            />
          </a-form-item>
          <a-form-item label="新密码">
            <a-input
              v-decorator="[
                'newPassword',
                {
                  rules: [
                    { max: 20, message: '最大字符长度20' },
                    { required: true, message: '请输入新密码' },
                    {
                      pattern: /^[0-9A-Za-z]{6,12}$/,
                      message: '密码必须为6-12位数字和字母，区分大小写',
                    },
                  ],
                },
              ]"
              placeholder="请输入新密码"
              type="password"
              allowClear
            />
          </a-form-item>
          <a-form-item label="确认新密码">
            <a-input
              v-decorator="[
                'newCheckPassword',
                {
                  rules: [
                    { max: 20, message: '最大字符长度20' },
                    { required: true, message: '请确认输入的密码' },
                    {
                      pattern: /^[0-9A-Za-z]{6,12}$/,
                      message: '密码必须为6-12位数字和字母，区分大小写',
                    },
                  ],
                },
              ]"
              placeholder="请确认输入的密码"
              type="password"
              allowClear
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">更 新 密 码</a-button>
            <span style="margin-left: 12px">密码修改成功后，会自动注销请重新登录！</span>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'md5'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    ...mapActions({
      postData: 'base/postData',
      logout: 'login/logout',
    }),
    handleSubmit: function (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        const params = {
          url: '/account/updateCurrentInfo',
          originalPassword: md5(values.originalPassword),
          newPassword: md5(values.newPassword),
        }
        this.postData({ ...params }).then(() => {
          this.$message.info('密码修改成功，正在退出！', 1)
          setTimeout(() => {
            this.logout().then(() => this.$router.replace({ path: '/user/login' }))
          }, 1000)
        })
      })
    },
  },
}
</script>

<style scoped></style>
