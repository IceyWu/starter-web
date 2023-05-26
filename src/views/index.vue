<script setup>

onMounted(() => {})
</script>

<template>
  <div class="h-screen w-full gap-5">
    <h1>Hello Start demo!</h1>

    <h2>
      Count:
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
      >
        {{ count }}
      </span>
    </h2>
   
  </div>
</template>

<style lang="less" scoped></style>
