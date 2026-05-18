<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\right-center.vue
-->
<template>
  <div class="right_center_wrap">
    <dv-capsule-chart :config="config" style="width:100%;height:100%" />
  </div>
</template>
<script>
import { currentGET } from '@/api/modules'
export default {
  data() {
    return {
      config: { showValue: true, unit: "户", data: [] },
      consumption: [],
    };
  },
  created() { this.getData() },
  computed: {},
  mounted() {},
  beforeDestroy() { this.clearData() },
  methods: {
    clearData() { if (this.timer) { clearInterval(this.timer); this.timer = null } },
    getData() {
      this.pageflag = true
      currentGET('big14').then(res => {
        if (res.success) {
          const filteredData = res.data.filter(item => {
            let yearNum = parseInt(item.year);
            return !isNaN(yearNum) && yearNum >= 2016;
          });
          this.consumption = filteredData.map(item => ({
            name: item.year,
            value: item.totalPopulation
          }));
          this.config = { ...this.config, data: this.consumption }
        } else {
          this.pageflag = false
          this.$Message({ text: res.msg, type: 'warning' })
        }
      })
    },
  },
};
</script>
<style lang='scss' scoped>
.right_center_wrap { box-sizing: border-box; padding: 0 16px; overflow: hidden; width: 100%; height: 100%; }
</style>
