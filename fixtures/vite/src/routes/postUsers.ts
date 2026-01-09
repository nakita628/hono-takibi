import { createRoute } from '@hono/zod-openapi'
import { CreateUserInputSchema, ErrorSchema, UserSchema } from '../schemas'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create user',
  description: 'Create a new user.',
  operationId: 'createUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserInputSchema,
          examples: {
            create: {
              value: {
                displayName: 'Carol',
                email: 'carol@example.com',
                roles: ['attendee', 'ghost-wifi-fixer'],
                isStudent: true,
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    201: { description: 'Created.', content: { 'application/json': { schema: UserSchema } } },
    400: {
      description: 'Validation error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    409: {
      description: 'Conflict (e.g., duplicate email).',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
