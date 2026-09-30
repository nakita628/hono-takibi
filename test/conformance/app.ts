import { OpenAPIHono } from '@hono/zod-openapi'

import * as routes from './__generated__/routes'

/**
 * Every handler returns what `c.req.valid` handed it and nothing else, as JSON: the value
 * a test sees has passed the generated schema, with the type the schema gave it. A
 * rejected request answers 422.
 *
 * すべてのハンドラは `c.req.valid` が返した値だけを、JSON として返す。テストが見る値は、
 * 生成スキーマを通過したものであり、型もスキーマが与えたものである。拒否された
 * リクエストは 422 を返す。
 */
const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(routes.getQueryRoute, (c) => c.json(c.req.valid('query')))
  .openapi(routes.getHeaderRoute, (c) => c.json(c.req.valid('header')))
  .openapi(routes.getCookieRoute, (c) => c.json(c.req.valid('cookie')))
  .openapi(routes.postJsonRoute, (c) => c.json(c.req.valid('json')))
  .openapi(routes.postFormRoute, (c) => c.json(c.req.valid('form')))

// One route per schema, each with the single parameter `value`: a path holds one value, so
// every schema needs a path of its own.
// スキーマごとに1つのルートがあり、それぞれが単一のパラメータ `value` を持つ。パスが保持
// できる値は1つなので、スキーマごとに専用のパスが必要になる。
for (const route of Object.values(routes)) {
  if (route.path.startsWith('/path/')) {
    // The routes differ in their schema and in nothing else, which the union of their types
    // cannot say.
    // 各ルートの違いはスキーマだけであるが、ルート型の union ではそれを表現できない。
    app.openapi(route, (c) => c.json(c.req.valid('param' as never)))
  }
}

export const conformanceApp = app
