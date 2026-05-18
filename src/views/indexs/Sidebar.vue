<template>
  <div class="sidebar">
    <div
      class="nav-item"
      :class="{ active: activeIndex === 'gdp' }"
      @click="navigateTo('gdp')"
    >
      <span class="nav-label">GDP</span>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeIndex === 'population' }"
      @click="navigateTo('population')"
    >
      <span class="nav-label">人口</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activeIndex: 'gdp'
    };
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler(name) {
        if (name === 'population') {
          this.activeIndex = 'population';
        } else {
          this.activeIndex = 'gdp';
        }
      }
    }
  },
  methods: {
    navigateTo(routeName) {
      this.activeIndex = routeName;
      this.$router.push({ name: routeName });
    }
  }
}
</script>
<style scoped>
.sidebar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-right: 30px;
  margin-top: 15px;
}

.nav-item {
  position: relative;
  padding: 6px 20px;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast), color var(--transition-fast);
  color: var(--color-on-canvas-mute);
  font-size: var(--font-body);
  font-weight: var(--font-weight-body);
  user-select: none;
}

.nav-item:hover {
  color: var(--color-on-canvas);
  background: var(--color-surface-elevated);
}

.nav-item.active {
  color: var(--color-accent-cyan);
  font-weight: var(--font-weight-heading);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  border-radius: 1px;
  background: var(--color-accent-cyan);
  box-shadow: var(--shadow-glow-cyan);
}

.nav-label {
  display: block;
  line-height: 1;
}
</style>
