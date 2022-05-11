<template>
  <!-- 命名视图 -->
  <router-view name="routerNav"></router-view>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue-demi'
const open = () => {
  ElMessage({ message: '测试' })
}
onMounted(() => {})
</script>

<style></style>
