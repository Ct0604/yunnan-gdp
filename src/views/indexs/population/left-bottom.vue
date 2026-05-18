<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:43:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\left-bottom.vue
-->
<template>
  <div class="left_boottom_wrap" ref="valueAdded"></div>
</template>
<script>
import { currentGET } from "@/api/modules";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, palette } = chartTokens

export default {
  data() {
    return { myChart: null, list: [] };
  },
  created() {},
  mounted() { this.getData(); },
  methods: {
    initChart() { this.myChart = this.$echarts.init(this.$refs.valueAdded); this.updateChart(); },
    getData() {
      this.pageflag = true;
      currentGET("big16").then((res) => {
        if (res.success) { this.list = res.data; if (!this.myChart) this.initChart(); this.updateChart(); }
        else { this.pageflag = false; this.$Message({ text: res.msg, type: "warning" }); }
      });
    },
    updateChart() {
      if (!this.list || !this.list[0]) return;
      this.myChart.setOption({
        tooltip: { trigger: 'item', backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(59,130,246,0.25)', textStyle: { color: textColor, fontSize: 13 } },
        series: [{
          name: '2020年平均预期寿命',
          type: 'funnel', left: '10%', top: 60, bottom: 60, width: '80%',
          min: 0, max: 100, minSize: '0%', maxSize: '100%',
          sort: 'descending', gap: 2,
          label: { show: true, position: 'inside', color: textColor },
          labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
          itemStyle: { borderColor: '#fff', borderWidth: 1 },
          emphasis: { label: { fontSize: 20 } },
          data: [
            { value: this.list[0].lifeExpectancy, name: '平均预期寿命', itemStyle: { color: palette[0] } },
            { value: this.list[0].femaleLife, name: '女性平均预期寿命', itemStyle: { color: palette[1] } },
            { value: this.list[0].maleLife, name: '男性平均预期寿命', itemStyle: { color: palette[3] } }
          ]
        }]
      });
    }
  },
};
</script>
<style lang='scss' scoped>
.left_boottom_wrap { overflow: hidden; width: 100%; height: 100%; }
</style>
