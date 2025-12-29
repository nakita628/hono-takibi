import { createRoute, z } from '@hono/zod-openapi'

const UserSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    username: z.string().openapi({ type: 'string' }),
    displayName: z.string().openapi({ type: 'string' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    isVerified: z.boolean().optional().openapi({ type: 'boolean' }),
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
    },
  })
  .openapi('UserSummary')

const PostSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    text: z.string().openapi({ type: 'string' }),
    author: UserSummarySchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'text'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      text: { type: 'string' },
      author: { $ref: '#/components/schemas/UserSummary' },
    },
  })
  .openapi('PostSummary')

const NotificationSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum([
        'like',
        'repost',
        'quote',
        'reply',
        'mention',
        'follow',
        'follow_request',
        'poll_ended',
        'post_you_liked',
        'new_posts_from',
      ])
      .openapi({
        type: 'string',
        enum: [
          'like',
          'repost',
          'quote',
          'reply',
          'mention',
          'follow',
          'follow_request',
          'poll_ended',
          'post_you_liked',
          'new_posts_from',
        ],
      }),
    actor: UserSummarySchema.optional().openapi({
      $ref: '#/components/schemas/UserSummary',
      description: 'アクションを起こしたユーザー',
    }),
    actors: z
      .array(UserSummarySchema)
      .optional()
      .openapi({
        type: 'array',
        items: { $ref: '#/components/schemas/UserSummary' },
        description: '複数ユーザーの場合（いいねなど）',
      }),
    post: PostSummarySchema,
    targetPost: PostSummarySchema.optional().openapi({
      $ref: '#/components/schemas/PostSummary',
      description: '引用・返信の場合の対象投稿',
    }),
    isRead: z.boolean().optional().openapi({ type: 'boolean' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: {
        type: 'string',
        enum: [
          'like',
          'repost',
          'quote',
          'reply',
          'mention',
          'follow',
          'follow_request',
          'poll_ended',
          'post_you_liked',
          'new_posts_from',
        ],
      },
      actor: {
        $ref: '#/components/schemas/UserSummary',
        description: 'アクションを起こしたユーザー',
      },
      actors: {
        type: 'array',
        items: { $ref: '#/components/schemas/UserSummary' },
        description: '複数ユーザーの場合（いいねなど）',
      },
      post: { $ref: '#/components/schemas/PostSummary' },
      targetPost: {
        $ref: '#/components/schemas/PostSummary',
        description: '引用・返信の場合の対象投稿',
      },
      isRead: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Notification')

const NotificationSettingsSchema = z
  .object({
    likes: z.boolean().optional().openapi({ type: 'boolean' }),
    reposts: z.boolean().optional().openapi({ type: 'boolean' }),
    quotes: z.boolean().optional().openapi({ type: 'boolean' }),
    replies: z.boolean().optional().openapi({ type: 'boolean' }),
    mentions: z.boolean().optional().openapi({ type: 'boolean' }),
    follows: z.boolean().optional().openapi({ type: 'boolean' }),
    directMessages: z.boolean().optional().openapi({ type: 'boolean' }),
    emailNotifications: z
      .object({
        enabled: z.boolean().openapi({ type: 'boolean' }),
        digest: z
          .enum(['daily', 'weekly', 'never'])
          .openapi({ type: 'string', enum: ['daily', 'weekly', 'never'] }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          enabled: { type: 'boolean' },
          digest: { type: 'string', enum: ['daily', 'weekly', 'never'] },
        },
      }),
    pushNotifications: z.boolean().optional().openapi({ type: 'boolean' }),
    filterQuality: z
      .enum(['all', 'filtered'])
      .optional()
      .openapi({
        type: 'string',
        enum: ['all', 'filtered'],
        description: '低品質通知のフィルタリング',
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      likes: { type: 'boolean' },
      reposts: { type: 'boolean' },
      quotes: { type: 'boolean' },
      replies: { type: 'boolean' },
      mentions: { type: 'boolean' },
      follows: { type: 'boolean' },
      directMessages: { type: 'boolean' },
      emailNotifications: {
        type: 'object',
        properties: {
          enabled: { type: 'boolean' },
          digest: { type: 'string', enum: ['daily', 'weekly', 'never'] },
        },
      },
      pushNotifications: { type: 'boolean' },
      filterQuality: {
        type: 'string',
        enum: ['all', 'filtered'],
        description: '低品質通知のフィルタリング',
      },
    },
  })
  .openapi('NotificationSettings')

const MediaAttachmentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['image', 'gif', 'video'])
      .openapi({ type: 'string', enum: ['image', 'gif', 'video'] }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    previewUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'url'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['image', 'gif', 'video'] },
      url: { type: 'string', format: 'uri' },
      previewUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('MediaAttachment')

const MessageSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    conversationId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    sender: UserSummarySchema,
    text: z.string().max(10000).optional().openapi({ type: 'string', maxLength: 10000 }),
    media: z
      .array(MediaAttachmentSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/MediaAttachment' } }),
    sharedPost: PostSummarySchema,
    reactions: z
      .array(
        z
          .object({
            emoji: z.string().openapi({ type: 'string' }),
            users: z
              .array(UserSummarySchema)
              .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSummary' } }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: {
              emoji: { type: 'string' },
              users: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            emoji: { type: 'string' },
            users: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
          },
        },
      }),
    readBy: z
      .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'conversationId', 'sender', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      conversationId: { type: 'string', format: 'uuid' },
      sender: { $ref: '#/components/schemas/UserSummary' },
      text: { type: 'string', maxLength: 10000 },
      media: { type: 'array', items: { $ref: '#/components/schemas/MediaAttachment' } },
      sharedPost: { $ref: '#/components/schemas/PostSummary' },
      reactions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            emoji: { type: 'string' },
            users: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
          },
        },
      },
      readBy: { type: 'array', items: { type: 'string', format: 'uuid' } },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Message')

const ConversationSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['one_to_one', 'group'])
      .openapi({ type: 'string', enum: ['one_to_one', 'group'] }),
    name: z.string().optional().openapi({ type: 'string', description: 'グループ会話の名前' }),
    participants: z
      .array(UserSummarySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSummary' } }),
    lastMessage: MessageSchema,
    unreadCount: z.int().optional().openapi({ type: 'integer' }),
    isMuted: z.boolean().optional().openapi({ type: 'boolean' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'participants', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['one_to_one', 'group'] },
      name: { type: 'string', description: 'グループ会話の名前' },
      participants: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
      lastMessage: { $ref: '#/components/schemas/Message' },
      unreadCount: { type: 'integer' },
      isMuted: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Conversation')

const SendMessageRequestSchema = z
  .object({
    text: z.string().max(10000).openapi({ type: 'string', maxLength: 10000 }),
    mediaIds: z
      .array(z.uuid().openapi({ type: 'string', format: 'uuid' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
    sharedPostId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      text: { type: 'string', maxLength: 10000 },
      mediaIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
      sharedPostId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('SendMessageRequest')

const HashtagSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    postCount: z.int().openapi({ type: 'integer' }),
    trend: z
      .object({
        rank: z.int().openapi({ type: 'integer' }),
        trendingIn: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { rank: { type: 'integer' }, trendingIn: { type: 'string' } },
      }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'postCount'],
    properties: {
      name: { type: 'string' },
      postCount: { type: 'integer' },
      trend: {
        type: 'object',
        properties: { rank: { type: 'integer' }, trendingIn: { type: 'string' } },
      },
    },
  })
  .openapi('Hashtag')

const TrendSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    category: z
      .enum(['hashtag', 'topic', 'event'])
      .optional()
      .openapi({ type: 'string', enum: ['hashtag', 'topic', 'event'] }),
    postCount: z.int().openapi({ type: 'integer' }),
    description: z.string().optional().openapi({ type: 'string' }),
    url: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    promoted: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'postCount'],
    properties: {
      name: { type: 'string' },
      category: { type: 'string', enum: ['hashtag', 'topic', 'event'] },
      postCount: { type: 'integer' },
      description: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      promoted: { type: 'boolean' },
    },
  })
  .openapi('Trend')

const TrendLocationSchema = z
  .object({
    woeid: z.int().openapi({ type: 'integer' }),
    name: z.string().openapi({ type: 'string' }),
    country: z.string().openapi({ type: 'string' }),
    countryCode: z.string().optional().openapi({ type: 'string' }),
    parentId: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['woeid', 'name', 'country'],
    properties: {
      woeid: { type: 'integer' },
      name: { type: 'string' },
      country: { type: 'string' },
      countryCode: { type: 'string' },
      parentId: { type: 'integer' },
    },
  })
  .openapi('TrendLocation')

const UserSuggestionSchema = z
  .object({
    user: UserSummarySchema,
    reason: z
      .enum(['followed_by_friends', 'similar_interests', 'popular', 'new_to_platform'])
      .openapi({
        type: 'string',
        enum: ['followed_by_friends', 'similar_interests', 'popular', 'new_to_platform'],
      }),
    mutualFollowers: z
      .array(UserSummarySchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSummary' } }),
    mutualFollowersCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['user', 'reason'],
    properties: {
      user: { $ref: '#/components/schemas/UserSummary' },
      reason: {
        type: 'string',
        enum: ['followed_by_friends', 'similar_interests', 'popular', 'new_to_platform'],
      },
      mutualFollowers: { type: 'array', items: { $ref: '#/components/schemas/UserSummary' } },
      mutualFollowersCount: { type: 'integer' },
    },
  })
  .openapi('UserSuggestion')

const TopicSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    icon: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    followerCount: z.int().optional().openapi({ type: 'integer' }),
    isFollowing: z.boolean().optional().openapi({ type: 'boolean' }),
    category: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      icon: { type: 'string', format: 'uri' },
      followerCount: { type: 'integer' },
      isFollowing: { type: 'boolean' },
      category: { type: 'string' },
    },
  })
  .openapi('Topic')

