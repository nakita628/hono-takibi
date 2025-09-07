import { createRoute, z } from '@hono/zod-openapi'
import { UserSchema, ErrorSchema } from '../schemas'

export const getUsersIdRoute = createRoute({
  tags: ['Users'],
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUser',
  summary: 'Get user',
  description: 'Retrieve a single user by ID.',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    200: { description: 'Retrieved.', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
