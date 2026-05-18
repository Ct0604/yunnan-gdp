<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:21:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\right-top.vue
-->
<template>
  <div class="right_top_wrap" ref="chartDom"></div>
</template>
<script>
import { currentGET } from "@/api/modules";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() { return { myChart: null }; },
  created() {},
  mounted() { this.getData(); },
  methods: {
    initChart() { this.myChart = this.$echarts.init(this.$refs.chartDom); },
    getData() {
      currentGET('big12').then(res => {
        if (res.success) { if (!this.myChart) this.initChart(); this.updateChart(res.data); }
        else { this.$Message.warning(res.msg); }
      });
    },
    updateChart(data) {
      let yearArr = [], birthArr = [], deathArr = [], growthArr = [];
      for (let i = 0; i < data.length; i++) {
        yearArr.push(data[i].year); birthArr.push(data[i].birthRate);
        deathArr.push(data[i].mortalityRate); growthArr.push(data[i].growthRate);
      }
      this.myChart.setOption({
        color: [palette[0], palette[1], palette[3]],
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(59,130,246,0.25)', textStyle: { color: textColor, fontSize: 13 } },
        legend: { data: ['出生率(%)', '死亡率(%)', '自然增长率(%)'], textStyle: { color: textColorMuted, fontSize: 12 } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', axisLabel: { color: textColorMuted, fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } }, axisTick: { show: false }, data: yearArr },
        yAxis: { type: 'value', axisLabel: { color: textColorMuted, fontSize: 12 }, splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } } },
        series: [
          { name: '出生率(%)', type: 'line', data: birthArr, smooth: true },
          { name: '死亡率(%)', type: 'line', data: deathArr, smooth: true },
          { name: '自然增长率(%)', type: 'line', data: growthArr, smooth: true }
        ]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.right_top_wrap { width: 100%; height: 100%; overflow: hidden; }
</style>
