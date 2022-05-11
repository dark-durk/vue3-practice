<template>
  <div class="router-nav">
    <ul>
      <transition-group>
        <li v-for="(item) in routes" :key="item.path">
          {{item.des}}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts" setup>
console.log(routes)
</script>

<script lang="ts">
import { routes } from '@/router'

export default {
  name: '',
}
</script>

<style lang="scss" scoped>
</style>
