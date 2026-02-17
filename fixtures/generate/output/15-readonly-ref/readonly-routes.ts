import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({ id: z.string(), name: z.string(), email: z.email() })
  .readonly()
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const ItemSchema = z
  .object({ id: z.int(), title: z.string() })
  .readonly()
  .openapi({ required: ['id', 'title'] })
  .openapi('Item')

const ErrorBodySchema = z
  .object({ code: z.int(), message: z.string() })
  .readonly()
  .openapi({ required: ['code', 'message'] })
  .openapi('ErrorBody')

export const UserListResponse = {
  description: 'User list response',
  content: {
    'application/json': {
      schema: z
        .object({ users: z.array(UserSchema), total: z.int() })
        .openapi({ required: ['users', 'total'] }),
    },
  },
} as const

export const NotFoundResponse = {
  description: 'Not found',
  content: { 'application/json': { schema: ErrorBodySchema } },
} as const

export const BadRequestResponse = {
  description: 'Bad request',
  content: { 'application/json': { schema: ErrorBodySchema } },
} as const

export const ServerErrorResponse = {
  description: 'Server error',
  content: { 'application/json': { schema: ErrorBodySchema } },
} as const

export const UserExample = {
  summary: 'A sample user',
  value: { id: 'u-001', name: 'Alice', email: 'alice@example.com' },
} as const

export const UserAliasExample = UserExample

export const ItemExample = { summary: 'A sample item', value: { id: 1, title: 'Widget' } } as const

export const ItemAliasExample = ItemExample

export const CreateUserRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
} as const

export const UpdateUserRequestBody = {
  content: {
    'application/json': {
      schema: z.object({ name: z.string().exactOptional(), email: z.email().exactOptional() }),
    },
  },
  required: true,
} as const

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List users',
  operationId: 'listUsers',
  responses: { 200: UserListResponse },
} as const)

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
} as const)

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
} as const)

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
} as const)

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  summary: 'List items (uses $ref response alias)',
  operationId: 'listItems',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(ItemSchema) } } },
    500: ServerErrorResponse,
  },
} as const)
