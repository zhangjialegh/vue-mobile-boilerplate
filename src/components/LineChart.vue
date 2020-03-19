<template>
  <div class="chart-box" :class="{ [trend]: true }">
    <div class="my-chart" ref="mychart"></div>
  </div>
</template>
<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/markPoint");
export default {
  props: {
    trend: {
      type: String,
      default: "up"
    },
    data: {
      type: Array,
      default: function() {
        return [820, 932, 901, 934, 1290, 1330, 1320];
      }
    }
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.mychart);
    const trendLinear = {
      up: ["rgba(253,80,86,0.0)", "rgba(253,80,86,0.4)"],
      down: ["rgba(76,213,76,0.0)", "rgba(76,213,76,0.4)"],
      normal: ["rgba(224,224,224,0.00)", "#E5E5E5"]
    };
    const LineStyle = {
      up: ["rgba(253,80,86,0.1)", "rgba(253,80,86,1)"],
      down: ["rgba(76,213,76,0.1)", "rgba(76,213,76,1)"],
      normal: ["#E0E0E0", "#BABABA"]
    };
    const option = {
      grid: {
        top: 0,
        left: 0,
        right: 5,
        bottom: 0
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          show: false,
          data: this.data
        }
      ],
      yAxis: [
        {
          type: "value",
          show: false
        }
      ],
      series: [
        {
          type: "line",
          data: this.data,
          markPoint: {
            symbol: "circle",
            symbolSize: 10,
            data: [
              {
                name: "周最高",
                xAxis: this.data.length - 1,
                yAxis: this.data[this.data.length - 2]
              }
            ]
          },
          showSymbol: false,
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: LineStyle[this.trend][1]
              },
              {
                offset: 1,
                color: LineStyle[this.trend][0]
              }
            ])
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: trendLinear[this.trend][1]
              },
              {
                offset: 1,
                color: trendLinear[this.trend][0]
              }
            ])
          }
        }
      ]
    };
    this.mychart.setOption(option);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.chart-box {
  width: 80px;
  height: 30px;
  &.up {
    border-bottom: 0.5px dashed rgba(253, 80, 86, 0.2);
  }
  &.down {
    border-bottom: 0.5px dashed rgba(76, 213, 76, 0.2);
  }
  &.normal {
    border-bottom: 0.5px dashed rgba(0, 0, 0, 0.1);
  }
  > .my-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
