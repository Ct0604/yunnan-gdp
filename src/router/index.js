import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "LSD.bighome" */ '../views/home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "LSD.bighome" */ '@/views/indexs/gdp/index.vue'),
      },
      {
        path: '/gdp',
        name: 'gdp',
        component: () => import(/* webpackChunkName: "gdp" */ '@/views/indexs/gdp/index.vue'),
      },
      {
        path: '/population',
        name: 'population',
        component: () => import(/* webpackChunkName: "gdp" */ '@/views/indexs/population/index.vue'),
      },
    ]
  },
  // ===== 后台管理系统路由 =====
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/layout.vue'),
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'adminDashboard',
        component: () => import('@/views/admin/dashboard.vue'),
        meta: { title: '控制台', requiresAuth: true }
      },
      {
        path: 'yunnanGdp',
        name: 'adminYunnanGdp',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '云南省GDP', dataType: 'yunnanGdp', requiresAuth: true }
      },
      {
        path: 'cityGdp',
        name: 'adminCityGdp',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '各市GDP', dataType: 'cityGdp', requiresAuth: true }
      },
      {
        path: 'nationalGdp',
        name: 'adminNationalGdp',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '全国各省GDP', dataType: 'nationalGdp', requiresAuth: true }
      },
      {
        path: 'quarterGdp',
        name: 'adminQuarterGdp',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '季度GDP', dataType: 'quarterGdp', requiresAuth: true }
      },
      {
        path: 'consumption',
        name: 'adminConsumption',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '居民消费水平', dataType: 'consumption', requiresAuth: true }
      },
      {
        path: 'population',
        name: 'adminPopulation',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '人口数据', dataType: 'population', requiresAuth: true }
      },
      {
        path: 'rate',
        name: 'adminRate',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '人口出生率/死亡率', dataType: 'rate', requiresAuth: true }
      },
      {
        path: 'nationalPopulation',
        name: 'adminNationalPopulation',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '全国人口', dataType: 'nationalPopulation', requiresAuth: true }
      },
      {
        path: 'life',
        name: 'adminLife',
        component: () => import('@/views/admin/data-manager.vue'),
        meta: { title: '平均预期寿命', dataType: 'life', requiresAuth: true }
      },
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

// 路由守卫 - 后台管理系统需要登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
