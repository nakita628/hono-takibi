import { createRoute, z } from '@hono/zod-openapi'

export const postUsersUserIdRoute = createRoute({
  tags: ['user'],
  method: 'post',
  path: '/users/{userId}',
  operationId: 'postUserRoute',
  summary: 'Create or update a user',
  description: 'Minimal example including tags, method, summary, params, requestBody, responses.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z
            .object({ name: z.string().optional().openapi({ type: 'string' }) })
            .optional()
            .openapi({ type: 'object', properties: { name: { type: 'string' } } }),
        },
      },
    },
    params: z.object({
      userId: z
        .string()
        .openapi({ param: { name: 'userId', in: 'path', required: true }, type: 'string' }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string().optional().openapi({ type: 'string' }),
              name: z.string().optional().openapi({ type: 'string' }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: { id: { type: 'string' }, name: { type: 'string' } },
            }),
        },
      },
    },
  },
})
