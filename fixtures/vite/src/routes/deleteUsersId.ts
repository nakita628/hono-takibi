import { createRoute, z } from '@hono/zod-openapi'
import { ErrorSchema } from '../schemas'

export const deleteUsersIdRoute = createRoute({
  method: 'delete',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Delete user',
  description: 'Delete a user by ID.',
  operationId: 'deleteUser',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { name: 'id', in: 'path', required: true } }),
    }),
  },
  responses: {
    204: { description: 'Deleted (No Content).' },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
