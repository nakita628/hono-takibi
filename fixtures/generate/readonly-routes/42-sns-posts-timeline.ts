import { createRoute, z } from '@hono/zod-openapi'

const UserSummarySchema = z
  .object({
    id: z.uuid(),
    username: z.string(),
    displayName: z.string(),
    avatarUrl: z.url().exactOptional(),
    isVerified: z.boolean().exactOptional(),
    isFollowing: z.boolean().exactOptional(),
    isFollowedBy: z.boolean().exactOptional(),
  })
  .openapi({ required: ['id', 'username', 'displayName'] })
  .readonly()
  .openapi('UserSummary')

const MediaSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['image', 'gif', 'video']),
    url: z.url(),
    previewUrl: z.url().exactOptional(),
    alt: z.string().exactOptional(),
    width: z.int().exactOptional(),
    height: z.int().exactOptional(),
    duration: z.number().exactOptional().openapi({ description: '動画の長さ（秒）' }),
    blurhash: z.string().exactOptional().openapi({ description: 'プレースホルダー用ハッシュ' }),
  })
  .openapi({ required: ['id', 'type', 'url'] })
  .readonly()
  .openapi('Media')

const PollSchema = z
  .object({
    id: z.uuid(),
    options: z.array(
      z
        .object({
          id: z.string(),
          text: z.string(),
          voteCount: z.int(),
          percentage: z.number().exactOptional(),
        })
        .openapi({ required: ['id', 'text', 'voteCount'] }),
    ),
    totalVotes: z.int(),
    expiresAt: z.iso.datetime(),
    isExpired: z.boolean().exactOptional(),
    viewerVote: z.string().exactOptional().openapi({ description: '閲覧者が投票したオプションID' }),
  })
  .openapi({ required: ['id', 'options', 'expiresAt', 'totalVotes'] })
  .readonly()
  .openapi('Poll')

const UrlEntitySchema = z
  .object({
    url: z.url().openapi({ description: '短縮URL' }),
    expandedUrl: z.url().openapi({ description: '展開URL' }),
    displayUrl: z.string().openapi({ description: '表示用URL' }),
    start: z.int().exactOptional().openapi({ description: 'テキスト内の開始位置' }),
    end: z.int().exactOptional().openapi({ description: 'テキスト内の終了位置' }),
  })
  .openapi({ required: ['url', 'expandedUrl', 'displayUrl'] })
  .readonly()
  .openapi('UrlEntity')

const LinkCardSchema = z
  .object({
    url: z.url(),
    title: z.string(),
    description: z.string().exactOptional(),
    image: z.url().exactOptional(),
    siteName: z.string().exactOptional(),
    type: z.enum(['link', 'photo', 'video', 'rich']).exactOptional(),
  })
  .openapi({ required: ['url', 'title'] })
  .readonly()
  .openapi('LinkCard')

type PostType = {
  readonly id: string
  readonly author: z.infer<typeof UserSummarySchema>
  readonly text: string
  readonly media?: readonly z.infer<typeof MediaSchema>[]
  readonly poll?: z.infer<typeof PollSchema>
  readonly quotedPost?: PostType
  readonly replyTo?: {
    readonly postId?: string
    readonly author?: z.infer<typeof UserSummarySchema>
  }
  readonly repostOf?: PostType
  readonly hashtags?: readonly string[]
  readonly mentions?: readonly z.infer<typeof UserSummarySchema>[]
  readonly urls?: readonly z.infer<typeof UrlEntitySchema>[]
  readonly card?: z.infer<typeof LinkCardSchema>
  readonly visibility?: 'public' | 'followers' | 'mentioned'
  readonly replySettings?: 'everyone' | 'followers' | 'mentioned'
  readonly metrics: {
    readonly likeCount: number
    readonly repostCount: number
    readonly replyCount: number
    readonly quoteCount: number
    readonly viewCount: number
    readonly bookmarkCount?: number
  }
  readonly viewer?: {
    readonly liked?: boolean
    readonly reposted?: boolean
    readonly bookmarked?: boolean
  }
  readonly language?: string
  readonly source?: string
  readonly createdAt: string
  readonly editedAt?: string
  readonly editHistory?: readonly { readonly text?: string; readonly editedAt?: string }[]
}

