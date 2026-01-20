import { createRoute, z } from '@hono/zod-openapi'

const RelationshipSchema = z
  .object({
    userId: z.uuid(),
    following: z.boolean().exactOptional(),
    followedBy: z.boolean().exactOptional(),
    blocking: z.boolean().exactOptional(),
    blockedBy: z.boolean().exactOptional(),
    muting: z.boolean().exactOptional(),
    mutingNotifications: z.boolean().exactOptional(),
    followRequestSent: z.boolean().exactOptional(),
    followRequestReceived: z.boolean().exactOptional(),
  })
  .openapi({ required: ['userId'] })
  .readonly()
  .openapi('Relationship')

const UserSchema = z
  .object({
    id: z.uuid(),
    username: z.string().regex(/^[a-zA-Z0-9_]{1,15}$/),
    displayName: z.string().max(50),
    bio: z.string().max(160).exactOptional(),
    location: z.string().max(30).exactOptional(),
    website: z.url().exactOptional(),
    avatarUrl: z.url().exactOptional(),
    bannerUrl: z.url().exactOptional(),
    isVerified: z.boolean().exactOptional(),
    isProtected: z.boolean().exactOptional().openapi({ description: '非公開アカウントか' }),
    birthDate: z.iso.date().exactOptional(),
    pinnedPostId: z.uuid().exactOptional(),
    metrics: z
      .object({
        followersCount: z.int().exactOptional(),
        followingCount: z.int().exactOptional(),
        postsCount: z.int().exactOptional(),
        likesCount: z.int().exactOptional(),
        listedCount: z.int().exactOptional(),
      })
      .exactOptional(),
    relationship: RelationshipSchema.exactOptional().openapi({
      description: '認証ユーザーとの関係',
    }),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'username', 'displayName', 'createdAt'] })
  .readonly()
  .openapi('User')

const UpdateProfileRequestSchema = z
  .object({
    displayName: z.string().max(50).exactOptional(),
    bio: z.string().max(160).exactOptional(),
    location: z.string().max(30).exactOptional(),
    website: z.url().exactOptional(),
    birthDate: z.iso.date().exactOptional(),
    isProtected: z.boolean().exactOptional(),
    pinnedPostId: z.uuid().exactOptional(),
  })
  .readonly()
  .openapi('UpdateProfileRequest')

const UserSummarySchema = z
  .object({
    id: z.uuid(),
    username: z.string(),
    displayName: z.string(),
    avatarUrl: z.url().exactOptional(),
    isVerified: z.boolean().exactOptional(),
    isProtected: z.boolean().exactOptional(),
  })
  .openapi({ required: ['id', 'username', 'displayName'] })
  .readonly()
  .openapi('UserSummary')

const ListSchema = z
  .object({
    id: z.uuid(),
    name: z.string().max(25),
    description: z.string().max(100).exactOptional(),
    isPrivate: z.boolean().exactOptional(),
    owner: UserSummarySchema,
    memberCount: z.int(),
    followerCount: z.int().exactOptional(),
    isFollowing: z.boolean().exactOptional(),
    isMember: z.boolean().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'owner', 'memberCount', 'createdAt'] })
  .readonly()
  .openapi('List')

const CreateListRequestSchema = z
  .object({
    name: z.string().min(1).max(25),
    description: z.string().max(100).exactOptional(),
    isPrivate: z.boolean().default(false).exactOptional(),
  })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('CreateListRequest')

const UpdateListRequestSchema = z
  .object({
    name: z.string().min(1).max(25).exactOptional(),
    description: z.string().max(100).exactOptional(),
    isPrivate: z.boolean().exactOptional(),
  })
  .readonly()
  .openapi('UpdateListRequest')

const PostSchema = z
  .object({ id: z.uuid().exactOptional() })
  .openapi({ description: '投稿（別APIファイルで定義）' })
  .readonly()
  .openapi('Post')

