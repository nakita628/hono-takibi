import { createRoute, z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

export type User = z.infer<typeof UserSchema>

export const UserPageSchema = z
  .object({ items: z.array(UserSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('UserPage')

export type UserPage = z.infer<typeof UserPageSchema>

export const PostSchema = z
  .object({ id: z.string(), title: z.string() })
  .openapi({ required: ['id', 'title'] })
  .openapi('Post')

export type Post = z.infer<typeof PostSchema>

export const PostPageSchema = z
  .object({ items: z.array(PostSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('PostPage')

export type PostPage = z.infer<typeof PostPageSchema>

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