const PostSchema: z.ZodType<PostType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid(),
        author: UserSummarySchema,
        text: z.string().max(280),
        media: z.array(MediaSchema).max(4).exactOptional(),
        poll: PollSchema.exactOptional(),
        quotedPost: PostSchema.exactOptional().openapi({ description: '引用元投稿' }),
        replyTo: z
          .object({ postId: z.uuid().exactOptional(), author: UserSummarySchema.exactOptional() })
          .exactOptional()
          .openapi({ description: '返信先情報' }),
        repostOf: PostSchema.exactOptional().openapi({
          description: 'リポスト元（リポストの場合）',
        }),
        hashtags: z.array(z.string()).exactOptional(),
        mentions: z.array(UserSummarySchema).exactOptional(),
        urls: z.array(UrlEntitySchema).exactOptional(),
        card: LinkCardSchema.exactOptional().openapi({ description: 'リンクカード' }),
        visibility: z.enum(['public', 'followers', 'mentioned']).default('public').exactOptional(),
        replySettings: z
          .enum(['everyone', 'followers', 'mentioned'])
          .default('everyone')
          .exactOptional(),
        metrics: z
          .object({
            likeCount: z.int(),
            repostCount: z.int(),
            replyCount: z.int(),
            quoteCount: z.int(),
            viewCount: z.int(),
            bookmarkCount: z.int().exactOptional(),
          })
          .openapi({
            required: ['likeCount', 'repostCount', 'replyCount', 'quoteCount', 'viewCount'],
          }),
        viewer: z
          .object({
            liked: z.boolean().exactOptional(),
            reposted: z.boolean().exactOptional(),
            bookmarked: z.boolean().exactOptional(),
          })
          .exactOptional()
          .openapi({ description: '閲覧者のアクション状態' }),
        language: z.string().exactOptional().openapi({ description: '言語コード' }),
        source: z.string().exactOptional().openapi({ description: '投稿元クライアント' }),
        createdAt: z.iso.datetime(),
        editedAt: z.iso.datetime().exactOptional(),
        editHistory: z
          .array(
            z.object({
              text: z.string().exactOptional(),
              editedAt: z.iso.datetime().exactOptional(),
            }),
          )
          .exactOptional(),
      })
      .openapi({ required: ['id', 'author', 'text', 'createdAt', 'metrics'] }),
  )
  .readonly()
  .openapi('Post')

type PostThreadType = {
  readonly post: z.infer<typeof PostSchema>
  readonly ancestors?: readonly z.infer<typeof PostSchema>[]
  readonly replies?: readonly PostThreadType[]
}

const CreatePostRequestSchema = z
  .object({
    text: z.string().min(1).max(280),
    mediaIds: z.array(z.uuid()).max(4).exactOptional(),
    poll: z
      .object({
        options: z.array(z.string().max(25)).min(2).max(4),
        duration: z.int().min(5).max(10080).openapi({ description: '投票期間（分）' }),
      })
      .exactOptional()
      .openapi({ required: ['options', 'duration'] }),
    visibility: z.enum(['public', 'followers', 'mentioned']).default('public').exactOptional(),
    replySettings: z
      .enum(['everyone', 'followers', 'mentioned'])
      .default('everyone')
      .exactOptional(),
    quotedPostId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['text'] })
  .readonly()
  .openapi('CreatePostRequest')

const PostThreadSchema: z.ZodType<PostThreadType> = z
  .lazy(() =>
    z
      .object({
        post: PostSchema,
        ancestors: z.array(PostSchema).exactOptional(),
        replies: z.array(PostThreadSchema).exactOptional(),
      })
      .openapi({ required: ['post'] }),
  )
  .readonly()
  .openapi('PostThread')

const PostListResponseSchema = z
  .object({
    data: z.array(PostSchema),
    nextCursor: z.string().exactOptional(),
    previousCursor: z.string().exactOptional(),
  })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('PostListResponse')

const TimelineItemSchema = z
  .object({
    type: z.enum(['post', 'repost', 'reply', 'quote', 'promoted']),
    post: PostSchema,
    repostedBy: UserSummarySchema.exactOptional().openapi({
      description: 'リポストの場合、リポストしたユーザー',
    }),
    reason: z.string().exactOptional().openapi({ description: 'おすすめの理由など' }),
  })
  .openapi({ required: ['type', 'post'] })
  .readonly()
  .openapi('TimelineItem')

const TimelineResponseSchema = z
  .object({
    data: z.array(TimelineItemSchema),
    nextCursor: z.string().exactOptional(),
    previousCursor: z.string().exactOptional(),
  })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('TimelineResponse')

