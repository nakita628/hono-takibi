import { OpenAPIHono } from '@hono/zod-openapi'

import { getCoerceIdRoute, getSearchRoute } from '../__generated__/validation/routes'

export const coercionApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          issues: result.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            code: issue.code,
          })),
        },
        422,
      )
    }
  },
})
  .openapi(getCoerceIdRoute, (c) => {
    const { id } = c.req.valid('param')
    return c.json({ idType: typeof id, idValue: String(id) })
  })
  .openapi(getSearchRoute, (c) => {
    const { limit, active, ids } = c.req.valid('query')
    return c.json({
      limit: limit ?? -1,
      limitType: typeof limit,
      activeType: typeof active,
      idsTypes: (ids ?? []).map((value) => typeof value),
    })
  })
