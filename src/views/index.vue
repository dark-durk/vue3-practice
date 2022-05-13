<template>
  <div class="router-nav">
    <TransitionGroup>
      <router-link v-for="item in routesFilter" :key="item.path" :to="item.path">
        {{ item.des }}
      </router-link>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '@/router'

const routesFilter = routes.filter(item => !item.components)

// console.log(routes, routesFilter)
</script>

<script lang="ts">
export default {
  name: 'RouterNav',
}
</script>

<style lang="scss" scoped>
.router-nav {
  > a {
    margin: 5px 10px;
    text-decoration: underline;
  }
}
</style>
