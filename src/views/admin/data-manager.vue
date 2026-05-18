<template>
  <div class="data-manager">
    <el-card shadow="hover">
      <div slot="header" class="card-header">
        <span>{{ title }} - 数据管理</span>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增数据</el-button>
      </div>

      <!-- 数据表格 -->
      <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%"
        :max-height="tableMaxHeight">
        <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label"
          :width="col.width" :min-width="col.minWidth" :sortable="col.sortable">
          <template slot-scope="scope">
            {{ scope.row[col.prop] !== null && scope.row[col.prop] !== undefined ? scope.row[col.prop] : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" style="padding:4px 8px" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" style="padding:4px 8px" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="140px" size="small">
        <el-form-item v-for="col in editableColumns" :key="col.prop" :label="col.label">
          <el-input v-model="editForm[col.prop]" :placeholder="'请输入' + col.label"
            :type="col.type === 'number' ? 'number' : 'text'"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="small" :loading="saveLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getYunNanGdpList, addYunNanGdp, updateYunNanGdp, deleteYunNanGdp,
  getCityGdpList, addCityGdp, updateCityGdp, deleteCityGdp,
  getNationalGdpList, addNationalGdp, updateNationalGdp, deleteNationalGdp,
  getQuarterGdpList, addQuarterGdp, updateQuarterGdp, deleteQuarterGdp,
  getConsumptionList, addConsumption, updateConsumption, deleteConsumption,
  getPopulationList, addPopulation, updatePopulation, deletePopulation,
  getRateList, addRate, updateRate, deleteRate,
  getNationalPopulationList, addNationalPopulation, updateNationalPopulation, deleteNationalPopulation,
  getLifeList, addLife, updateLife, deleteLife,
} from '@/api/modules'

// 各数据类型的列配置
const tableConfigs = {
  yunnanGdp: {
    title: '云南省GDP',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'year', label: '年份', minWidth: 80, editable: true },
      { prop: 'regionalGdp', label: '地区GDP(亿元)', minWidth: 110, editable: true, type: 'number' },
      { prop: 'capitaGdp', label: '人均GDP(元)', minWidth: 100, editable: true, type: 'number' },
      { prop: 'primaryIndustry', label: '第一产业', minWidth: 90, editable: true, type: 'number' },
      { prop: 'secondaryIndustry', label: '第二产业', minWidth: 90, editable: true, type: 'number' },
      { prop: 'tertiaryIndustry', label: '第三产业', minWidth: 90, editable: true, type: 'number' },
      { prop: 'agricultureForestry', label: '农林业', minWidth: 70, editable: true, type: 'number' },
      { prop: 'industry', label: '工业', minWidth: 70, editable: true, type: 'number' },
      { prop: 'constructionIndustry', label: '建筑业', minWidth: 70, editable: true, type: 'number' },
      { prop: 'wholesale', label: '批发零售', minWidth: 70, editable: true, type: 'number' },
      { prop: 'traffic', label: '交通运输', minWidth: 70, editable: true, type: 'number' },
      { prop: 'accommodation', label: '住宿业', minWidth: 70, editable: true, type: 'number' },
      { prop: 'financialIndustry', label: '金融业', minWidth: 70, editable: true, type: 'number' },
      { prop: 'regionalIndex', label: '增长指数', minWidth: 70, editable: true, type: 'number' },
    ],
    api: { list: getYunNanGdpList, add: addYunNanGdp, update: updateYunNanGdp, delete: deleteYunNanGdp }
  },
  cityGdp: {
    title: '各市GDP',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'location', label: '城市', minWidth: 140, editable: true },
      { prop: 'gdp', label: 'GDP(亿元)', minWidth: 100, editable: true, type: 'number' },
      { prop: 'population', label: '人口(万人)', minWidth: 100, editable: true, type: 'number' },
    ],
    api: { list: getCityGdpList, add: addCityGdp, update: updateCityGdp, delete: deleteCityGdp }
  },
  nationalGdp: {
    title: '全国各省GDP',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'location', label: '省份', minWidth: 140, editable: true },
      { prop: 'gdp', label: 'GDP(亿元)', minWidth: 100, editable: true, type: 'number' },
    ],
    api: { list: getNationalGdpList, add: addNationalGdp, update: updateNationalGdp, delete: deleteNationalGdp }
  },
  quarterGdp: {
    title: '季度GDP',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'quarter', label: '季度', minWidth: 140, editable: true },
      { prop: 'quarterGdp', label: 'GDP(亿元)', minWidth: 100, editable: true, type: 'number' },
    ],
    api: { list: getQuarterGdpList, add: addQuarterGdp, update: updateQuarterGdp, delete: deleteQuarterGdp }
  },
  consumption: {
    title: '居民消费水平',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'year', label: '年份', minWidth: 80, editable: true },
      { prop: 'consumptionLevel', label: '消费水平(元)', minWidth: 100, editable: true, type: 'number' },
      { prop: 'ruralResidents', label: '农村居民(元)', minWidth: 100, editable: true, type: 'number' },
      { prop: 'urbanResidents', label: '城镇居民(元)', minWidth: 100, editable: true, type: 'number' },
      { prop: 'consumptionIndex', label: '消费指数', minWidth: 80, editable: true, type: 'number' },
      { prop: 'ruralIndex', label: '农村指数', minWidth: 80, editable: true, type: 'number' },
      { prop: 'urbanIndex', label: '城镇指数', minWidth: 80, editable: true, type: 'number' },
    ],
    api: { list: getConsumptionList, add: addConsumption, update: updateConsumption, delete: deleteConsumption }
  },
  population: {
    title: '人口数据',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'year', label: '年份', minWidth: 80, editable: true },
      { prop: 'permanentPopulation', label: '常住人口(万人)', minWidth: 120, editable: true, type: 'number' },
      { prop: 'urbanPopulation', label: '城镇人口(万人)', minWidth: 120, editable: true, type: 'number' },
      { prop: 'ruralPopulation', label: '乡村人口(万人)', minWidth: 120, editable: true, type: 'number' },
    ],
    api: { list: getPopulationList, add: addPopulation, update: updatePopulation, delete: deletePopulation }
  },
  rate: {
    title: '人口出生率/死亡率',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'year', label: '年份', minWidth: 80, editable: true },
      { prop: 'birthRate', label: '出生率(‰)', minWidth: 80, editable: true, type: 'number' },
      { prop: 'mortalityRate', label: '死亡率(‰)', minWidth: 80, editable: true, type: 'number' },
      { prop: 'growthRate', label: '增长率(‰)', minWidth: 80, editable: true, type: 'number' },
      { prop: 'totalPopulation', label: '总人口', minWidth: 75, editable: true, type: 'number' },
      { prop: 'numberPopulation', label: '总人数', minWidth: 75, editable: true, type: 'number' },
      { prop: 'age1', label: '0-14岁', minWidth: 70, editable: true, type: 'number' },
      { prop: 'age2', label: '15-64岁', minWidth: 70, editable: true, type: 'number' },
      { prop: 'age3', label: '65岁及以上', minWidth: 80, editable: true, type: 'number' },
      { prop: 'malePopulation', label: '男性人口', minWidth: 80, editable: true, type: 'number' },
      { prop: 'femalePopulation', label: '女性人口', minWidth: 80, editable: true, type: 'number' },
    ],
    api: { list: getRateList, add: addRate, update: updateRate, delete: deleteRate }
  },
  nationalPopulation: {
    title: '全国人口',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'location', label: '省份', minWidth: 140, editable: true },
      { prop: 'population', label: '人口(万人)', minWidth: 100, editable: true, type: 'number' },
    ],
    api: { list: getNationalPopulationList, add: addNationalPopulation, update: updateNationalPopulation, delete: deleteNationalPopulation }
  },
  life: {
    title: '平均预期寿命',
    columns: [
      { prop: 'id', label: 'ID', width: 60, editable: false },
      { prop: 'lifeExpectancy', label: '平均预期寿命(岁)', minWidth: 130, editable: true, type: 'number' },
      { prop: 'maleLife', label: '男性(岁)', minWidth: 80, editable: true, type: 'number' },
      { prop: 'femaleLife', label: '女性(岁)', minWidth: 80, editable: true, type: 'number' },
    ],
    api: { list: getLifeList, add: addLife, update: updateLife, delete: deleteLife }
  },
};

