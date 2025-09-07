import { createRoute, z } from '@hono/zod-openapi'

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['ZodOpenAPIHono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'getZodOpenAPIHono',
  summary: 'ZodOpenAPIHono',
  description: 'Simple ping for ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.strictObject({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) }),
        },
      },
    },
  },
})
