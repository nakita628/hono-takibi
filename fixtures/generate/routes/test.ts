import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string().optional().openapi({ type: 'string', example: 'Hono🔥' }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'Hono🔥' } },
            }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string().optional().openapi({ type: 'string', example: 'HonoX🔥' }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'HonoX🔥' } },
            }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z
                .string()
                .optional()
                .openapi({ type: 'string', example: 'ZodOpenAPIHono🔥' }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'ZodOpenAPIHono🔥' } },
            }),
        },
      },
    },
  },
})
