import { OpenAPIHono } from '@hono/zod-openapi'

import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app.openapi(getHealthRoute, (c) => c.json({ status: 'up' }, 200))
