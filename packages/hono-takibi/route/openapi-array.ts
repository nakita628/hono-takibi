import { createRoute, z } from '@hono/zod-openapi'

export const getArrayRoute = createRoute({
  method: 'get',
  path: '/array',
  operationId: 'undefined',
  summary: 'zod array',
  description: 'zod array',
  responses: {
    200: {
      description: 'zod array',
      content: {
        'application/json': {
          schema: z.object({
            string_array: z.array(z.string()),
            equivalent: z.array(z.string()),
            string_optional_array: z.array(z.string()),
            string_array_optional: z.array(z.string()).optional(),
            nonempty: z.array(z.string()).min(1),
            min5: z.array(z.string()).min(5),
            max5: z.array(z.string()).max(5),
            length5: z.array(z.string()),
          }),
        },
      },
    },
  },
})
