<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:16:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\components\item-wrap\item-wrap.vue
-->
<template>
  <dv-border-box-13 class="lr_titles" :color="['var(--color-hairline)', 'var(--color-hairline-glow)']">
    <div class="item_title" v-if="title !== ''">
      <span class="title-deco left-deco"></span>
      <span class="title-text">{{ title }}</span>
      <span class="title-deco right-deco"></span>
    </div>
    <div
      :class="title !== '' ? 'item_title_content' : 'item_title_content_def'"
    >
      <slot></slot>
    </div>
    <div class="title-divider" v-if="title !== ''"></div>
  </dv-border-box-13>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
$item-title-height: 38px;
$item_title_content-height: calc(100% - 38px);

.lr_titles {
  box-sizing: border-box;
  background: var(--color-surface);
  border-radius: var(--radius-md);

  :deep(.border-box-content) {
    box-sizing: border-box;
    padding: 6px 16px 0px;
  }

  .item_title {
    height: $item-title-height;
    line-height: $item-title-height;
    width: 100%;
    color: var(--color-accent-cyan);
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .title-deco {
      display: inline-block;
      width: 32px;
      height: 2px;
      border-radius: 1px;
      flex-shrink: 0;
    }

    .left-deco {
      background: linear-gradient(90deg, transparent, var(--color-accent-cyan));
      margin-right: 12px;
    }

    .right-deco {
      background: linear-gradient(90deg, var(--color-accent-cyan), transparent);
      margin-left: 12px;
    }

    .title-text {
      font-weight: var(--font-weight-heading);
      font-size: var(--font-display-lg);
      letter-spacing: var(--letter-spacing-heading);
      background: var(--color-primary-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .title-divider {
    height: 1px;
    background: var(--color-hairline);
    margin: 2px 0 0;
  }

  .item_title_content {
    height: $item_title_content-height;
  }

  .item_title_content_def {
    width: 100%;
    height: 100%;
  }
}
</style>