const UserListResponseSchema = z
  .object({ data: z.array(UserSummarySchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('UserListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

const PostIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'postId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const CursorParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'cursor',
      in: 'query',
      description: 'ページネーションカーソル',
      schema: { type: 'string' },
    },
  })
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

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  tags: ['Posts'],
  summary: '投稿一覧取得',
  description: '公開投稿の一覧を取得（検索・フィルタ用）',
  operationId: 'listPosts',
  request: {
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      userId: z
        .uuid()
        .exactOptional()
        .openapi({
          param: {
            name: 'userId',
            in: 'query',
            description: '特定ユーザーの投稿のみ',
            schema: { type: 'string', format: 'uuid' },
          },
        }),
      hashtag: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'hashtag',
            in: 'query',
            description: 'ハッシュタグでフィルタ',
            schema: { type: 'string' },
          },
        }),
      mediaOnly: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            name: 'mediaOnly',
            in: 'query',
            description: 'メディア付き投稿のみ',
            schema: { type: 'boolean' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '投稿一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
} as const)

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  tags: ['Posts'],
  summary: '投稿作成',
  operationId: 'createPost',
  request: {
    body: { content: { 'application/json': { schema: CreatePostRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '投稿成功', content: { 'application/json': { schema: PostSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getPostsPostIdRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}',
  tags: ['Posts'],
  summary: '投稿詳細取得',
  operationId: 'getPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: '投稿詳細', content: { 'application/json': { schema: PostSchema } } },
    404: NotFoundResponse,
  },
} as const)

export const deletePostsPostIdRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}',
  tags: ['Posts'],
  summary: '投稿削除',
  operationId: 'deletePost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    204: { description: '削除成功' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getPostsPostIdThreadRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/thread',
  tags: ['Posts'],
  summary: 'スレッド取得',
  description: '投稿とその返信スレッドを取得',
  operationId: 'getPostThread',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: 'スレッド', content: { 'application/json': { schema: PostThreadSchema } } },
    404: NotFoundResponse,
  },
} as const)

export const getPostsPostIdContextRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/context',
  tags: ['Posts'],
  summary: '投稿コンテキスト取得',
  description: '親投稿と返信を含むコンテキストを取得',
  operationId: 'getPostContext',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'コンテキスト',
      content: {
        'application/json': {
          schema: z.object({
            ancestors: z
              .array(PostSchema)
              .exactOptional()
              .openapi({ description: '親投稿のチェーン' }),
            post: PostSchema.exactOptional(),
            descendants: z.array(PostSchema).exactOptional().openapi({ description: '返信' }),
          }),
        },
      },
    },
  },
} as const)

