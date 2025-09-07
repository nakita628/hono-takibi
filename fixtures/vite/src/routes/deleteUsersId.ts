import { createRoute, z } from '@hono/zod-openapi'
import { ErrorSchema } from '../schemas'

export const deleteUsersIdRoute = createRoute({
  tags: ['Users'],
  method: 'delete',
  path: '/users/{id}',
  operationId: 'deleteUser',
  summary: 'Delete user',
  description: 'Delete a user by ID.',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    204: { description: 'Deleted (No Content).' },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
