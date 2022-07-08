/**
 * ts类型体操
 */

// 类型合并
import type { RouteRecordRaw } from 'vue-router'

type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}

type Merge<F, S> = IntersectionToObj<Omit<F, keyof S> & S>
interface MyParams {
  des: string
}
type RouteRecordRawWrap = Merge<MyParams, RouteRecordRaw>
