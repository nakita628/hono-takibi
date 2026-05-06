import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const UserSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

const UserPageSchema = z
  .object({ items: z.array(UserSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('UserPage')

const PostSchema = z
  .object({ id: z.string(), title: z.string() })
  .openapi({ required: ['id', 'title'] })
  .openapi('Post')

const PostPageSchema = z
  .object({ items: z.array(PostSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('PostPage')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  request: {
    query: z.object({
      cursor: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'cursor', in: 'query', required: false, schema: { type: 'string' } },
        }),
      limit: z.coerce
        .number()
        .pipe(z.int())
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', default: 20 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Paged users',
      content: { 'application/json': { schema: UserPageSchema } },
    },
  },
})

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  operationId: 'getPosts',
  request: {
    query: z.object({
      cursor: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'cursor', in: 'query', required: false, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Paged posts',
      content: { 'application/json': { schema: PostPageSchema } },
    },
  },
})

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: {
    200: {
      description: 'Health check',
      content: {
        'application/json': {
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

function mockUser() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

function mockUserPage() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),
    nextCursor: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockPost() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), title: faker.lorem.sentence() }
}

function mockPostPage() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockPost()),
    nextCursor: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  return c.json(mockUserPage(), 200)
}

const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  return c.json(mockPostPage(), 200)
}

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ status: faker.helpers.arrayElement(['active', 'inactive', 'pending']) }, 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(getPostsRoute, getPostsRouteHandler)
  .openapi(getHealthRoute, getHealthRouteHandler)

export default app
