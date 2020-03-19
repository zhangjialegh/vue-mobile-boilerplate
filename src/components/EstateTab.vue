<template>
  <div class="tab-house-wrap estate-wrap">
    <p class="tab-notice">
      选择上海最近全网二手房信息，数据更新时间 14:30
    </p>
    <ul>
      <li class="col-item">
        <div class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span style="line-height:15px">
            <span class="dark-num">4,555</span><span class="unit">元/㎡</span>
          </span>
        </div>
        <div class="flex-end">
          <p class="flex-end" style="align-items: center">
            <span class="trend up" style="line-height:60px">
              <i class="icon trend-icon up"></i>
              <strong class="dark-num up" style="padding-bottom: 5px"
                >5,954</strong
              >
            </span>
            <span class="tag red">挂牌均价同比</span>
          </p>
        </div>
      </li>
      <li class="col-item">
        <div class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span style="line-height:15px">
            <span class="dark-num">4,555</span><span class="unit">元/㎡</span>
          </span>
        </div>
        <div class="flex-end">
          <p class="flex-end" style="align-items: center">
            <span class="trend" style="line-height:60px">
              <i class="icon trend-icon ping"></i>
              <strong class="dark-num ping" style="padding-bottom: 5px"
                >5,954</strong
              >
            </span>
            <span class="tag grey">挂牌均价同比</span>
          </p>
        </div>
      </li>
      <li class="col-item last">
        <div class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span style="line-height:15px">
            <span class="dark-num">4,555</span><span class="unit">元/㎡</span>
          </span>
        </div>
        <div class="flex-end">
          <p class="flex-end" style="align-items: center">
            <span class="trend" style="line-height:60px">
              <i class="icon trend-icon down"></i>
              <strong class="dark-num down" style="padding-bottom: 5px"
                >5,954</strong
              >
            </span>
            <span class="tag green">挂牌均价同比</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "house-tab",
  props: {
    type: {
      type: String,
      default: "second-hand"
    }
  }
};
</script>
<style lang="less">
.tab-house-wrap {
  &.estate-wrap {
    .flex-start {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
    .flex-end {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;
    }
    .trend {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
