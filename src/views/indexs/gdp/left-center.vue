<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
  <Echart id="leftCenter" :options="options" class="left_center_inner" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" style="line-height:200px">
    重新获取
  </Reacquire>
</template>
<script>
import { currentGET } from '@/api/modules'
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return {
      options: {},
      pageflag: true,
      timer: null
    };
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  beforeDestroy() {
    this.clearData()
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    getData() {
      this.pageflag = true
      currentGET('big1').then(res => {
        if (res.success) {
          let year = []
          let regionalGdp = []
          const data = res.data || [];
          const start = Math.max(0, data.length - 10);
          for (let i = data.length - 1; i >= start; i--) {
            year.push(data[i].year)
            regionalGdp.push(data[i].regionalGdp)
          }
          this.$nextTick(() => {
            this.init(year, regionalGdp)
          })
        } else {
          this.pageflag = false;
          this.$Message.warning(res.msg);
        }
      })
    },
    switper() {
      if (this.timer) return
      let looper = () => { this.getData() };
      this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
      let myChart = this.$refs.charts.chart
      myChart.on('mouseover', () => { this.clearData() });
      myChart.on('mouseout', () => {
        this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
      });
    },
    init(year, regionalGdp) {
      this.options = {
        color: [palette[0]],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(59,130,246,0.25)',
          textStyle: { color: textColor, fontSize: 13 }
        },
        legend: {
          data: ['人均地区生产总值'],
          textStyle: { color: textColorMuted, fontSize: 12 }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: year,
          axisLabel: { show: true, color: textColorMuted, fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: { show: true, color: textColorMuted, fontSize: 12 },
          splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
        },
        series: [{
          name: '人均地区生产总值',
          type: 'line',
          data: regionalGdp,
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59,130,246,0.2)' },
                { offset: 1, color: 'rgba(59,130,246,0.02)' }
              ]
            }
          }
        }]
      };
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
