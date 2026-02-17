import { createRoute, z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.int(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

export type User = z.infer<typeof UserSchema>

export const UserListSchema = z.array(UserSchema).openapi('UserList')

export type UserList = z.infer<typeof UserListSchema>

export const UserListResponse = {
  description: 'A list of users',
  content: { 'application/json': { schema: UserListSchema } },
}

export const PageParamParamsSchema = z
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

export type PageParamParams = z.infer<typeof PageParamParamsSchema>

export const UserIdParamParamsSchema = z
  .int()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } })

export type UserIdParamParams = z.infer<typeof UserIdParamParamsSchema>

export const UserExample = {
  summary: 'Example user',
  value: { id: 1, name: 'Alice', email: 'alice@example.com' },
}

export const CreateUserBodyRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

export const XRequestIdHeaderSchema = z
  .uuid()
  .exactOptional()
  .openapi({ description: 'Unique request identifier' })

export type XRequestIdHeader = z.infer<typeof XRequestIdHeaderSchema>

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

export const GetUserLink = {
  operationId: 'getUserById',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created user',
}

export const UserCreatedCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'userCreatedCallback',
      requestBody: { content: { 'application/json': { schema: UserSchema } } },
      responses: { 200: { description: 'Callback processed' } },
    },
  },
}

export const UserItemPathItem = {
  get: {
    operationId: 'getUserItem',
    responses: {
      200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
    },
  },
}

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  request: { query: z.object({ page: PageParamParamsSchema }) },
  responses: { 200: UserListResponse },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: { body: CreateUserBodyRequestBody },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: UserSchema } },
      links: { GetUser: GetUserLink },
    },
  },
})

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUserById',
  request: { params: z.object({ id: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
      content: { 'application/json': { schema: UserSchema } },
    },
  },
  security: [{ BearerAuth: [] }],
})
