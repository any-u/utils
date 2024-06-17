import { objectToString } from "./object"

/**
 * 用于获取给定值的类型字符串表示。
 *
 * @param {any} value 要获取类型的值。
 * @returns {string} 值的类型字符串表示。
 */
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

/**
 * 用于判断给定值是否为普通对象
 *
 * @param {any} val 要检查的值
 * @returns {boolean}
 */
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === "[object Object]"
