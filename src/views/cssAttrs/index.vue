<template>
  <div>
    <router-view>
      <template #default="{ Component, route }">
        <Component :is="Component" :key="route.fullPath" />
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'CssAttrs',
}
</script>

<style lang="scss" scoped></style>
