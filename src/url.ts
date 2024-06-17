import { forEach } from "./iterator"

export interface URLParams {
  [key: string]: string
}

/**
 * 用于从url中获取指定参数的值。
 *
 * @param {string} name - 要获取的参数名称
 * @param {string} [url=location.href] - 要解析的URL，默认为当前页面的URL
 * @return {string} 参数的值，如果参数不存在则返回空字符串
 */
export function getUrlParam(name: string, url = location.href) {
  var n = '[\\?&]' + name + '=([^&#]*)'
  var a = new RegExp(n)
  var o = a.exec(url)
  return null === o ? '' : o[1]
}

/**
 * 获取url中的query参数
 *
 * @param {string} [url=location.href] - 要解析的URL，默认为当前页面的URL
 * @return {Object} query参数对象，如果不存在则返回空对象
 */
export function getUrlParams(url: string = location.href): URLParams {
  const hashmarkIndex = url.indexOf('#')
  if (hashmarkIndex !== -1) {
    url = url.slice(0, hashmarkIndex)
  }

  let res = {};
  const querymarkIndex = url.indexOf('?')
  if (querymarkIndex !== -1) {
    url = url.slice(querymarkIndex + 1) // 注意这里应该从问号后的字符开始分割

    res = url.split('&').reduce((result, param) => {
      let [key, value] = param.split('=');
      result[key] = decodeURIComponent(value);
      return result;
    }, {})
  }

  return res
}

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
	return encodeURIComponent(val).
		replace(/%3A/gi, ':').
		replace(/%24/g, '$').
		replace(/%2C/gi, ',').
		replace(/%20/g, '+').
		replace(/%5B/gi, '[').
		replace(/%5D/gi, ']');
}

function serialize(params: URLParams) {
	let _pairs: string[][] = []
	forEach(params, (el, key) => {
		_pairs.push([key, el])
	})

	return _pairs.map(pair => {
		return encode(pair[0]) + '=' + encode(pair[1])
	}).join('&')
}

/**
 * 用于构建带query参数的url
 *
 * @param {string} url - 原始的url
 * @param {URLParams} params - query对象
 * @return {string} 构建完成的url
 */
export function buildURL(url: string, params: URLParams) {
	const serializedParams = serialize(params)
	if (serializedParams) {
		const hashmarkIndex = url.indexOf('#')
		if (hashmarkIndex !== -1) {
			url = url.slice(0, hashmarkIndex)
		}

		url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
	}

	return url
}