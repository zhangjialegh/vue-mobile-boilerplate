<template>
  <div class="container">
    <div class="img-box">
      <van-image lazy-load src="/img/cat.jpg" :style="imgStyle"/>
    </div>
    <div class="operation">
      <ul class="wrap">
        <li>
          <h6><strong>模糊</strong><span>{{ blur.toFixed(2) }}px</span></h6>
          <van-slider v-model="blur" active-color="#ee0a24" :max="300"></van-slider>
        </li>
        <li>
          <h6><strong>灰度</strong><span>{{ grayscale.toFixed(2) }}</span></h6>
          <van-slider v-model="grayscale" active-color="#ee0a24" :min="0" :max="1" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>亮度</strong><span>{{ brightness.toFixed(2) }}</span></h6>
          <van-slider v-model="brightness" active-color="#ee0a24" :min="0" :max="3" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>对比度</strong><span>{{ contrast.toFixed(2) }}</span></h6>
          <van-slider v-model="contrast" active-color="#ee0a24" :min="0" :max="3" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>色相旋转</strong><span>{{ hueRotate.toFixed(2) }}deg</span></h6>
          <van-slider v-model="hueRotate" active-color="#ee0a24" :min="0" :max="360" :step="1"></van-slider>
        </li>
        <li>
          <h6><strong>反色</strong><span>{{ invert.toFixed(2) }}</span></h6>
          <van-slider v-model="invert" active-color="#ee0a24" :min="0" :max="1" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>透明度</strong><span>{{ opacity.toFixed(2) }}</span></h6>
          <van-slider v-model="opacity" active-color="#ee0a24" :min="0" :max="1" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>饱和度</strong><span>{{ saturate.toFixed(2) }}</span></h6>
          <van-slider v-model="saturate" active-color="#ee0a24" :min="0" :max="3" :step="0.01"></van-slider>
        </li>
        <li>
          <h6><strong>褐色</strong><span>{{ sepia.toFixed(2) }}</span></h6>
          <van-slider v-model="sepia" active-color="#ee0a24" :min="0" :max="1" :step="0.01"></van-slider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default { 
  head() {
    return {
      title: '首页'
    }
  },
  data() {
    return {
      grayscale: 0,
      blur: 0,
      brightness: 1,
      contrast: 1,
      hueRotate: 0,
      invert: 0,
      opacity: 1,
      saturate: 1,
      sepia: 0
    }
  },
  computed: {
    imgStyle () {
      return {
        filter: `blur(${this.blur}px) grayscale(${this.grayscale}) brightness(${this.brightness}) contrast(${this.contrast}) hue-rotate(${this.hueRotate}deg) invert(${this.invert}) opacity(${this.opacity}) saturate(${this.saturate}) sepia(${this.sepia})`
      }
    }
  },
  mounted() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    let flag = false
    for (let i = 0; i < Agents.length; i++) {
      const ele = Agents[i];
      if (userAgentInfo.includes(ele)) {
        flag = true;
        break
      }
    }
    if (!flag) {
      this.$dialog.alert({
        message: '请在移动端打开'
      })
    }
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
  text-align: center;
  flex-direction: column;
  .img-box {
    width: 100%;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    > .van-image {
      width: 90%;
    }
  }
  .operation {
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);

    width: 100%;
    height: calc(100% - 280px);
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    .custom-button {
      padding: 0 5px;
      color: #fff;
      font-size: 10px;
      line-height: 18px;
      text-align: center;
      background-color: #ee0a24;
      border-radius: 100px;
    }
    .wrap {
      padding: 20px;
      li {
        padding: 10px 0;
      }
    }
    h6 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      span {
        color: #ee0a24;
      }
    }
  }
}

</style>
