<template>
  <div class="wrap">
    <div class="test1"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BlackWhiteFish',
}
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
$test-width: 200px;
$test-height: 200px;
.wrap {
  padding: 20px;
  background-color: #eeeeee;
}
.test1 {
  position: relative;
  width: $test-width;
  height: $test-height;
  border-radius: 50%;
  background-image: linear-gradient(to right, #ffffff 0%, #ffffff 50%, #000000 50%, #000000);
  &::before,
  &::after {
    position: absolute;
    left: 50%;
    width: $test-width/2;
    height: $test-height/2;
    border-radius: 50%;
    content: "";
    transform: translateX(-50%);
  }
  &::before {
    top: 0;
    background-image: radial-gradient(circle, #ffffff 13%, #000000 calc(13% + 1px));
  }
  &::after {
    bottom: 0;
    background-image: radial-gradient(circle, #000000 13%, #ffffff calc(13% + 1px));
  }
}
</style>
