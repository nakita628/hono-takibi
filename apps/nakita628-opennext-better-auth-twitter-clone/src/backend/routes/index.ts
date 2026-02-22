import { createRoute, z } from '@hono/zod-openapi'

export const CommentSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    postId: z.uuid(),
  })
  .openapi({ required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'postId'] })
  .openapi('Comment')

export const MessageResponseSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('MessageResponse')

export const ValidationErrorDetailSchema = z
  .object({ pointer: z.string(), detail: z.string() })
  .openapi({ required: ['pointer', 'detail'] })
  .openapi('ValidationErrorDetail')

export const ValidationErrorSchema = z
  .object({
    type: z.literal('about:blank'),
    title: z.literal('Unprocessable Content'),
    status: z.literal(422),
    detail: z.literal('Request validation failed'),
    errors: z.array(ValidationErrorDetailSchema),
  })
  .openapi({ required: ['type', 'title', 'status', 'detail', 'errors'] })
  .openapi('ValidationError')

export const CreateCommentRequestSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CreateCommentRequest')

export const FollowSchema = z
  .object({ followerId: z.uuid(), followingId: z.uuid(), createdAt: z.iso.datetime() })
  .openapi({ required: ['followerId', 'followingId', 'createdAt'] })
  .openapi('Follow')

export const CurrentUserSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    email: z.email(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    followers: z.array(FollowSchema),
    following: z.array(FollowSchema),
    hasNotification: z.boolean().nullable(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'email',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
      'followers',
      'following',
      'hasNotification',
    ],
  })
  .openapi('CurrentUser')

export const UserSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    email: z.email(),
    emailVerified: z.string().nullable(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    hasNotification: z.boolean().nullable().exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'email',
      'emailVerified',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
    ],
  })
  .openapi('User')

export const EditUserRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    username: z.string().exactOptional(),
    bio: z.string().exactOptional(),
    coverImage: z.url().nullable().exactOptional(),
    profileImage: z.url().nullable().exactOptional(),
  })
  .openapi('EditUserRequest')

export const FollowUserRequestSchema = z
  .object({ userId: z.uuid() })
  .openapi({ required: ['userId'] })
  .openapi('FollowUserRequest')

export const LikeSchema = z
  .object({ userId: z.uuid(), postId: z.uuid(), createdAt: z.string() })
  .openapi({ required: ['userId', 'postId', 'createdAt'] })
  .openapi('Like')

export const PostWithLikesSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    likes: z.array(LikeSchema),
  })
  .openapi({ required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'likes'] })
  .openapi('PostWithLikes')

export const LikePostRequestSchema = z
  .object({ postId: z.uuid() })
  .openapi({ required: ['postId'] })
  .openapi('LikePostRequest')

export const NotificationSchema = z
  .object({ id: z.uuid(), body: z.string(), userId: z.uuid(), createdAt: z.string() })
  .openapi({ required: ['id', 'body', 'userId', 'createdAt'] })
  .openapi('Notification')

export const PostSummarySchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    user: UserSchema,
    commentCount: z.number(),
    likeCount: z.number(),
  })
  .openapi({
    required: [
      'id',
      'body',
      'createdAt',
      'updatedAt',
      'userId',
      'user',
      'commentCount',
      'likeCount',
    ],
  })
  .openapi('PostSummary')

export const PaginationMetaSchema = z
  .object({ page: z.number(), limit: z.number(), total: z.number(), totalPages: z.number() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('PaginationMeta')

export const PaginatedPostsSchema = z
  .object({ data: z.array(PostSummarySchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('PaginatedPosts')

export const PostSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
  })
  .openapi({ required: ['id', 'body', 'createdAt', 'updatedAt', 'userId'] })
  .openapi('Post')

export const CreatePostRequestSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CreatePostRequest')

export const CommentWithUserSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    postId: z.uuid(),
    user: UserSchema,
  })
  .openapi({ required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'postId', 'user'] })
  .openapi('CommentWithUser')

export const PostDetailSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    user: UserSchema,
    comments: z.array(CommentWithUserSchema),
    likes: z.array(z.object({ userId: z.uuid() }).openapi({ required: ['userId'] })),
    _count: z.object({ likes: z.number() }).openapi({ required: ['likes'] }),
  })
  .openapi({
    required: [
      'id',
      'body',
      'createdAt',
      'updatedAt',
      'userId',
      'user',
      'comments',
      'likes',
      '_count',
    ],
  })
  .openapi('PostDetail')

export const RegisterRequestSchema = z
  .object({ email: z.email(), name: z.string(), username: z.string(), password: z.string() })
  .openapi({ required: ['email', 'name', 'username', 'password'] })
  .openapi('RegisterRequest')

export const PaginatedUsersSchema = z
  .object({ data: z.array(UserSchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('PaginatedUsers')

export const SearchResultsSchema = z
  .object({ posts: PaginatedPostsSchema, users: PaginatedUsersSchema })
  .openapi({ required: ['posts', 'users'] })
  .openapi('SearchResults')

export const UserWithFollowCountSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    email: z.email(),
    emailVerified: z.string().nullable(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    hasNotification: z.boolean().nullable().exactOptional(),
    _count: z
      .object({ followers: z.number(), following: z.number() })
      .openapi({ required: ['followers', 'following'] }),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'email',
      'emailVerified',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
      '_count',
    ],
  })
  .openapi('UserWithFollowCount')

export const PostWithDetailsSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
    user: UserSchema,
    comments: z.array(CommentSchema),
    likes: z.array(LikeSchema),
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'user', 'comments', 'likes'],
  })
  .openapi('PostWithDetails')

const ParametersPostIdQueryParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'postId',
      in: 'query',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const ParametersUserIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'userId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const ParametersUserIdQueryParamsSchema = z
  .uuid()
  .exactOptional()
  .openapi({
    param: {
      name: 'userId',
      in: 'query',
      required: false,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const ParametersPaginationQueryPageParamsSchema = z.coerce
  .number()
  .min(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', required: false, schema: { type: 'number', minimum: 1 } },
  })

const ParametersPaginationQueryLimitParamsSchema = z.coerce
  .number()
  .min(1)
  .max(100)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: { type: 'number', minimum: 1, maximum: 100 },
    },
  })

const ParametersPostIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'postId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const ParametersSearchQueryParamsSchema = z
  .string()
  .min(1)
  .openapi({
    param: { name: 'q', in: 'query', required: true, schema: { type: 'string', minLength: 1 } },
  })

export const postCommentsRoute = createRoute({
  method: 'post',
  path: '/comments',
  tags: ['comments'],
  operationId: 'postComments',
  request: {
    query: z.object({ postId: ParametersPostIdQueryParamsSchema }),
    body: {
      content: { 'application/json': { schema: CreateCommentRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: CommentSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getCurrentRoute = createRoute({
  method: 'get',
  path: '/current',
  tags: ['current'],
  operationId: 'getCurrentUser',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: CurrentUserSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const patchEditRoute = createRoute({
  method: 'patch',
  path: '/edit',
  tags: ['edit'],
  operationId: 'patchEdit',
  request: {
    body: { content: { 'application/json': { schema: EditUserRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: UserSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postFollowRoute = createRoute({
  method: 'post',
  path: '/follow',
  tags: ['follow'],
  operationId: 'postFollowUserId',
  request: {
    body: { content: { 'application/json': { schema: FollowUserRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const deleteFollowRoute = createRoute({
  method: 'delete',
  path: '/follow',
  tags: ['follow'],
  operationId: 'deleteFollowUserId',
  request: {
    body: { content: { 'application/json': { schema: FollowUserRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postLikeRoute = createRoute({
  method: 'post',
  path: '/like',
  tags: ['like'],
  operationId: 'postLikePostId',
  request: {
    body: { content: { 'application/json': { schema: LikePostRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PostWithLikesSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const deleteLikeRoute = createRoute({
  method: 'delete',
  path: '/like',
  tags: ['like'],
  operationId: 'deleteLikePostId',
  request: {
    body: { content: { 'application/json': { schema: LikePostRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PostWithLikesSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getNotificationsUserIdRoute = createRoute({
  method: 'get',
  path: '/notifications/{userId}',
  tags: ['notifications'],
  operationId: 'getNotificationsUserId',
  request: { params: z.object({ userId: ParametersUserIdPathParamsSchema }) },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.array(NotificationSchema) } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postNotificationsRoute = createRoute({
  method: 'post',
  path: '/notifications',
  tags: ['notifications'],
  operationId: 'postNotificationsUserId',
  request: { body: { content: { 'text/plain': { schema: z.string() } }, required: true } },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  tags: ['posts'],
  operationId: 'getPosts',
  request: {
    query: z.object({
      userId: ParametersUserIdQueryParamsSchema,
      page: ParametersPaginationQueryPageParamsSchema,
      limit: ParametersPaginationQueryLimitParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PaginatedPostsSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  tags: ['posts'],
  operationId: 'postPosts',
  request: {
    body: { content: { 'application/json': { schema: CreatePostRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PostSchema } },
    },
    401: {
      description: 'Access is unauthorized.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getPostsPostIdRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}',
  tags: ['posts'],
  operationId: 'getPostsPostId',
  request: { params: z.object({ postId: ParametersPostIdPathParamsSchema }) },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PostDetailSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postRegisterRoute = createRoute({
  method: 'post',
  path: '/register',
  tags: ['register'],
  operationId: 'postRegister',
  request: {
    body: { content: { 'application/json': { schema: RegisterRequestSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'The request has succeeded and a new resource has been created as a result.',
      content: { 'application/json': { schema: UserSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    409: {
      description: 'The request conflicts with the current state of the server.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  tags: ['search'],
  operationId: 'getSearch',
  request: {
    query: z.object({
      q: ParametersSearchQueryParamsSchema,
      page: ParametersPaginationQueryPageParamsSchema,
      limit: ParametersPaginationQueryLimitParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: SearchResultsSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['users'],
  operationId: 'getUserUserId',
  request: { params: z.object({ userId: ParametersUserIdPathParamsSchema }) },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: UserWithFollowCountSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: ValidationErrorSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['users'],
  operationId: 'getUsers',
  request: {
    query: z.object({
      page: ParametersPaginationQueryPageParamsSchema,
      limit: ParametersPaginationQueryLimitParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: PaginatedUsersSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})
