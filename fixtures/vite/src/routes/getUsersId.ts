import { createRoute, z } from '@hono/zod-openapi'
import { ErrorSchema, UserSchema } from '../schemas'

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Get user',
  description: 'Retrieve a single user by ID.',
  operationId: 'getUser',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID (UUID).',
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'Retrieved.', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
