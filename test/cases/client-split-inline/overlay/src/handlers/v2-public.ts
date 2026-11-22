import { OpenAPIHono } from '@hono/zod-openapi'

import { getV2PublicPingRoute } from '../routes'

const app = new OpenAPIHono()

export const v2PublicHandler = app.openapi(getV2PublicPingRoute, (c) => c.json({ ok: true }, 200))
