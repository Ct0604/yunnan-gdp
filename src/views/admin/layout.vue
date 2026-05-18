<template>
  <div class="admin-layout">
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>GDP后台</h3>
      </div>
      <el-menu :default-active="activeMenu" class="sidebar-menu"
        background-color="var(--admin-sidebar-bg)" text-color="var(--admin-sidebar-text)"
        active-text-color="var(--admin-sidebar-active)" :router="true">
        <el-menu-item index="/admin/dashboard">
          <i class="el-icon-s-home"></i><span>控制台</span>
        </el-menu-item>
        <el-submenu index="gdp-menu">
          <template slot="title"><i class="el-icon-s-data"></i><span>GDP数据</span></template>
          <el-menu-item index="/admin/yunnanGdp">云南省GDP</el-menu-item>
          <el-menu-item index="/admin/cityGdp">各市GDP</el-menu-item>
          <el-menu-item index="/admin/nationalGdp">全国各省GDP</el-menu-item>
          <el-menu-item index="/admin/quarterGdp">季度GDP</el-menu-item>
          <el-menu-item index="/admin/consumption">居民消费水平</el-menu-item>
        </el-submenu>
        <el-submenu index="pop-menu">
          <template slot="title"><i class="el-icon-user"></i><span>人口数据</span></template>
          <el-menu-item index="/admin/population">人口数据</el-menu-item>
          <el-menu-item index="/admin/rate">出生率/死亡率</el-menu-item>
          <el-menu-item index="/admin/nationalPopulation">全国人口</el-menu-item>
          <el-menu-item index="/admin/life">平均预期寿命</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-area">
      <div class="top-bar">
        <div class="top-bar-left">
          <a href="#/" class="back-screen">返回可视化大屏</a>
        </div>
        <div class="top-bar-right">
          <span class="user-name">{{ adminUser.nickname || adminUser.username || '管理员' }}</span>
          <span class="logout-btn" @click="handleLogout">退出</span>
        </div>
      </div>
      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { adminLogout } from '@/api/modules'
export default {
  name: 'AdminLayout',
  data() { return { adminUser: {} } },
  computed: { activeMenu() { return this.$route.path; } },
  created() {
    const user = localStorage.getItem('adminUser');
    if (user) { try { this.adminUser = JSON.parse(user); } catch (e) { this.adminUser = {}; } }
  },
  methods: {
    async handleLogout() {
      try { await adminLogout(); } catch (e) { }
      localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser');
      this.$router.push('/admin/login');
    }
  }
}
</script>
<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: var(--admin-content-bg); color: var(--color-on-canvas); }
.sidebar { width: 220px; background: var(--admin-sidebar-bg); flex-shrink: 0; display: flex; flex-direction: column; }
.sidebar-header { padding: 20px 16px; border-bottom: 1px solid var(--color-hairline); }
.sidebar-header h3 { color: var(--color-on-surface); margin: 0; font-size: 18px; text-align: center; }
.sidebar-menu { border-right: none; }
.main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.top-bar { height: 56px; background: var(--admin-topbar-bg); display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--spacing-lg); border-bottom: 1px solid var(--color-hairline); }
.back-screen { color: var(--color-primary-soft); text-decoration: none; font-size: var(--font-body); }
.back-screen:hover { text-decoration: underline; }
.top-bar-right { display: flex; align-items: center; gap: var(--spacing-md); }
.user-name { color: var(--color-on-canvas-mute); font-size: var(--font-body); }
.logout-btn { color: var(--color-danger); font-size: var(--font-body); cursor: pointer; transition: opacity var(--transition-fast); }
.logout-btn:hover { opacity: 0.8; }
.content-area { flex: 1; padding: var(--spacing-lg); overflow-y: auto; }
</style>

<!-- Element UI 暗色主题全局覆盖（不可 scoped） -->
<style>
.admin-layout .el-form-item__label,
.admin-layout .el-radio__label,
.admin-layout .el-checkbox__label { color: var(--color-on-canvas-mute) !important; }
.admin-layout .el-input__inner,
.admin-layout .el-textarea__inner { background: var(--color-surface-elevated); border-color: var(--color-hairline); color: var(--color-on-canvas); }
.admin-layout .el-input__inner::placeholder { color: var(--color-on-canvas-dim); }
.admin-layout .el-input__inner:hover,
.admin-layout .el-textarea__inner:hover { border-color: var(--color-hairline-strong); }
.admin-layout .el-input__inner:focus,
.admin-layout .el-textarea__inner:focus { border-color: var(--color-primary); }
.admin-layout .el-button--default { background: var(--color-surface-elevated); border-color: var(--color-hairline-strong); color: var(--color-on-canvas); }
.admin-layout .el-button--default:hover { background: var(--color-surface-hover); border-color: var(--color-primary); color: var(--color-primary-soft); }
.admin-layout .el-dialog { background: var(--color-surface); }
.admin-layout .el-dialog__title { color: var(--color-on-canvas); }
.admin-layout .el-dialog__body { color: var(--color-on-canvas-mute); }
.admin-layout .el-pagination button,
.admin-layout .el-pagination span { color: var(--color-on-canvas-mute); }
.admin-layout .el-pagination .el-select .el-input .el-input__inner { background: var(--color-surface-elevated); color: var(--color-on-canvas); }
.admin-layout .el-message-box { background: var(--color-surface); }
.admin-layout .el-message-box__message { color: var(--color-on-canvas-mute); }
.admin-layout .el-card { background: var(--admin-stat-card-bg); border-color: var(--color-hairline); color: var(--color-on-canvas); }
.admin-layout .el-card__header { color: var(--color-on-canvas); border-bottom-color: var(--color-hairline); }
.admin-layout .el-card__body { color: var(--color-on-canvas); }
</style>
