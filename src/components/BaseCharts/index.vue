
<template>
  <div @resize="resize" class="charts" ref="chartsRef"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch, defineProps, withDefaults, onBeforeUnmount } from 'vue'

const chartsRef = ref<Nullable<any>>()
let chart: any = null

interface Props {
  option?: any
}
const props = withDefaults(defineProps<Props>(), {
  option: false,
})
watch(
  () => props.option,
  (count, prevCount) => {
    chart && chart.setOption(props.option, true)
  },
  {
    deep: true,
  },
)
let observer = new ResizeObserver(callback)
let timeout:any = 0
function callback () {
  timeout && clearTimeout(timeout)
  timeout = setTimeout(() => {
    chart && chart.resize()
  }, 200)
}
onMounted(() => {
  chart = chartsRef.value && echarts.init(chartsRef.value)
  props.option && chart && chart.setOption(props.option, true)
  observer.observe(chartsRef.value)
})
onBeforeUnmount(() => {
  observer.unobserve(chartsRef.value)
})
</script>

<script lang="ts">
export default {
  name: 'BaseCharts',
  inheritAttrs: true,
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
