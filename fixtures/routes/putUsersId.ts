import { createRoute, z } from '@hono/zod-openapi'
import { ReplaceUserInputSchema, UserSchema, ErrorSchema } from '../schemas'

export const putUsersIdRoute = createRoute({
  tags: ['Users'],
  method: 'put',
  path: '/users/{id}',
  operationId: 'replaceUser',
  summary: 'Replace user',
  description:
    'Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.',
  request: {
    body: { required: true, content: { 'application/json': { schema: ReplaceUserInputSchema } } },
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    200: { description: 'Replaced.', content: { 'application/json': { schema: UserSchema } } },
    400: {
      description: 'Validation error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: { description: 'Not found.', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
