import { OpenAPIHono } from '@hono/zod-openapi'

import {
  getAbsentRoute,
  getCombinatorsRoute,
  getContentRoute,
  getDefaultsRoute,
  getLimitsRoute,
  getLiteralsRoute,
  getObjectsRoute,
  getOptionalRoute,
  getParamsRoute,
  getRefsRoute,
  getRequiredRoute,
  getStylesRoute,
} from './__generated__/routes'

type Echo = { valueType: string; valueText: string }

/**
 * Describes one value: the runtime `typeof` it arrived as, and the value as text. Text,
 * because a bigint cannot cross JSON and text keeps its every digit.
 *
 * 値1つを記述する。届いた時点の `typeof` と、その文字列表現である。文字列で返すのは、
 * bigint が JSON に載せられず、また文字列なら桁落ちしないためである。
 */
function echoValue(value: unknown): Echo {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean'
  ) {
    return { valueType: typeof value, valueText: String(value) }
  }
  return {
    valueType: value === null ? 'null' : typeof value,
    valueText: JSON.stringify(value) ?? 'undefined',
  }
}

/**
 * Describes every validated parameter, by name. An array is described element by element
 * and an object key by key, so a test can tell `[1, 2]` from `['1', '2']` and from `'1,2'`.
 * A key the schema left out stays out: an absent optional parameter is absent here too.
 *
 * 検証済みの全パラメータを名前ごとに記述する。配列は要素ごと、オブジェクトはキーごとに
 * 記述するので、テストは `[1, 2]`・`['1', '2']`・`'1,2'` を区別できる。スキーマが出力
 * しなかったキーはここでも出力されない。省略された任意パラメータは、キー自体が存在しない。
 */
function echoFields(fields: object) {
  const described: Record<string, Echo | Echo[] | Record<string, Echo>> = {}
  for (const [name, value] of Object.entries(fields)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      described[name] = value.map(echoValue)
    } else if (typeof value === 'object' && value !== null) {
      described[name] = Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, echoValue(item)]),
      )
    } else {
      described[name] = echoValue(value)
    }
  }
  return described
}

/**
 * Every handler returns what `c.req.valid` handed it and nothing else, so the value a test
 * sees has passed the generated schema — not the raw request.
 *
 * すべてのハンドラは `c.req.valid` が返した値だけを返す。テストが見る値は、生のリクエスト
 * ではなく、生成スキーマを通過したものになる。
 */
export const queryParamsApp = new OpenAPIHono({
  // A rejected request names the parameter that failed, so a test can tell which one did.
  // 拒否時は失敗したパラメータ名を返す。どのパラメータが原因かをテストで判別できる。
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(getParamsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getLiteralsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getOptionalRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getDefaultsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getRequiredRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getLimitsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getStylesRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getRefsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getCombinatorsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getContentRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getObjectsRoute, (c) => c.json(echoFields(c.req.valid('query'))))
  .openapi(getAbsentRoute, (c) => c.json(echoFields(c.req.valid('query'))))
