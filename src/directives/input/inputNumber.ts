// 限制input框，仅能输入数字。默认限制输入整数，可以通过传参设置小数位数
// v-number 限制整数，v-number:2 限制两位小数，v-number:2=3 限制两位小数，整数位三位，v-number=2 限制两位整数

// 根据el获取input
const getInput = (el: HTMLElement): HTMLInputElement | null =>
  el instanceof HTMLInputElement ? el : el.querySelector('input')

let inputHandler = () => {}
let compositionstart = () => {}
let compositionend = () => {}

export default {
  name: 'number',
  mounted(el: HTMLElement, { arg, value }: any, vnode: any) {
    const input: HTMLInputElement = <HTMLInputElement>getInput(el)
    if (input) {
      // 小数正则
      const decimal: string = arg ? `(\\.\\d{0,${arg}})?` : ''
      // 整数正则
      const integer: string = value ? `(0|[1-9]\\d{0,${value - 1}})` : '\\d*'
      const regExp = new RegExp(integer + decimal, 'g')
      inputHandler = () => {
        if (vnode.inputLocking) {
          return
        }
        // 替换所有的非数字项
        // 如果输入的数字不符合正则表达式，则替换为''
        input.value =
          input.value
            .toString()
            .trim()
            .replace(/[^\d.]/g, '')
            ?.match?.(regExp)?.[0] ?? ''
      }
      compositionstart = () => {
        vnode.inputLocking = true
      }
      compositionend = () => {
        vnode.inputLocking = false
        input.dispatchEvent(new Event('input'))
      }

      // 在文本框输入的时候触发
      input.addEventListener('input', inputHandler, true)
      // 中文输入法开始输入
      input.addEventListener('compositionstart', compositionstart, true)
      // 中文输入法结束
      input.addEventListener('compositionend', compositionend, true)
    }
  },
  unmounted(el: HTMLElement) {
    // 解除绑定的时候去除事件
    const input: HTMLInputElement = <HTMLInputElement>getInput(el)
    input.removeEventListener('input', inputHandler, true)
    input.removeEventListener('compositionstart', compositionstart, true)
    input.removeEventListener('compositionend', compositionend, true)
  },
}
