import { createRoute, z } from '@hono/zod-openapi'
import { ErrorSchema, UpdateUserInputSchema, UserSchema } from '../schemas'

export const patchUsersIdRoute = createRoute({
  method: 'patch',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Update user (partial)',
  description: 'Partial update (PATCH). Only provided fields will be updated.',
  operationId: 'updateUser',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { name: 'id', in: 'path', required: true } }),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateUserInputSchema,
          examples: {
            update: { value: { roles: ['speaker', 'attendee'], pronouns: 'they/them' } },
          },
        },
      },
      required: true,
    },
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
