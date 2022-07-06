<template>
  <div class="test-shape-outside test1">
    <img src="/public/images/round-balloon.png" alt="" class="test1_image image" />
    should call for him at his house, after dinner, not later than eleven o’clock. This athletic
    young Frenchman belongs to a small set of Parisian sportsmen, who have taken up “ballooning” as
    a pastime. After having exhausted all the sensations that are to be found in ordinary sports,
    even those of “automobiling” at a breakneck speed, the members of the “Aéro Club” now seek in
    the air, where they indulge in all kinds of daring feats, the nerve-racking excitement that they
    have ceased to fin
  </div>

  <div class="test2 test-shape-outside">
    <div class="shape shape_left"></div>
    <div class="shape shape_right"></div>
    <div class="content">
      <p>
        1. should call for him at his house, after dinner, not later than eleven o’clock. This
        athletic
      </p>
      <p>
        2. should call for him at his house, after dinner, not later than eleven o’clock. This
        athletic
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* 关键字值 */
/* shape-outside: none;
shape-outside: margin-box;
shape-outside: content-box;
shape-outside: border-box;
shape-outside: padding-box; */

/* 函数值 */
/* shape-outside: circle();
shape-outside: ellipse();
shape-outside: inset(10px 10px 10px 10px);
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px); */

/* <url> 值 */
// shape-outside: url(image.png);

/* 渐变值 */
// shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);

/* 全局值 */
/* shape-outside: initial;
shape-outside: inherit;
shape-outside: unset; */
</script>

<script lang="ts">
export default {
  name: 'TestShapeOutside',
}
</script>

<style lang="scss" scoped>
.test-shape-outside {
  width: 700px;
  margin: 50px auto 0;
}
.image {
  width: 100px;
  height: 100px;
  margin: 20px;
}
.test1 {
  .test1_image {
    float: left;
    shape-outside: circle(50%);
  }
}
.test2 {
  height: 300px;
  background-color: #eee;
  .content {
    position: relative;
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      left: 50px;
      right: 0px;
      top: 0;
      bottom: 0;
      background: #fff;
      z-index: -1;
      border: 1px solid #223;
      transform: skew(-23deg, 0deg);
    }
  }
  .shape {
    width: 100px;
    height: 100%;
  }
  .shape_left {
    float: left;
    shape-outside: polygon(0 0, 100% 0, 0% 100%);
  }
  .shape_right {
    float: right;
    shape-outside: polygon(0% 100%, 100% 100%, 100% 0);
  }
}
</style>
