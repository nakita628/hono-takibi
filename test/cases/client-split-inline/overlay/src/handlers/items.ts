import { OpenAPIHono } from '@hono/zod-openapi'

import { getItemsRoute, postItemsIdSharesRoute } from '../routes'

const app = new OpenAPIHono()

export const itemsHandler = app
  .openapi(getItemsRoute, (c) => c.json([{ id: 1, title: 'first' }], 200))
  .openapi(postItemsIdSharesRoute, (c) =>
    c.json({ id: c.req.valid('param').id, title: 'shared' }, 201),
  )
