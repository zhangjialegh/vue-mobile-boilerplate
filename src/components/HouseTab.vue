<template>
  <div class="tab-house-wrap">
    <p class="tab-notice">
      选择上海最近全网二手房信息，数据更新时间 14:30
    </p>
    <ul>
      <li class="col-item">
        <p class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span class="tag grey">上海二手</span>
        </p>
        <!-- <img src="../assets/img/defaul-avatar.png" class="chart-img" alt="" /> -->
        <line-chart />
        <p class="flex-end">
          <strong class="dark-num">5,954</strong>
          <span class="unit">元/㎡</span>
          <i class="icon trend-icon up"></i>
        </p>
      </li>
      <li class="col-item">
        <p class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span class="tag grey">上海二手</span>
        </p>
        <img src="../assets/img/defaul-avatar.png" class="chart-img" alt="" />
        <p class="flex-end">
          <strong class="dark-num">5,954</strong>
          <span class="unit">元/㎡</span>
          <i class="icon trend-icon down"></i>
        </p>
      </li>
      <li class="col-item last">
        <p class="flex-start">
          <strong class="label">挂牌均价</strong>
          <span class="tag grey">上海二手</span>
        </p>
        <img src="../assets/img/defaul-avatar.png" class="chart-img" alt="" />
        <p class="flex-end">
          <strong class="dark-num">5,954</strong>
          <span class="unit">元/㎡</span>
          <i class="icon trend-icon ping"></i>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import LineChart from "@components/LineChart";

export default {
  name: "house-tab",
  components: { LineChart },
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
  .flex-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .flex-end {
    flex: 0.7;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
