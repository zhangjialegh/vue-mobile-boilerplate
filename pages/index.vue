<template>
  <div class="container">
    <logo />
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
      title: '首页'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less">
.container {
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

</style>
