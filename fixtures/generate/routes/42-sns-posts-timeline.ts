import { createRoute, z } from '@hono/zod-openapi'

const LinkCardSchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    title: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    image: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    siteName: z.string().optional().openapi({ type: 'string' }),
    type: z
      .enum(['link', 'photo', 'video', 'rich'])
      .optional()
      .openapi({ type: 'string', enum: ['link', 'photo', 'video', 'rich'] }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'title'],
    properties: {
      url: { type: 'string', format: 'uri' },
      title: { type: 'string' },
      description: { type: 'string' },
      image: { type: 'string', format: 'uri' },
      siteName: { type: 'string' },
      type: { type: 'string', enum: ['link', 'photo', 'video', 'rich'] },
    },
  })

const UrlEntitySchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri', description: '短縮URL' }),
    expandedUrl: z.url().openapi({ type: 'string', format: 'uri', description: '展開URL' }),
    displayUrl: z.string().openapi({ type: 'string', description: '表示用URL' }),
    start: z.int().optional().openapi({ type: 'integer', description: 'テキスト内の開始位置' }),
    end: z.int().optional().openapi({ type: 'integer', description: 'テキスト内の終了位置' }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'expandedUrl', 'displayUrl'],
    properties: {
      url: { type: 'string', format: 'uri', description: '短縮URL' },
      expandedUrl: { type: 'string', format: 'uri', description: '展開URL' },
      displayUrl: { type: 'string', description: '表示用URL' },
      start: { type: 'integer', description: 'テキスト内の開始位置' },
      end: { type: 'integer', description: 'テキスト内の終了位置' },
    },
  })

const UserSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    username: z.string().openapi({ type: 'string' }),
    displayName: z.string().openapi({ type: 'string' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    isVerified: z.boolean().optional().openapi({ type: 'boolean' }),
    isFollowing: z.boolean().optional().openapi({ type: 'boolean' }),
    isFollowedBy: z.boolean().optional().openapi({ type: 'boolean' }),
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
      isFollowing: { type: 'boolean' },
      isFollowedBy: { type: 'boolean' },
    },
  })

const PollSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    options: z
      .array(
        z
          .object({
            id: z.string().openapi({ type: 'string' }),
            text: z.string().openapi({ type: 'string' }),
            voteCount: z.int().openapi({ type: 'integer' }),
            percentage: z.number().openapi({ type: 'number' }),
          })
          .openapi({
            type: 'object',
            required: ['id', 'text', 'voteCount'],
            properties: {
              id: { type: 'string' },
              text: { type: 'string' },
              voteCount: { type: 'integer' },
              percentage: { type: 'number' },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'text', 'voteCount'],
          properties: {
            id: { type: 'string' },
            text: { type: 'string' },
            voteCount: { type: 'integer' },
            percentage: { type: 'number' },
          },
        },
      }),
    totalVotes: z.int().openapi({ type: 'integer' }),
    expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    isExpired: z.boolean().optional().openapi({ type: 'boolean' }),
    viewerVote: z
      .string()
      .optional()
      .openapi({ type: 'string', description: '閲覧者が投票したオプションID' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'options', 'expiresAt', 'totalVotes'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      options: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'text', 'voteCount'],
          properties: {
            id: { type: 'string' },
            text: { type: 'string' },
            voteCount: { type: 'integer' },
            percentage: { type: 'number' },
          },
        },
      },
      totalVotes: { type: 'integer' },
      expiresAt: { type: 'string', format: 'date-time' },
      isExpired: { type: 'boolean' },
      viewerVote: { type: 'string', description: '閲覧者が投票したオプションID' },
    },
  })

const MediaSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['image', 'gif', 'video'])
      .openapi({ type: 'string', enum: ['image', 'gif', 'video'] }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    previewUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    alt: z.string().optional().openapi({ type: 'string' }),
    width: z.int().optional().openapi({ type: 'integer' }),
    height: z.int().optional().openapi({ type: 'integer' }),
    duration: z.number().optional().openapi({ type: 'number', description: '動画の長さ（秒）' }),
    blurhash: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'プレースホルダー用ハッシュ' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'url'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['image', 'gif', 'video'] },
      url: { type: 'string', format: 'uri' },
      previewUrl: { type: 'string', format: 'uri' },
      alt: { type: 'string' },
      width: { type: 'integer' },
      height: { type: 'integer' },
      duration: { type: 'number', description: '動画の長さ（秒）' },
      blurhash: { type: 'string', description: 'プレースホルダー用ハッシュ' },
    },
  })

