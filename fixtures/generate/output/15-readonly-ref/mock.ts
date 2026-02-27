import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const UserSchema = z
  .object({ id: z.string(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const ItemSchema = z
  .object({ id: z.int(), title: z.string() })
  .openapi({ required: ['id', 'title'] })
  .openapi('Item')

const ErrorBodySchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('ErrorBody')

const UserListResponse = {
  description: 'User list response',
  content: {
    'application/json': {
      schema: z
        .object({ users: z.array(UserSchema), total: z.int() })
        .openapi({ required: ['users', 'total'] }),
    },
  },
}

const NotFoundResponse = {
  description: 'Not found',
  content: { 'application/json': { schema: ErrorBodySchema } },
}

const BadRequestResponse = {
  description: 'Bad request',
  content: { 'application/json': { schema: ErrorBodySchema } },
}

const ServerErrorResponse = {
  description: 'Server error',
  content: { 'application/json': { schema: ErrorBodySchema } },
}

const UserExample = {
  summary: 'A sample user',
  value: { id: 'u-001', name: 'Alice', email: 'alice@example.com' },
}

const UserAliasExample = UserExample

const ItemExample = { summary: 'A sample item', value: { id: 1, title: 'Widget' } }

const ItemAliasExample = ItemExample

const CreateUserRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

const UpdateUserRequestBody = {
  content: {
    'application/json': {
      schema: z.object({ name: z.string().exactOptional(), email: z.email().exactOptional() }),
    },
  },
  required: true,
}

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List users',
  operationId: 'listUsers',
  responses: { 200: UserListResponse },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create user',
  operationId: 'createUser',
  request: { body: CreateUserRequestBody },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
    400: BadRequestResponse,
  },
})

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get user by ID',
  operationId: 'getUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
    404: NotFoundResponse,
  },
})

export const putUsersIdRoute = createRoute({
  method: 'put',
  path: '/users/{id}',
  summary: 'Update user',
  operationId: 'updateUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
    body: UpdateUserRequestBody,
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  summary: 'List items (uses $ref response alias)',
  operationId: 'listItems',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(ItemSchema) } } },
    500: ServerErrorResponse,
  },
})

function mockUser() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

function mockItem() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    title: faker.lorem.sentence(),
  }
}

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  return c.json(
    {
      users: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  return c.json(mockUser(), 201)
}

const getUsersIdRouteHandler: RouteHandler<typeof getUsersIdRoute> = async (c) => {
  return c.json(mockUser(), 200)
}

const putUsersIdRouteHandler: RouteHandler<typeof putUsersIdRoute> = async (c) => {
  return c.json(mockUser(), 200)
}

const getItemsRouteHandler: RouteHandler<typeof getItemsRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockItem()),
    200,
  )
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(putUsersIdRoute, putUsersIdRouteHandler)
  .openapi(getItemsRoute, getItemsRouteHandler)

export default app
