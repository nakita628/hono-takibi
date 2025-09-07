import { createRoute, z } from '@hono/zod-openapi'
import { UpdateUserInputSchema, UserSchema, ErrorSchema } from '../schemas'

export const patchUsersIdRoute = createRoute({
  tags: ['Users'],
  method: 'patch',
  path: '/users/{id}',
  operationId: 'updateUser',
  summary: 'Update user (partial)',
  description: 'Partial update (PATCH). Only provided fields will be updated.',
  request: {
    body: { required: true, content: { 'application/json': { schema: UpdateUserInputSchema } } },
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    200: { description: 'Updated.', content: { 'application/json': { schema: UserSchema } } },
    400: {
      description: 'Validation error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
