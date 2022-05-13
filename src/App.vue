<template>
  <router-nav></router-nav>
  <!-- 命名视图 -->
  <router-view name="routerNav"></router-view>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import routerNav from './views/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    [routerNav.name]: routerNav,
  },
  setup() {},
})
</script>

<style></style>
