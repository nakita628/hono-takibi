import { createRoute, z } from '@hono/zod-openapi'
import { ErrorSchema, ReplaceUserInputSchema, UserSchema } from '../schemas'

export const putUsersIdRoute = createRoute({
  method: 'put',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Replace user',
  description:
    'Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.',
  operationId: 'replaceUser',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { name: 'id', in: 'path', required: true } }),
    }),
    body: {
      content: {
        'application/json': {
          schema: ReplaceUserInputSchema,
          examples: {
            replace: {
              value: {
                displayName: 'Alice Updated',
                email: 'alice.updated@example.com',
                roles: ['speaker', 'mc'],
                affiliations: ['Honoconf 2025'],
                isStudent: false,
              },
            },
          },
        },
      },
      required: true,
    },
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
