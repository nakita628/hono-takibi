import { createRoute, z } from '@hono/zod-openapi'

const RelationshipSchema = z
  .object({
    userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    following: z.boolean().optional().openapi({ type: 'boolean' }),
    followedBy: z.boolean().optional().openapi({ type: 'boolean' }),
    blocking: z.boolean().optional().openapi({ type: 'boolean' }),
    blockedBy: z.boolean().optional().openapi({ type: 'boolean' }),
    muting: z.boolean().optional().openapi({ type: 'boolean' }),
    mutingNotifications: z.boolean().optional().openapi({ type: 'boolean' }),
    followRequestSent: z.boolean().optional().openapi({ type: 'boolean' }),
    followRequestReceived: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string', format: 'uuid' },
      following: { type: 'boolean' },
      followedBy: { type: 'boolean' },
      blocking: { type: 'boolean' },
      blockedBy: { type: 'boolean' },
      muting: { type: 'boolean' },
      mutingNotifications: { type: 'boolean' },
      followRequestSent: { type: 'boolean' },
      followRequestReceived: { type: 'boolean' },
    },
  })
  .openapi('Relationship')

const UserSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]{1,15}$/)
      .openapi({ type: 'string', pattern: '^[a-zA-Z0-9_]{1,15}$' }),
    displayName: z.string().max(50).openapi({ type: 'string', maxLength: 50 }),
    bio: z.string().max(160).optional().openapi({ type: 'string', maxLength: 160 }),
    location: z.string().max(30).optional().openapi({ type: 'string', maxLength: 30 }),
    website: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    bannerUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    isVerified: z.boolean().optional().openapi({ type: 'boolean' }),
    isProtected: z
      .boolean()
      .optional()
      .openapi({ type: 'boolean', description: '非公開アカウントか' }),
    birthDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    pinnedPostId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    metrics: z
      .object({
        followersCount: z.int().openapi({ type: 'integer' }),
        followingCount: z.int().openapi({ type: 'integer' }),
        postsCount: z.int().openapi({ type: 'integer' }),
        likesCount: z.int().openapi({ type: 'integer' }),
        listedCount: z.int().openapi({ type: 'integer' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          followersCount: { type: 'integer' },
          followingCount: { type: 'integer' },
          postsCount: { type: 'integer' },
          likesCount: { type: 'integer' },
          listedCount: { type: 'integer' },
        },
      }),
    relationship: RelationshipSchema.optional().openapi({
      $ref: '#/components/schemas/Relationship',
      description: '認証ユーザーとの関係',
    }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'username', 'displayName', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      username: { type: 'string', pattern: '^[a-zA-Z0-9_]{1,15}$' },
      displayName: { type: 'string', maxLength: 50 },
      bio: { type: 'string', maxLength: 160 },
      location: { type: 'string', maxLength: 30 },
      website: { type: 'string', format: 'uri' },
      avatarUrl: { type: 'string', format: 'uri' },
      bannerUrl: { type: 'string', format: 'uri' },
      isVerified: { type: 'boolean' },
      isProtected: { type: 'boolean', description: '非公開アカウントか' },
      birthDate: { type: 'string', format: 'date' },
      pinnedPostId: { type: 'string', format: 'uuid' },
      metrics: {
        type: 'object',
        properties: {
          followersCount: { type: 'integer' },
          followingCount: { type: 'integer' },
          postsCount: { type: 'integer' },
          likesCount: { type: 'integer' },
          listedCount: { type: 'integer' },
        },
      },
      relationship: {
        $ref: '#/components/schemas/Relationship',
        description: '認証ユーザーとの関係',
      },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('User')

const UpdateProfileRequestSchema = z
  .object({
    displayName: z.string().max(50).openapi({ type: 'string', maxLength: 50 }),
    bio: z.string().max(160).openapi({ type: 'string', maxLength: 160 }),
    location: z.string().max(30).openapi({ type: 'string', maxLength: 30 }),
    website: z.url().openapi({ type: 'string', format: 'uri' }),
    birthDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
    isProtected: z.boolean().openapi({ type: 'boolean' }),
    pinnedPostId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      displayName: { type: 'string', maxLength: 50 },
      bio: { type: 'string', maxLength: 160 },
      location: { type: 'string', maxLength: 30 },
      website: { type: 'string', format: 'uri' },
      birthDate: { type: 'string', format: 'date' },
      isProtected: { type: 'boolean' },
      pinnedPostId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('UpdateProfileRequest')

const UserSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    username: z.string().openapi({ type: 'string' }),
    displayName: z.string().openapi({ type: 'string' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    isVerified: z.boolean().optional().openapi({ type: 'boolean' }),
    isProtected: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'username', 'displayName'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      username: { type: 'string' },
      displayName: { type: 'string' },
      avatarUrl: { type: 'string', format: 'uri' },
      isVerified: { type: 'boolean' },
      isProtected: { type: 'boolean' },
    },
  })
  .openapi('UserSummary')

const ListSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().max(25).openapi({ type: 'string', maxLength: 25 }),
    description: z.string().max(100).optional().openapi({ type: 'string', maxLength: 100 }),
    isPrivate: z.boolean().optional().openapi({ type: 'boolean' }),
    owner: UserSummarySchema,
    memberCount: z.int().openapi({ type: 'integer' }),
    followerCount: z.int().optional().openapi({ type: 'integer' }),
    isFollowing: z.boolean().optional().openapi({ type: 'boolean' }),
    isMember: z.boolean().optional().openapi({ type: 'boolean' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'owner', 'memberCount', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', maxLength: 25 },
      description: { type: 'string', maxLength: 100 },
      isPrivate: { type: 'boolean' },
      owner: { $ref: '#/components/schemas/UserSummary' },
      memberCount: { type: 'integer' },
      followerCount: { type: 'integer' },
      isFollowing: { type: 'boolean' },
      isMember: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('List')

const CreateListRequestSchema = z
  .object({
    name: z.string().min(1).max(25).openapi({ type: 'string', minLength: 1, maxLength: 25 }),
    description: z.string().max(100).optional().openapi({ type: 'string', maxLength: 100 }),
    isPrivate: z.boolean().default(false).optional().openapi({ type: 'boolean', default: false }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 25 },
      description: { type: 'string', maxLength: 100 },
      isPrivate: { type: 'boolean', default: false },
    },
  })
  .openapi('CreateListRequest')

const UpdateListRequestSchema = z
  .object({
    name: z.string().min(1).max(25).openapi({ type: 'string', minLength: 1, maxLength: 25 }),
    description: z.string().max(100).openapi({ type: 'string', maxLength: 100 }),
    isPrivate: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 25 },
      description: { type: 'string', maxLength: 100 },
      isPrivate: { type: 'boolean' },
    },
  })
  .openapi('UpdateListRequest')

const PostSchema = z
  .object({ id: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
  .partial()
  .openapi({
    type: 'object',
    description: '投稿（別APIファイルで定義）',
    properties: { id: { type: 'string', format: 'uuid' } },
  })
  .openapi('Post')

const UserListResponseSchema = z
  .object({
    data: z
      .array(UserSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
      nextCursor: { type: 'string' },
    },
  })
  .openapi('UserListResponse')

const PostListResponseSchema = z
  .object({
    data: z
      .array(PostSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
      nextCursor: { type: 'string' },
    },
  })
  .openapi('PostListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: { code: { type: 'string' }, message: { type: 'string' } },
  })
  .openapi('Error')

const UserIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'userId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const ListIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'listId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const CursorParamParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } }, type: 'string' })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const ForbiddenResponse = {
  description: 'アクセス権限がありません',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'ユーザー情報取得',
  operationId: 'getUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: { description: 'ユーザー情報', content: { 'application/json': { schema: UserSchema } } },
    404: NotFoundResponse,
  },
})

