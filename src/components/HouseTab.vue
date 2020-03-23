<template>
  <div class="tab-house-wrap">
    <p class="tab-notice">
      {{ propertyInfo.subTitle || " 数据更新" }}
    </p>
    <ul>
      <li
        class="col-item"
        :class="{ last: index === propertyInfo.innerVos.length - 1 }"
        v-for="(item, index) in propertyInfo.innerVos"
        :key="index"
      >
        <p class="flex-start">
          <strong class="label">{{ item.quoteName }}</strong>
          <span class="tag grey">{{ item.nameTag }}</span>
        </p>
        <line-chart
          :data="item.sevenDaysPric"
          :trend="
            item.quotePriceDiff > 0
              ? 'up'
              : item.quotePriceDiff < 0
              ? 'down'
              : 'ping'
          "
        />
        <p class="flex-end">
          <strong class="dark-num">{{
            $gb.thousandFormat(item.quotePriceDiff)
          }}</strong>
          <span class="unit">元/㎡</span>
          <i
            class="icon trend-icon up"
            :class="{
              up: item.quotePriceDiff > 0,
              down: item.quotePriceDiff < 0,
              ping: item.quotePriceDiff == 0
            }"
          ></i>
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
      default: "second-hand" // "new-house"
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      propertyInfo: {}
    };
  },
  watch: {
    data: {
      handler(newVal) {
        this.propertyInfo = newVal;
      },
      deep: true
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
