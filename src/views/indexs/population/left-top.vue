<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\left-top.vue
-->
<template>
    <ul class="user_Overview flex" v-if="pageflag">
        <li class="user_Overview-item card-total">
            <div class="card-ring"><dv-digital-flop :config="totalConfig" style="width:100%;height:100%;" /></div>
            <p>总人口(万)</p>
        </li>
        <li class="user_Overview-item card-male">
            <div class="card-ring"><dv-digital-flop :config="maleConfig" style="width:100%;height:100%;" /></div>
            <p>男性人口(万)</p>
        </li>
        <li class="user_Overview-item card-female">
            <div class="card-ring"><dv-digital-flop :config="femaleConfig" style="width:100%;height:100%;" /></div>
            <p>女性人口(万)</p>
        </li>
        <li class="user_Overview-item card-rate">
            <div class="card-ring"><dv-digital-flop :config="rateConfig" style="width:100%;height:100%;" /></div>
            <p>自然增长率</p>
        </li>
    </ul>
    <Reacquire v-else @onclick="getData" line-height="200px">重新获取</Reacquire>
</template>

<script>
import { currentGET } from '@/api/modules'
let style = { fontSize: 20 }
export default {
    data() {
        return {
            pageflag: true,
            timer: null,
            totalConfig: { number: [0], content: '{nt}', style: { ...style, fill: "#00eaff" } },
            maleConfig: { number: [0], content: '{nt}', style: { ...style, fill: "#3b82f6" } },
            femaleConfig: { number: [0], content: '{nt}', style: { ...style, fill: "#f43f5e" } },
            rateConfig: { number: [0], content: '{nt}', style: { ...style, fill: "#10b981" } }
        };
    },
    created() { this.getData() },
    mounted() {},
    beforeDestroy() { this.clearData() },
    methods: {
        clearData() { if (this.timer) { clearInterval(this.timer); this.timer = null } },
        getData() {
            this.pageflag = true;
            currentGET('big14').then(res => {
                if (res.success) {
                    this.totalConfig = { ...this.totalConfig, number: [res.data[0].totalPopulation] }
                    this.maleConfig = { ...this.maleConfig, number: [res.data[0].malePopulation] }
                    this.femaleConfig = { ...this.femaleConfig, number: [res.data[0].femalePopulation] }
                    this.rateConfig = { ...this.rateConfig, number: [res.data[0].growthRate] }
                } else { this.pageflag = false; this.$Message.warning(res.msg); }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.user_Overview { li { flex: 1;
  p { text-align: center; height: 16px; font-size: var(--font-body); color: var(--color-on-canvas-mute); margin-top: var(--spacing-md); }
  .card-ring { width: 100px; height: 100px; text-align: center; line-height: 100px; margin: 40px auto 0; position: relative; border-radius: var(--radius-pill);
    background: var(--color-surface-elevated);
  }
  .card-total .card-ring { box-shadow: 0 0 20px rgba(0,234,255,0.12), inset 0 0 20px rgba(0,234,255,0.05); border: 1px solid var(--color-hairline-glow); }
  .card-male .card-ring   { box-shadow: 0 0 20px rgba(59,130,246,0.12), inset 0 0 20px rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); }
  .card-female .card-ring { box-shadow: 0 0 20px rgba(244,62,94,0.12), inset 0 0 20px rgba(244,62,94,0.05); border: 1px solid rgba(244,62,94,0.2); }
  .card-rate .card-ring   { box-shadow: 0 0 20px rgba(16,185,129,0.12), inset 0 0 20px rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.2); }
}}
</style>
