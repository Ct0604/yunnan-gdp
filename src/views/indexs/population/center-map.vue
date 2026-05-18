<!--
 * @Author: daidai
 * @Date: 2022-03-01 11:17:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\population\center-map.vue
-->
<template>
  <div class="centermap">
    <div class="maptitle">
      <span class="title-deco left-deco"></span>
      <span class="titletext">{{ maptitle }}</span>
      <span class="title-deco right-deco"></span>
    </div>
    <div class="mapwrap">
      <dv-border-box-13 :color="['var(--color-hairline)', 'var(--color-hairline-glow)']">
        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">中国</div>
        <Echart id="CenterMap" :options="options" ref="CenterMap" />
      </dv-border-box-13>
    </div>
  </div>
</template>
<script>
import xzqCode from "../../../utils/map/xzqCode";
import { currentGET } from "@/api/modules";
import * as echarts from "echarts";
import { GETNOBASE } from "@/api";
import { chartTokens } from '@/utils/echarts-theme'
const { textColor, textColorMuted, palette } = chartTokens

export default {
  data() {
    return { maptitle: "全国人口", options: {}, code: "china", echartBindClick: false, isSouthChinaSea: false };
  },
  created() {},
  mounted() { this.getData("china"); },
  methods: {
    getData(code) {
      if (code === 'china') {
        currentGET("big13", {regionCode: code}).then((res) => {
          if (res.success) { this.getGeojson("china", res.data); this.mapclick(); }
          else { this.$Message.warning(res.msg); }
        });
      } else {
        currentGET("big9", {regionCode: code}).then((res) => {
          if (res.success) { this.getGeojson(code, res.data); this.mapclick(); }
          else { this.$Message.warning(res.msg); }
        });
      }
    },
    async getGeojson(name, mydata) {
      this.code = name;
      let geoname = name;
      if (this.isSouthChinaSea && name == "china") { geoname = "chinaNanhai"; }
      let mapjson = echarts.getMap(name);
      if (mapjson) { mapjson = mapjson.geoJSON; }
      else { mapjson = await GETNOBASE(`./map-geojson/${geoname}.json`).then((res) => res); echarts.registerMap(name, mapjson); }
      let cityCenter = {};
      let arr = mapjson.features;
      arr.map((item) => { cityCenter[item.properties.name] = item.properties.centroid || item.properties.center; });
      let newData = [];
      mydata.map((item) => { if (cityCenter[item.location]) { newData.push({ name: item.location, value: cityCenter[item.location].concat(item.population) }); } });
      this.init(name, mydata, newData);
    },
    init(name, data, data2) {
      let top = 45, zoom = 1.05;
      this.options = {
        backgroundColor: "transparent",
        tooltip: { show: true },
        legend: { show: true },
        visualMap: {
          left: 20, bottom: 20,
          pieces: [
            { gte: 12000, label: "12000万人以上" }, { gte: 10000, lte: 12000, label: "10000-12000万人" },
            { gte: 8000, lte: 10000, label: "8000-10000万人" }, { gte: 6000, lte: 8000, label: "6000-8000万人" },
            { gte: 4000, lte: 6000, label: "4000-6000万人" }, { gte: 1000, lte: 4000, label: "1000-3000万人" },
            { lte: 1000, label: "1000万人以下" }
          ],
          inRange: { color: ['#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'] },
          textStyle: { color: textColor }
        },
        geo: { map: name, roam: false, selectedMode: false, zoom: zoom, top: top, show: false },
        series: [{
          name: "MAP", type: "map", map: name, data: data, selectedMode: false, zoom: zoom, geoIndex: 1, top: top,
          tooltip: { show: true, formatter: (p) => p.data ? p.name + "：" + p.data + "万人" : p.name,
            backgroundColor: "rgba(15,23,42,0.95)", borderColor: "rgba(0,234,255,0.3)", textStyle: { color: textColor } },
          label: { show: true, color: textColor, formatter: (val) => val.data !== undefined ? val.name.slice(0, 10) : "" },
          emphasis: { label: { show: false }, itemStyle: { areaColor: "#389BB7", borderWidth: 1 } },
          itemStyle: { borderColor: "rgba(0,234,255,0.3)", borderWidth: 1,
            areaColor: { type: "radial", x: 0.5, y: 0.5, r: 0.8, colorStops: [{ offset: 0, color: "rgba(0,234,255,0)" }, { offset: 1, color: "rgba(0,234,255,0.12)" }], globalCoord: false },
            shadowColor: "rgba(59,130,246,0.2)", shadowOffsetX: -2, shadowOffsetY: 2, shadowBlur: 10 }
        }, {
          data: data2, type: "effectScatter", coordinateSystem: "geo",
          symbolSize: (val) => Math.sqrt(val[1]) * 4.5,
          showEffectOn: "render", rippleEffect: { period: 5, scale: 1.5, brushType: "fill" },
          tooltip: { show: true, formatter: (p) => p.data ? p.name + "：" + p.data["value"][2] + "万人" : p.name,
            backgroundColor: "rgba(15,23,42,0.95)", borderColor: "rgba(0,234,255,0.3)", textStyle: { color: textColor } },
          label: { formatter: (param) => param.name.slice(0, 0), fontSize: 15, offset: [0, 2], position: "bottom", color: textColor, show: true },
          colorBy: "data",
          itemStyle: { color: palette[1], borderWidth: 3, shadowColor: palette[1], shadowBlur: 8 }
        }]
      };
    },
    message(text) { this.$Message({ text: text, type: "warning" }); },
    mapclick() {
      if (this.echartBindClick) return;
      this.$refs.CenterMap.chart.on("click", (params) => {
        let xzqData = xzqCode[params.name];
        if (xzqData) { this.getData(xzqData.adcode); } else { this.message("暂无下级地市!"); }
      });
      this.echartBindClick = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  margin-bottom: var(--spacing-lg);
  .maptitle {
    height: 54px; display: flex; justify-content: center; align-items: center; padding-top: 6px; box-sizing: border-box;
    .title-deco { width: 29px; height: 2px; border-radius: 1px; margin-top: 4px; }
    .left-deco { background: linear-gradient(90deg, transparent, var(--color-accent-cyan)); margin-right: 12px; }
    .right-deco { background: linear-gradient(90deg, var(--color-accent-cyan), transparent); margin-left: 12px; }
    .titletext { font-size: var(--font-display-xl); font-weight: var(--font-weight-display); letter-spacing: var(--letter-spacing-display);
      background: var(--color-primary-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  }
  .mapwrap { height: 548px; width: 100%; box-sizing: border-box; position: relative;
    .quanguo { position: absolute; right: 20px; top: -46px; width: 80px; height: 28px; border: 1px solid var(--color-accent-cyan);
      border-radius: var(--radius-pill); color: var(--color-accent-cyan); text-align: center; line-height: 26px;
      letter-spacing: 6px; cursor: pointer; box-shadow: var(--shadow-glow-cyan); z-index: 10; transition: all var(--transition-fast);
      &:hover { background: rgba(0,234,255,0.1); } }
  }
}
:deep(.border-box-content) { border-radius: var(--radius-md); }
</style>
