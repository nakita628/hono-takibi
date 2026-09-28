import { OpenAPIHono } from '@hono/zod-openapi'

import { getRoute } from '../routes'

const app = new OpenAPIHono()

export const __rootHandler = app.openapi(getRoute, (c) => c.json({ ok: true }, 200))
