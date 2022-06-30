<template>
  <div class="tabindex">
    <div tabindex="0">
      <p class="test-inset">1221</p>
      <span class="test-inset">1221</span>
    </div>
    <div tabindex="0"></div>
    <div tabindex="1"></div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'TestTabindex',
}
</script>

<style lang="scss" scoped>
.tabindex {
  padding: 0 20px;
  div {
    height: 50px;
    margin-top: 20px;
    border: 1px solid #333;
    &:focus {
      border-color: red;
    }
  }
  .test-inset {
    inset: 5px;
  }
}
</style>
