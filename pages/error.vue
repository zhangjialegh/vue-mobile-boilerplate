<template>
  <div class="container">
    <div>
      <p class="error-text">404</p>
      <logo />
    </div>
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
      title: '404'
    }
  },
  created() {
    console.log('error')
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
  .error-text {
    font-size: 30px;
    padding: 20px;
    color: #4a4a4a;
  }
}

</style>
