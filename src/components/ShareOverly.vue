<template>
  <van-overlay :show="show">
    <div class="overly-wrapper" @click.stop>
      <div class="pic-box">
        <img src="../assets/img/share-pic.png" alt="share-pic" />
      </div>
      <div class="btn-box" @click="closeOverly">
        <img src="../assets/img/share-btn.png" alt="share-btn" />
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default {
  name: "share-overly",
  data() {
    return {
      show: false
    };
  },
  methods: {
    showOverly() {
      this.show = true;
    },
    closeOverly() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.overly-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .pic-box {
    width: 100%;
    > img {
      width: 100%;
    }
  }
  .btn-box {
    position: absolute;
    width: 100%;
    padding: 120px 77px;
    left: 0;
    bottom: 0;
    > img {
      width: 100%;
    }
  }
}
</style>
