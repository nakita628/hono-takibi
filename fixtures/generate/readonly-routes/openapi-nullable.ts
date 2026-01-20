import { createRoute, z } from '@hono/zod-openapi'

export const getNullableRoute = createRoute({
  method: 'get',
  path: '/nullable',
  summary: 'zod nullable',
  description: 'zod nullable',
  responses: {
    200: {
      description: 'zod nullable',
      content: { 'application/json': { schema: z.string().nullable() } },
    },
  },
} as const)
