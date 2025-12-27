import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    name: z.string().optional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('User')

const CreateUserRequestSchema = z
  .object({
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    name: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { email: { type: 'string', format: 'email' }, name: { type: 'string' } },
  })
  .openapi('CreateUserRequest')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  responses: {
    200: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: z
            .array(UserSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
        },
      },
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
      userId: z
        .uuid()
        .openapi({
          param: { name: 'userId', in: 'path', required: true },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: 'User details', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'User not found' },
  },
})