type PostType = {
  id: string
  author: unknown
  text: string
  media?: unknown[]
  poll?: unknown
  quotedPost?: unknown
  replyTo?: { postId?: string; author?: unknown }
  repostOf?: unknown
  hashtags?: string[]
  mentions?: unknown[]
  urls?: unknown[]
  card?: unknown
  visibility?: 'public' | 'followers' | 'mentioned'
  replySettings?: 'everyone' | 'followers' | 'mentioned'
  metrics: {
    likeCount: number
    repostCount: number
    replyCount: number
    quoteCount: number
    viewCount: number
    bookmarkCount?: number
  }
  viewer?: { liked?: boolean; reposted?: boolean; bookmarked?: boolean }
  language?: string
  source?: string
  createdAt: string
  editedAt?: string
  editHistory?: { text?: string; editedAt?: string }[]
}

const PostSchema: z.ZodType<PostType> = z.lazy(() =>
  z
    .object({
      id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
      author: UserSummarySchema,
      text: z.string().max(280).openapi({ type: 'string', maxLength: 280 }),
      media: z
        .array(MediaSchema)
        .max(4)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/Media' }, maxItems: 4 }),
      poll: PollSchema,
      quotedPost: PostSchema.optional().openapi({
        $ref: '#/components/schemas/Post',
        description: '引用元投稿',
      }),
      replyTo: z
        .object({
          postId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
          author: UserSummarySchema,
        })
        .openapi({
          type: 'object',
          description: '返信先情報',
          properties: {
            postId: { type: 'string', format: 'uuid' },
            author: { $ref: '#/components/schemas/UserSummary' },
          },
        }),
      repostOf: PostSchema.optional().openapi({
        $ref: '#/components/schemas/Post',
        description: 'リポスト元（リポストの場合）',
      }),
      hashtags: z
        .array(z.string().optional().openapi({ type: 'string' }))
        .optional()
        .openapi({ type: 'array', items: { type: 'string' } }),
      mentions: z
        .array(UserSummarySchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSummary' } }),
      urls: z
        .array(UrlEntitySchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/UrlEntity' } }),
      card: LinkCardSchema.optional().openapi({
        $ref: '#/components/schemas/LinkCard',
        description: 'リンクカード',
      }),
      visibility: z
        .enum(['public', 'followers', 'mentioned'])
        .default('public')
        .optional()
        .openapi({ type: 'string', enum: ['public', 'followers', 'mentioned'], default: 'public' }),
      replySettings: z
        .enum(['everyone', 'followers', 'mentioned'])
        .default('everyone')
        .optional()
        .openapi({
          type: 'string',
          enum: ['everyone', 'followers', 'mentioned'],
          default: 'everyone',
        }),
      metrics: z
        .object({
          likeCount: z.int().openapi({ type: 'integer' }),
          repostCount: z.int().openapi({ type: 'integer' }),
          replyCount: z.int().openapi({ type: 'integer' }),
          quoteCount: z.int().openapi({ type: 'integer' }),
          viewCount: z.int().openapi({ type: 'integer' }),
          bookmarkCount: z.int().openapi({ type: 'integer' }),
        })
        .openapi({
          type: 'object',
          required: ['likeCount', 'repostCount', 'replyCount', 'quoteCount', 'viewCount'],
          properties: {
            likeCount: { type: 'integer' },
            repostCount: { type: 'integer' },
            replyCount: { type: 'integer' },
            quoteCount: { type: 'integer' },
            viewCount: { type: 'integer' },
            bookmarkCount: { type: 'integer' },
          },
        }),
      viewer: z
        .object({
          liked: z.boolean().openapi({ type: 'boolean' }),
          reposted: z.boolean().openapi({ type: 'boolean' }),
          bookmarked: z.boolean().openapi({ type: 'boolean' }),
        })
        .partial()
        .openapi({
          type: 'object',
          description: '閲覧者のアクション状態',
          properties: {
            liked: { type: 'boolean' },
            reposted: { type: 'boolean' },
            bookmarked: { type: 'boolean' },
          },
        }),
      language: z.string().optional().openapi({ type: 'string', description: '言語コード' }),
      source: z.string().optional().openapi({ type: 'string', description: '投稿元クライアント' }),
      createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
      editedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
      editHistory: z
        .array(
          z
            .object({
              text: z.string().openapi({ type: 'string' }),
              editedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                text: { type: 'string' },
                editedAt: { type: 'string', format: 'date-time' },
              },
            }),
        )
        .optional()
        .openapi({
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              editedAt: { type: 'string', format: 'date-time' },
            },
          },
        }),
    })
    .openapi({
      type: 'object',
      required: ['id', 'author', 'text', 'createdAt', 'metrics'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        author: { $ref: '#/components/schemas/UserSummary' },
        text: { type: 'string', maxLength: 280 },
        media: { type: 'array', items: { $ref: '#/components/schemas/Media' }, maxItems: 4 },
        poll: { $ref: '#/components/schemas/Poll' },
        quotedPost: { $ref: '#/components/schemas/Post', description: '引用元投稿' },
        replyTo: {
          type: 'object',
          description: '返信先情報',
          properties: {
            postId: { type: 'string', format: 'uuid' },
            author: { $ref: '#/components/schemas/UserSummary' },
          },
        },
        repostOf: {
          $ref: '#/components/schemas/Post',
          description: 'リポスト元（リポストの場合）',
        },
        hashtags: { type: 'array', items: { type: 'string' } },
        mentions: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
        urls: { type: 'array', items: { $ref: '#/components/schemas/UrlEntity' } },
        card: { $ref: '#/components/schemas/LinkCard', description: 'リンクカード' },
        visibility: {
          type: 'string',
          enum: ['public', 'followers', 'mentioned'],
          default: 'public',
        },
        replySettings: {
          type: 'string',
          enum: ['everyone', 'followers', 'mentioned'],
          default: 'everyone',
        },
        metrics: {
          type: 'object',
          required: ['likeCount', 'repostCount', 'replyCount', 'quoteCount', 'viewCount'],
          properties: {
            likeCount: { type: 'integer' },
            repostCount: { type: 'integer' },
            replyCount: { type: 'integer' },
            quoteCount: { type: 'integer' },
            viewCount: { type: 'integer' },
            bookmarkCount: { type: 'integer' },
          },
        },
        viewer: {
          type: 'object',
          description: '閲覧者のアクション状態',
          properties: {
            liked: { type: 'boolean' },
            reposted: { type: 'boolean' },
            bookmarked: { type: 'boolean' },
          },
        },
        language: { type: 'string', description: '言語コード' },
        source: { type: 'string', description: '投稿元クライアント' },
        createdAt: { type: 'string', format: 'date-time' },
        editedAt: { type: 'string', format: 'date-time' },
        editHistory: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              editedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    }),
)

