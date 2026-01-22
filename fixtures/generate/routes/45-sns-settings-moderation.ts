import { createRoute, z } from '@hono/zod-openapi'

const AccountSettingsSchema = z
  .object({
    username: z.string().exactOptional(),
    email: z.email().exactOptional(),
    phone: z.string().exactOptional(),
    language: z.string().exactOptional(),
    timezone: z.string().exactOptional(),
    country: z.string().exactOptional(),
    twoFactorEnabled: z.boolean().exactOptional(),
    emailVerified: z.boolean().exactOptional(),
    phoneVerified: z.boolean().exactOptional(),
  })
  .openapi('AccountSettings')

const UpdateAccountSettingsRequestSchema = z
  .object({
    language: z.string().exactOptional(),
    timezone: z.string().exactOptional(),
    country: z.string().exactOptional(),
  })
  .openapi('UpdateAccountSettingsRequest')

const PrivacySettingsSchema = z
  .object({
    protectedPosts: z.boolean().exactOptional().openapi({ description: '非公開アカウント' }),
    allowTagging: z.enum(['everyone', 'followers', 'none']).exactOptional(),
    allowMentions: z.enum(['everyone', 'followers', 'none']).exactOptional(),
    discoverableByEmail: z.boolean().exactOptional(),
    discoverableByPhone: z.boolean().exactOptional(),
    showLocation: z.boolean().exactOptional(),
    personalizeAds: z.boolean().exactOptional(),
    allowDataSharing: z.boolean().exactOptional(),
  })
  .openapi('PrivacySettings')

const ContentPreferencesSchema = z
  .object({
    sensitiveContentFilter: z.enum(['hide', 'warn', 'show']).exactOptional(),
    autoplayVideos: z.enum(['always', 'wifi', 'never']).exactOptional(),
    dataUsage: z.enum(['default', 'reduced']).exactOptional(),
    qualityFilter: z
      .boolean()
      .exactOptional()
      .openapi({ description: '低品質コンテンツのフィルタ' }),
    hideViewCounts: z.boolean().exactOptional(),
    hideLikeCounts: z.boolean().exactOptional(),
  })
  .openapi('ContentPreferences')

const MutedWordSchema = z
  .object({
    id: z.uuid(),
    word: z.string(),
    matchWholeWord: z.boolean().exactOptional(),
    expiresAt: z.iso.datetime().exactOptional(),
    scope: z.enum(['all', 'home_timeline', 'notifications']).exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'word', 'createdAt'] })
  .openapi('MutedWord')

const CreateMutedWordRequestSchema = z
  .object({
    word: z.string().max(100),
    matchWholeWord: z.boolean().default(true).exactOptional(),
    duration: z.int().exactOptional().openapi({ description: 'ミュート期間（秒）。省略で無期限' }),
    scope: z.enum(['all', 'home_timeline', 'notifications']).default('all').exactOptional(),
  })
  .openapi({ required: ['word'] })
  .openapi('CreateMutedWordRequest')

const SessionSchema = z
  .object({
    id: z.uuid(),
    isCurrent: z.boolean().exactOptional(),
    device: z.object({
      type: z.string().exactOptional(),
      os: z.string().exactOptional(),
      browser: z.string().exactOptional(),
      name: z.string().exactOptional(),
    }),
    location: z
      .object({
        country: z.string().exactOptional(),
        city: z.string().exactOptional(),
        ip: z.string().exactOptional(),
      })
      .exactOptional(),
    createdAt: z.iso.datetime(),
    lastActiveAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'device', 'createdAt', 'lastActiveAt'] })
  .openapi('Session')

const ConnectedAppSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    icon: z.url().exactOptional(),
    permissions: z.array(z.string()),
    authorizedAt: z.iso.datetime(),
    lastUsedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'permissions', 'authorizedAt'] })
  .openapi('ConnectedApp')

const ReportSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['post', 'user', 'message']),
    targetId: z.uuid().exactOptional(),
    reason: z.enum([
      'spam',
      'harassment',
      'hate_speech',
      'violence',
      'self_harm',
      'misinformation',
      'illegal_content',
      'copyright',
      'impersonation',
      'other',
    ]),
    description: z.string().exactOptional(),
    status: z.enum(['pending', 'in_review', 'resolved', 'dismissed']),
    resolution: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
    resolvedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'reason', 'status', 'createdAt'] })
  .openapi('Report')

const CreateReportRequestSchema = z
  .object({
    type: z.enum(['post', 'user', 'message']),
    targetId: z.uuid(),
    reason: z.enum([
      'spam',
      'harassment',
      'hate_speech',
      'violence',
      'self_harm',
      'misinformation',
      'illegal_content',
      'copyright',
      'impersonation',
      'other',
    ]),
    description: z.string().max(1000).exactOptional(),
    relatedPostIds: z.array(z.uuid()).exactOptional(),
  })
  .openapi({ required: ['type', 'targetId', 'reason'] })
  .openapi('CreateReportRequest')

const ModerationItemSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['post', 'user', 'message']),
    targetId: z.uuid().exactOptional(),
    reports: z.array(ReportSchema).exactOptional(),
    status: z.enum(['pending', 'in_review', 'resolved']),
    assignedTo: z.uuid().exactOptional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).exactOptional(),
    content: z.object({}).exactOptional().openapi({ description: '対象コンテンツの詳細' }),
    userHistory: z
      .object({
        previousViolations: z.int().exactOptional(),
        accountAge: z.string().exactOptional(),
      })
      .exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'type', 'status', 'createdAt'] })
  .openapi('ModerationItem')

const ModerationActionRequestSchema = z
  .object({
    action: z.enum(['approve', 'remove_content', 'warn_user', 'suspend_user', 'dismiss']),
    note: z.string().exactOptional(),
    suspensionDuration: z.int().exactOptional().openapi({ description: '凍結期間（時間）' }),
    notifyUser: z.boolean().default(true).exactOptional(),
  })
  .openapi({ required: ['action'] })
  .openapi('ModerationActionRequest')

const ModerationActionSchema = z
  .object({
    id: z.uuid(),
    action: z.string(),
    targetType: z.string().exactOptional(),
    targetId: z.uuid().exactOptional(),
    reason: z.string().exactOptional(),
    note: z.string().exactOptional(),
    moderatorId: z.uuid().exactOptional(),
    createdAt: z.iso.datetime(),
    expiresAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'action', 'createdAt'] })
  .openapi('ModerationAction')

const PostAnalyticsSchema = z
  .object({
    postId: z.uuid(),
    impressions: z.int(),
    reach: z.int().exactOptional(),
    engagements: z.int(),
    engagementRate: z.number().exactOptional(),
    likes: z.int().exactOptional(),
    reposts: z.int().exactOptional(),
    replies: z.int().exactOptional(),
    quotes: z.int().exactOptional(),
    bookmarks: z.int().exactOptional(),
    linkClicks: z.int().exactOptional(),
    profileVisits: z.int().exactOptional(),
    detailExpands: z.int().exactOptional(),
    mediaViews: z.int().exactOptional(),
    videoViews: z.int().exactOptional(),
    videoWatchTime: z.int().exactOptional().openapi({ description: '総視聴時間（秒）' }),
  })
  .openapi({ required: ['postId', 'impressions', 'engagements'] })
  .openapi('PostAnalytics')

