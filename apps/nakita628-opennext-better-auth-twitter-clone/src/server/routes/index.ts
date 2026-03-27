import { createRoute, z } from '@hono/zod-openapi'

export const CommentSchema = z
  .object({
    id: z.uuid({ error: 'Comment ID must be a valid UUID' }).brand<'CommentId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    postId: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'postId'],
    example: {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      body: 'Great post! Thanks for sharing.',
      createdAt: '2025-03-20T14:30:00Z',
      updatedAt: '2025-03-20T14:30:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      postId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
  })
  .openapi('Comment')

export const MessageResponseSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], example: { message: 'Operation completed successfully' } })
  .openapi('MessageResponse')

export const ValidationErrorDetailSchema = z
  .object({ pointer: z.string(), detail: z.string() })
  .openapi({
    required: ['pointer', 'detail'],
    example: { pointer: '/email', detail: 'Must be a valid email address' },
  })
  .openapi('ValidationErrorDetail')

export const ValidationErrorSchema = z
  .object({
    type: z.literal('about:blank'),
    title: z.literal('Unprocessable Content'),
    status: z.literal(422),
    detail: z.literal('Request validation failed'),
    errors: z.array(ValidationErrorDetailSchema),
  })
  .openapi({
    required: ['type', 'title', 'status', 'detail', 'errors'],
    example: {
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Must be a valid email address' }],
    },
  })
  .openapi('ValidationError')

export const CreateCommentRequestSchema = z
  .object({ body: z.string().min(1, { error: 'Comment must not be empty' }) })
  .openapi({ required: ['body'], example: { body: 'Great post! Thanks for sharing.' } })
  .openapi('CreateCommentRequest')

export const FollowSchema = z
  .object({
    followerId: z.uuid({ error: 'Follower ID must be a valid UUID' }).brand<'UserId'>(),
    followingId: z.uuid({ error: 'Following ID must be a valid UUID' }).brand<'UserId'>(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
  })
  .openapi({
    required: ['followerId', 'followingId', 'createdAt'],
    example: {
      followerId: '550e8400-e29b-41d4-a716-446655440000',
      followingId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      createdAt: '2025-03-01T10:00:00Z',
    },
  })
  .openapi('Follow')

export const CurrentUserSchema = z
  .object({
    id: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    email: z.email({ error: 'Must be a valid email address' }).brand<'Email'>(),
    image: z.url({ error: 'Image must be a valid URL' }).nullable(),
    coverImage: z.url({ error: 'Cover image must be a valid URL' }).nullable(),
    profileImage: z.url({ error: 'Profile image must be a valid URL' }).nullable(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
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
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Software developer',
      email: 'john@example.com',
      image: 'https://example.com/images/johndoe.png',
      coverImage: 'https://example.com/covers/johndoe.png',
      profileImage: 'https://example.com/profiles/johndoe.png',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-03-20T12:30:00Z',
      followers: [],
      following: [],
      hasNotification: false,
    },
  })
  .openapi('CurrentUser')

export const UserSchema = z
  .object({
    id: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    image: z.url({ error: 'Image must be a valid URL' }).nullable(),
    coverImage: z.url({ error: 'Cover image must be a valid URL' }).nullable(),
    profileImage: z.url({ error: 'Profile image must be a valid URL' }).nullable(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    email: z.email({ error: 'Must be a valid email address' }).brand<'Email'>(),
    emailVerified: z.iso
      .datetime({ error: 'Email verified date must be a valid datetime' })
      .nullable(),
    hasNotification: z.boolean().nullable().exactOptional(),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
      'email',
      'emailVerified',
    ],
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Software developer',
      image: 'https://example.com/images/johndoe.png',
      coverImage: 'https://example.com/covers/johndoe.png',
      profileImage: 'https://example.com/profiles/johndoe.png',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-03-20T12:30:00Z',
      email: 'john@example.com',
      emailVerified: '2025-01-15T09:05:00Z',
      hasNotification: true,
    },
  })
  .openapi('User')

export const EditUserRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    username: z.string().exactOptional(),
    bio: z.string().exactOptional(),
    coverImage: z.url({ error: 'Cover image must be a valid URL' }).nullable().exactOptional(),
    profileImage: z.url({ error: 'Profile image must be a valid URL' }).nullable().exactOptional(),
  })
  .openapi({
    example: {
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Software developer',
      coverImage: 'https://example.com/covers/johndoe.png',
      profileImage: 'https://example.com/profiles/johndoe.png',
    },
  })
  .openapi('EditUserRequest')

