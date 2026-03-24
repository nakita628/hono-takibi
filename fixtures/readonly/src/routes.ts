import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    email: z.email(),
    tags: z.array(z.string()).readonly().exactOptional(),
  })
  .readonly()
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ status: z.string() })
            .readonly()
            .openapi({ required: ['status'] }),
        },
      },
    },
  },
} as const)

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  request: {
    query: z.object({
      page: z.coerce
        .number()
        .pipe(z.int())
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ users: z.array(UserSchema).readonly(), total: z.int() })
            .readonly()
            .openapi({ required: ['users', 'total'] }),
        },
      },
    },
  },
} as const)

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ name: z.string(), email: z.email() })
            .readonly()
            .openapi({ required: ['name', 'email'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
} as const)

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUser',
  request: {
    params: z.object({
      id: z
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
  },
} as const)

export const getTagsRoute = createRoute({
  method: 'get',
  path: '/tags',
  operationId: 'getTags',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(z.string()).readonly() } },
    },
  },
} as const)
