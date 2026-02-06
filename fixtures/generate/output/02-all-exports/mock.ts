import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const UserSchema = z
  .object({ id: z.int(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const UserListSchema = z.array(UserSchema).openapi('UserList')

const UserListResponse = {
  description: 'A list of users',
  content: { 'application/json': { schema: UserListSchema } },
}

const PageParamParamsSchema = z
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

const UserIdParamParamsSchema = z
  .int()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } })

const UserExample = {
  summary: 'Example user',
  value: { id: 1, name: 'Alice', email: 'alice@example.com' },
}

const CreateUserBodyRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

const XRequestIdHeaderSchema = z
  .uuid()
  .exactOptional()
  .openapi({ description: 'Unique request identifier' })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const GetUserLink = {
  operationId: 'getUserById',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created user',
}

const UserCreatedCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'userCreatedCallback',
      requestBody: {
        content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
      },
      responses: { '200': { description: 'Callback processed' } },
    },
  },
}

const UserItemPathItem = {
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

function mockUser() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

function mockUserList() {
  return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser())
}

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  return c.json(mockUserList(), 200)
}

const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  return c.json(mockUser(), 201)
}

const getUsersIdRouteHandler: RouteHandler<typeof getUsersIdRoute> = async (c) => {
  return c.json(mockUser(), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)

export type AppType = typeof api

export default app
