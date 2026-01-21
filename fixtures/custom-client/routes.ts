import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({ id: z.string(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const CreateUserInputSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .openapi('CreateUserInput')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'Get all users',
  operationId: 'getUsers',
  request: {
    query: z.object({
      limit: z
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of users',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create a user',
  operationId: 'createUser',
  request: {
    body: { content: { 'application/json': { schema: CreateUserInputSchema } }, required: true },
  },
  responses: {
    201: { description: 'User created', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get user by ID',
  operationId: 'getUserById',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'User details', content: { 'application/json': { schema: UserSchema } } },
  },
})
