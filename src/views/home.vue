<!--
 * @Author: daidai
 * @Date: 2022-01-12 14:23:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\home.vue
-->
<template>
  <ScaleScreen :width="1960" :height="1080" class="scale-wrap" :selfAdaption="$store.state.setting.isScale" >
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <!-- 头部 -->
        <div class="d-flex jc-center title_wrap">
          <div class="sidebar-container">
            <Sidebar />
          </div>
          <div class="title-container">
            <div class="d-flex jc-center">
              <div class="title">
                <span class="title-text">云南省GDP可视化平台</span>
                <span class="title-sub">数据来源 · 云南省统计局</span>
              </div>
            </div>
            <div class="timers">
              {{ dateYear }} {{ dateWeek }} {{ dateDay }}
              <i class="blq-icon-shezhi02" style="margin-left: 10px" @click="showSetting"></i>
              <span class="admin-btn" @click="goAdmin">后台管理</span>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <router-view></router-view>
      </div>
    </div>
    <Setting ref="setting" />
  </ScaleScreen>
</template>
<script>
import { formatTime } from "../utils/index.js";
import Setting from "./setting.vue";
import ScaleScreen from "@/components/scale-screen/scale-screen.vue";
import Sidebar from "@/views/indexs/Sidebar.vue"
export default {
  components: { Setting, ScaleScreen, Sidebar },
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.timeFn();
    this.cancelLoading();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    showSetting() {
      this.$refs.setting.init();
    },
    goAdmin() {
      this.$router.push('/admin/dashboard');
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      let timer = setTimeout(() => {
        this.loading = false;
        clearTimeout(timer);
      }, 500);
    },
  },
};
</script>
<style lang="scss">
@import "./home.scss";
</style>
