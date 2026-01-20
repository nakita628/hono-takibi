import { createRoute, z } from '@hono/zod-openapi'

const UserSummarySchema = z
  .object({
    id: z.uuid(),
    username: z.string(),
    displayName: z.string(),
    avatarUrl: z.url().exactOptional(),
    isVerified: z.boolean().exactOptional(),
  })
  .openapi({ required: ['id', 'username', 'displayName'] })
  .readonly()
  .openapi('UserSummary')

const PostSummarySchema = z
  .object({ id: z.uuid(), text: z.string(), author: UserSummarySchema.exactOptional() })
  .openapi({ required: ['id', 'text'] })
  .readonly()
  .openapi('PostSummary')

const NotificationSchema = z
  .object({
    id: z.uuid(),
    type: z.enum([
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
    ]),
    actor: UserSummarySchema.exactOptional().openapi({
      description: 'アクションを起こしたユーザー',
    }),
    actors: z
      .array(UserSummarySchema)
      .exactOptional()
      .openapi({ description: '複数ユーザーの場合（いいねなど）' }),
    post: PostSummarySchema.exactOptional(),
    targetPost: PostSummarySchema.exactOptional().openapi({
      description: '引用・返信の場合の対象投稿',
    }),
    isRead: z.boolean().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'type', 'createdAt'] })
  .readonly()
  .openapi('Notification')

const NotificationSettingsSchema = z
  .object({
    likes: z.boolean().exactOptional(),
    reposts: z.boolean().exactOptional(),
    quotes: z.boolean().exactOptional(),
    replies: z.boolean().exactOptional(),
    mentions: z.boolean().exactOptional(),
    follows: z.boolean().exactOptional(),
    directMessages: z.boolean().exactOptional(),
    emailNotifications: z
      .object({
        enabled: z.boolean().exactOptional(),
        digest: z.enum(['daily', 'weekly', 'never']).exactOptional(),
      })
      .exactOptional(),
    pushNotifications: z.boolean().exactOptional(),
    filterQuality: z
      .enum(['all', 'filtered'])
      .exactOptional()
      .openapi({ description: '低品質通知のフィルタリング' }),
  })
  .readonly()
  .openapi('NotificationSettings')

const MediaAttachmentSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['image', 'gif', 'video']),
    url: z.url(),
    previewUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'url'] })
  .readonly()
  .openapi('MediaAttachment')

const MessageSchema = z
  .object({
    id: z.uuid(),
    conversationId: z.uuid(),
    sender: UserSummarySchema,
    text: z.string().max(10000).exactOptional(),
    media: z.array(MediaAttachmentSchema).exactOptional(),
    sharedPost: PostSummarySchema.exactOptional(),
    reactions: z
      .array(
        z.object({
          emoji: z.string().exactOptional(),
          users: z.array(UserSummarySchema).exactOptional(),
        }),
      )
      .exactOptional(),
    readBy: z.array(z.uuid()).exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'conversationId', 'sender', 'createdAt'] })
  .readonly()
  .openapi('Message')

const ConversationSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['one_to_one', 'group']),
    name: z.string().exactOptional().openapi({ description: 'グループ会話の名前' }),
    participants: z.array(UserSummarySchema),
    lastMessage: MessageSchema.exactOptional(),
    unreadCount: z.int().exactOptional(),
    isMuted: z.boolean().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'participants', 'createdAt'] })
  .readonly()
  .openapi('Conversation')

const SendMessageRequestSchema = z
  .object({
    text: z.string().max(10000).exactOptional(),
    mediaIds: z.array(z.uuid()).exactOptional(),
    sharedPostId: z.uuid().exactOptional(),
  })
  .readonly()
  .openapi('SendMessageRequest')

const HashtagSchema = z
  .object({
    name: z.string(),
    postCount: z.int(),
    trend: z
      .object({ rank: z.int().exactOptional(), trendingIn: z.string().exactOptional() })
      .exactOptional(),
  })
  .openapi({ required: ['name', 'postCount'] })
  .readonly()
  .openapi('Hashtag')

const TrendSchema = z
  .object({
    name: z.string(),
    category: z.enum(['hashtag', 'topic', 'event']).exactOptional(),
    postCount: z.int(),
    description: z.string().exactOptional(),
    url: z.url().exactOptional(),
    promoted: z.boolean().exactOptional(),
  })
  .openapi({ required: ['name', 'postCount'] })
  .readonly()
  .openapi('Trend')

const TrendLocationSchema = z
  .object({
    woeid: z.int(),
    name: z.string(),
    country: z.string(),
    countryCode: z.string().exactOptional(),
    parentId: z.int().exactOptional(),
  })
  .openapi({ required: ['woeid', 'name', 'country'] })
  .readonly()
  .openapi('TrendLocation')