export const FollowUserRequestSchema = z
  .object({ userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>() })
  .openapi({ required: ['userId'], example: { userId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' } })
  .openapi('FollowUserRequest')

export const LikeSchema = z
  .object({
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    postId: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
  })
  .openapi({
    required: ['userId', 'postId', 'createdAt'],
    example: {
      userId: '550e8400-e29b-41d4-a716-446655440000',
      postId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      createdAt: '2025-03-20T15:00:00Z',
    },
  })
  .openapi('Like')

export const PostWithLikesSchema = z
  .object({
    id: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    likes: z.array(LikeSchema),
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'likes'],
    example: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      body: 'Just shipped a new feature! Check it out.',
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      likes: [
        {
          userId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
          postId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          createdAt: '2025-03-20T15:00:00Z',
        },
      ],
    },
  })
  .openapi('PostWithLikes')

export const LikePostRequestSchema = z
  .object({ postId: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>() })
  .openapi({ required: ['postId'], example: { postId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' } })
  .openapi('LikePostRequest')

export const NotificationSchema = z
  .object({
    id: z.uuid({ error: 'Notification ID must be a valid UUID' }).brand<'NotificationId'>(),
    body: z.string(),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
  })
  .openapi({
    required: ['id', 'body', 'userId', 'createdAt'],
    example: {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      body: 'John Doe liked your post',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      createdAt: '2025-03-20T16:00:00Z',
    },
  })
  .openapi('Notification')

export const PublicUserSchema = z
  .object({
    id: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    image: z.url({ error: 'Image must be a valid URL' }).nullable(),
    coverImage: z.url({ error: 'Cover image must be a valid URL' }).nullable(),
    profileImage: z.url({ error: 'Profile image must be a valid URL' }).nullable(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
    ],
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Software developer',
      image: 'https://example.com/images/johndoe.png',
      coverImage: 'https://example.com/covers/johndoe.png',
      profileImage: 'https://example.com/profiles/johndoe.png',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-03-20T12:30:00Z',
    },
  })
  .openapi('PublicUser')

export const PostSummarySchema = z
  .object({
    id: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    user: PublicUserSchema,
    commentCount: z.number(),
    likeCount: z.number(),
    hasLiked: z.boolean().openapi({ description: 'Whether the current user has liked this post' }),
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
      'hasLiked',
    ],
    example: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      body: 'Just shipped a new feature! Check it out.',
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Software developer',
        image: 'https://example.com/images/johndoe.png',
        coverImage: 'https://example.com/covers/johndoe.png',
        profileImage: 'https://example.com/profiles/johndoe.png',
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-03-20T12:30:00Z',
      },
      commentCount: 3,
      likeCount: 12,
      hasLiked: true,
    },
  })
  .openapi('PostSummary')

export const PaginationMetaSchema = z
  .object({ page: z.number(), limit: z.number(), total: z.number(), totalPages: z.number() })
  .openapi({
    required: ['page', 'limit', 'total', 'totalPages'],
    example: { page: 1, limit: 20, total: 150, totalPages: 8 },
  })
  .openapi('PaginationMeta')

export const PaginatedPostsSchema = z
  .object({ data: z.array(PostSummarySchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('PaginatedPosts')

export const PostSchema = z
  .object({
    id: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId'],
    example: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      body: 'Just shipped a new feature! Check it out.',
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
    },
  })
  .openapi('Post')

export const CreatePostRequestSchema = z
  .object({ body: z.string().min(1, { error: 'Post must not be empty' }) })
  .openapi({ required: ['body'], example: { body: 'Just shipped a new feature! Check it out.' } })
  .openapi('CreatePostRequest')

export const CommentWithUserSchema = z
  .object({
    id: z.uuid({ error: 'Comment ID must be a valid UUID' }).brand<'CommentId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    postId: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    user: PublicUserSchema,
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'postId', 'user'],
    example: {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      body: 'Great post! Thanks for sharing.',
      createdAt: '2025-03-20T14:30:00Z',
      updatedAt: '2025-03-20T14:30:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      postId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Software developer',
        image: 'https://example.com/images/johndoe.png',
        coverImage: 'https://example.com/covers/johndoe.png',
        profileImage: 'https://example.com/profiles/johndoe.png',
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-03-20T12:30:00Z',
      },
    },
  })
  .openapi('CommentWithUser')

export const PostDetailSchema = z
  .object({
    id: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    user: PublicUserSchema,
    comments: z.array(CommentWithUserSchema),
    likes: z.array(
      z
        .object({ userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>() })
        .openapi({ required: ['userId'] }),
    ),
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
    example: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      body: 'Just shipped a new feature! Check it out.',
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Software developer',
        image: 'https://example.com/images/johndoe.png',
        coverImage: 'https://example.com/covers/johndoe.png',
        profileImage: 'https://example.com/profiles/johndoe.png',
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-03-20T12:30:00Z',
      },
      comments: [],
      likes: [{ userId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' }],
      _count: { likes: 1 },
    },
  })
  .openapi('PostDetail')

export const SearchResultsSchema = z
  .object({ posts: z.array(PostSummarySchema), users: z.array(PublicUserSchema) })
  .openapi({ required: ['posts', 'users'] })
  .openapi('SearchResults')

