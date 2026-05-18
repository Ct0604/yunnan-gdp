<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\left-center.vue
-->
<template>
  <Echart id="leftCenterPop" :options="options" class="left_center_inner" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" style="line-height:200px">重新获取</Reacquire>
</template>
<script>
import { currentGET } from '@/api/modules'
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return { options: {}, pageflag: true, timer: null };
  },
  created() { this.getData() },
  mounted() {},
  beforeDestroy() { this.clearData() },
  methods: {
    clearData() { if (this.timer) { clearInterval(this.timer); this.timer = null } },
    getData() {
      this.pageflag = true
      currentGET('big12').then(res => {
        if (res.success) {
          let year = [], male = [], female = [];
          const data = res.data || [];
          const start = Math.max(0, data.length - 10);
          for (let i = data.length - 1; i >= start; i--) {
            year.push(data[i].year); male.push(data[i].malePopulation); female.push(data[i].femalePopulation);
          }
          this.$nextTick(() => { this.init(year, male, female) })
        } else { this.pageflag = false; this.$Message.warning(res.msg); }
      })
    },
    init(year, male, female) {
      this.options = {
        color: [palette[0], palette[3]],
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(59,130,246,0.25)', textStyle: { color: textColor, fontSize: 13 } },
        legend: { data: ['男性(万)', '女性(万)'], textStyle: { color: textColorMuted, fontSize: 12 } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', boundaryGap: false, data: year, axisLabel: { color: textColorMuted, fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } }, axisTick: { show: false } },
        yAxis: { type: 'value', axisLabel: { color: textColorMuted, fontSize: 12 }, splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } } },
        series: [{ name: '男性(万)', type: 'line', data: male, smooth: true }, { name: '女性(万)', type: 'line', data: female, smooth: true }]
      };
    }
  }
};
</script>
<style lang='scss' scoped></style>
