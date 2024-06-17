import { expect, it } from "vitest"
import { isArray } from "./array"

it("isArray", () => {
  expect(isArray([])).toBe(true)
  expect(isArray([1, 2, 3])).toBe(true)
  expect(isArray(1)).toBe(false)
  expect(isArray(true)).toBe(false)
  expect(isArray(undefined)).toBe(false)
  expect(isArray(null)).toBe(false)
  expect(isArray({})).toBe(false)
})
