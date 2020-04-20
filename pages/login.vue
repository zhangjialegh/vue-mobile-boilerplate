<template>
  <div class="login-container">
    <van-field v-model="email" label="邮箱" />
    <van-field v-model="password" type="password" label="密码" />
    <van-button round block type="primary" @click="submit">提交</van-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default { 
  head() {
    return {
      title: '登录'
    }
  },
  data() {
    return {
      email: '',
      password: '',
      disabled: true
    }
  },
  methods: {
    async submit () {
      try {
        const res = await this.$axios({
          url: '/api/user/login',
          method: 'post',
          loading: true,
          data: {
            email: this.email,
            password: md5(this.password)
          }
        })
        if (res.success) {
          this.$toast.success('注册成功')
          this.$gb.setAccount(res.data || {})
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  },
}
</script>

<style lang="less">
.login-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
