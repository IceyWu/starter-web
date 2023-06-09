<template>
  <div
    font-sans
    text="center gray-700 dark:gray-200"
    class="w-full h-screen flex flex-col"
  >
    <TheHeader ref="header" />
    <van-tabs
      v-model:active="activeTabindex"
      line-width="20px"
      title-inactive-color="#363A44"
      title-active-color="#428FFC"
      @change="tabChange"
      shrink
      swipeable
      :sticky="true"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :to="item.path"
        :name="index"
        :key="index"
      >
        <!-- 标题 -->
        <template #title>
          <div class="title">
            {{ item.title }}
          </div>
        </template>
        <!-- 内容 -->
        <div class="main-con h-full">
          <router-view />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup>
const activeTabindex = ref(0);
const tabList = [
  {
    title: "首页",
    path: "/",
  },
  {
    title: "关于",
    path: "/about",
  },
  {
    title: "博客",
    path: "/blog",
  },
  {
    title: "项目",
    path: "/project",
  },
  {
    title: "留言",
    path: "/message",
  },
];
const tabChange = (index) => {
  console.log("tabChange", index);
  // activeTabindex.value = index;
};
</script>
<style lang="less" scoped>
.main-con {
  height: calc(100vh - 300px);
}
</style>