const UserSuggestionSchema = z
  .object({
    user: UserSummarySchema,
    reason: z.enum(['followed_by_friends', 'similar_interests', 'popular', 'new_to_platform']),
    mutualFollowers: z.array(UserSummarySchema).exactOptional(),
    mutualFollowersCount: z.int().exactOptional(),
  })
  .openapi({ required: ['user', 'reason'] })
  .readonly()
  .openapi('UserSuggestion')

const TopicSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    icon: z.url().exactOptional(),
    followerCount: z.int().exactOptional(),
    isFollowing: z.boolean().exactOptional(),
    category: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Topic')

const NotificationListResponseSchema = z
  .object({ data: z.array(NotificationSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('NotificationListResponse')

const ConversationListResponseSchema = z
  .object({ data: z.array(ConversationSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('ConversationListResponse')

const MessageListResponseSchema = z
  .object({ data: z.array(MessageSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('MessageListResponse')

const PostSearchResponseSchema = z
  .object({
    data: z.array(PostSummarySchema),
    nextCursor: z.string().exactOptional(),
    totalCount: z.int().exactOptional(),
  })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('PostSearchResponse')

const UserSearchResponseSchema = z
  .object({ data: z.array(UserSummarySchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['data'] })
  .readonly()
  .openapi('UserSearchResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
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

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

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
        .exactOptional()
        .openapi({
          param: {
            name: 'types',
            in: 'query',
            description: '通知タイプでフィルタ（カンマ区切り）',
            schema: { type: 'string' },
            example: 'like,repost,follow,mention',
          },
        }),
      filter: z
        .enum(['all', 'mentions', 'verified'])
        .default('all')
        .exactOptional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: { type: 'string', enum: ['all', 'mentions', 'verified'], default: 'all' },
          },
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
} as const)

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
          schema: z.object({
            count: z.int().exactOptional(),
            mentionsCount: z.int().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

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
          schema: z.object({
            notificationIds: z
              .array(z.uuid())
              .exactOptional()
              .openapi({ description: '指定しない場合は全て既読' }),
            maxId: z.string().exactOptional().openapi({ description: 'このID以前を既読' }),
          }),
        },
      },
    },
  },
  responses: { 200: { description: '成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

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
} as const)

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
} as const)

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
                .array(z.uuid())
                .min(1)
                .max(50)
                .openapi({ description: '参加者のユーザーID' }),
              name: z
                .string()
                .max(50)
                .exactOptional()
                .openapi({ description: 'グループ会話の名前' }),
            })
            .openapi({ required: ['participantIds'] }),
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
} as const)

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
} as const)

