import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const AuthorSchema = z
  .object({ id: z.int(), name: z.string(), avatarUrl: z.url().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Author')

const TagSchema = z
  .object({ id: z.int(), name: z.string(), slug: z.string() })
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('Tag')

const PostSchema = z
  .object({
    id: z.int(),
    title: z.string(),
    body: z.string(),
    author: AuthorSchema,
    tags: z.array(TagSchema).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'title', 'body', 'author', 'createdAt', 'updatedAt'] })
  .openapi('Post')

const CreatePostSchema = z
  .object({ title: z.string(), body: z.string(), tagIds: z.array(z.int()).exactOptional() })
  .openapi({ required: ['title', 'body'] })
  .openapi('CreatePost')

const UpdatePostSchema = z
  .object({
    title: z.string().exactOptional(),
    body: z.string().exactOptional(),
    tagIds: z.array(z.int()).exactOptional(),
  })
  .openapi('UpdatePost')

const CommentSchema = z
  .object({ id: z.int(), body: z.string(), author: AuthorSchema, createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'body', 'author', 'createdAt'] })
  .openapi('Comment')

const CreateCommentSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CreateComment')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int() })
  .openapi({ required: ['page', 'limit', 'total'] })
  .openapi('Pagination')

const ErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  operationId: 'listPosts',
  request: {
    query: z.object({
      page: z
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      limit: z
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ posts: z.array(PostSchema), total: z.int() })
            .openapi({ required: ['posts', 'total'] }),
        },
      },
    },
  },
})

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  operationId: 'createPost',
  request: {
    body: { content: { 'application/json': { schema: CreatePostSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: PostSchema } } },
  },
})

export const getPostsIdRoute = createRoute({
  method: 'get',
  path: '/posts/{id}',
  operationId: 'getPost',
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
    200: { description: 'OK', content: { 'application/json': { schema: PostSchema } } },
  },
})

export const putPostsIdRoute = createRoute({
  method: 'put',
  path: '/posts/{id}',
  operationId: 'updatePost',
  request: {
    params: z.object({
      id: z
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: UpdatePostSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: PostSchema } } },
  },
})

export const deletePostsIdRoute = createRoute({
  method: 'delete',
  path: '/posts/{id}',
  operationId: 'deletePost',
  request: {
    params: z.object({
      id: z
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const getPostsIdCommentsRoute = createRoute({
  method: 'get',
  path: '/posts/{id}/comments',
  operationId: 'listComments',
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
    200: { description: 'OK', content: { 'application/json': { schema: z.array(CommentSchema) } } },
  },
})

export const postPostsIdCommentsRoute = createRoute({
  method: 'post',
  path: '/posts/{id}/comments',
  operationId: 'createComment',
  request: {
    params: z.object({
      id: z
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: CreateCommentSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: CommentSchema } } },
  },
})

export const getTagsRoute = createRoute({
  method: 'get',
  path: '/tags',
  operationId: 'listTags',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(TagSchema) } } },
  },
})

function mockAuthor() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    avatarUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockTag() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    slug: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockPost() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    title: faker.lorem.sentence(),
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    author: mockAuthor(),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockTag()),
      undefined,
    ]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}

function mockComment() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    author: mockAuthor(),
    createdAt: faker.date.past().toISOString(),
  }
}

const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  return c.json(
    {
      posts: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockPost()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  return c.json(mockPost(), 201)
}

const getPostsIdRouteHandler: RouteHandler<typeof getPostsIdRoute> = async (c) => {
  return c.json(mockPost(), 200)
}

const putPostsIdRouteHandler: RouteHandler<typeof putPostsIdRoute> = async (c) => {
  return c.json(mockPost(), 200)
}

const deletePostsIdRouteHandler: RouteHandler<typeof deletePostsIdRoute> = async (c) => {
  return new Response(null, { status: 204 })
}

const getPostsIdCommentsRouteHandler: RouteHandler<typeof getPostsIdCommentsRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockComment()),
    200,
  )
}

const postPostsIdCommentsRouteHandler: RouteHandler<typeof postPostsIdCommentsRoute> = async (
  c,
) => {
  return c.json(mockComment(), 201)
}

const getTagsRouteHandler: RouteHandler<typeof getTagsRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockTag()),
    200,
  )
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getPostsRoute, getPostsRouteHandler)
  .openapi(postPostsRoute, postPostsRouteHandler)
  .openapi(getPostsIdRoute, getPostsIdRouteHandler)
  .openapi(putPostsIdRoute, putPostsIdRouteHandler)
  .openapi(deletePostsIdRoute, deletePostsIdRouteHandler)
  .openapi(getPostsIdCommentsRoute, getPostsIdCommentsRouteHandler)
  .openapi(postPostsIdCommentsRoute, postPostsIdCommentsRouteHandler)
  .openapi(getTagsRoute, getTagsRouteHandler)

export type AppType = typeof api

export default app