const CreatePostRequestSchema = z
  .object({
    text: z.string().min(1).max(280).openapi({ type: 'string', minLength: 1, maxLength: 280 }),
    mediaIds: z
      .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
      .max(4)
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' }, maxItems: 4 }),
    poll: z
      .object({
        options: z
          .array(z.string().max(25).openapi({ type: 'string', maxLength: 25 }))
          .min(2)
          .max(4)
          .optional()
          .openapi({
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: { type: 'string', maxLength: 25 },
          }),
        duration: z
          .int()
          .min(5)
          .max(10080)
          .openapi({ type: 'integer', description: '投票期間（分）', minimum: 5, maximum: 10080 }),
      })
      .openapi({
        type: 'object',
        required: ['options', 'duration'],
        properties: {
          options: {
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: { type: 'string', maxLength: 25 },
          },
          duration: { type: 'integer', description: '投票期間（分）', minimum: 5, maximum: 10080 },
        },
      }),
    visibility: z
      .enum(['public', 'followers', 'mentioned'])
      .default('public')
      .optional()
      .openapi({ type: 'string', enum: ['public', 'followers', 'mentioned'], default: 'public' }),
    replySettings: z
      .enum(['everyone', 'followers', 'mentioned'])
      .default('everyone')
      .optional()
      .openapi({
        type: 'string',
        enum: ['everyone', 'followers', 'mentioned'],
        default: 'everyone',
      }),
    quotedPostId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
  })
  .openapi({
    type: 'object',
    required: ['text'],
    properties: {
      text: { type: 'string', minLength: 1, maxLength: 280 },
      mediaIds: { type: 'array', items: { type: 'string', format: 'uuid' }, maxItems: 4 },
      poll: {
        type: 'object',
        required: ['options', 'duration'],
        properties: {
          options: {
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: { type: 'string', maxLength: 25 },
          },
          duration: { type: 'integer', description: '投票期間（分）', minimum: 5, maximum: 10080 },
        },
      },
      visibility: { type: 'string', enum: ['public', 'followers', 'mentioned'], default: 'public' },
      replySettings: {
        type: 'string',
        enum: ['everyone', 'followers', 'mentioned'],
        default: 'everyone',
      },
      quotedPostId: { type: 'string', format: 'uuid' },
    },
  })

