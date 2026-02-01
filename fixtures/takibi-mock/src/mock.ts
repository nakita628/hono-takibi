import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import type { RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const UserSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    email: z.email(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const CreateUserInputSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .openapi('CreateUserInput')

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

const ApiKeyAuthSecurityScheme = { type: 'apiKey', name: 'X-API-Key', in: 'header' }

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'Get all users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'List of users',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
  },
  security: [{ bearerAuth: [] }],
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
    201: { description: 'Created user', content: { 'application/json': { schema: UserSchema } } },
  },
  security: [{ basicAuth: [] }],
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
    200: { description: 'User found', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'User not found' },
  },
  security: [{ apiKeyAuth: [] }],
})

export const deleteUsersIdRoute = createRoute({
  method: 'delete',
  path: '/users/{id}',
  summary: 'Delete user',
  operationId: 'deleteUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: { 204: { description: 'User deleted' } },
})

function mockUser() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: faker.helpers.arrayElement([faker.date.past().toISOString(), undefined]),
  }
}

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),
    200,
  )
}
const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 201)
}
const getUsersIdRouteHandler: RouteHandler<typeof getUsersIdRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 200)
}
const deleteUsersIdRouteHandler: RouteHandler<typeof deleteUsersIdRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.body(null, 204)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(deleteUsersIdRoute, deleteUsersIdRouteHandler)

export type AppType = typeof api

export default app
