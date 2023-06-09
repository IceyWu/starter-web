<script setup>
import { apiGet, apiPost } from "@/api/admin";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
onMounted(() => {});
const active = ref(0);
// get api test
const getTestData = async () => {
  const params = {};
  const { code, msg, result } = ({} = await apiGet(params));

  if (code === 0) {
    console.log("get api test成功", result);
  } else {
    console.log("get api test失败", msg);
  }
};
// post api test
const postTestData = async () => {
  const params = {};
  const { code, msg, result } = ({} = await apiPost(params));
  if (code === 0) {
    console.log("post api test成功", result);
  } else {
    console.log("post api test失败", msg);
  }
};
</script>

<template>
  <div class="h-screen w-full gap-5">
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">
        <div class="test">
          <van-button @click="getTestData" type="primary">get请求</van-button>
          <van-button @click="postTestData" type="primary">post请求</van-button>
        </div>
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
