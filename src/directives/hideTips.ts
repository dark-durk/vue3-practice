/*
 * @Author: 纪海东
 * @Date: 2022-02-12 21:53:39
 * @LastEditTime: 2022-02-28 20:15:23
 * @LastEditors: Please set LastEditors
 * @Description: 文字超出容器时候出现...鼠标过去时候出现完整的提示 （只支持向上显示）

 */
import { App, Component, DirectiveBinding, VNode } from 'vue'
/*
 *text 放文案
 *arrow 小箭头
 *dom 外壳
 */
// 创建小提示
const newHideTips = function (): { text: HTMLElement; arrow: HTMLElement; dom: HTMLElement } {
  if (newHideTips.hideTipsDom) {
    return newHideTips.hideTipsDom
  }
  const dom = document.createElement('div')
  // 设置id和class
  dom.setAttribute('id', 'dlz-hideTips')
  dom.setAttribute('class', 'el-popper is-dark dlz-hideTips')
  const text = document.createElement('div')
  text.setAttribute('class', 'text')
  dom.appendChild(text)
  const arrow = document.createElement('div')
  arrow.setAttribute('class', 'el-popper__arrow')
  dom.appendChild(arrow)
  // 将浮层插入到body中
  document.body.appendChild(dom)
  newHideTips.hideTipsDom = { text, arrow, dom }
  dom.onmouseenter = e => {
    leaveClear && clearTimeout(leaveClear)
  }
  dom.onmouseleave = () => {
    leave()
  }
  return newHideTips.hideTipsDom
}
// 创建元素 用于判断文字长度
const newTextSpan = function (): HTMLElement {
  if (newTextSpan.spanDom) {
    return newTextSpan.spanDom
  }
  newTextSpan.spanDom = document.createElement('span')
  newTextSpan.spanDom.style.cssText = 'height:0;overflow: hidden;position: absolute;'
  document.body.appendChild(newTextSpan.spanDom)
  return newTextSpan.spanDom
}
// 显示tips
const show = (el, width) => {
  // 创建浮层元素并设置样式
  const hideTipsDom: { text: HTMLElement; arrow: HTMLElement; dom: HTMLElement } = newHideTips()
  // 浮层中的文字
  hideTipsDom.text.innerHTML = el.innerText
  const distance: { left: number; top: number; bottom: number; right: number } =
    el.getBoundingClientRect()
  hideTipsDom.dom.style.cssText = `
                    display: block;
                    top:${distance.top - 10}px;
                    left:${distance.left + width / 2}px;`
  const height: number = hideTipsDom.dom.offsetHeight
  let top: number = height
  let left: number = hideTipsDom.dom.offsetWidth / 2
  const right: number = window.innerWidth - hideTipsDom.dom.offsetWidth
  const offsetLeft: number = hideTipsDom.dom.offsetLeft
  const offsetTop: number = hideTipsDom.dom.offsetTop - height
  const offsetWidth: number = hideTipsDom.dom.offsetWidth
  // 左右碰壁判断
  if (offsetLeft < left) {
    hideTipsDom.arrow.style.cssText = `left:${offsetWidth / 2 - 5}px;transform: translate(-${
      left - offsetLeft
    }px,${0}px);`
    left = offsetLeft
  } else if (right < offsetLeft) {
    left = hideTipsDom.dom.offsetWidth - width / 2
    hideTipsDom.arrow.style.cssText = `left:${offsetWidth - width / 2 - 5}px;`
  } else {
    hideTipsDom.arrow.style.cssText = `left:${offsetWidth / 2 - 5}px;`
  }
  // 上碰壁判断
  if (offsetTop < 0) {
    hideTipsDom.dom.setAttribute('placement', 'bottom')
    top = 40
  } else {
    hideTipsDom.dom.setAttribute('placement', 'top')
    top = -top
  }
  // hideTipsDom.arrow
  hideTipsDom.dom.style.cssText += `transform: translate(-${left}px,${top}px);`
}
// 鼠标移出
const leave = () => {
  leaveClear = setTimeout(() => {
    clear && clearTimeout(clear)
    const hideTipsDom: { text: HTMLElement; arrow: HTMLElement; dom: HTMLElement } = newHideTips()
    hideTipsDom.dom.style.cssText = 'display: none;'
  }, 300)
}
// 定时器
let clear = null
let leaveClear = null

const hideTips = el => {
  const curStyle = window.getComputedStyle(el, '') // 获取当前元素的style
  const textSpan: HTMLElement = newTextSpan() // 创建一个容器来记录文字的width
  // 设置新容器的字体样式，确保与当前需要隐藏的样式相同
  textSpan.style.fontSize = curStyle.fontSize
  textSpan.style.fontWeight = curStyle.fontWeight
  textSpan.style.fontFamily = curStyle.fontFamily

  // 如果字体元素大于当前元素，则需要隐藏

  // 给当前元素设置超出隐藏
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  el.style.whiteSpace = 'nowrap'

  // 鼠标移入
  el.onmouseenter = e => {
    const hideTipsDom: { text: HTMLElement; arrow: HTMLElement; dom: HTMLElement } = newHideTips()
    hideTipsDom.dom.style.cssText = 'display: none;'
    clear && clearTimeout(clear)
    leaveClear && clearTimeout(leaveClear)

    // 设置新容器的文字
    textSpan.innerHTML = el.innerText
    let width: number = el.offsetWidth
    if (textSpan.offsetWidth > width) {
      width = el.offsetWidth
      clear = setTimeout(() => {
        show(el, width)
      }, 1500)
    }
  }
  // 鼠标移出
  el.onmouseleave = () => {
    leave()
  }
}

export default {
  mounted: hideTips,
  updated() {
    // console.log('update')
  },
  componentUpdated() {
    console.log('componentUpdated')
  },
}
