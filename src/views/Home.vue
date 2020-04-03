<template>
  <div class="home" v-wechat-title="$route.meta.title">
    <img alt="Vue logo" src="@assets/img/logo.png" />
    <van-button type="warning">警告按钮</van-button>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