const AccountAnalyticsSchema = z
  .object({
    period: z.string().exactOptional(),
    impressions: z
      .object({
        total: z.int().exactOptional(),
        change: z.number().exactOptional(),
        daily: z
          .array(z.object({ date: z.iso.date().exactOptional(), count: z.int().exactOptional() }))
          .exactOptional(),
      })
      .exactOptional(),
    engagements: z
      .object({ total: z.int().exactOptional(), change: z.number().exactOptional() })
      .exactOptional(),
    profileVisits: z
      .object({ total: z.int().exactOptional(), change: z.number().exactOptional() })
      .exactOptional(),
    mentions: z
      .object({ total: z.int().exactOptional(), change: z.number().exactOptional() })
      .exactOptional(),
    newFollowers: z
      .object({ total: z.int().exactOptional(), change: z.number().exactOptional() })
      .exactOptional(),
  })
  .openapi('AccountAnalytics')

const FollowerAnalyticsSchema = z
  .object({
    totalFollowers: z.int().exactOptional(),
    followerGrowth: z
      .array(
        z.object({
          date: z.iso.date().exactOptional(),
          gained: z.int().exactOptional(),
          lost: z.int().exactOptional(),
          net: z.int().exactOptional(),
        }),
      )
      .exactOptional(),
    demographics: z
      .object({
        topCountries: z
          .array(
            z.object({
              country: z.string().exactOptional(),
              percentage: z.number().exactOptional(),
            }),
          )
          .exactOptional(),
        genderDistribution: z
          .object({
            male: z.number().exactOptional(),
            female: z.number().exactOptional(),
            other: z.number().exactOptional(),
          })
          .exactOptional(),
        ageDistribution: z
          .array(
            z.object({
              ageRange: z.string().exactOptional(),
              percentage: z.number().exactOptional(),
            }),
          )
          .exactOptional(),
      })
      .exactOptional(),
    topInterests: z
      .array(
        z.object({ interest: z.string().exactOptional(), percentage: z.number().exactOptional() }),
      )
      .exactOptional(),
    activeHours: z
      .array(z.object({ hour: z.int().exactOptional(), activityScore: z.number().exactOptional() }))
      .exactOptional(),
  })
  .openapi('FollowerAnalytics')

const PostWithAnalyticsSchema = z
  .object({
    id: z.uuid().exactOptional(),
    text: z.string().exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
    analytics: PostAnalyticsSchema.exactOptional(),
  })
  .openapi('PostWithAnalytics')

