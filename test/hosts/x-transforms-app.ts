import { OpenAPIHono } from '@hono/zod-openapi'

import {
  postCoerceRoute,
  postCustomRoute,
  postFallbacksRoute,
  postFormatsRoute,
  postP2Route,
  postStringsRoute,
  postV25Route,
  postV26Route,
} from '../__generated__/x-transforms/generated'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        pointer: `/${issue.path.join('/')}`,
        detail: issue.message,
      }))
      return c.json(
        {
          type: 'about:blank',
          title: 'Unprocessable Content',
          status: 422,
          detail: 'Request validation failed',
          errors,
        },
        422,
      )
    }
    return undefined
  },
})

app.openapi(postStringsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postCoerceRoute, (c) => {
  const body = c.req.valid('json')
  // Re-serialize dates as ISO strings so the JSON response is stable.
  // JSON レスポンスが安定するよう、日付を ISO 文字列にシリアライズし直す。
  return c.json(
    {
      ...body,
      asDate: body.asDate.toISOString(),
    } as unknown as typeof body,
    200,
  )
})

app.openapi(postFormatsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postP2Route, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postCustomRoute, (c) => {
  const body = c.req.valid('json')
  // updatedAt is parsed as a Date instance — no need to call .toISOString().
  // The output schema's codec re-encodes it to an ISO string on response.
  // updatedAt は Date インスタンスとしてパースされる。.toISOString() を呼び出す必要はない。
  // 出力スキーマの codec が、レスポンス時に ISO 文字列へ再エンコードする。
  return c.json(body, 200)
})

app.openapi(postV25Route, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postV26Route, (c) => {
  const body = c.req.valid('json')
  // The contentEncoding pipeline decodes settings into an object during
  // validation; cast for the response (which expects the encoded string shape).
  // contentEncoding のパイプラインは、検証の過程で settings をオブジェクトにデコードする。
  // レスポンスの型はエンコード済みの文字列を期待しているため、キャストしている。
  // biome-ignore lint/suspicious/noExplicitAny: response shape mismatch with decoded body
  return c.json(body as any, 200)
})

app.openapi(postFallbacksRoute, (c) => {
  const body = c.req.valid('json')
  // An int64 is a bigint, which JSON cannot hold: it is answered as the text of its literal
  // (`1n`). A number in its place would not type-check here, nor be answered as `1n`.
  // int64 は bigint であり、JSON では表現できない。そのため、リテラルの文字列 (`1n`) として
  // 返す。number が入っていれば、ここで型チェックを通らず、`1n` としても返らない。
  return c.json(
    {
      ...body,
      counter: { n: body.counter.n === undefined ? undefined : `${body.counter.n}n` },
      ids: body.ids.map((id) => `${id}n`),
    },
    200,
  )
})

export default app
