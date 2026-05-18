<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:51:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\right-bottom.vue
-->
<template>
  <div class="right_bottom_wrap" ref="chartDom"></div>
</template>
<script>
import { currentGET } from '@/api/modules'
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() { return { myChart: null }; },
  created() {},
  mounted() { this.getData(); },
  methods: {
    initChart() { this.myChart = this.$echarts.init(this.$refs.chartDom); },
    getData() {
      currentGET('big15').then(res => {
        if (res.success) { if (!this.myChart) this.initChart(); this.updateChart(res.data); }
        else { this.$Message.warning(res.msg); }
      });
    },
    updateChart(data) {
      let years = [], age0 = [], age15 = [], age65 = [];
      for (let i = 0; i < data.length; i++) {
        years.push(data[i].year); age0.push(data[i].age1);
        age15.push(data[i].age2); age65.push(data[i].age3);
      }
      this.myChart.setOption({
        color: [palette[0], palette[1], palette[3]],
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(59,130,246,0.25)', textStyle: { color: textColor, fontSize: 13 } },
        legend: { data: ['0-14岁', '15-64岁', '65岁以上'], textStyle: { color: textColorMuted, fontSize: 11 } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', axisLabel: { color: textColorMuted, fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } }, axisTick: { show: false }, data: years },
        yAxis: { type: 'value', axisLabel: { color: textColorMuted, fontSize: 12 }, splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } } },
        series: [
          { name: '0-14岁', type: 'bar', data: age0, stack: 'total', barMaxWidth: 32 },
          { name: '15-64岁', type: 'bar', data: age15, stack: 'total' },
          { name: '65岁以上', type: 'bar', data: age65, stack: 'total' }
        ]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.right_bottom_wrap { width: 100%; height: 100%; overflow: hidden; }
</style>
