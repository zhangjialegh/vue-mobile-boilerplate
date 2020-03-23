<template>
  <div class="tab-house-wrap estate-wrap">
    <p class="tab-notice">
      {{ propertyInfo.subTitle || "数据更新" }}
    </p>
    <ul>
      <li
        class="col-item"
        :class="{ last: index === propertyInfo.houseInnerVos.length - 1 }"
        v-for="(item, index) in propertyInfo.houseInnerVos"
        :key="index"
      >
        <div class="flex-start">
          <strong class="label">{{ item.houseName }}</strong>
          <span style="line-height:15px">
            <span class="dark-num">{{
              $gb.thousandFormat(item.quotePrice)
            }}</span
            ><span class="unit">元/㎡</span>
          </span>
        </div>
        <div class="flex-end">
          <p class="flex-end" style="align-items: center">
            <span
              class="trend up"
              :class="{
                up: item.priceDiff > 0,
                down: item.priceDiff < 0,
                ping: item.priceDiff == 0
              }"
              style="line-height:60px"
            >
              <i
                class="icon trend-icon"
                :class="{
                  up: item.priceDiff > 0,
                  down: item.priceDiff < 0,
                  ping: item.priceDiff == 0
                }"
              ></i>
              <strong
                class="dark-num"
                :class="{
                  up: item.priceDiff > 0,
                  down: item.priceDiff < 0,
                  ping: item.priceDiff == 0
                }"
                style="padding-bottom: 5px"
                >{{ $gb.thousandFormat(item.priceDiff) }}</strong
              >
            </span>
            <span class="tag red">挂牌均价同比</span>
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
      default: "house"
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
