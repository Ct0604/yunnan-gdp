<!--
 * @Author: daidai
 * @Date: 2022-03-01 14:20:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\center-bottom.vue
-->
<template>
  <div class="center_bottom_wrap" ref="chartDom"></div>
</template>
<script>
import { currentGET } from "@/api/modules";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return { myChart: null };
  },
  created() {},
  mounted() { this.getData(); },
  methods: {
    initChart() { this.myChart = this.$echarts.init(this.$refs.chartDom); },
    getData() {
      currentGET('big14').then(res => {
        if (res.success) { if (!this.myChart) this.initChart(); this.updateChart(res.data); }
        else { this.$Message.warning(res.msg); }
      });
    },
    updateChart(data) {
      let yearArr = [], popArr = [], rateArr = [];
      for (let i = 0; i < data.length; i++) {
        yearArr.push(data[i].year);
        popArr.push(data[i].totalPopulation);
        rateArr.push(data[i].growthRate);
      }
      this.myChart.setOption({
        color: [palette[0], palette[3]],
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(59,130,246,0.25)', textStyle: { color: textColor, fontSize: 13 } },
        legend: { data: ['总人口(万)', '自然增长率(%)'], textStyle: { color: textColorMuted, fontSize: 12 } },
        grid: { left: '5%', right: '5%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', axisLabel: { color: textColorMuted, fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } }, axisTick: { show: false }, data: yearArr },
        yAxis: [
          { type: 'value', name: '人口(万)', nameTextStyle: { color: textColorMuted, fontSize: 11 }, axisLabel: { color: textColorMuted, fontSize: 12 }, splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } } },
          { type: 'value', name: '增长率(%)', nameTextStyle: { color: textColorMuted, fontSize: 11 }, axisLabel: { color: textColorMuted, fontSize: 12 }, splitLine: { show: false } }
        ],
        series: [
          { name: '总人口(万)', type: 'bar', data: popArr, barMaxWidth: 32, itemStyle: { borderRadius: [3, 3, 0, 0] } },
          { name: '自然增长率(%)', type: 'line', yAxisIndex: 1, data: rateArr, smooth: true }
        ]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.center_bottom_wrap { width: 100%; height: 100%; overflow: hidden; }
</style>
