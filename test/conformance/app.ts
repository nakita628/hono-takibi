import { OpenAPIHono } from '@hono/zod-openapi'

import { getQueryRoute, postJsonRoute } from './__generated__/routes'

/**
 * Every handler returns what `c.req.valid` handed it and nothing else, as JSON: the value
 * a test sees has passed the generated schema, with the type the schema gave it. A
 * rejected request answers 422.
 *
 * すべてのハンドラは `c.req.valid` が返した値だけを、JSON として返す。テストが見る値は、
 * 生成スキーマを通過したものであり、型もスキーマが与えたものである。拒否された
 * リクエストは 422 を返す。
 */
export const conformanceApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(getQueryRoute, (c) => c.json(c.req.valid('query')))
  .openapi(postJsonRoute, (c) => c.json(c.req.valid('json')))
