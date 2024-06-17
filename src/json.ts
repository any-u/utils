/**
 * 解析json字符串
 * 如果传入的参数不是合法的json字符串，则返回空对象
 *
 * @param {string} val -要解析的字符串
 * @return {Object} 解析后的结果
 */
export function parseJson(val) {
  var res = {}
  try {
    res = JSON.parse(val)
  } catch (error) {
    // DO NOTHING
  }

  return typeof res === "object" && res !== null ? res : {}
}
