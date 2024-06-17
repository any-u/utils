import { isArray } from "./array"

/**
 * 迭代数组或对象，为每一项调用函数。
 *
 * 如果 obj 是一个数组，则将调用回调函数，传递每个项目的值、索引和完整数组。
 *
 * 如果 obj 是一个对象，则将调用回调函数，传递每个属性的值、键和完整对象。
 *
 * @param {any} obj 要迭代的对象
 * @param {Function} fn 执行每一项的回调
 *
 * @param {Boolean} [allOwnKeys = false] 是否自身所有的属性，或可枚举属性
 * @returns {any}
 */
export function forEach(
  obj: any,
  fn: (value: any, key: number, obj: Record<string, any>) => void,
  { allOwnKeys = false } = {}
) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === "undefined") {
    return
  }

  let i
  let l

  // Force an array if not already something iterable
  if (typeof obj !== "object") {
    /*eslint no-param-reassign:0*/
    obj = [obj]
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj)
    const len = keys.length
    let key

    for (i = 0; i < len; i++) {
      key = keys[i]
      fn.call(null, obj[key], key, obj)
    }
  }
}
