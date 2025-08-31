import { createRoute } from '@hono/zod-openapi'
import { ZodOpenAPIHonoSchema } from '../schemas'

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