export const deleteDmConversationsConversationIdRoute = createRoute({
  method: 'delete',
  path: '/dm/conversations/{conversationId}',
  tags: ['Direct Messages'],
  summary: '会話を退出',
  operationId: 'leaveConversation',
  request: { params: z.object({ conversationId: ConversationIdParamParamsSchema }) },
  responses: { 204: { description: '退出成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
} as const)

export const postDmConversationsConversationIdMessagesRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/messages',
  tags: ['Direct Messages'],
  summary: 'メッセージ送信',
  operationId: 'sendMessage',
  request: {
    params: z.object({ conversationId: ConversationIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: SendMessageRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '送信成功', content: { 'application/json': { schema: MessageSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postDmConversationsConversationIdReadRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/read',
  tags: ['Direct Messages'],
  summary: '会話を既読にする',
  operationId: 'markConversationRead',
  request: {
    params: z.object({ conversationId: ConversationIdParamParamsSchema }),
    body: {
      content: {
        'application/json': { schema: z.object({ lastReadMessageId: z.uuid().exactOptional() }) },
      },
    },
  },
  responses: { 200: { description: '成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const postDmConversationsConversationIdTypingRoute = createRoute({
  method: 'post',
  path: '/dm/conversations/{conversationId}/typing',
  tags: ['Direct Messages'],
  summary: '入力中インジケーター送信',
  operationId: 'sendTypingIndicator',
  request: { params: z.object({ conversationId: ConversationIdParamParamsSchema }) },
  responses: { 200: { description: '送信成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteDmMessagesMessageIdRoute = createRoute({
  method: 'delete',
  path: '/dm/messages/{messageId}',
  tags: ['Direct Messages'],
  summary: 'メッセージ削除',
  operationId: 'deleteMessage',
  request: {
    params: z.object({
      messageId: z.uuid().openapi({
        param: {
          name: 'messageId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const postDmMessagesMessageIdReactionsRoute = createRoute({
  method: 'post',
  path: '/dm/messages/{messageId}/reactions',
  tags: ['Direct Messages'],
  summary: 'メッセージにリアクション追加',
  operationId: 'addMessageReaction',
  request: {
    params: z.object({
      messageId: z.uuid().openapi({
        param: {
          name: 'messageId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ emoji: z.string().openapi({ description: '絵文字' }) })
            .openapi({ required: ['emoji'] }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: '追加成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteDmMessagesMessageIdReactionsRoute = createRoute({
  method: 'delete',
  path: '/dm/messages/{messageId}/reactions',
  tags: ['Direct Messages'],
  summary: 'メッセージのリアクション削除',
  operationId: 'removeMessageReaction',
  request: {
    params: z.object({
      messageId: z.uuid().openapi({
        param: {
          name: 'messageId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    query: z.object({
      emoji: z.string().openapi({
        param: { name: 'emoji', in: 'query', required: true, schema: { type: 'string' } },
      }),
    }),
  },
  responses: { 200: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
          schema: z.object({
            count: z.int().exactOptional(),
            conversationCounts: z.record(z.string(), z.int()).exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getSearchPostsRoute = createRoute({
  method: 'get',
  path: '/search/posts',
  tags: ['Search'],
  summary: '投稿検索',
  operationId: 'searchPosts',
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
      filter: z
        .enum(['latest', 'top', 'photos', 'videos'])
        .default('top')
        .exactOptional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: { type: 'string', enum: ['latest', 'top', 'photos', 'videos'], default: 'top' },
          },
        }),
      from: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'from',
            in: 'query',
            description: '特定ユーザーからの投稿',
            schema: { type: 'string' },
          },
        }),
      to: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'to',
            in: 'query',
            description: '特定ユーザーへの返信',
            schema: { type: 'string' },
          },
        }),
      since: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: {
            name: 'since',
            in: 'query',
            description: 'この日時以降',
            schema: { type: 'string', format: 'date-time' },
          },
        }),
      until: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: {
            name: 'until',
            in: 'query',
            description: 'この日時以前',
            schema: { type: 'string', format: 'date-time' },
          },
        }),
      lang: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'lang',
            in: 'query',
            description: '言語フィルタ',
            schema: { type: 'string' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: { 'application/json': { schema: PostSearchResponseSchema } },
    },
  },
} as const)

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
        .openapi({ param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } } }),
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
} as const)

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
        .openapi({ param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } } }),
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '検索結果',
      content: { 'application/json': { schema: z.array(HashtagSchema) } },
    },
  },
} as const)

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
          schema: z.array(
            z.object({
              query: z.string().exactOptional(),
              searchedAt: z.iso.datetime().exactOptional(),
            }),
          ),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteSearchRecentRoute = createRoute({
  method: 'delete',
  path: '/search/recent',
  tags: ['Search'],
  summary: '検索履歴クリア',
  operationId: 'clearRecentSearches',
  responses: { 204: { description: 'クリア成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

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
        .exactOptional()
        .openapi({
          param: {
            name: 'woeid',
            in: 'query',
            description: '地域ID（Where On Earth ID）',
            schema: { type: 'integer' },
          },
        }),
      limit: z
        .int()
        .max(50)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 20, maximum: 50 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'トレンド一覧',
      content: { 'application/json': { schema: z.array(TrendSchema) } },
    },
  },
} as const)

export const getTrendsLocationsRoute = createRoute({
  method: 'get',
  path: '/trends/locations',
  tags: ['Trends'],
  summary: 'トレンド対応地域一覧',
  operationId: 'getTrendLocations',
  responses: {
    200: {
      description: '地域一覧',
      content: { 'application/json': { schema: z.array(TrendLocationSchema) } },
    },
  },
} as const)

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
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'おすすめユーザー',
      content: { 'application/json': { schema: z.array(UserSuggestionSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postSuggestionsUsersUserIdHideRoute = createRoute({
  method: 'post',
  path: '/suggestions/users/{userId}/hide',
  tags: ['Suggestions'],
  summary: 'おすすめユーザーを非表示',
  operationId: 'hideSuggestedUser',
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
  },
  responses: { 200: { description: '非表示成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const getSuggestionsTopicsRoute = createRoute({
  method: 'get',
  path: '/suggestions/topics',
  tags: ['Suggestions'],
  summary: 'おすすめトピック取得',
  operationId: 'getSuggestedTopics',
  responses: {
    200: {
      description: 'おすすめトピック',
      content: { 'application/json': { schema: z.array(TopicSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postTopicsTopicIdFollowRoute = createRoute({
  method: 'post',
  path: '/topics/{topicId}/follow',
  tags: ['Suggestions'],
  summary: 'トピックをフォロー',
  operationId: 'followTopic',
  request: {
    params: z.object({
      topicId: z.uuid().openapi({
        param: {
          name: 'topicId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 200: { description: 'フォロー成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteTopicsTopicIdFollowRoute = createRoute({
  method: 'delete',
  path: '/topics/{topicId}/follow',
  tags: ['Suggestions'],
  summary: 'トピックのフォロー解除',
  operationId: 'unfollowTopic',
  request: {
    params: z.object({
      topicId: z.uuid().openapi({
        param: {
          name: 'topicId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 200: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)
