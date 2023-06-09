<template>
  <div id="main-con">
    <van-config-provider :theme="theme">
      <router-view />
    </van-config-provider>
  </div>
</template>

<script setup>
import { isDark } from "@/composables";
const theme = computed(() => (isDark.value ? "dark" : "light"));
</script>

<style lang="less">
.main-con {
  // font-size: 58px;
  // background-color: #f8f8f8;
  // -webkit-font-smoothing: antialiased;
}
</style>