export const UserWithFollowCountSchema = z
  .object({
    id: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    name: z.string(),
    username: z.string(),
    bio: z.string().nullable().exactOptional(),
    image: z.url({ error: 'Image must be a valid URL' }).nullable(),
    coverImage: z.url({ error: 'Cover image must be a valid URL' }).nullable(),
    profileImage: z.url({ error: 'Profile image must be a valid URL' }).nullable(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    _count: z
      .object({ followers: z.number(), following: z.number() })
      .openapi({ required: ['followers', 'following'] }),
  })
  .openapi({
    required: [
      'id',
      'name',
      'username',
      'image',
      'coverImage',
      'profileImage',
      'createdAt',
      'updatedAt',
      '_count',
    ],
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Software developer',
      image: 'https://example.com/images/johndoe.png',
      coverImage: 'https://example.com/covers/johndoe.png',
      profileImage: 'https://example.com/profiles/johndoe.png',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-03-20T12:30:00Z',
      _count: { followers: 42, following: 15 },
    },
  })
  .openapi('UserWithFollowCount')

export const PaginatedUsersSchema = z
  .object({ data: z.array(PublicUserSchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('PaginatedUsers')

export const PostWithDetailsSchema = z
  .object({
    id: z.uuid({ error: 'Post ID must be a valid UUID' }).brand<'PostId'>(),
    body: z.string(),
    createdAt: z.iso.datetime({ error: 'Created date must be a valid datetime' }),
    updatedAt: z.iso.datetime({ error: 'Updated date must be a valid datetime' }),
    userId: z.uuid({ error: 'User ID must be a valid UUID' }).brand<'UserId'>(),
    user: PublicUserSchema,
    comments: z.array(CommentSchema),
    likes: z.array(LikeSchema),
  })
  .openapi({
    required: ['id', 'body', 'createdAt', 'updatedAt', 'userId', 'user', 'comments', 'likes'],
    example: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      body: 'Just shipped a new feature! Check it out.',
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Software developer',
        image: 'https://example.com/images/johndoe.png',
        coverImage: 'https://example.com/covers/johndoe.png',
        profileImage: 'https://example.com/profiles/johndoe.png',
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-03-20T12:30:00Z',
      },
      comments: [],
      likes: [],
    },
  })
  .openapi('PostWithDetails')

const ParametersPostIdQueryParamsSchema = z
  .uuid({ error: 'Post ID must be a valid UUID' })
  .brand<'PostId'>()
  .openapi({
    param: {
      name: 'postId',
      in: 'query',
      required: true,
      schema: {
        type: 'string',
        format: 'uuid',
        'x-brand': 'PostId',
        'x-error-message': 'Post ID must be a valid UUID',
      },
      'x-brand': 'PostId',
      'x-error-message': 'Post ID must be a valid UUID',
    },
  })

const ParametersUserIdPathParamsSchema = z
  .uuid({ error: 'User ID must be a valid UUID' })
  .brand<'UserId'>()
  .openapi({
    param: {
      name: 'userId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        format: 'uuid',
        'x-brand': 'UserId',
        'x-error-message': 'User ID must be a valid UUID',
      },
      'x-brand': 'UserId',
      'x-error-message': 'User ID must be a valid UUID',
    },
  })

const ParametersUserIdQueryParamsSchema = z
  .uuid({ error: 'User ID must be a valid UUID' })
  .brand<'UserId'>()
  .exactOptional()
  .openapi({
    param: {
      name: 'userId',
      in: 'query',
      required: false,
      schema: {
        type: 'string',
        format: 'uuid',
        'x-brand': 'UserId',
        'x-error-message': 'User ID must be a valid UUID',
      },
      'x-brand': 'UserId',
      'x-error-message': 'User ID must be a valid UUID',
    },
  })

const ParametersPaginationQueryPageParamsSchema = z.coerce
  .number()
  .min(1, { error: 'Page must be at least 1' })
  .exactOptional()
  .openapi({
    param: {
      name: 'page',
      in: 'query',
      required: false,
      schema: { type: 'number', minimum: 1, 'x-minimum-message': 'Page must be at least 1' },
      'x-minimum-message': 'Page must be at least 1',
    },
  })

const ParametersPaginationQueryLimitParamsSchema = z.coerce
  .number()
  .min(1, { error: 'Limit must be at least 1' })
  .max(100, { error: 'Limit must be at most 100' })
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        'x-maximum-message': 'Limit must be at most 100',
        'x-minimum-message': 'Limit must be at least 1',
      },
      'x-maximum-message': 'Limit must be at most 100',
      'x-minimum-message': 'Limit must be at least 1',
    },
  })

const ParametersPostIdPathParamsSchema = z
  .uuid({ error: 'Post ID must be a valid UUID' })
  .brand<'PostId'>()
  .openapi({
    param: {
      name: 'postId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        format: 'uuid',
        'x-brand': 'PostId',
        'x-error-message': 'Post ID must be a valid UUID',
      },
      'x-brand': 'PostId',
      'x-error-message': 'Post ID must be a valid UUID',
    },
  })

const ParametersSearchQueryParamsSchema = z
  .string()
  .min(1, { error: 'Search query must not be empty' })
  .openapi({
    param: {
      name: 'q',
      in: 'query',
      required: true,
      schema: {
        type: 'string',
        minLength: 1,
        'x-minimum-message': 'Search query must not be empty',
      },
      'x-minimum-message': 'Search query must not be empty',
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
