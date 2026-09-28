import { OpenAPIHono } from '@hono/zod-openapi'

import { getVaultsRoute, postVaultsRoute, getVaultsIdRoute } from '../routes'

const app = new OpenAPIHono()

export const vaultsHandler = app
  .openapi(getVaultsRoute, (c) => c.json([{ id: 1, name: 'personal' }], 200))
  .openapi(postVaultsRoute, (c) => c.json({ id: 2, name: c.req.valid('json').name }, 201))
  .openapi(getVaultsIdRoute, (c) => c.json({ id: c.req.valid('param').id, name: 'personal' }, 200))
