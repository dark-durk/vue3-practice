export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isObject(val: any) {
  return val !== null && is(val, 'Object')
}