const ModerationQueueResponseSchema = z
  .object({
    data: z.array(ModerationItemSchema),
    nextCursor: z.string().exactOptional(),
    stats: z
      .object({
        pending: z.int().exactOptional(),
        inReview: z.int().exactOptional(),
        resolvedToday: z.int().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi({ required: ['data'] })
  .openapi('ModerationQueueResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const CursorParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'cursor', in: 'query' } })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query' } })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const ForbiddenResponse = {
  description: 'アクセス権限がありません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getSettingsAccountRoute = createRoute({
  method: 'get',
  path: '/settings/account',
  tags: ['Account Settings'],
  summary: 'アカウント設定取得',
  operationId: 'getAccountSettings',
  responses: {
    200: {
      description: 'アカウント設定',
      content: { 'application/json': { schema: AccountSettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putSettingsAccountRoute = createRoute({
  method: 'put',
  path: '/settings/account',
  tags: ['Account Settings'],
  summary: 'アカウント設定更新',
  operationId: 'updateAccountSettings',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateAccountSettingsRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: AccountSettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSettingsUsernameCheckRoute = createRoute({
  method: 'get',
  path: '/settings/username/check',
  tags: ['Account Settings'],
  summary: 'ユーザー名利用可能確認',
  operationId: 'checkUsernameAvailability',
  request: {
    query: z.object({
      username: z.string().openapi({ param: { name: 'username', in: 'query', required: true } }),
    }),
  },
  responses: {
    200: {
      description: '確認結果',
      content: {
        'application/json': {
          schema: z.object({
            available: z.boolean().exactOptional(),
            reason: z.string().exactOptional(),
          }),
        },
      },
    },
  },
})

export const getSettingsPrivacyRoute = createRoute({
  method: 'get',
  path: '/settings/privacy',
  tags: ['Privacy & Safety'],
  summary: 'プライバシー設定取得',
  operationId: 'getPrivacySettings',
  responses: {
    200: {
      description: 'プライバシー設定',
      content: { 'application/json': { schema: PrivacySettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putSettingsPrivacyRoute = createRoute({
  method: 'put',
  path: '/settings/privacy',
  tags: ['Privacy & Safety'],
  summary: 'プライバシー設定更新',
  operationId: 'updatePrivacySettings',
  request: {
    body: { content: { 'application/json': { schema: PrivacySettingsSchema } }, required: true },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: PrivacySettingsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSettingsContentPreferencesRoute = createRoute({
  method: 'get',
  path: '/settings/content-preferences',
  tags: ['Privacy & Safety'],
  summary: 'コンテンツ設定取得',
  operationId: 'getContentPreferences',
  responses: {
    200: {
      description: 'コンテンツ設定',
      content: { 'application/json': { schema: ContentPreferencesSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putSettingsContentPreferencesRoute = createRoute({
  method: 'put',
  path: '/settings/content-preferences',
  tags: ['Privacy & Safety'],
  summary: 'コンテンツ設定更新',
  operationId: 'updateContentPreferences',
  request: {
    body: { content: { 'application/json': { schema: ContentPreferencesSchema } }, required: true },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ContentPreferencesSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSettingsMutedWordsRoute = createRoute({
  method: 'get',
  path: '/settings/muted-words',
  tags: ['Privacy & Safety'],
  summary: 'ミュートワード一覧取得',
  operationId: 'getMutedWords',
  responses: {
    200: {
      description: 'ミュートワード一覧',
      content: { 'application/json': { schema: z.array(MutedWordSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSettingsMutedWordsRoute = createRoute({
  method: 'post',
  path: '/settings/muted-words',
  tags: ['Privacy & Safety'],
  summary: 'ミュートワード追加',
  operationId: 'addMutedWord',
  request: {
    body: {
      content: { 'application/json': { schema: CreateMutedWordRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '追加成功', content: { 'application/json': { schema: MutedWordSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSettingsMutedWordsWordIdRoute = createRoute({
  method: 'delete',
  path: '/settings/muted-words/{wordId}',
  tags: ['Privacy & Safety'],
  summary: 'ミュートワード削除',
  operationId: 'removeMutedWord',
  request: {
    params: z.object({
      wordId: z.uuid().openapi({ param: { name: 'wordId', in: 'path', required: true } }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getSettingsSessionsRoute = createRoute({
  method: 'get',
  path: '/settings/sessions',
  tags: ['Account Settings'],
  summary: 'ログインセッション一覧',
  operationId: 'listSessions',
  responses: {
    200: {
      description: 'セッション一覧',
      content: { 'application/json': { schema: z.array(SessionSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSettingsSessionsSessionIdRoute = createRoute({
  method: 'delete',
  path: '/settings/sessions/{sessionId}',
  tags: ['Account Settings'],
  summary: 'セッション無効化',
  operationId: 'revokeSession',
  request: {
    params: z.object({
      sessionId: z.uuid().openapi({ param: { name: 'sessionId', in: 'path', required: true } }),
    }),
  },
  responses: { 204: { description: '無効化成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getSettingsConnectedAppsRoute = createRoute({
  method: 'get',
  path: '/settings/connected-apps',
  tags: ['Account Settings'],
  summary: '連携アプリ一覧',
  operationId: 'listConnectedApps',
  responses: {
    200: {
      description: '連携アプリ一覧',
      content: { 'application/json': { schema: z.array(ConnectedAppSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSettingsConnectedAppsAppIdRoute = createRoute({
  method: 'delete',
  path: '/settings/connected-apps/{appId}',
  tags: ['Account Settings'],
  summary: '連携アプリ解除',
  operationId: 'revokeConnectedApp',
  request: {
    params: z.object({
      appId: z.uuid().openapi({ param: { name: 'appId', in: 'path', required: true } }),
    }),
  },
  responses: { 204: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postSettingsDataExportRoute = createRoute({
  method: 'post',
  path: '/settings/data-export',
  tags: ['Account Settings'],
  summary: 'データエクスポートリクエスト',
  operationId: 'requestDataExport',
  responses: {
    202: {
      description: 'リクエスト受付',
      content: {
        'application/json': {
          schema: z.object({
            requestId: z.uuid().exactOptional(),
            estimatedCompletionAt: z.iso.datetime().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSettingsDataExportRequestIdRoute = createRoute({
  method: 'get',
  path: '/settings/data-export/{requestId}',
  tags: ['Account Settings'],
  summary: 'データエクスポート状況確認',
  operationId: 'getDataExportStatus',
  request: {
    params: z.object({
      requestId: z.uuid().openapi({ param: { name: 'requestId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'エクスポート状況',
      content: {
        'application/json': {
          schema: z.object({
            status: z.enum(['pending', 'processing', 'completed', 'failed']).exactOptional(),
            downloadUrl: z.url().exactOptional(),
            expiresAt: z.iso.datetime().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSettingsDeactivateRoute = createRoute({
  method: 'post',
  path: '/settings/deactivate',
  tags: ['Account Settings'],
  summary: 'アカウント一時停止',
  operationId: 'deactivateAccount',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ password: z.string() }).openapi({ required: ['password'] }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: '停止成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postReportsRoute = createRoute({
  method: 'post',
  path: '/reports',
  tags: ['Reports'],
  summary: '通報作成',
  operationId: 'createReport',
  request: {
    body: {
      content: { 'application/json': { schema: CreateReportRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '通報成功', content: { 'application/json': { schema: ReportSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getReportsReportIdRoute = createRoute({
  method: 'get',
  path: '/reports/{reportId}',
  tags: ['Reports'],
  summary: '通報詳細取得',
  operationId: 'getReport',
  request: {
    params: z.object({
      reportId: z.uuid().openapi({ param: { name: 'reportId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: { description: '通報詳細', content: { 'application/json': { schema: ReportSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getModerationQueueRoute = createRoute({
  method: 'get',
  path: '/moderation/queue',
  tags: ['Moderation'],
  summary: 'モデレーションキュー取得',
  description: 'モデレーター用',
  operationId: 'getModerationQueue',
  request: {
    query: z.object({
      status: z
        .enum(['pending', 'in_review', 'resolved'])
        .exactOptional()
        .openapi({ param: { name: 'status', in: 'query' } }),
      type: z
        .enum(['post', 'user', 'message'])
        .exactOptional()
        .openapi({ param: { name: 'type', in: 'query' } }),
      cursor: CursorParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'キュー一覧',
      content: { 'application/json': { schema: ModerationQueueResponseSchema } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getModerationItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/moderation/items/{itemId}',
  tags: ['Moderation'],
  summary: 'モデレーションアイテム詳細',
  operationId: 'getModerationItem',
  request: {
    params: z.object({
      itemId: z.uuid().openapi({ param: { name: 'itemId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'アイテム詳細',
      content: { 'application/json': { schema: ModerationItemSchema } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postModerationItemsItemIdActionRoute = createRoute({
  method: 'post',
  path: '/moderation/items/{itemId}/action',
  tags: ['Moderation'],
  summary: 'モデレーションアクション実行',
  operationId: 'takeModerationAction',
  request: {
    params: z.object({
      itemId: z.uuid().openapi({ param: { name: 'itemId', in: 'path', required: true } }),
    }),
    body: {
      content: { 'application/json': { schema: ModerationActionRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アクション成功',
      content: { 'application/json': { schema: ModerationItemSchema } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getModerationUsersUserIdHistoryRoute = createRoute({
  method: 'get',
  path: '/moderation/users/{userId}/history',
  tags: ['Moderation'],
  summary: 'ユーザーのモデレーション履歴',
  operationId: 'getUserModerationHistory',
  request: {
    params: z.object({
      userId: z.uuid().openapi({ param: { name: 'userId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'モデレーション履歴',
      content: { 'application/json': { schema: z.array(ModerationActionSchema) } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postModerationUsersUserIdSuspendRoute = createRoute({
  method: 'post',
  path: '/moderation/users/{userId}/suspend',
  tags: ['Moderation'],
  summary: 'ユーザー凍結',
  operationId: 'suspendUser',
  request: {
    params: z.object({
      userId: z.uuid().openapi({ param: { name: 'userId', in: 'path', required: true } }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              reason: z.string(),
              duration: z
                .int()
                .exactOptional()
                .openapi({ description: '凍結期間（時間）。省略で永久' }),
              note: z.string().exactOptional(),
            })
            .openapi({ required: ['reason'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '凍結成功' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postModerationUsersUserIdUnsuspendRoute = createRoute({
  method: 'post',
  path: '/moderation/users/{userId}/unsuspend',
  tags: ['Moderation'],
  summary: 'ユーザー凍結解除',
  operationId: 'unsuspendUser',
  request: {
    params: z.object({
      userId: z.uuid().openapi({ param: { name: 'userId', in: 'path', required: true } }),
    }),
    body: {
      content: { 'application/json': { schema: z.object({ note: z.string().exactOptional() }) } },
    },
  },
  responses: {
    200: { description: '解除成功' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAnalyticsPostsPostIdRoute = createRoute({
  method: 'get',
  path: '/analytics/posts/{postId}',
  tags: ['Analytics'],
  summary: '投稿分析取得',
  operationId: 'getPostAnalytics',
  request: {
    params: z.object({
      postId: z.uuid().openapi({ param: { name: 'postId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: '投稿分析',
      content: { 'application/json': { schema: PostAnalyticsSchema } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAnalyticsAccountRoute = createRoute({
  method: 'get',
  path: '/analytics/account',
  tags: ['Analytics'],
  summary: 'アカウント分析取得',
  operationId: 'getAccountAnalytics',
  request: {
    query: z.object({
      period: z
        .enum(['7d', '28d', '90d'])
        .default('28d')
        .exactOptional()
        .openapi({ param: { name: 'period', in: 'query' } }),
    }),
  },
  responses: {
    200: {
      description: 'アカウント分析',
      content: { 'application/json': { schema: AccountAnalyticsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAnalyticsFollowersRoute = createRoute({
  method: 'get',
  path: '/analytics/followers',
  tags: ['Analytics'],
  summary: 'フォロワー分析取得',
  operationId: 'getFollowerAnalytics',
  request: {
    query: z.object({
      period: z
        .enum(['7d', '28d', '90d'])
        .default('28d')
        .exactOptional()
        .openapi({ param: { name: 'period', in: 'query' } }),
    }),
  },
  responses: {
    200: {
      description: 'フォロワー分析',
      content: { 'application/json': { schema: FollowerAnalyticsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAnalyticsTopPostsRoute = createRoute({
  method: 'get',
  path: '/analytics/top-posts',
  tags: ['Analytics'],
  summary: 'トップ投稿取得',
  operationId: 'getTopPosts',
  request: {
    query: z.object({
      period: z
        .enum(['7d', '28d', '90d'])
        .default('28d')
        .exactOptional()
        .openapi({ param: { name: 'period', in: 'query' } }),
      metric: z
        .enum(['impressions', 'engagements', 'likes', 'reposts'])
        .default('impressions')
        .exactOptional()
        .openapi({ param: { name: 'metric', in: 'query' } }),
      limit: z
        .int()
        .default(10)
        .exactOptional()
        .openapi({ param: { name: 'limit', in: 'query' } }),
    }),
  },
  responses: {
    200: {
      description: 'トップ投稿一覧',
      content: { 'application/json': { schema: z.array(PostWithAnalyticsSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
