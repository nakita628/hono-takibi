import { createRoute, z } from '@hono/zod-openapi'

export const getArrayRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/array',
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
            nonempty: z.array(z.string()),
            min5: z.array(z.string()),
            max5: z.array(z.string()),
            length5: z.array(z.string()),
          }),
        },
      },
    },
  },
})
