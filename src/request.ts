import { URLParams, buildURL } from "./url"
import { parseJson } from "./json"

export type RequestConfig<T extends Document | XMLHttpRequestBodyInit> =
  Partial<{
    method: string
    credentials: string
    headers: Record<string, string>
    responseType: XMLHttpRequestResponseType
    params: URLParams
    data: T
  }>

export type ResponseInit<T extends Record<string, any>> = {
  ok: boolean
  statusText: string
  status: number
  url: string
  text: () => Promise<string>
  json: () => Promise<T>
  blob: () => Promise<Blob>
  arraybuffer: () => Promise<ArrayBuffer>
  clone: () => ResponseInit<T>
  headers: {
    keys: () => string[]
    entries: () => (string | null)[][]
    get: (key: string) => any
    has: (key: string) => boolean
  }
}

/**
 * XMLHttpRequest实现的请求函数（类fetch）
 *
 * 示例用法：
 * const response = await request('http://xxx.com/api')
 * const json = await response.json()
 *
 * @param {string} url - 请求链接
 * @param {ReuqestConfig} options -请求参数
 * @return {ResponseInit} 响应对象
 */
export function request<T extends Document | XMLHttpRequestBodyInit, R extends Record<string, any>>(
  url: string,
  options: RequestConfig<T>
): Promise<ResponseInit<R>> {
  options = options || {}
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const keys: string[] = []
    const headers = {}

    const response = () => ({
      ok: ((request.status / 100) | 0) == 2, // 200-299
      statusText: request.statusText,
      status: request.status,
      url: request.responseURL,
      text: () => Promise.resolve(request.responseText),
      json: () => Promise.resolve(request.responseText).then(parseJson),
      blob: () => Promise.resolve(new Blob([request.response])),
      arraybuffer: () => Promise.resolve(request.response),
      clone: response,
      headers: {
        keys: () => keys,
        entries: () => keys.map((n) => [n, request.getResponseHeader(n)]),
        get: (n: string) => request.getResponseHeader(n),
        has: (n: string) => request.getResponseHeader(n) != null,
      },
    })

    url = options.params ? buildURL(url, options.params) : url
    request.open(options.method || "get", url, true)

    request.onload = () => {
      request
        .getAllResponseHeaders()
        .toLowerCase()
        .replace(/^(.+?):/gm, (m, key: string) => {
          return headers[key] || keys.push((headers[key] = key))
        })
      resolve(response() as ResponseInit<R>)
    }

    request.onerror = reject

    request.withCredentials = options.credentials == "include"

    if (options.responseType && options.responseType !== "json") {
      request.responseType = options.responseType
    }

    for (const i in options.headers) {
      request.setRequestHeader(i, options.headers[i])
    }

    request.send(options.data || null)
  })
}
