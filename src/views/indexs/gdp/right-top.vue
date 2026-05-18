<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:21:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-top.vue
-->
<template>
  <div class="right_top_wrap" ref="chartDom"></div>
</template>
<script>
import { currentGET } from "@/api/modules";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return {
      myChart: null,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.chartDom);
    },
    getData() {
      currentGET('big6', { limitNum: 4 }).then(res => {
        if (res.success) {
          if (!this.myChart) this.initChart();
          this.updateChart(res.data);
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    updateChart(data) {
      let qArr = [], gdpArr = [];
      for (let i = 0; i < data.length; i++) {
        qArr.push(data[i].quarter);
        gdpArr.push(data[i].quarterGdp);
      }
      this.myChart.setOption({
        color: [palette[1]],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(59,130,246,0.25)',
          textStyle: { color: textColor, fontSize: 13 }
        },
        legend: {
          data: ['GDP(亿元)'],
          textStyle: { color: textColorMuted, fontSize: 12 }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          axisLabel: { color: textColorMuted, fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } },
          axisTick: { show: false },
          data: qArr
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: textColorMuted, fontSize: 12 },
          splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
        },
        series: [{
          name: 'GDP(亿元)',
          type: 'bar',
          data: gdpArr,
          barMaxWidth: 40,
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: palette[1] },
                { offset: 1, color: 'rgba(0,234,255,0.4)' }
              ]
            }
          }
        }]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.right_top_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
