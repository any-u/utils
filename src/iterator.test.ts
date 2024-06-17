import { describe, expect, it, vi } from "vitest"
import { forEach } from "./iterator"

describe("forEach", () => {
  it("should call the callback for each item in the array", () => {
    const items = [1, 2, 3]
    const callback = vi.fn()

    forEach(items, callback)

    // 断言回调函数被调用了三次
    expect(callback).toHaveBeenCalledTimes(3)

    // 断言回调函数的参数
    expect(callback).toHaveBeenNthCalledWith(1, 1, 0, items)
    expect(callback).toHaveBeenNthCalledWith(2, 2, 1, items)
    expect(callback).toHaveBeenNthCalledWith(3, 3, 2, items)
  })

  it("should not call the callback if the array is empty", () => {
    const items = []
    const callback = vi.fn()

    forEach(items, callback)

    // 断言回调函数没有被调用
    expect(callback).not.toHaveBeenCalled()
  })

  it("should call the callback for each key-value pair in the object", () => {
    const obj = { a: 1, b: "two", c: { three: 3 } }
    const callback = vi.fn()

    forEach(obj, callback)

    // 断言回调函数被调用了三次
    expect(callback).toHaveBeenCalledTimes(3)

    // 断言回调函数的参数
    expect(callback).toHaveBeenNthCalledWith(1, 1, "a", obj)
    expect(callback).toHaveBeenNthCalledWith(2, "two", "b", obj)
    expect(callback).toHaveBeenNthCalledWith(3, { three: 3 }, "c", obj)
  })

  it("should not call the callback if the object is empty", () => {
    const obj = {}
    const callback = vi.fn()

    forEach(obj, callback)

    // 断言回调函数没有被调用
    expect(callback).not.toHaveBeenCalled()
  })

  it("should handle exceptions thrown in the callback for arrays", () => {
    const items = [1, 2, 3]
    const callback = vi.fn((item) => {
      if (item === 2) throw new Error("Test error")
    })

    expect(() => {
      forEach(items, callback)
    }).toThrow("Test error")
  })

  it("should handle exceptions thrown in the callback for objects", () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vi.fn((value, key) => {
      if (key === "b") throw new Error("Test error")
    })

    expect(() => {
      forEach(obj, callback)
    }).toThrow("Test error")
  })

  it("should iterate over object's own properties only", () => {
    const proto = { inherited: "inherited" }
    const obj = Object.create(proto)
    obj.a = 1
    obj.b = 2

    const callback = vi.fn()

    forEach(obj, callback)

    // 断言回调函数只被调用了两次
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenNthCalledWith(1, 1, "a", obj)
    expect(callback).toHaveBeenNthCalledWith(2, 2, "b", obj)
  })

  it("should iterate over all properties if allOwnKeys is true", () => {
    const obj = Object.create(
      {},
      {
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false },
        c: { value: 3, enumerable: false },
      }
    )

    const callback = vi.fn()

    forEach(obj, callback, { allOwnKeys: true })

    // 断言回调函数被调用了三次
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenNthCalledWith(1, 1, "a", obj)
    expect(callback).toHaveBeenNthCalledWith(2, 2, "b", obj)
    expect(callback).toHaveBeenNthCalledWith(3, 3, "c", obj)
  })

  it("should iterate over all enumerable properties if allOwnKeys is false", () => {
    const obj = Object.create(
      {},
      {
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false },
        c: { value: 3, enumerable: false },
      }
    )

    const callback = vi.fn()

    forEach(obj, callback, { allOwnKeys: false })

    // 断言回调函数被调用了三次
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenNthCalledWith(1, 1, "a", obj)
  })

  it("should treat non-object values as an array with a single element", () => {
    const callback = vi.fn()

    forEach("test", callback)

    // 断言回调函数被调用了一次
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith("test", 0, ["test"])
  })

  it("should not call the callback if the value is null or undefined", () => {
    const callback = vi.fn()

    forEach(null, callback)
    forEach(undefined, callback)

    // 断言回调函数没有被调用
    expect(callback).not.toHaveBeenCalled()
  })
})
