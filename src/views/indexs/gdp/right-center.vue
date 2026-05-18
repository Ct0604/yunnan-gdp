<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-center.vue
-->
<template>
  <div class="right_center_wrap" ref="chart"></div>
</template>
<script>
import { currentGET } from '@/api/modules'
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return { list: [] };
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.chart);
      this.updateChart()
    },
    getData() {
      currentGET('big5', { limitNum: 50 }).then(res => {
        this.list = res.data
        this.initChart()
      })
    },
    updateChart() {
      let yearArr = [], expenditureGdpArr = [], incomeGdpArr = [];
      for (let i = 0; i < this.list.length; i++) {
        yearArr.push(this.list[i].year)
        expenditureGdpArr.push(this.list[i].expenditureGdp)
        incomeGdpArr.push(this.list[i].incomeGdp)
      }
      this.myChart.setOption({
        color: [palette[0], palette[1]],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(59,130,246,0.25)',
          textStyle: { color: textColor, fontSize: 13 }
        },
        legend: {
          data: ['支出法生产总值(亿元)', '收入法生产总值(亿元)'],
          textStyle: { color: textColorMuted, fontSize: 12 }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          axisLabel: { color: textColorMuted, fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } },
          axisTick: { show: false },
          data: yearArr
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: textColorMuted, fontSize: 12 },
          splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
        },
        series: [
          { name: '支出法生产总值(亿元)', type: 'bar', data: expenditureGdpArr, barMaxWidth: 24 },
          { name: '收入法生产总值(亿元)', type: 'bar', data: incomeGdpArr, barMaxWidth: 24 }
        ]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.right_center_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
