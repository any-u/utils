/**
 * @description: 保证同时只运行一次，支持异步
 * @param {Function} fn 函数
 * @return {void}
 */
export function runOnce(fn) {
  let called = false

  return async function (...args) {
    if (!called) {
      called = true
      try {
        // @ts-ignore
        await fn.apply(this, args)
      } catch  {
        // DO NOTHING
      }
      called = false
    }
  }
}