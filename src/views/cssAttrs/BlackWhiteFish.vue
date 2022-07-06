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


<script lang="ts" setup>

</script>

<style lang="scss" scoped>
$test-width : 200px;
$test-height : 200px;
.wrap{
  padding: 20px;
  background-color: #eee;
}
.test1{
  width: $test-width;
  height: $test-height;
  position: relative;
  border-radius: 50%;
  background-image: linear-gradient(to right,#fff 0%,#fff 50%, #000 50% ,#000);
  &::before,&::after{
    content:'';
    width: $test-width/2;
    height: $test-height/2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }
  &::before{
    top: 0;
    background-image: radial-gradient(circle,#fff 13%,#000 calc(13% + 1px));
  }
  &::after{
    bottom: 0;
    background-image: radial-gradient(circle,#000 13%,#fff calc(13% + 1px));
  }
}
</style>