type PostThreadType = { post: unknown; ancestors?: unknown[]; replies?: unknown[] }

const PostThreadSchema: z.ZodType<PostThreadType> = z.lazy(() =>
  z
    .object({
      post: PostSchema,
      ancestors: z
        .array(PostSchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
      replies: z
        .array(PostThreadSchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/PostThread' } }),
    })
    .openapi({
      type: 'object',
      required: ['post'],
      properties: {
        post: { $ref: '#/components/schemas/Post' },
        ancestors: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
        replies: { type: 'array', items: { $ref: '#/components/schemas/PostThread' } },
      },
    }),
)

const PostListResponseSchema = z
  .object({
    data: z
      .array(PostSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
    previousCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
      nextCursor: { type: 'string' },
      previousCursor: { type: 'string' },
    },
  })

const TimelineItemSchema = z
  .object({
    type: z
      .enum(['post', 'repost', 'reply', 'quote', 'promoted'])
      .openapi({ type: 'string', enum: ['post', 'repost', 'reply', 'quote', 'promoted'] }),
    post: PostSchema,
    repostedBy: UserSummarySchema.optional().openapi({
      $ref: '#/components/schemas/UserSummary',
      description: 'リポストの場合、リポストしたユーザー',
    }),
    reason: z.string().optional().openapi({ type: 'string', description: 'おすすめの理由など' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'post'],
    properties: {
      type: { type: 'string', enum: ['post', 'repost', 'reply', 'quote', 'promoted'] },
      post: { $ref: '#/components/schemas/Post' },
      repostedBy: {
        $ref: '#/components/schemas/UserSummary',
        description: 'リポストの場合、リポストしたユーザー',
      },
      reason: { type: 'string', description: 'おすすめの理由など' },
    },
  })

const TimelineResponseSchema = z
  .object({
    data: z
      .array(TimelineItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TimelineItem' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
    previousCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/TimelineItem' } },
      nextCursor: { type: 'string' },
      previousCursor: { type: 'string' },
    },
  })

const UserListResponseSchema = z
  .object({
    data: z
      .array(UserSummarySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSummary' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
      nextCursor: { type: 'string' },
    },
  })

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

const PostIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'postId',
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
  .openapi({
    param: {
      name: 'cursor',
      in: 'query',
      description: 'ページネーションカーソル',
      schema: { type: 'string' },
    },
    type: 'string',
  })

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

const bearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

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
        .optional()
        .openapi({
          param: {
            name: 'userId',
            in: 'query',
            description: '特定ユーザーの投稿のみ',
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
      hashtag: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'hashtag',
            in: 'query',
            description: 'ハッシュタグでフィルタ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      mediaOnly: z
        .stringbool()
        .optional()
        .openapi({
          param: {
            name: 'mediaOnly',
            in: 'query',
            description: 'メディア付き投稿のみ',
            schema: { type: 'boolean' },
          },
          type: 'boolean',
        }),
    }),
  },
  responses: {
    200: {
      description: '投稿一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
})

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
})

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
})

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
})

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
})

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
          schema: z
            .object({
              ancestors: z
                .array(PostSchema)
                .optional()
                .openapi({
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' },
                  description: '親投稿のチェーン',
                }),
              post: PostSchema,
              descendants: z
                .array(PostSchema)
                .optional()
                .openapi({
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' },
                  description: '返信',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                ancestors: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' },
                  description: '親投稿のチェーン',
                },
                post: { $ref: '#/components/schemas/Post' },
                descendants: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' },
                  description: '返信',
                },
              },
            }),
        },
      },
    },
  },
})

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
        .optional()
        .openapi({
          param: {
            name: 'includeReplies',
            in: 'query',
            description: '返信を含める',
            schema: { type: 'boolean', default: false },
          },
          type: 'boolean',
          default: false,
        }),
      includeReposts: z
        .stringbool()
        .default(true)
        .optional()
        .openapi({
          param: {
            name: 'includeReposts',
            in: 'query',
            description: 'リポストを含める',
            schema: { type: 'boolean', default: true },
          },
          type: 'boolean',
          default: true,
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
})

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
})

