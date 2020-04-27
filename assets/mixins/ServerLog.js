export default {
  mounted() {
    if (process.client && this.$store) { // 确保在客户端执行
      const warnlog = this.$store.state.warnlog
      const errorlog = this.$store.state.errorlog
      if (warnlog) {
          this.$toast(warnlog)
          this.$store.commit('warnlog', '')
        }
        if (errorlog) {
          this.$toast.fail(errorlog)
          this.$store.commit('errorlog', '')
        }
    }
  },
}