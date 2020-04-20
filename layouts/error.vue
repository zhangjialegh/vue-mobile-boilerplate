<template>
  <div class="error-container">
    <div>
      <p class="error-text">页面错误</p>
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
      title: 'error'
    }
  }
}
</script>

<style lang="less">
.error-container {
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
