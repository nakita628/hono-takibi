import { createRoute, z } from '@hono/zod-openapi'

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'Simple ping for ZodOpenAPIHono',
  operationId: 'getZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
