import { createRoute } from '@hono/zod-openapi'
import { CreateUserInputSchema, UserSchema, ErrorSchema } from '../schemas'

export const postUsersRoute = createRoute({
  tags: ['Users'],
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  summary: 'Create user',
  description: 'Create a new user.',
  request: {
    body: { required: true, content: { 'application/json': { schema: CreateUserInputSchema } } },
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
