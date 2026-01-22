import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'email', 'createdAt'] })
  .openapi('User')

const CreateUserRequestSchema = z
  .object({ email: z.email(), name: z.string().exactOptional() })
  .openapi({ required: ['email'] })
  .openapi('CreateUserRequest')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
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
  operationId: 'createUser',
  request: {
    body: { content: { 'application/json': { schema: CreateUserRequestSchema } }, required: true },
  },
  responses: {
    201: { description: 'User created', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUser',
  request: {
    params: z.object({
      userId: z.uuid().openapi({ param: { name: 'userId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: { description: 'User details', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'User not found' },
  },
})
