<!--
 * @Author: daidai
 * @Date: 2022-01-12 14:06:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\App.vue
-->
<template>
  <div id="app">
    <transition name="fade-slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-canvas);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
