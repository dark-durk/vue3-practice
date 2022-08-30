import { App, Component, DirectiveBinding, VNode } from 'vue';
import { ElMessage } from 'element-plus';
type voidFn = (...args: any[]) => void;
function debounce(fn: voidFn, delay?: number | string, immediate?: boolean): voidFn {
  if (delay === undefined) {
    delay = 500;
  }
  if (immediate === undefined) {
    immediate = false;
  }
  let timer: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
      ElMessage({
        type: 'warning',
        message: '请勿频繁操作',
        duration: 2000
      });
    }
    if (immediate) {
      const callnow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, Number(delay));
      if (callnow) fn(...args);
    } else {
      timer = setTimeout(() => {
        fn(...args);
      }, Number(delay));
    }
  };
}
export default {
  install(Vue: App, options: Component) {
    Vue.directive('debounce', {
      beforeMount(el: HTMLElement, { arg, value, modifiers }, vnode: VNode) {
        let modifiersList = modifiers && Object.keys(modifiers);
        let delay = (modifiersList.length && modifiersList[0]) || 500;
        let immediate = modifiers.immediate || false;
        let d_fn = debounce(value.bind(vnode), delay, immediate);
        el.addEventListener(arg || 'click', (ev) => {
          d_fn(ev);
        });
      }
    });
  }
};