const NotificationListResponseSchema = z
  .object({
    data: z
      .array(NotificationSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Notification' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Notification' } },
      nextCursor: { type: 'string' },
    },
  })
  .openapi('NotificationListResponse')

const ConversationListResponseSchema = z
  .object({
    data: z
      .array(ConversationSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Conversation' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Conversation' } },
      nextCursor: { type: 'string' },
    },
  })
  .openapi('ConversationListResponse')

const MessageListResponseSchema = z
  .object({
    data: z
      .array(MessageSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Message' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Message' } },
      nextCursor: { type: 'string' },
    },
  })
  .openapi('MessageListResponse')

const PostSearchResponseSchema = z
  .object({
    data: z
      .array(PostSummarySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/PostSummary' } }),
    nextCursor: z.string().optional().openapi({ type: 'string' }),
    totalCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/PostSummary' } },
      nextCursor: { type: 'string' },
      totalCount: { type: 'integer' },
    },
  })
  .openapi('PostSearchResponse')

const UserSearchResponseSchema = z
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
  .openapi('UserSearchResponse')

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

const ConversationIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'conversationId',
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

const bearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getNotificationsRoute = createRoute({
  method: 'get',
  path: '/notifications',
  tags: ['Notifications'],
  summary: '通知一覧取得',
  operationId: 'listNotifications',
  request: {
    query: z.object({
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
      types: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'types',
            in: 'query',
            description: '通知タイプでフィルタ（カンマ区切り）',
            schema: { type: 'string' },
            example: 'like,repost,follow,mention',
          },
          type: 'string',
        }),
      filter: z
        .enum(['all', 'mentions', 'verified'])
        .default('all')
        .optional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: { type: 'string', enum: ['all', 'mentions', 'verified'], default: 'all' },
          },
          type: 'string',
          enum: ['all', 'mentions', 'verified'],
          default: 'all',
        }),
    }),
  },
  responses: {
    200: {
      description: '通知一覧',
      content: { 'application/json': { schema: NotificationListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getNotificationsUnreadCountRoute = createRoute({
  method: 'get',
  path: '/notifications/unread-count',
  tags: ['Notifications'],
  summary: '未読通知数取得',
  operationId: 'getUnreadNotificationCount',
  responses: {
    200: {
      description: '未読数',
      content: {
        'application/json': {
          schema: z
            .object({
              count: z.int().openapi({ type: 'integer' }),
              mentionsCount: z.int().openapi({ type: 'integer' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { count: { type: 'integer' }, mentionsCount: { type: 'integer' } },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postNotificationsMarkReadRoute = createRoute({
  method: 'post',
  path: '/notifications/mark-read',
  tags: ['Notifications'],
  summary: '通知を既読にする',
  operationId: 'markNotificationsRead',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              notificationIds: z
                .array(z.uuid().openapi({ type: 'string', format: 'uuid' }))
                .optional()
                .openapi({
                  type: 'array',
                  items: { type: 'string', format: 'uuid' },
                  description: '指定しない場合は全て既読',
                }),
              maxId: z.string().openapi({ type: 'string', description: 'このID以前を既読' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                notificationIds: {
                  type: 'array',
                  items: { type: 'string', format: 'uuid' },
                  description: '指定しない場合は全て既読',
                },
                maxId: { type: 'string', description: 'このID以前を既読' },
              },
            }),
        },
      },
    },
  },
  responses: { 200: { description: '成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getNotificationsSettingsRoute = createRoute({
  method: 'get',
  path: '/notifications/settings',
  tags: ['Notifications'],
  summary: '通知設定取得',
  operationId: 'getNotificationSettings',
  responses: {
    200: {
      description: '通知設定',
      content: { 'application/json': { schema: NotificationSettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putNotificationsSettingsRoute = createRoute({
  method: 'put',
  path: '/notifications/settings',
  tags: ['Notifications'],
  summary: '通知設定更新',
  operationId: 'updateNotificationSettings',
  request: {
    body: {
      content: { 'application/json': { schema: NotificationSettingsSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: NotificationSettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getDmConversationsRoute = createRoute({
  method: 'get',
  path: '/dm/conversations',
  tags: ['Direct Messages'],
  summary: '会話一覧取得',
  operationId: 'listConversations',
  request: { query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: '会話一覧',
      content: { 'application/json': { schema: ConversationListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postDmConversationsRoute = createRoute({
  method: 'post',
  path: '/dm/conversations',
  tags: ['Direct Messages'],
  summary: '会話作成',
  operationId: 'createConversation',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              participantIds: z
                .array(z.uuid().openapi({ type: 'string', format: 'uuid' }))
                .min(1)
                .max(50)
                .optional()
                .openapi({
                  type: 'array',
                  items: { type: 'string', format: 'uuid' },
                  minItems: 1,
                  maxItems: 50,
                  description: '参加者のユーザーID',
                }),
              name: z
                .string()
                .max(50)
                .optional()
                .openapi({ type: 'string', maxLength: 50, description: 'グループ会話の名前' }),
            })
            .openapi({
              type: 'object',
              required: ['participantIds'],
              properties: {
                participantIds: {
                  type: 'array',
                  items: { type: 'string', format: 'uuid' },
                  minItems: 1,
                  maxItems: 50,
                  description: '参加者のユーザーID',
                },
                name: { type: 'string', maxLength: 50, description: 'グループ会話の名前' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: ConversationSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getDmConversationsConversationIdRoute = createRoute({
  method: 'get',
  path: '/dm/conversations/{conversationId}',
  tags: ['Direct Messages'],
  summary: '会話詳細取得',
  operationId: 'getConversation',
  request: { params: z.object({ conversationId: ConversationIdParamParamsSchema }) },
  responses: {
    200: {
      description: '会話詳細',
      content: { 'application/json': { schema: ConversationSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteDmConversationsConversationIdRoute = createRoute({
  method: 'delete',
  path: '/dm/conversations/{conversationId}',
  tags: ['Direct Messages'],
  summary: '会話を退出',
  operationId: 'leaveConversation',
  request: { params: z.object({ conversationId: ConversationIdParamParamsSchema }) },
  responses: { 204: { description: '退出成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getDmConversationsConversationIdMessagesRoute = createRoute({
  method: 'get',
  path: '/dm/conversations/{conversationId}/messages',
  tags: ['Direct Messages'],
  summary: 'メッセージ一覧取得',
  operationId: 'listMessages',
  request: {
    params: z.object({ conversationId: ConversationIdParamParamsSchema }),
    query: z.object({ cursor: CursorParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'メッセージ一覧',
      content: { 'application/json': { schema: MessageListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postDmConversationsConversationIdMessagesRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/messages',
  tags: ['Direct Messages'],
  summary: 'メッセージ送信',
  operationId: 'sendMessage',
  request: {
    body: { content: { 'application/json': { schema: SendMessageRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '送信成功', content: { 'application/json': { schema: MessageSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postDmConversationsConversationIdReadRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/read',
  tags: ['Direct Messages'],
  summary: '会話を既読にする',
  operationId: 'markConversationRead',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ lastReadMessageId: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
            .partial()
            .openapi({
              type: 'object',
              properties: { lastReadMessageId: { type: 'string', format: 'uuid' } },
            }),
        },
      },
    },
  },
  responses: { 200: { description: '成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postDmConversationsConversationIdTypingRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/typing',
  tags: ['Direct Messages'],
  summary: '入力中インジケーター送信',
  operationId: 'sendTypingIndicator',
  request: { params: z.object({ conversationId: ConversationIdParamParamsSchema }) },
  responses: { 200: { description: '送信成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const deleteDmMessagesMessageIdRoute = createRoute({
  method: 'delete',
  path: '/dm/messages/{messageId}',
  tags: ['Direct Messages'],
  summary: 'メッセージ削除',
  operationId: 'deleteMessage',
  request: {
    params: z.object({
      messageId: z
        .uuid()
        .openapi({
          param: {
            name: 'messageId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postDmMessagesMessageIdReactionsRoute = createRoute({
  method: 'post',
  path: '/dm/messages/{messageId}/reactions',
  tags: ['Direct Messages'],
  summary: 'メッセージにリアクション追加',
  operationId: 'addMessageReaction',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ emoji: z.string().openapi({ type: 'string', description: '絵文字' }) })
            .openapi({
              type: 'object',
              required: ['emoji'],
              properties: { emoji: { type: 'string', description: '絵文字' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: '追加成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const deleteDmMessagesMessageIdReactionsRoute = createRoute({
  method: 'delete',
  path: '/dm/messages/{messageId}/reactions',
  tags: ['Direct Messages'],
  summary: 'メッセージのリアクション削除',
  operationId: 'removeMessageReaction',
  request: {
    params: z.object({
      messageId: z
        .uuid()
        .openapi({
          param: {
            name: 'messageId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
    query: z.object({
      emoji: z
        .string()
        .openapi({
          param: { name: 'emoji', in: 'query', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 200: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getDmUnreadCountRoute = createRoute({
  method: 'get',
  path: '/dm/unread-count',
  tags: ['Direct Messages'],
  summary: '未読メッセージ数取得',
  operationId: 'getUnreadMessageCount',
  responses: {
    200: {
      description: '未読数',
      content: {
        'application/json': {
          schema: z
            .object({
              count: z.int().openapi({ type: 'integer' }),
              conversationCounts: z
                .record(z.string(), z.int().openapi({ type: 'integer' }))
                .openapi({ type: 'object', additionalProperties: { type: 'integer' } }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                count: { type: 'integer' },
                conversationCounts: { type: 'object', additionalProperties: { type: 'integer' } },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSearchPostsRoute = createRoute({
  method: 'get',
  path: '/search/posts',
  tags: ['Search'],
  summary: '投稿検索',
  operationId: 'searchPosts',
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
      filter: z
        .enum(['latest', 'top', 'photos', 'videos'])
        .default('top')
        .optional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: { type: 'string', enum: ['latest', 'top', 'photos', 'videos'], default: 'top' },
          },
          type: 'string',
          enum: ['latest', 'top', 'photos', 'videos'],
          default: 'top',
        }),
      from: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'from',
            in: 'query',
            description: '特定ユーザーからの投稿',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      to: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'to',
            in: 'query',
            description: '特定ユーザーへの返信',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      since: z.iso
        .datetime()
        .optional()
        .openapi({
          param: {
            name: 'since',
            in: 'query',
            description: 'この日時以降',
            schema: { type: 'string', format: 'date-time' },
          },
          type: 'string',
          format: 'date-time',
        }),
      until: z.iso
        .datetime()
        .optional()
        .openapi({
          param: {
            name: 'until',
            in: 'query',
            description: 'この日時以前',
            schema: { type: 'string', format: 'date-time' },
          },
          type: 'string',
          format: 'date-time',
        }),
      lang: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'lang',
            in: 'query',
            description: '言語フィルタ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: { 'application/json': { schema: PostSearchResponseSchema } },
    },
  },
})

export const getSearchUsersRoute = createRoute({
  method: 'get',
  path: '/search/users',
  tags: ['Search'],
  summary: 'ユーザー検索',
  operationId: 'searchUsers',
  request: {
    query: z.object({
      q: z
        .string()
        .openapi({
          param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: { 'application/json': { schema: UserSearchResponseSchema } },
    },
  },
})

export const getSearchHashtagsRoute = createRoute({
  method: 'get',
  path: '/search/hashtags',
  tags: ['Search'],
  summary: 'ハッシュタグ検索',
  operationId: 'searchHashtags',
  request: {
    query: z.object({
      q: z
        .string()
        .openapi({
          param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: {
        'application/json': {
          schema: z
            .array(HashtagSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Hashtag' } }),
        },
      },
    },
  },
})

export const getSearchRecentRoute = createRoute({
  method: 'get',
  path: '/search/recent',
  tags: ['Search'],
  summary: '最近の検索履歴',
  operationId: 'getRecentSearches',
  responses: {
    200: {
      description: '検索履歴',
      content: {
        'application/json': {
          schema: z
            .array(
              z
                .object({
                  query: z.string().openapi({ type: 'string' }),
                  searchedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: {
                    query: { type: 'string' },
                    searchedAt: { type: 'string', format: 'date-time' },
                  },
                }),
            )
            .optional()
            .openapi({
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  searchedAt: { type: 'string', format: 'date-time' },
                },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSearchRecentRoute = createRoute({
  method: 'delete',
  path: '/search/recent',
  tags: ['Search'],
  summary: '検索履歴クリア',
  operationId: 'clearRecentSearches',
  responses: { 204: { description: 'クリア成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getTrendsRoute = createRoute({
  method: 'get',
  path: '/trends',
  tags: ['Trends'],
  summary: 'トレンド取得',
  operationId: 'getTrends',
  request: {
    query: z.object({
      woeid: z
        .int()
        .optional()
        .openapi({
          param: {
            name: 'woeid',
            in: 'query',
            description: '地域ID（Where On Earth ID）',
            schema: { type: 'integer' },
          },
          type: 'integer',
        }),
      limit: z
        .int()
        .max(50)
        .default(20)
        .optional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 20, maximum: 50 },
          },
          type: 'integer',
          default: 20,
          maximum: 50,
        }),
    }),
  },
  responses: {
    200: {
      description: 'トレンド一覧',
      content: {
        'application/json': {
          schema: z
            .array(TrendSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Trend' } }),
        },
      },
    },
  },
})

export const getTrendsLocationsRoute = createRoute({
  method: 'get',
  path: '/trends/locations',
  tags: ['Trends'],
  summary: 'トレンド対応地域一覧',
  operationId: 'getTrendLocations',
  responses: {
    200: {
      description: '地域一覧',
      content: {
        'application/json': {
          schema: z
            .array(TrendLocationSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TrendLocation' } }),
        },
      },
    },
  },
})

export const getSuggestionsUsersRoute = createRoute({
  method: 'get',
  path: '/suggestions/users',
  tags: ['Suggestions'],
  summary: 'おすすめユーザー取得',
  operationId: 'getSuggestedUsers',
  request: {
    query: z.object({
      limit: z
        .int()
        .default(20)
        .optional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          type: 'integer',
          default: 20,
        }),
    }),
  },
  responses: {
    200: {
      description: 'おすすめユーザー',
      content: {
        'application/json': {
          schema: z
            .array(UserSuggestionSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserSuggestion' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSuggestionsUsersUserIdHideRoute = createRoute({
  method: 'post',
  path: '/suggestions/users/{userId}/hide',
  tags: ['Suggestions'],
  summary: 'おすすめユーザーを非表示',
  operationId: 'hideSuggestedUser',
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
  },
  responses: { 200: { description: '非表示成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getSuggestionsTopicsRoute = createRoute({
  method: 'get',
  path: '/suggestions/topics',
  tags: ['Suggestions'],
  summary: 'おすすめトピック取得',
  operationId: 'getSuggestedTopics',
  responses: {
    200: {
      description: 'おすすめトピック',
      content: {
        'application/json': {
          schema: z
            .array(TopicSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Topic' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postTopicsTopicIdFollowRoute = createRoute({
  method: 'post',
  path: '/topics/{topicId}/follow',
  tags: ['Suggestions'],
  summary: 'トピックをフォロー',
  operationId: 'followTopic',
  request: {
    params: z.object({
      topicId: z
        .uuid()
        .openapi({
          param: {
            name: 'topicId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 200: { description: 'フォロー成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const deleteTopicsTopicIdFollowRoute = createRoute({
  method: 'delete',
  path: '/topics/{topicId}/follow',
  tags: ['Suggestions'],
  summary: 'トピックのフォロー解除',
  operationId: 'unfollowTopic',
  request: {
    params: z.object({
      topicId: z
        .uuid()
        .openapi({
          param: {
            name: 'topicId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 200: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
