<template>
  <div class="container">
    <div>
      <logo />
    </div>
    <van-button type="danger" @click="goHome">危险按钮</van-button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  head() {
    return {
      title: '关于'
    }
  },
  // async asyncData({ $axios, query, params, redirect }) {
  //   try {
  //     const data = await $axios({
  //       method: "get",
  //       url: "/api/redDots?page=1",
  //       params: {
  //         id: query.id
  //       }
  //     })
  //     return {
  //       detail: res.data
  //     };
  //   } catch (error) {
  //     return error
  //   }
  // },
  created() {
    console.log('login')
  },
  methods: {
    goHome() {
      this.$router.push('/error')
    }
  }
}
</script>

<style lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
