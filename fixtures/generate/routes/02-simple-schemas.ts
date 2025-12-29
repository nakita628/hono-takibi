import { createRoute, z } from '@hono/zod-openapi'

z.strictObject({test:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"test":{"type":"string"}},"additionalProperties":false,"required":["test"]})

const BSchema = z.object({
  b: z.string().openapi({ type: 'string' }),
})

z.string().openapi({param:{"schema":{"type":"string"},"required":true,"name":"page","in":"query"},"type":"string"})
  z.string().openapi({param:{"schema":{"type":"string"},"required":true,"name":"rows","in":"query"},"type":"string"})



const UserSchema = z.union([z.object({kind:z.literal("A")}).optional().openapi({"properties":{"kind":{"const":"A"}},"required":["kind"]}),z.object({kind:z.literal("B")}).optional().openapi({"properties":{"kind":{"const":"B"}},"required":["kind"]})]).nullable().openapi({"type":"object","oneOf":[{"properties":{"kind":{"const":"A"}},"required":["kind"]},{"properties":{"kind":{"const":"B"}},"required":["kind"]}]})

const CreateUserRequestSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['email'],
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
          param: {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
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
