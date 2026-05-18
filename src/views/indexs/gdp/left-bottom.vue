<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:43:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-bottom.vue
-->
<template>
  <div class="left_boottom_wrap" ref="valueAdded"></div>
</template>
<script>
import { currentGET } from "@/api/modules";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, splitLineColor, palette } = chartTokens

export default {
  data() {
    return {
      myChart: null,
      list: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.valueAdded);
      this.updateChart();
    },
    getData() {
      this.pageflag = true;
      currentGET("big3", { limitNum: 20 }).then((res) => {
        if (res.success) {
          this.list = res.data;
          if (!this.myChart) this.initChart(); else this.updateChart();
        } else {
          this.pageflag = false;
          this.$Message({ text: res.msg, type: "warning" });
        }
      });
    },
    updateChart() {
      if (!this.list || this.list.length < 5) return;
      let agricultureForestry = ['农林业'];
      let industry = ['工业'];
      let constructionIndustry = ['建筑业'];
      let wholesale = ['批发和零售业'];
      for (let i = 4; i > 0; i--) {
        agricultureForestry.push(this.list[i].agricultureForestry);
        industry.push(this.list[i].industry);
        constructionIndustry.push(this.list[i].constructionIndustry);
        wholesale.push(this.list[i].wholesale);
      }
      this.myChart.setOption({
        color: [palette[0], palette[1], palette[2], palette[3]],
        legend: { textStyle: { color: textColorMuted, fontSize: 12 } },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(59,130,246,0.25)',
          textStyle: { color: textColor, fontSize: 13 }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          axisLabel: { color: textColorMuted, fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(59,130,246,0.15)' } },
          axisTick: { show: false }
        },
        yAxis: {
          axisLabel: { color: textColorMuted, fontSize: 12 },
          splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
        },
        dataset: {
          source: [
            ['年', '2019年', '2020年', '2021年', '2022年'],
            agricultureForestry, industry, constructionIndustry, wholesale,
          ]
        },
        series: [
          { type: 'bar', barMaxWidth: 28 },
          { type: 'bar', barMaxWidth: 28 },
          { type: 'bar', barMaxWidth: 28 },
          { type: 'bar', barMaxWidth: 28 }
        ]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
