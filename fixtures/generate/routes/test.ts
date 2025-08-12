import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  tags: ['HonoX'],
  method: 'get',
  path: '/hono-x',
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'HonoX🔥' }) }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['ZodOpenAPIHono'],
  method: 'get',
  path: '/zod-openapi-hono',
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) }),
        },
      },
    },
  },
})
