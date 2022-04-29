<template>
  <el-button type="primary" size="small" @click="open">测试</el-button>

  <router-view></router-view>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue-demi'
const open = () => {
  ElMessage({ message: '测试' })
}
onMounted(() => {
  setTimeout(() => {
    ElMessage({ message: '1', duration: 0 })
  }, 0)
  setTimeout(() => {
    ElMessage.warning('2')
  }, 0)
  setTimeout(() => {
    ElMessage({ message: '3', duration: 0 })
  }, 0)
})
</script>

<style></style>
