<script setup>
import { apiGet, apiPost, getLogin } from "~/api/admin";
import { tagFindAll } from "~/api/tag";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore();

const { count } = storeToRefs(userStore);

// 获取公告
const getTestFunc = async () => {
  let params = {};

  const { code, result, msg } = await apiGet(params);

  if (code === 0 && result) {
    console.log("getTestFunc成功", result);
  } else {
    ElMessage({
      message: msg,
      type: "error",
    });
    console.log("getTestFunc失败", msg);
  }
};

onMounted(() => {});
// get api test
const getTestData = async () => {
  const params = {};
  const { code, msg, result } = ({} = await tagFindAll(params));

  if (code === 200) {
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
// login
const loginFunc = async () => {
  const params = {
    mobile: "18882076569",
    password: "123456",
  };
  const { code, msg, result } = ({} = await userStore.handLogin(params));
  if (code === 200) {
    console.log("post api test成功", result);
  } else {
    console.log("post api test失败", msg);
  }
};
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
    <el-button type="primary" @click="() => userStore.setCount()"
      >add value
    </el-button>
    <el-button type="primary" @click="getTestData()">get Data </el-button>
    <el-button type="primary" @click="loginFunc()">Login </el-button>
  </div>
</template>

<style lang="less" scoped></style>
