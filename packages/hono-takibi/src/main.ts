import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getHonoRoute, getHonoXRoute, getZodOpenapiHonoRoute } from './zod-openapi-hono.ts'
import { getHonoRouteHandler } from './handler/honoHandler.ts'
import { getHonoXRouteHandler } from './handler/honoXHandler.ts'
import { getZodOpenapiHonoRouteHandler } from './handler/zodOpenapiHonoHandler.ts'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHonoRoute, getHonoRouteHandler)
  .openapi(getHonoXRoute, getHonoXRouteHandler)
  .openapi(getZodOpenapiHonoRoute, getZodOpenapiHonoRouteHandler)

if (process.env.NODE_ENV === 'development') {
  app
    .doc('/doc', {
      openapi: '3.1.0',
      info: { title: 'HonoTakibi🔥', version: 'v1' },
      tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
    })
    .get('/ui', swaggerUI({ url: '/doc' }))
}

export type AddType = typeof api

export default app
