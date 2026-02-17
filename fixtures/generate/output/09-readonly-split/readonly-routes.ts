import { createRoute, z } from '@hono/zod-openapi'

const AuthorSchema = z
  .object({ id: z.int(), name: z.string(), avatarUrl: z.url().exactOptional() })
  .readonly()
  .openapi({ required: ['id', 'name'] })
  .openapi('Author')

const TagSchema = z
  .object({ id: z.int(), name: z.string(), slug: z.string() })
  .readonly()
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('Tag')

const PostSchema = z
  .object({
    id: z.int(),
    title: z.string(),
    body: z.string(),
    author: AuthorSchema,
    tags: z.array(TagSchema).readonly().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .readonly()
  .openapi({ required: ['id', 'title', 'body', 'author', 'createdAt', 'updatedAt'] })
  .openapi('Post')

const CreatePostSchema = z
  .object({
    title: z.string(),
    body: z.string(),
    tagIds: z.array(z.int()).readonly().exactOptional(),
  })
  .readonly()
  .openapi({ required: ['title', 'body'] })
  .openapi('CreatePost')

const UpdatePostSchema = z
  .object({
    title: z.string().exactOptional(),
    body: z.string().exactOptional(),
    tagIds: z.array(z.int()).readonly().exactOptional(),
  })
  .readonly()
  .openapi('UpdatePost')

const CommentSchema = z
  .object({ id: z.int(), body: z.string(), author: AuthorSchema, createdAt: z.iso.datetime() })
  .readonly()
  .openapi({ required: ['id', 'body', 'author', 'createdAt'] })
  .openapi('Comment')

const CreateCommentSchema = z
  .object({ body: z.string() })
  .readonly()
  .openapi({ required: ['body'] })
  .openapi('CreateComment')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int() })
  .readonly()
  .openapi({ required: ['page', 'limit', 'total'] })
  .openapi('Pagination')

const ErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .readonly()
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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

export const getTagsRoute = createRoute({
  method: 'get',
  path: '/tags',
  operationId: 'listTags',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(TagSchema) } } },
  },
} as const)