export const getTimelineUserUserIdRoute = createRoute({
  method: 'get',
  path: '/timeline/user/{userId}',
  tags: ['Timeline'],
  summary: 'ユーザータイムライン取得',
  operationId: 'getUserTimeline',
  request: {
    params: z.object({
      userId: z
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
        }),
    }),
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      includeReplies: z
        .stringbool()
        .default(false)
        .optional()
        .openapi({
          param: {
            name: 'includeReplies',
            in: 'query',
            schema: { type: 'boolean', default: false },
          },
          type: 'boolean',
          default: false,
        }),
      includeReposts: z
        .stringbool()
        .default(true)
        .optional()
        .openapi({
          param: {
            name: 'includeReposts',
            in: 'query',
            schema: { type: 'boolean', default: true },
          },
          type: 'boolean',
          default: true,
        }),
      mediaOnly: z
        .stringbool()
        .default(false)
        .optional()
        .openapi({
          param: { name: 'mediaOnly', in: 'query', schema: { type: 'boolean', default: false } },
          type: 'boolean',
          default: false,
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
})

export const getTimelineHashtagHashtagRoute = createRoute({
  method: 'get',
  path: '/timeline/hashtag/{hashtag}',
  tags: ['Timeline'],
  summary: 'ハッシュタグタイムライン取得',
  operationId: 'getHashtagTimeline',
  request: {
    params: z.object({
      hashtag: z
        .string()
        .openapi({
          param: { name: 'hashtag', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
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
})

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
})

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
})

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
})

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
})

export const postPostsPostIdQuoteRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/quote',
  tags: ['Interactions'],
  summary: '引用投稿',
  operationId: 'quotePost',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              text: z
                .string()
                .min(1)
                .max(280)
                .openapi({ type: 'string', minLength: 1, maxLength: 280 }),
              mediaIds: z
                .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
                .max(4)
                .optional()
                .openapi({ type: 'array', items: { type: 'string', format: 'uuid' }, maxItems: 4 }),
            })
            .openapi({
              type: 'object',
              required: ['text'],
              properties: {
                text: { type: 'string', minLength: 1, maxLength: 280 },
                mediaIds: { type: 'array', items: { type: 'string', format: 'uuid' }, maxItems: 4 },
              },
            }),
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
})

export const postPostsPostIdBookmarkRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/bookmark',
  tags: ['Interactions'],
  summary: 'ブックマーク追加',
  operationId: 'bookmarkPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: { 200: { description: 'ブックマーク成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const deletePostsPostIdBookmarkRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}/bookmark',
  tags: ['Interactions'],
  summary: 'ブックマーク解除',
  operationId: 'unbookmarkPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: { 200: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

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
})

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
})

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
})

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
})

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
        .optional()
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
          type: 'string',
          enum: ['recent', 'popular', 'relevant'],
          default: 'relevant',
        }),
    }),
  },
  responses: {
    200: {
      description: '返信一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
})

export const postPostsPostIdRepliesRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/replies',
  tags: ['Replies'],
  summary: '返信投稿',
  operationId: 'replyToPost',
  request: {
    body: { content: { 'application/json': { schema: CreatePostRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '返信成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

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
              file: z.file().openapi({ type: 'string', format: 'binary' }),
              alt: z
                .string()
                .max(1000)
                .optional()
                .openapi({ type: 'string', maxLength: 1000, description: '代替テキスト' }),
            })
            .openapi({
              type: 'object',
              required: ['file'],
              properties: {
                file: { type: 'string', format: 'binary' },
                alt: { type: 'string', maxLength: 1000, description: '代替テキスト' },
              },
            }),
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
})

export const getMediaMediaIdRoute = createRoute({
  method: 'get',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア情報取得',
  operationId: 'getMedia',
  request: {
    params: z.object({
      mediaId: z
        .uuid()
        .openapi({
          param: {
            name: 'mediaId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: 'メディア情報', content: { 'application/json': { schema: MediaSchema } } },
    404: NotFoundResponse,
  },
})

export const patchMediaMediaIdRoute = createRoute({
  method: 'patch',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア情報更新',
  operationId: 'updateMedia',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ alt: z.string().max(1000).openapi({ type: 'string', maxLength: 1000 }) })
            .partial()
            .openapi({ type: 'object', properties: { alt: { type: 'string', maxLength: 1000 } } }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: MediaSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