export const getTimelineHomeRoute = createRoute({
  method: 'get',
  path: '/timeline/home',
  tags: ['Timeline'],
  summary: 'ホームタイムライン取得',
  description: 'フォローしているユーザーの投稿を時系列で取得',
  operationId: 'getHomeTimeline',
  request: {
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      includeReplies: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'includeReplies',
            in: 'query',
            description: '返信を含める',
            schema: { type: 'boolean', default: false },
          },
        }),
      includeReposts: z
        .stringbool()
        .default(true)
        .exactOptional()
        .openapi({
          param: {
            name: 'includeReposts',
            in: 'query',
            description: 'リポストを含める',
            schema: { type: 'boolean', default: true },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'タイムライン',
      content: { 'application/json': { schema: TimelineResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getTimelineForYouRoute = createRoute({
  method: 'get',
  path: '/timeline/for-you',
  tags: ['Timeline'],
  summary: 'おすすめタイムライン取得',
  description: 'アルゴリズムによるおすすめ投稿',
  operationId: 'getForYouTimeline',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'おすすめタイムライン',
      content: { 'application/json': { schema: TimelineResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getTimelineUserUserIdRoute = createRoute({
  method: 'get',
  path: '/timeline/user/{userId}',
  tags: ['Timeline'],
  summary: 'ユーザータイムライン取得',
  operationId: 'getUserTimeline',
  request: {
    params: z.object({
      userId: z.uuid().openapi({
        param: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      includeReplies: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'includeReplies',
            in: 'query',
            schema: { type: 'boolean', default: false },
          },
        }),
      includeReposts: z
        .stringbool()
        .default(true)
        .exactOptional()
        .openapi({
          param: {
            name: 'includeReposts',
            in: 'query',
            schema: { type: 'boolean', default: true },
          },
        }),
      mediaOnly: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: { name: 'mediaOnly', in: 'query', schema: { type: 'boolean', default: false } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'ユーザータイムライン',
      content: { 'application/json': { schema: TimelineResponseSchema } },
    },
    404: NotFoundResponse,
  },
} as const)

export const getTimelineHashtagHashtagRoute = createRoute({
  method: 'get',
  path: '/timeline/hashtag/{hashtag}',
  tags: ['Timeline'],
  summary: 'ハッシュタグタイムライン取得',
  operationId: 'getHashtagTimeline',
  request: {
    params: z.object({
      hashtag: z.string().openapi({
        param: { name: 'hashtag', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'ハッシュタグタイムライン',
      content: { 'application/json': { schema: TimelineResponseSchema } },
    },
  },
} as const)

export const postPostsPostIdLikeRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/like',
  tags: ['Interactions'],
  summary: 'いいね',
  operationId: 'likePost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: 'いいね成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deletePostsPostIdLikeRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}/like',
  tags: ['Interactions'],
  summary: 'いいね解除',
  operationId: 'unlikePost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: '解除成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postPostsPostIdRepostRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/repost',
  tags: ['Interactions'],
  summary: 'リポスト',
  operationId: 'repost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: 'リポスト成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deletePostsPostIdRepostRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}/repost',
  tags: ['Interactions'],
  summary: 'リポスト解除',
  operationId: 'unrepost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: '解除成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postPostsPostIdQuoteRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/quote',
  tags: ['Interactions'],
  summary: '引用投稿',
  operationId: 'quotePost',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              text: z.string().min(1).max(280),
              mediaIds: z.array(z.uuid()).max(4).exactOptional(),
            })
            .openapi({ required: ['text'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: { description: '引用投稿成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postPostsPostIdBookmarkRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/bookmark',
  tags: ['Interactions'],
  summary: 'ブックマーク追加',
  operationId: 'bookmarkPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: { 200: { description: 'ブックマーク成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const deletePostsPostIdBookmarkRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}/bookmark',
  tags: ['Interactions'],
  summary: 'ブックマーク解除',
  operationId: 'unbookmarkPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: { 200: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const getBookmarksRoute = createRoute({
  method: 'get',
  path: '/bookmarks',
  tags: ['Interactions'],
  summary: 'ブックマーク一覧取得',
  operationId: 'listBookmarks',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'ブックマーク一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getPostsPostIdLikesRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/likes',
  tags: ['Interactions'],
  summary: 'いいねしたユーザー一覧',
  operationId: 'getPostLikes',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'ユーザー一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
  },
} as const)

export const getPostsPostIdRepostsRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/reposts',
  tags: ['Interactions'],
  summary: 'リポストしたユーザー一覧',
  operationId: 'getPostReposts',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'ユーザー一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
  },
} as const)

export const getPostsPostIdQuotesRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/quotes',
  tags: ['Interactions'],
  summary: '引用投稿一覧',
  operationId: 'getPostQuotes',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: '引用投稿一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
} as const)

export const getPostsPostIdRepliesRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/replies',
  tags: ['Replies'],
  summary: '返信一覧取得',
  operationId: 'getPostReplies',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      sort: z
        .enum(['recent', 'popular', 'relevant'])
        .default('relevant')
        .exactOptional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['recent', 'popular', 'relevant'],
              default: 'relevant',
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '返信一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
} as const)

export const postPostsPostIdRepliesRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/replies',
  tags: ['Replies'],
  summary: '返信投稿',
  operationId: 'replyToPost',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: CreatePostRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '返信成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postMediaUploadRoute = createRoute({
  method: 'post',
  path: '/media/upload',
  tags: ['Media'],
  summary: 'メディアアップロード',
  operationId: 'uploadMedia',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z.file(),
              alt: z.string().max(1000).exactOptional().openapi({ description: '代替テキスト' }),
            })
            .openapi({ required: ['file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: MediaSchema } },
    },
    400: {
      description: 'ファイル形式エラー',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    401: UnauthorizedResponse,
    413: { description: 'ファイルサイズ超過' },
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getMediaMediaIdRoute = createRoute({
  method: 'get',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア情報取得',
  operationId: 'getMedia',
  request: {
    params: z.object({
      mediaId: z.uuid().openapi({
        param: {
          name: 'mediaId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: { description: 'メディア情報', content: { 'application/json': { schema: MediaSchema } } },
    404: NotFoundResponse,
  },
} as const)

export const patchMediaMediaIdRoute = createRoute({
  method: 'patch',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア情報更新',
  operationId: 'updateMedia',
  request: {
    params: z.object({
      mediaId: z.uuid().openapi({
        param: {
          name: 'mediaId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: {
      content: {
        'application/json': { schema: z.object({ alt: z.string().max(1000).exactOptional() }) },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: MediaSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)
