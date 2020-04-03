<template>
  <div class="home" v-wechat-title="$route.meta.title">
    <img alt="Vue logo" src="@assets/img/logo.png" />
    <van-button type="warning">警告按钮</van-button>
    <svg-icon name="select1" @click.native="click"></svg-icon>
    <svg-icon name="select"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    click(e) {
      console.log(e);
    }
  }
};
</script>
