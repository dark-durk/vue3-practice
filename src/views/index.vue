<template>
  <div class="router-nav">
    <TransitionGroup>
      <div v-for="item in routesFilter" :key="item.path" class="module">
        <router-link v-if="!item.children" :to="item.path">
          {{ item.des ?? '' }}
        </router-link>
        <div v-else class="module-name">
          {{ item.des }}
          <ul class="module-children">
            <li v-for="(cItem, index) in item.children" :key="cItem.path">
              <router-link :to="cItem.path">
                <span class="number">{{ index + 1 }}.</span>
                {{ cItem.des ?? '' }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
  .module {
    display: inline-block;
    margin: 5px 10px;
    position: relative;
  }
  .module-children {
    display: none;
    position: absolute;
    top: 20px;
    left: 0;
    white-space: nowrap;
    padding-bottom: 10px;
    z-index:999;
  }
  .module-name:hover {
    .module-children {
      display: block;
    }
  }
  a {
    text-decoration: underline;
  }
}
</style>
