<template>
  <div class="dashboard">
    <el-row :gutter="24">
      <el-col :span="6" v-for="item in statCards" :key="item.title">
        <el-card class="stat-card" shadow="hover" :body-style="{ padding: '20px' }">
          <div class="stat-icon" :style="{background: item.color}">
            <i :class="item.icon"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-title">{{ item.title }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 24px;">
      <el-col :span="16">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <div slot="header" class="card-header">
            <span>数据管理快捷入口</span>
          </div>
          <el-row :gutter="16">
            <el-col :span="8" v-for="table in tableList" :key="table.key" style="margin-bottom: 16px;">
              <el-card shadow="hover" class="table-card" @click.native="goToTable(table.key)">
                <i class="el-icon-document"></i>
                <span>{{ table.name }}</span>
                <i class="el-icon-arrow-right" style="float: right;"></i>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <div slot="header" class="card-header"><span>系统信息</span></div>
          <div class="info-list">
            <div class="info-item"><span class="info-label">项目名称</span><span class="info-value">云南省GDP可视化系统</span></div>
            <div class="info-item"><span class="info-label">技术栈</span><span class="info-value">SpringBoot + Vue2 + ECharts</span></div>
            <div class="info-item"><span class="info-label">数据库</span><span class="info-value">MySQL 8.0</span></div>
            <div class="info-item"><span class="info-label">数据表</span><span class="info-value">9张</span></div>
            <div class="info-item"><span class="info-label">管理员</span><span class="info-value">{{ adminName }}</span></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTableList, getYunNanGdpList, getCityGdpList, getPopulationList } from '@/api/modules'
export default {
  name: 'AdminDashboard',
  data() {
    return {
      tableList: [],
      statCards: [
        { title: '云南GDP记录', value: '-', icon: 'el-icon-s-data', color: 'var(--color-primary)' },
        { title: '各市GDP记录', value: '-', icon: 'el-icon-office-building', color: 'var(--color-accent-green)' },
        { title: '人口数据记录', value: '-', icon: 'el-icon-user', color: 'var(--color-accent-amber)' },
        { title: '数据表总数', value: '9', icon: 'el-icon-folder', color: 'var(--color-accent-rose)' },
      ]
    }
  },
  computed: {
    adminName() {
      const user = localStorage.getItem('adminUser');
      if (user) { try { return JSON.parse(user).nickname || '管理员'; } catch (e) { } }
      return '管理员';
    }
  },
  created() { this.loadTableList(); this.loadStats(); },
  methods: {
    async loadTableList() {
      try {
        const res = await getTableList();
        if (res.success && res.data) { this.tableList = res.data.keys.map((key, i) => ({ key, name: res.data.names[i] })); }
      } catch (e) { }
    },
    async loadStats() {
      try {
        const [gdp, city, pop] = await Promise.all([getYunNanGdpList(), getCityGdpList(), getPopulationList()]);
        if (gdp.success) this.statCards[0].value = gdp.data.length;
        if (city.success) this.statCards[1].value = city.data.length;
        if (pop.success) this.statCards[2].value = pop.data.length;
      } catch (e) { }
    },
    goToTable(key) { this.$router.push('/admin/' + key); }
  }
}
</script>
<style scoped>
.dashboard { max-width: 1200px; }
.stat-card { cursor: pointer; transition: transform var(--transition-fast); background: var(--admin-stat-card-bg); border: 1px solid var(--color-hairline); }
.stat-card:hover { transform: translateY(-4px); }
.stat-icon { width: 56px; height: 56px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;
  margin-right: var(--spacing-md); flex-shrink: 0; }
.stat-icon i { font-size: 28px; color: var(--color-on-primary); }
.stat-info { flex: 1; }
.stat-value { font-size: 28px; font-weight: var(--font-weight-number); color: var(--color-on-canvas); line-height: 1.2; }
.stat-title { font-size: var(--font-caption); color: var(--color-on-canvas-mute); margin-top: 4px; }
.card-header { font-weight: var(--font-weight-heading); font-size: var(--font-heading); color: var(--color-on-canvas); }
.table-card { cursor: pointer; transition: all var(--transition-fast); background: var(--admin-stat-card-bg); border: 1px solid var(--color-hairline); color: var(--color-on-canvas-mute); }
.table-card:hover { border-color: var(--color-primary); color: var(--color-primary); }
.info-list { padding: 0; }
.info-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--color-hairline); font-size: var(--font-body); }
.info-item:last-child { border-bottom: none; }
.info-label { color: var(--color-on-canvas-mute); }
.info-value { color: var(--color-on-canvas); font-weight: 500; }
</style>
