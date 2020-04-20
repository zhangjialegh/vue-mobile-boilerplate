export default {
  mounted() {
    if (this.$store) {
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