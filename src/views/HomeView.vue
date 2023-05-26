<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button>Default</el-button>
    <HelloWorld bg-red-400 msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
