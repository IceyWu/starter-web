<script setup>
onMounted(() => {});
const active = ref(0);
</script>

<template>
  <div class="h-screen w-full gap-5">
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">
        <div class="test">内容 1</div>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
.test {
  // position: absolute;
  width: 232px;
  height: 87px;
  left: 46px;
  top: 347px;

  font-family: "Source Han Sans CN";
  font-style: normal;
  font-weight: 700;
  font-size: 58px;
  line-height: 87px;
  /* identical to box height */

  color: #353a44;
}
</style>
