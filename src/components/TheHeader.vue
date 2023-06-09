<script setup>
import {isDark,toggleDark} from "@/composables"
onMounted(() => {})
</script>

<template>
  <div
    :class="isDark ? 'header-dark' : 'header-normal'"
    class="h-[55px] w-full flex items-center box-border px-[40px]"
  >
    <div  font-bold text="2xl">Wow🌟!</div>
    <div flex-1></div>
    <div class="flex h-full items-center gap-5">
      <div
        @click="toggleDark()"
        icon-btn
        dark:i-carbon-moon
        i-carbon-sun
        title="Change Theme"
      />
      <a
        icon-btn
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/IceyWu"
        target="_blank"
        title="GitHub"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>