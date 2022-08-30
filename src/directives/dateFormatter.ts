// 格式化日期
// v-date-formatter="yyyy-MM-dd HH:mm:ss"

import { format } from 'date-fns'

function formatText (text:string | null, formatValue: string) {
  if (!text) return ''
  const date = new Date(text.replace(/-/g, '/'))
  return format(date, formatValue)
}

export default {
  name: 'date-formatter',
  mounted (el: HTMLElement, { value = 'MM-dd HH:mm' }:any) {
    el.textContent = formatText(el.textContent, value)
  },
  updated  (el:HTMLElement, { value = 'MM-dd HH:mm' }:any) {
    el.textContent = formatText(el.textContent, value)
  },
}