export default {
  name: 'DataManager',
  data() {
    return {
      loading: false,
      saveLoading: false,
      tableData: [],
      dialogVisible: false,
      dialogTitle: '',
      editForm: {},
      isEdit: false,
      tableMaxHeight: 600,
    }
  },
  computed: {
    dataType() {
      return this.$route.meta.dataType || 'yunnanGdp';
    },
    config() {
      return tableConfigs[this.dataType] || tableConfigs.yunnanGdp;
    },
    title() {
      return this.config.title;
    },
    columns() {
      return this.config.columns;
    },
    editableColumns() {
      return this.config.columns.filter(c => c.editable);
    }
  },
  watch: {
    '$route.path'() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
    this.calcTableHeight();
    window.addEventListener('resize', this.calcTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcTableHeight);
  },
  methods: {
    calcTableHeight() {
      this.tableMaxHeight = window.innerHeight - 240;
    },
    async loadData() {
      this.loading = true;
      try {
        const res = await this.config.api.list();
        if (res.success) {
          this.tableData = res.data || [];
        } else {
          this.$message.error(res.msg || '加载数据失败');
        }
      } catch (e) {
        this.$message.error('加载数据异常');
      } finally {
        this.loading = false;
      }
    },
    handleAdd() {
      this.isEdit = false;
      this.dialogTitle = '新增 - ' + this.title;
      this.editForm = {};
      this.editableColumns.forEach(col => {
        this.$set(this.editForm, col.prop, col.type === 'number' ? 0 : '');
      });
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.isEdit = true;
      this.dialogTitle = '编辑 - ' + this.title;
      this.editForm = { ...row };
      this.dialogVisible = true;
    },
    async handleSave() {
      this.saveLoading = true;
      try {
        let res;
        if (this.isEdit) {
          res = await this.config.api.update(this.editForm);
        } else {
          res = await this.config.api.add(this.editForm);
        }
        if (res.success) {
          this.$message.success(this.isEdit ? '修改成功' : '新增成功');
          this.dialogVisible = false;
          this.loadData();
        } else {
          this.$message.error(res.msg || '操作失败');
        }
      } catch (e) {
        this.$message.error('操作异常');
      } finally {
        this.saveLoading = false;
      }
    },
    handleDelete(row) {
      this.$confirm('确定删除该条数据吗？删除后不可恢复。', '删除确认', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.config.api.delete(row.id);
          if (res.success) {
            this.$message.success('删除成功');
            this.loadData();
          } else {
            this.$message.error(res.msg || '删除失败');
          }
        } catch (e) {
          this.$message.error('删除异常');
        }
      }).catch(() => { });
    }
  }
}
</script>
<style scoped>
.data-manager {
  max-width: 1400px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-heading);
  font-size: var(--font-heading);
  color: var(--color-on-canvas);
}
.dialog-footer {
  text-align: right;
}
.el-card {
  background: var(--admin-stat-card-bg);
  border: 1px solid var(--color-hairline);
}

/* Element 表格暗色主题覆盖 */
:deep(.el-table) {
  background: transparent;
  color: var(--color-on-canvas);
}
:deep(.el-table th.el-table__cell) {
  background: var(--color-surface-elevated);
  color: var(--color-on-canvas);
  border-bottom: 1px solid var(--color-hairline);
}
:deep(.el-table tr) {
  background: transparent;
}
:deep(.el-table td.el-table__cell) {
  background: transparent;
  color: var(--color-on-canvas);
  border-bottom: 1px solid var(--color-hairline);
}
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background: rgba(59,130,246,0.04);
}
:deep(.el-table__body tr:hover > td.el-table__cell) {
  background: var(--color-surface-hover) !important;
}
:deep(.el-table__empty-text) {
  color: var(--color-on-canvas-mute);
}
</style>
