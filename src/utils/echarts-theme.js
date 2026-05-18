/**
 * ECharts 统一主题 —— 映射自 DESIGN.md chart tokens
 * 所有图表组件通过 getChartTheme() 获取统一主题
 */

export function getChartTheme() {
  return {
    color: ['#3b82f6', '#00eaff', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4', '#ec4899'],
    backgroundColor: 'transparent',
    textStyle: {
      color: '#e2e8f0'
    },
    title: {
      textStyle: {
        color: '#e2e8f0',
        fontWeight: 600
      }
    },
    legend: {
      textStyle: {
        color: '#94a3b8',
        fontSize: 12
      },
      inactiveColor: '#64748b'
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(59, 130, 246, 0.25)',
      borderWidth: 1,
      textStyle: {
        color: '#e2e8f0',
        fontSize: 13
      },
      axisPointer: {
        lineStyle: {
          color: 'rgba(59, 130, 246, 0.15)'
        },
        crossStyle: {
          color: 'rgba(59, 130, 246, 0.15)'
        }
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(59, 130, 246, 0.15)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(59, 130, 246, 0.08)',
        type: 'dashed'
      }
    },
    categoryAxis: {
      axisLabel: {
        color: '#94a3b8',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(59, 130, 246, 0.15)'
        }
      },
      axisTick: {
        show: false
      }
    },
    valueAxis: {
      axisLabel: {
        color: '#94a3b8',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(59, 130, 246, 0.08)',
          type: 'dashed'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };
}

/**
 * 获取与主题一致的 ECharts option 常用片段
 */
export const chartTokens = {
  textColor: '#e2e8f0',
  textColorMuted: '#94a3b8',
  axisLineColor: 'rgba(59,130,246,0.15)',
  splitLineColor: 'rgba(59,130,246,0.08)',
  tooltipBg: 'rgba(15,23,42,0.95)',
  tooltipBorder: 'rgba(59,130,246,0.25)',
  palette: ['#3b82f6', '#00eaff', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4', '#ec4899']
};

/**
 * 生成统一的 ECharts option 基座
 * 合并主题到自定义 option
 */
export function applyChartTheme(customOption) {
  const theme = getChartTheme();
  const merged = JSON.parse(JSON.stringify(customOption));

  // 默认 grid
  if (!merged.grid) {
    merged.grid = { left: '3%', right: '4%', bottom: '3%', containLabel: true };
  }

  // 默认 legend 样式
  if (merged.legend && Array.isArray(merged.legend)) {
    merged.legend = merged.legend.map(l =>
      typeof l === 'object' ? { ...theme.legend, ...l } : l
    );
  } else if (merged.legend && typeof merged.legend === 'object') {
    merged.legend = { ...theme.legend, ...merged.legend };
  }

  // 默认 tooltip
  if (merged.tooltip) {
    merged.tooltip = { ...theme.tooltip, ...merged.tooltip };
  }

  // 颜色
  if (!merged.color) {
    merged.color = theme.color;
  }

  // 统一背景
  merged.backgroundColor = 'transparent';

  return merged;
}
