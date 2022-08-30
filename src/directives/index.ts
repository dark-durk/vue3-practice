/*
 *
 * 注册全局指令
 */

import { App, Directive } from 'vue'
import inputNumber from './input/inputNumber'
import hideTips from './hideTips'

interface IDirective {
  [propName: string]: Directive
}
const directiveList: IDirective = {
  inputNumber,
  hideTips,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directiveList).forEach(key => {
      app.directive(key, directiveList[key])
    })
  },
}

export default directives
