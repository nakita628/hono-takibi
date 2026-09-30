import { OpenAPIHono } from '@hono/zod-openapi'

import { postNumbersRoute, postTypesRoute } from './__generated__/routes'

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
 * Describes every validated field, by name. An array is described element by element, so
 * a test can tell `[1n, 2n]` from `[1, 2]`. A key the schema left out stays out: an absent
 * optional field is absent here too.
 *
 * 検証済みの全フィールドを名前ごとに記述する。配列は要素ごとに記述するので、テストは
 * `[1n, 2n]` と `[1, 2]` を区別できる。スキーマが出力しなかったキーはここでも
 * 出力されない。省略された任意フィールドは、キー自体が存在しない。
 */
function echoFields(fields: object) {
  const described: Record<string, Echo | Echo[]> = {}
  for (const [name, value] of Object.entries(fields)) {
    if (value === undefined) continue
    described[name] = Array.isArray(value) ? value.map(echoValue) : echoValue(value)
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
export const jsonBodyApp = new OpenAPIHono({
  // A rejected request names the field that failed, so a test can tell which one did.
  // 拒否時は失敗したフィールド名を返す。どのフィールドが原因かをテストで判別できる。
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(postNumbersRoute, (c) => c.json(echoFields(c.req.valid('json'))))
  .openapi(postTypesRoute, (c) => c.json(echoFields(c.req.valid('json'))))
