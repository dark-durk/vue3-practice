<template>
  <div>
    <div class="box">
      <h4>hideTips</h4>
      <div v-hideTips class="hideTips">hideTips test is hidden</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'DirectivesTest1',
}
</script>

<style lang="scss" scoped>
$fontList: 28px, 26px, 24px, 20px, 18px, 16px;

@each $item in $fontList {
  // 通过index获取列表索引
  $index: index($fontList, $item);
  h#{$index} {
    font-size: $item;
    font-weight: 700;
  }
}
.box {
  margin-top: 20px;
  border: 1px solid #eeeeee;
}
.hideTips {
  width: 50px;
}
</style>
