<template>
  <div class="registe-container">
    <van-field v-model="email" label="邮箱" />
    <van-field
      v-model="code"
      center
      clearable
      label="邮箱验证码"
      placeholder="请输入邮箱验证码"
    >
      <template #button>
        <van-button size="small" type="primary" @click="sendCode" :disabled="disabled">{{btnText || "发送验证码"}}</van-button>
      </template>
    </van-field>
    <van-field v-model="password" type="password" label="密码" />
    <van-button round block type="primary" @click="submit">提交</van-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default { 
  head() {
    return {
      title: '注册'
    }
  },
  data() {
    return {
      email: '',
      code: '',
      password: '',
      disabled: false,
      btnText: ''
    }
  },
  methods: {
    async sendCode () {
      const res = await this.$axios({
        url: '/api/mail/send',
        method: 'post',
        data: {
          email: this.email
        }
      })
      
    },
    async submit () {
      try {
        const res = await this.$axios({
          url: '/api/mail/check',
          method: 'post',
          data: {
            email: this.email,
            code: this.code
          }
        })
        if (res.success) {
          try {
            const res = await this.$axios({
              url: '/api/user/regist',
              method: 'post',
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
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  },
}
</script>

<style lang="less">
.registe-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
