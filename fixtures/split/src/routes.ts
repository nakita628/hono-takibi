import { createRoute } from '@hono/zod-openapi'
import { HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema } from './schemas'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
