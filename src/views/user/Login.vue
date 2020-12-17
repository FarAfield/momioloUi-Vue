<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入登录账号"
          v-decorator="[
            'accountName',
            {rules: [{ required: true, message: '请输入登录账号！' }]}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          size="large"
          placeholder="请输入登录密码"
          v-decorator="[
            'accountPassword',
            {rules: [{ required: true, message: '请输入登录密码！' }]}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>
      <a-form-item style="margin-bottom:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loading"
        >登录</a-button>
      </a-form-item>
      <div>
        <a-checkbox disabled>自动登录</a-checkbox>
        <router-link
          :to="{ name: 'login' }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </div>
      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'login' }">注册账户</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        loading: false,
        message: ''
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          loginParams.accountPassword = md5(values.accountPassword)
          this.$message.success('登陆成功')
          this.$router.push({ path: '/' })
          // Login(loginParams)
          //   .then((res) => {
          //     this.$router.push({ path: '/' })
          //     state.loading = false
          //   })
        } else {
          setTimeout(() => {
            state.loading = false
          }, 600)
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 22px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
