import { App, Component, VNode } from 'vue'
import { ElMessage } from 'element-plus'

/* 
click 需要绑定的事件  用于 addEventlistener('click')
3000 延迟时间 
immediate 是否立刻执行， 如果不需要则不写，使用 v-debounce:click.3000
<!-- 属性请按照这个顺序书写 .3000.immediate -->

<!-- 不带参数  -->
<button v-debounce:click.3000.immediate="handleClick1">点击</button>

*/

/* 
<!-- 带参数 -->
<button v-debounce:click.3000.immediate="handleClick1.bind(null, '1', '2')">点击</button>
<button v-debounce:click.3000.immediate="handleClick1.bind(null, test, '2')">点击</button>
<button v-for="item in list" :key="item" v-debounce:click.3000.immediate="handleClick1.bind(null, item, '2')">点击</button>
 */
type voidFn = (...args: any[]) => void
function debounce(fn: voidFn, delay?: number | string, immediate?: boolean): voidFn {
  if (delay === undefined) {
    delay = 500
  }
  if (immediate === undefined) {
    immediate = false
  }
  let timer: NodeJS.Timeout | null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
      ElMessage({
        type: 'warning',
        message: '请勿频繁操作',
        duration: 2000,
      })
    }
    if (immediate) {
      const callnow = !timer
      timer = setTimeout(() => {
        timer = null
      }, Number(delay))
      if (callnow) fn(...args)
    } else {
      timer = setTimeout(() => {
        fn(...args)
      }, Number(delay))
    }
  }
}
export default {
  install(Vue: App, options: Component) {
    Vue.directive('debounce', {
      beforeMount(el: HTMLElement, { arg, value, modifiers }, vnode: VNode) {
        const modifiersList = modifiers && Object.keys(modifiers)
        const delay = (modifiersList.length && modifiersList[0]) || 500
        const immediate = modifiers.immediate || false
        const d_fn = debounce(value.bind(vnode), delay, immediate)
        el.addEventListener(arg || 'click', ev => {
          d_fn(ev)
        })
      },
    })
  },
}
