import { OpenAPIHono } from '@hono/zod-openapi'

import {
  getCoerceIdRoute,
  getHeadersRoute,
  getSearchRoute,
} from '../__generated__/validation/routes'

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
    return undefined
  },
})
  .openapi(getCoerceIdRoute, (c) => {
    const { id } = c.req.valid('param')
    return c.json({ idType: typeof id, idValue: String(id) })
  })
  .openapi(getSearchRoute, (c) => {
    const { limit, active, ids, big, bigs, ratio } = c.req.valid('query')
    return c.json({
      limit: limit ?? -1,
      limitType: typeof limit,
      activeType: typeof active,
      idsTypes: (ids ?? []).map((value) => typeof value),
      bigType: typeof big,
      bigValue: String(big),
      bigsTypes: (bigs ?? []).map((value) => typeof value),
      ratioType: typeof ratio,
    })
  })
  .openapi(getHeadersRoute, (c) => {
    const { 'x-count': count, 'x-flag': flag, 'x-big': big } = c.req.valid('header')
    const { ratios } = c.req.valid('query')
    return c.json({
      countType: typeof count,
      flagType: typeof flag,
      bigType: typeof big,
      bigValue: String(big),
      ratiosTypes: (ratios ?? []).map((value) => typeof value),
    })
  })
