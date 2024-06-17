import { it, expect } from "vitest";
import { isPlainObject, toTypeString } from "./type";

it('toTypeString', () => {
  expect(toTypeString('foo')).toBe('[object String]')
  expect(toTypeString(123)).toBe('[object Number]')
  expect(toTypeString(null)).toBe('[object Null]')
  expect(toTypeString(undefined)).toBe('[object Undefined]')
  expect(toTypeString(true)).toBe('[object Boolean]')
  expect(toTypeString(BigInt(1))).toBe('[object BigInt]')
  expect(toTypeString(Symbol('unique'))).toBe('[object Symbol]')
  expect(toTypeString({})).toBe('[object Object]')
  expect(toTypeString([])).toBe('[object Array]')
  expect(toTypeString(new Date())).toBe('[object Date]')
})


it('isPlainObject', () => {
  expect(isPlainObject({})).toBe(true)
  expect(isPlainObject('foo')).toBe(false)
  expect(isPlainObject(123)).toBe(false)
  expect(isPlainObject(null)).toBe(false)
  expect(isPlainObject(undefined)).toBe(false)
  expect(isPlainObject(true)).toBe(false)
  expect(isPlainObject(BigInt(1))).toBe(false)
  expect(isPlainObject(Symbol('unique'))).toBe(false)
  expect(isPlainObject([])).toBe(false)
  expect(isPlainObject(new Date())).toBe(false)
})