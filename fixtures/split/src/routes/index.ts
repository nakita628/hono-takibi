import { createRoute, z } from '@hono/zod-openapi'

const CreateUserRequestSchema = z
  .object({ name: z.string().optional().openapi({ type: 'string' }) })
  .optional()
  .openapi({ type: 'object', properties: { name: { type: 'string' } } })
  .openapi('CreateUserRequest')

const UserSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } })
  .openapi('User')

const GetUserByIdLink = {
  operationId: 'getUser',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow-up call to fetch the created user.',
}

const GetUserByIdByOperationRefLink = {
  operationRef: '#/paths/~1users~1{userId}/get',
  parameters: { userId: '$response.body#/id' },
  description: 'Same as above, but using operationRef.',
}

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create a user',
  operationId: 'createUser',
  request: {
    body: { content: { 'application/json': { schema: CreateUserRequestSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  summary: 'Get a user by ID',
  operationId: 'getUser',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({ param: { name: 'userId', in: 'path', required: true }, type: 'string' }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
  },
})
