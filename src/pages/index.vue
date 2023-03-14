<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/store/user'
import { getTest, getTest2 } from '~/api/admin'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()

const { count } = storeToRefs(userStore)

// 获取公告
const getTestFunc = async () => {
  let params = {}

  const { code, result, msg } = await getTest2(params)

  if (code === 0 && result) {
    console.log('getTestFunc成功', result)
  } else {
    ElMessage({
      message: msg,
      type: 'error',
    })
    console.log('getTestFunc失败', msg)
  }
}

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
    <el-button type="primary" @click="() => userStore.setCount()"
      >add value
    </el-button>
    <el-button type="primary" @click="getTestFunc()">get Data </el-button>
  </div>
</template>

<style lang="less" scoped></style>