const UserListResponseSchema = z
  .object({ data: z.array(UserSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('UserListResponse')

const PostListResponseSchema = z
  .object({ data: z.array(PostSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('PostListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
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
  })
  .readonly()

const ListIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'listId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const CursorParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } } })
  .readonly()

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })
  .readonly()

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } as const

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const ForbiddenResponse = {
  description: 'アクセス権限がありません',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

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
} as const)

export const getUsersByUsernameUsernameRoute = createRoute({
  method: 'get',
  path: '/users/by/username/{username}',
  tags: ['Users'],
  summary: 'ユーザー名でユーザー取得',
  operationId: 'getUserByUsername',
  request: {
    params: z.object({
      username: z.string().openapi({
        param: { name: 'username', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
  },
  responses: {
    200: { description: 'ユーザー情報', content: { 'application/json': { schema: UserSchema } } },
    404: NotFoundResponse,
  },
} as const)

export const getUsersSearchRoute = createRoute({
  method: 'get',
  path: '/users/search',
  tags: ['Users'],
  summary: 'ユーザー検索',
  operationId: 'searchUsers',
  request: {
    query: z.object({
      q: z.string().openapi({
        param: {
          name: 'q',
          in: 'query',
          required: true,
          description: '検索クエリ',
          schema: { type: 'string' },
        },
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
} as const)

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
        .exactOptional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            description: 'ユーザーIDのカンマ区切り',
            schema: { type: 'string' },
          },
        }),
      usernames: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'usernames',
            in: 'query',
            description: 'ユーザー名のカンマ区切り',
            schema: { type: 'string' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'ユーザー一覧',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
  },
} as const)

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
} as const)

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
} as const)

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
          schema: z.object({ image: z.file() }).openapi({ required: ['image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: z.object({ avatarUrl: z.url().exactOptional() }) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteMeAvatarRoute = createRoute({
  method: 'delete',
  path: '/me/avatar',
  tags: ['Profile'],
  summary: 'アバター削除',
  operationId: 'deleteAvatar',
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
          schema: z.object({ image: z.file() }).openapi({ required: ['image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: z.object({ bannerUrl: z.url().exactOptional() }) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteMeBannerRoute = createRoute({
  method: 'delete',
  path: '/me/banner',
  tags: ['Profile'],
  summary: 'バナー画像削除',
  operationId: 'deleteBanner',
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

export const getRelationshipsRoute = createRoute({
  method: 'get',
  path: '/relationships',
  tags: ['Relationships'],
  summary: '関係性一括取得',
  operationId: 'getRelationships',
  request: {
    query: z.object({
      userIds: z.string().openapi({
        param: {
          name: 'userIds',
          in: 'query',
          required: true,
          description: 'ユーザーIDのカンマ区切り',
          schema: { type: 'string' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: '関係性一覧',
      content: { 'application/json': { schema: z.array(RelationshipSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

export const postFollowRequestsUserIdAcceptRoute = createRoute({
  method: 'post',
  path: '/follow-requests/{userId}/accept',
  tags: ['Relationships'],
  summary: 'フォローリクエスト承認',
  operationId: 'acceptFollowRequest',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 200: { description: '承認成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const postFollowRequestsUserIdRejectRoute = createRoute({
  method: 'post',
  path: '/follow-requests/{userId}/reject',
  tags: ['Relationships'],
  summary: 'フォローリクエスト拒否',
  operationId: 'rejectFollowRequest',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 200: { description: '拒否成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

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
} as const)

export const postUsersUserIdMuteRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/mute',
  tags: ['Blocks & Mutes'],
  summary: 'ミュート',
  operationId: 'muteUser',
  request: {
    params: z.object({ userId: UserIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            duration: z
              .int()
              .exactOptional()
              .openapi({ description: 'ミュート期間（秒）。省略で無期限' }),
            notifications: z
              .boolean()
              .default(true)
              .exactOptional()
              .openapi({ description: '通知もミュートするか' }),
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
} as const)

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
} as const)

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
} as const)

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
} as const)

export const getListsRoute = createRoute({
  method: 'get',
  path: '/lists',
  tags: ['Lists'],
  summary: 'リスト一覧取得',
  operationId: 'listLists',
  responses: {
    200: {
      description: 'リスト一覧',
      content: { 'application/json': { schema: z.array(ListSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

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
} as const)

export const putListsListIdRoute = createRoute({
  method: 'put',
  path: '/lists/{listId}',
  tags: ['Lists'],
  summary: 'リスト更新',
  operationId: 'updateList',
  request: {
    params: z.object({ listId: ListIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: UpdateListRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: ListSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteListsListIdRoute = createRoute({
  method: 'delete',
  path: '/lists/{listId}',
  tags: ['Lists'],
  summary: 'リスト削除',
  operationId: 'deleteList',
  request: { params: z.object({ listId: ListIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

export const postListsListIdMembersRoute = createRoute({
  method: 'post',
  path: '/lists/{listId}/members',
  tags: ['Lists'],
  summary: 'リストにメンバー追加',
  operationId: 'addListMember',
  request: {
    params: z.object({ listId: ListIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ userId: z.uuid() }).openapi({ required: ['userId'] }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: '追加成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

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
} as const)

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
      content: { 'application/json': { schema: z.array(ListSchema) } },
    },
  },
} as const)
