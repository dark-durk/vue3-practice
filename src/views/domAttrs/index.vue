<template>
  <router-view>
    <template #default="{ Component, route }">
      <Component :is="Component" :key="route.fullPath" />
    </template>
  </router-view>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: '',
}
</script>

<style lang="scss" scoped></style>