export const getUsersByUsernameUsernameRoute = createRoute({
  method: 'get',
  path: '/users/by/username/{username}',
  tags: ['Users'],
  summary: 'ユーザー名でユーザー取得',
  operationId: 'getUserByUsername',
  request: {
    params: z.object({
      username: z
        .string()
        .openapi({
          param: { name: 'username', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: { description: 'ユーザー情報', content: { 'application/json': { schema: UserSchema } } },
    404: NotFoundResponse,
  },
})

export const getUsersSearchRoute = createRoute({
  method: 'get',
  path: '/users/search',
  tags: ['Users'],
  summary: 'ユーザー検索',
  operationId: 'searchUsers',
  request: {
    query: z.object({
      q: z
        .string()
        .openapi({
          param: {
            name: 'q',
            in: 'query',
            required: true,
            description: '検索クエリ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
  },
})

export const getUsersLookupRoute = createRoute({
  method: 'get',
  path: '/users/lookup',
  tags: ['Users'],
  summary: '複数ユーザー一括取得',
  operationId: 'lookupUsers',
  request: {
    query: z.object({
      ids: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            description: 'ユーザーIDのカンマ区切り',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      usernames: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'usernames',
            in: 'query',
            description: 'ユーザー名のカンマ区切り',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'ユーザー一覧',
      content: {
        'application/json': {
          schema: z
            .array(UserSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
        },
      },
    },
  },
})

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Profile'],
  summary: '現在のユーザー情報取得',
  operationId: 'getCurrentUser',
  responses: {
    200: { description: 'ユーザー情報', content: { 'application/json': { schema: UserSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const patchMeRoute = createRoute({
  method: 'patch',
  path: '/me',
  tags: ['Profile'],
  summary: 'プロフィール更新',
  operationId: 'updateProfile',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateProfileRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: UserSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMeAvatarRoute = createRoute({
  method: 'post',
  path: '/me/avatar',
  tags: ['Profile'],
  summary: 'アバターアップロード',
  operationId: 'uploadAvatar',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ image: z.file().openapi({ type: 'string', format: 'binary' }) })
            .openapi({
              type: 'object',
              required: ['image'],
              properties: { image: { type: 'string', format: 'binary' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロード成功',
      content: {
        'application/json': {
          schema: z
            .object({ avatarUrl: z.url().openapi({ type: 'string', format: 'uri' }) })
            .partial()
            .openapi({
              type: 'object',
              properties: { avatarUrl: { type: 'string', format: 'uri' } },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMeAvatarRoute = createRoute({
  method: 'delete',
  path: '/me/avatar',
  tags: ['Profile'],
  summary: 'アバター削除',
  operationId: 'deleteAvatar',
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postMeBannerRoute = createRoute({
  method: 'post',
  path: '/me/banner',
  tags: ['Profile'],
  summary: 'バナー画像アップロード',
  operationId: 'uploadBanner',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ image: z.file().openapi({ type: 'string', format: 'binary' }) })
            .openapi({
              type: 'object',
              required: ['image'],
              properties: { image: { type: 'string', format: 'binary' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロード成功',
      content: {
        'application/json': {
          schema: z
            .object({ bannerUrl: z.url().openapi({ type: 'string', format: 'uri' }) })
            .partial()
            .openapi({
              type: 'object',
              properties: { bannerUrl: { type: 'string', format: 'uri' } },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMeBannerRoute = createRoute({
  method: 'delete',
  path: '/me/banner',
  tags: ['Profile'],
  summary: 'バナー画像削除',
  operationId: 'deleteBanner',
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postUsersUserIdFollowRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/follow',
  tags: ['Relationships'],
  summary: 'フォロー',
  operationId: 'followUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'フォロー成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteUsersUserIdFollowRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}/follow',
  tags: ['Relationships'],
  summary: 'フォロー解除',
  operationId: 'unfollowUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: '解除成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersUserIdFollowersRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/followers',
  tags: ['Relationships'],
  summary: 'フォロワー一覧取得',
  operationId: 'getUserFollowers',
  request: {
    params: z.object({ userId: UserIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'フォロワー一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    404: NotFoundResponse,
  },
})

export const getUsersUserIdFollowingRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/following',
  tags: ['Relationships'],
  summary: 'フォロー中一覧取得',
  operationId: 'getUserFollowing',
  request: {
    params: z.object({ userId: UserIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'フォロー中一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    404: NotFoundResponse,
  },
})

export const postUsersUserIdFollowersRemoveRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/followers/remove',
  tags: ['Relationships'],
  summary: 'フォロワー削除',
  description: '自分のフォロワーから削除',
  operationId: 'removeFollower',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 200: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getRelationshipsRoute = createRoute({
  method: 'get',
  path: '/relationships',
  tags: ['Relationships'],
  summary: '関係性一括取得',
  operationId: 'getRelationships',
  request: {
    query: z.object({
      userIds: z
        .string()
        .openapi({
          param: {
            name: 'userIds',
            in: 'query',
            required: true,
            description: 'ユーザーIDのカンマ区切り',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: '関係性一覧',
      content: {
        'application/json': {
          schema: z
            .array(RelationshipSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Relationship' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFollowRequestsRoute = createRoute({
  method: 'get',
  path: '/follow-requests',
  tags: ['Relationships'],
  summary: 'フォローリクエスト一覧',
  description: '非公開アカウントへのフォローリクエスト',
  operationId: 'listFollowRequests',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'リクエスト一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFollowRequestsUserIdAcceptRoute = createRoute({
  method: 'post',
  path: '/follow-requests/{userId}/accept',
  tags: ['Relationships'],
  summary: 'フォローリクエスト承認',
  operationId: 'acceptFollowRequest',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 200: { description: '承認成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postFollowRequestsUserIdRejectRoute = createRoute({
  method: 'post',
  path: '/follow-requests/{userId}/reject',
  tags: ['Relationships'],
  summary: 'フォローリクエスト拒否',
  operationId: 'rejectFollowRequest',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 200: { description: '拒否成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postUsersUserIdBlockRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/block',
  tags: ['Blocks & Mutes'],
  summary: 'ブロック',
  operationId: 'blockUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'ブロック成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteUsersUserIdBlockRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}/block',
  tags: ['Blocks & Mutes'],
  summary: 'ブロック解除',
  operationId: 'unblockUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: '解除成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postUsersUserIdMuteRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/mute',
  tags: ['Blocks & Mutes'],
  summary: 'ミュート',
  operationId: 'muteUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              duration: z
                .int()
                .openapi({ type: 'integer', description: 'ミュート期間（秒）。省略で無期限' }),
              notifications: z
                .boolean()
                .default(true)
                .openapi({ type: 'boolean', default: true, description: '通知もミュートするか' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                duration: { type: 'integer', description: 'ミュート期間（秒）。省略で無期限' },
                notifications: {
                  type: 'boolean',
                  default: true,
                  description: '通知もミュートするか',
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'ミュート成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteUsersUserIdMuteRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}/mute',
  tags: ['Blocks & Mutes'],
  summary: 'ミュート解除',
  operationId: 'unmuteUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: '解除成功',
      content: { 'application/json': { schema: RelationshipSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getBlocksRoute = createRoute({
  method: 'get',
  path: '/blocks',
  tags: ['Blocks & Mutes'],
  summary: 'ブロックユーザー一覧',
  operationId: 'listBlockedUsers',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'ブロック一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMutesRoute = createRoute({
  method: 'get',
  path: '/mutes',
  tags: ['Blocks & Mutes'],
  summary: 'ミュートユーザー一覧',
  operationId: 'listMutedUsers',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'ミュート一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getListsRoute = createRoute({
  method: 'get',
  path: '/lists',
  tags: ['Lists'],
  summary: 'リスト一覧取得',
  operationId: 'listLists',
  responses: {
    200: {
      description: 'リスト一覧',
      content: {
        'application/json': {
          schema: z
            .array(ListSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/List' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postListsRoute = createRoute({
  method: 'post',
  path: '/lists',
  tags: ['Lists'],
  summary: 'リスト作成',
  operationId: 'createList',
  request: {
    body: { content: { 'application/json': { schema: CreateListRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: ListSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getListsListIdRoute = createRoute({
  method: 'get',
  path: '/lists/{listId}',
  tags: ['Lists'],
  summary: 'リスト詳細取得',
  operationId: 'getList',
  request: { params: z.object({ listId: ListIdParamParamsSchema }) },
  responses: {
    200: { description: 'リスト詳細', content: { 'application/json': { schema: ListSchema } } },
    404: NotFoundResponse,
  },
})

export const putListsListIdRoute = createRoute({
  method: 'put',
  path: '/lists/{listId}',
  tags: ['Lists'],
  summary: 'リスト更新',
  operationId: 'updateList',
  request: {
    body: { content: { 'application/json': { schema: UpdateListRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: ListSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteListsListIdRoute = createRoute({
  method: 'delete',
  path: '/lists/{listId}',
  tags: ['Lists'],
  summary: 'リスト削除',
  operationId: 'deleteList',
  request: { params: z.object({ listId: ListIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getListsListIdMembersRoute = createRoute({
  method: 'get',
  path: '/lists/{listId}/members',
  tags: ['Lists'],
  summary: 'リストメンバー一覧',
  operationId: 'getListMembers',
  request: {
    params: z.object({ listId: ListIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'メンバー一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
  },
})

export const postListsListIdMembersRoute = createRoute({
  method: 'post',
  path: '/lists/{listId}/members',
  tags: ['Lists'],
  summary: 'リストにメンバー追加',
  operationId: 'addListMember',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ userId: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
            .openapi({
              type: 'object',
              required: ['userId'],
              properties: { userId: { type: 'string', format: 'uuid' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: '追加成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const deleteListsListIdMembersUserIdRoute = createRoute({
  method: 'delete',
  path: '/lists/{listId}/members/{userId}',
  tags: ['Lists'],
  summary: 'リストからメンバー削除',
  operationId: 'removeListMember',
  request: {
    params: z.object({ listId: ListIdParamParamsSchema, userId: UserIdParamParamsSchema }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getListsListIdTimelineRoute = createRoute({
  method: 'get',
  path: '/lists/{listId}/timeline',
  tags: ['Lists'],
  summary: 'リストタイムライン取得',
  operationId: 'getListTimeline',
  request: {
    params: z.object({ listId: ListIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'タイムライン',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersUserIdListsRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/lists',
  tags: ['Lists'],
  summary: 'ユーザーが所属するリスト一覧',
  operationId: 'getUserLists',
  request: {
    params: z.object({ userId: UserIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'リスト一覧',
      content: {
        'application/json': {
          schema: z
            .array(ListSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/List' } }),
        },
      },
    },
  },
})
