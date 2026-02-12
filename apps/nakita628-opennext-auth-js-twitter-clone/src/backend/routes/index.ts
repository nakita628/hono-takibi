import { createRoute, z } from '@hono/zod-openapi'

const CommentSchema = z
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

const MessageResponseSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('MessageResponse')

const CreateCommentRequestSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CreateCommentRequest')

const FollowSchema = z
  .object({
    id: z.uuid(),
    followerId: z.uuid(),
    followingId: z.uuid(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'followerId', 'followingId', 'createdAt'] })
  .openapi('Follow')

const CurrentUserSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().exactOptional(),
    email: z.email(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    followers: z.array(FollowSchema),
    following: z.array(FollowSchema),
    hasNotification: z.boolean(),
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

const UserSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().exactOptional(),
    email: z.email(),
    emailVerified: z.string().nullable(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    hashedPassword: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    hasNotification: z.boolean().exactOptional(),
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
      'hashedPassword',
      'createdAt',
      'updatedAt',
    ],
  })
  .openapi('User')

const EditUserRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    username: z.string().exactOptional(),
    bio: z.string().exactOptional(),
    coverImage: z.url().nullable().exactOptional(),
    profileImage: z.url().nullable().exactOptional(),
  })
  .openapi('EditUserRequest')

const FollowUserRequestSchema = z
  .object({ userId: z.uuid() })
  .openapi({ required: ['userId'] })
  .openapi('FollowUserRequest')

const LikeSchema = z
  .object({ id: z.uuid(), userId: z.uuid(), postId: z.uuid(), createdAt: z.string() })
  .openapi({ required: ['id', 'userId', 'postId', 'createdAt'] })
  .openapi('Like')

const PostWithLikesSchema = z
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

const LikePostRequestSchema = z
  .object({ postId: z.uuid() })
  .openapi({ required: ['postId'] })
  .openapi('LikePostRequest')

const NotificationSchema = z
  .object({ id: z.uuid(), body: z.string(), userId: z.uuid(), createdAt: z.string() })
  .openapi({ required: ['id', 'body', 'userId', 'createdAt'] })
  .openapi('Notification')

const PostWithDetailsSchema = z
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

const PostSchema = z
  .object({
    id: z.uuid(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.uuid(),
  })
  .openapi({ required: ['id', 'body', 'createdAt', 'updatedAt', 'userId'] })
  .openapi('Post')

const CreatePostRequestSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CreatePostRequest')

const CommentWithUserSchema = z
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

const PostDetailSchema = z
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

const RegisterRequestSchema = z
  .object({ email: z.email(), name: z.string(), username: z.string(), password: z.string() })
  .openapi({ required: ['email', 'name', 'username', 'password'] })
  .openapi('RegisterRequest')

const UserWithFollowCountSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    bio: z.string().exactOptional(),
    email: z.email(),
    emailVerified: z.string().nullable(),
    image: z.url().nullable(),
    coverImage: z.url().nullable(),
    profileImage: z.url().nullable(),
    hashedPassword: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    hasNotification: z.boolean().exactOptional(),
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
      'hashedPassword',
      'createdAt',
      'updatedAt',
      '_count',
    ],
  })
  .openapi('UserWithFollowCount')

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
  .openapi({
    param: {
      name: 'userId',
      in: 'query',
      required: true,
      schema: { type: 'string', format: 'uuid' },
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postFollowRoute = createRoute({
  method: 'post',
  path: '/follow',
  tags: ['follow'],
  operationId: 'postFollowUesrId',
  request: {
    body: { content: { 'application/json': { schema: FollowUserRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  tags: ['posts'],
  operationId: 'getPosts',
  request: { query: z.object({ userId: ParametersUserIdQueryParamsSchema }) },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.array(PostWithDetailsSchema) } },
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
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
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
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: UserSchema } },
    },
    500: {
      description: 'Server error',
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
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['users'],
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})
