import { createRoute, z } from '@hono/zod-openapi'

const AccountSettingsSchema = z
  .object({
    username: z.string().exactOptional().openapi({ type: 'string' }),
    email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
    phone: z.string().exactOptional().openapi({ type: 'string' }),
    language: z.string().exactOptional().openapi({ type: 'string' }),
    timezone: z.string().exactOptional().openapi({ type: 'string' }),
    country: z.string().exactOptional().openapi({ type: 'string' }),
    twoFactorEnabled: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    emailVerified: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    phoneVerified: z.boolean().exactOptional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string' },
      language: { type: 'string' },
      timezone: { type: 'string' },
      country: { type: 'string' },
      twoFactorEnabled: { type: 'boolean' },
      emailVerified: { type: 'boolean' },
      phoneVerified: { type: 'boolean' },
    },
  })
  .openapi('AccountSettings')

const UpdateAccountSettingsRequestSchema = z
  .object({
    language: z.string().exactOptional().openapi({ type: 'string' }),
    timezone: z.string().exactOptional().openapi({ type: 'string' }),
    country: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      language: { type: 'string' },
      timezone: { type: 'string' },
      country: { type: 'string' },
    },
  })
  .openapi('UpdateAccountSettingsRequest')

const PrivacySettingsSchema = z
  .object({
    protectedPosts: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: '非公開アカウント' }),
    allowTagging: z
      .enum(['everyone', 'followers', 'none'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['everyone', 'followers', 'none'] }),
    allowMentions: z
      .enum(['everyone', 'followers', 'none'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['everyone', 'followers', 'none'] }),
    discoverableByEmail: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    discoverableByPhone: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    showLocation: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    personalizeAds: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    allowDataSharing: z.boolean().exactOptional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      protectedPosts: { type: 'boolean', description: '非公開アカウント' },
      allowTagging: { type: 'string', enum: ['everyone', 'followers', 'none'] },
      allowMentions: { type: 'string', enum: ['everyone', 'followers', 'none'] },
      discoverableByEmail: { type: 'boolean' },
      discoverableByPhone: { type: 'boolean' },
      showLocation: { type: 'boolean' },
      personalizeAds: { type: 'boolean' },
      allowDataSharing: { type: 'boolean' },
    },
  })
  .openapi('PrivacySettings')

const ContentPreferencesSchema = z
  .object({
    sensitiveContentFilter: z
      .enum(['hide', 'warn', 'show'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['hide', 'warn', 'show'] }),
    autoplayVideos: z
      .enum(['always', 'wifi', 'never'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['always', 'wifi', 'never'] }),
    dataUsage: z
      .enum(['default', 'reduced'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['default', 'reduced'] }),
    qualityFilter: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: '低品質コンテンツのフィルタ' }),
    hideViewCounts: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    hideLikeCounts: z.boolean().exactOptional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      sensitiveContentFilter: { type: 'string', enum: ['hide', 'warn', 'show'] },
      autoplayVideos: { type: 'string', enum: ['always', 'wifi', 'never'] },
      dataUsage: { type: 'string', enum: ['default', 'reduced'] },
      qualityFilter: { type: 'boolean', description: '低品質コンテンツのフィルタ' },
      hideViewCounts: { type: 'boolean' },
      hideLikeCounts: { type: 'boolean' },
    },
  })
  .openapi('ContentPreferences')

const MutedWordSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    word: z.string().openapi({ type: 'string' }),
    matchWholeWord: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    expiresAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    scope: z
      .enum(['all', 'home_timeline', 'notifications'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['all', 'home_timeline', 'notifications'] }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'word', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      word: { type: 'string' },
      matchWholeWord: { type: 'boolean' },
      expiresAt: { type: 'string', format: 'date-time' },
      scope: { type: 'string', enum: ['all', 'home_timeline', 'notifications'] },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('MutedWord')

const CreateMutedWordRequestSchema = z
  .object({
    word: z.string().max(100).openapi({ type: 'string', maxLength: 100 }),
    matchWholeWord: z
      .boolean()
      .default(true)
      .exactOptional()
      .openapi({ type: 'boolean', default: true }),
    duration: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: 'ミュート期間（秒）。省略で無期限' }),
    scope: z
      .enum(['all', 'home_timeline', 'notifications'])
      .default('all')
      .exactOptional()
      .openapi({ type: 'string', enum: ['all', 'home_timeline', 'notifications'], default: 'all' }),
  })
  .openapi({
    type: 'object',
    required: ['word'],
    properties: {
      word: { type: 'string', maxLength: 100 },
      matchWholeWord: { type: 'boolean', default: true },
      duration: { type: 'integer', description: 'ミュート期間（秒）。省略で無期限' },
      scope: { type: 'string', enum: ['all', 'home_timeline', 'notifications'], default: 'all' },
    },
  })
  .openapi('CreateMutedWordRequest')

const SessionSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    isCurrent: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    device: z
      .object({
        type: z.string().exactOptional().openapi({ type: 'string' }),
        os: z.string().exactOptional().openapi({ type: 'string' }),
        browser: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: {
          type: { type: 'string' },
          os: { type: 'string' },
          browser: { type: 'string' },
          name: { type: 'string' },
        },
      }),
    location: z
      .object({
        country: z.string().exactOptional().openapi({ type: 'string' }),
        city: z.string().exactOptional().openapi({ type: 'string' }),
        ip: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          country: { type: 'string' },
          city: { type: 'string' },
          ip: { type: 'string' },
        },
      }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    lastActiveAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'device', 'createdAt', 'lastActiveAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      isCurrent: { type: 'boolean' },
      device: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          os: { type: 'string' },
          browser: { type: 'string' },
          name: { type: 'string' },
        },
      },
      location: {
        type: 'object',
        properties: {
          country: { type: 'string' },
          city: { type: 'string' },
          ip: { type: 'string' },
        },
      },
      createdAt: { type: 'string', format: 'date-time' },
      lastActiveAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Session')

const ConnectedAppSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    icon: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    permissions: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({ type: 'array', items: { type: 'string' } }),
    authorizedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    lastUsedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'permissions', 'authorizedAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      icon: { type: 'string', format: 'uri' },
      permissions: { type: 'array', items: { type: 'string' } },
      authorizedAt: { type: 'string', format: 'date-time' },
      lastUsedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ConnectedApp')

const ReportSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['post', 'user', 'message'])
      .openapi({ type: 'string', enum: ['post', 'user', 'message'] }),
    targetId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    reason: z
      .enum([
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
      ])
      .openapi({
        type: 'string',
        enum: [
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
        ],
      }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    status: z
      .enum(['pending', 'in_review', 'resolved', 'dismissed'])
      .openapi({ type: 'string', enum: ['pending', 'in_review', 'resolved', 'dismissed'] }),
    resolution: z.string().exactOptional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    resolvedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'reason', 'status', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['post', 'user', 'message'] },
      targetId: { type: 'string', format: 'uuid' },
      reason: {
        type: 'string',
        enum: [
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
        ],
      },
      description: { type: 'string' },
      status: { type: 'string', enum: ['pending', 'in_review', 'resolved', 'dismissed'] },
      resolution: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      resolvedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Report')

const CreateReportRequestSchema = z
  .object({
    type: z
      .enum(['post', 'user', 'message'])
      .openapi({ type: 'string', enum: ['post', 'user', 'message'] }),
    targetId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    reason: z
      .enum([
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
      ])
      .openapi({
        type: 'string',
        enum: [
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
        ],
      }),
    description: z.string().max(1000).exactOptional().openapi({ type: 'string', maxLength: 1000 }),
    relatedPostIds: z
      .array(z.uuid().openapi({ type: 'string', format: 'uuid' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'targetId', 'reason'],
    properties: {
      type: { type: 'string', enum: ['post', 'user', 'message'] },
      targetId: { type: 'string', format: 'uuid' },
      reason: {
        type: 'string',
        enum: [
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
        ],
      },
      description: { type: 'string', maxLength: 1000 },
      relatedPostIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
    },
  })
  .openapi('CreateReportRequest')

const ModerationItemSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['post', 'user', 'message'])
      .openapi({ type: 'string', enum: ['post', 'user', 'message'] }),
    targetId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    reports: z
      .array(ReportSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Report' } }),
    status: z
      .enum(['pending', 'in_review', 'resolved'])
      .openapi({ type: 'string', enum: ['pending', 'in_review', 'resolved'] }),
    assignedTo: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['low', 'medium', 'high', 'urgent'] }),
    content: z
      .object({})
      .exactOptional()
      .openapi({ type: 'object', description: '対象コンテンツの詳細' }),
    userHistory: z
      .object({
        previousViolations: z.int().exactOptional().openapi({ type: 'integer' }),
        accountAge: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { previousViolations: { type: 'integer' }, accountAge: { type: 'string' } },
      }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'status', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['post', 'user', 'message'] },
      targetId: { type: 'string', format: 'uuid' },
      reports: { type: 'array', items: { $ref: '#/components/schemas/Report' } },
      status: { type: 'string', enum: ['pending', 'in_review', 'resolved'] },
      assignedTo: { type: 'string', format: 'uuid' },
      priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
      content: { type: 'object', description: '対象コンテンツの詳細' },
      userHistory: {
        type: 'object',
        properties: { previousViolations: { type: 'integer' }, accountAge: { type: 'string' } },
      },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ModerationItem')

const ModerationActionRequestSchema = z
  .object({
    action: z
      .enum(['approve', 'remove_content', 'warn_user', 'suspend_user', 'dismiss'])
      .openapi({
        type: 'string',
        enum: ['approve', 'remove_content', 'warn_user', 'suspend_user', 'dismiss'],
      }),
    note: z.string().exactOptional().openapi({ type: 'string' }),
    suspensionDuration: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: '凍結期間（時間）' }),
    notifyUser: z
      .boolean()
      .default(true)
      .exactOptional()
      .openapi({ type: 'boolean', default: true }),
  })
  .openapi({
    type: 'object',
    required: ['action'],
    properties: {
      action: {
        type: 'string',
        enum: ['approve', 'remove_content', 'warn_user', 'suspend_user', 'dismiss'],
      },
      note: { type: 'string' },
      suspensionDuration: { type: 'integer', description: '凍結期間（時間）' },
      notifyUser: { type: 'boolean', default: true },
    },
  })
  .openapi('ModerationActionRequest')

const ModerationActionSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    action: z.string().openapi({ type: 'string' }),
    targetType: z.string().exactOptional().openapi({ type: 'string' }),
    targetId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    reason: z.string().exactOptional().openapi({ type: 'string' }),
    note: z.string().exactOptional().openapi({ type: 'string' }),
    moderatorId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    expiresAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'action', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      action: { type: 'string' },
      targetType: { type: 'string' },
      targetId: { type: 'string', format: 'uuid' },
      reason: { type: 'string' },
      note: { type: 'string' },
      moderatorId: { type: 'string', format: 'uuid' },
      createdAt: { type: 'string', format: 'date-time' },
      expiresAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ModerationAction')

const PostAnalyticsSchema = z
  .object({
    postId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    impressions: z.int().openapi({ type: 'integer' }),
    reach: z.int().exactOptional().openapi({ type: 'integer' }),
    engagements: z.int().openapi({ type: 'integer' }),
    engagementRate: z.number().exactOptional().openapi({ type: 'number' }),
    likes: z.int().exactOptional().openapi({ type: 'integer' }),
    reposts: z.int().exactOptional().openapi({ type: 'integer' }),
    replies: z.int().exactOptional().openapi({ type: 'integer' }),
    quotes: z.int().exactOptional().openapi({ type: 'integer' }),
    bookmarks: z.int().exactOptional().openapi({ type: 'integer' }),
    linkClicks: z.int().exactOptional().openapi({ type: 'integer' }),
    profileVisits: z.int().exactOptional().openapi({ type: 'integer' }),
    detailExpands: z.int().exactOptional().openapi({ type: 'integer' }),
    mediaViews: z.int().exactOptional().openapi({ type: 'integer' }),
    videoViews: z.int().exactOptional().openapi({ type: 'integer' }),
    videoWatchTime: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: '総視聴時間（秒）' }),
  })
  .openapi({
    type: 'object',
    required: ['postId', 'impressions', 'engagements'],
    properties: {
      postId: { type: 'string', format: 'uuid' },
      impressions: { type: 'integer' },
      reach: { type: 'integer' },
      engagements: { type: 'integer' },
      engagementRate: { type: 'number' },
      likes: { type: 'integer' },
      reposts: { type: 'integer' },
      replies: { type: 'integer' },
      quotes: { type: 'integer' },
      bookmarks: { type: 'integer' },
      linkClicks: { type: 'integer' },
      profileVisits: { type: 'integer' },
      detailExpands: { type: 'integer' },
      mediaViews: { type: 'integer' },
      videoViews: { type: 'integer' },
      videoWatchTime: { type: 'integer', description: '総視聴時間（秒）' },
    },
  })
  .openapi('PostAnalytics')

const AccountAnalyticsSchema = z
  .object({
    period: z.string().exactOptional().openapi({ type: 'string' }),
    impressions: z
      .object({
        total: z.int().exactOptional().openapi({ type: 'integer' }),
        change: z.number().exactOptional().openapi({ type: 'number' }),
        daily: z
          .array(
            z
              .object({
                date: z.iso.date().exactOptional().openapi({ type: 'string', format: 'date' }),
                count: z.int().exactOptional().openapi({ type: 'integer' }),
              })
              .openapi({
                type: 'object',
                properties: {
                  date: { type: 'string', format: 'date' },
                  count: { type: 'integer' },
                },
              }),
          )
          .exactOptional()
          .openapi({
            type: 'array',
            items: {
              type: 'object',
              properties: { date: { type: 'string', format: 'date' }, count: { type: 'integer' } },
            },
          }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          total: { type: 'integer' },
          change: { type: 'number' },
          daily: {
            type: 'array',
            items: {
              type: 'object',
              properties: { date: { type: 'string', format: 'date' }, count: { type: 'integer' } },
            },
          },
        },
      }),
    engagements: z
      .object({
        total: z.int().exactOptional().openapi({ type: 'integer' }),
        change: z.number().exactOptional().openapi({ type: 'number' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      }),
    profileVisits: z
      .object({
        total: z.int().exactOptional().openapi({ type: 'integer' }),
        change: z.number().exactOptional().openapi({ type: 'number' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      }),
    mentions: z
      .object({
        total: z.int().exactOptional().openapi({ type: 'integer' }),
        change: z.number().exactOptional().openapi({ type: 'number' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      }),
    newFollowers: z
      .object({
        total: z.int().exactOptional().openapi({ type: 'integer' }),
        change: z.number().exactOptional().openapi({ type: 'number' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      period: { type: 'string' },
      impressions: {
        type: 'object',
        properties: {
          total: { type: 'integer' },
          change: { type: 'number' },
          daily: {
            type: 'array',
            items: {
              type: 'object',
              properties: { date: { type: 'string', format: 'date' }, count: { type: 'integer' } },
            },
          },
        },
      },
      engagements: {
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      },
      profileVisits: {
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      },
      mentions: {
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      },
      newFollowers: {
        type: 'object',
        properties: { total: { type: 'integer' }, change: { type: 'number' } },
      },
    },
  })
  .openapi('AccountAnalytics')

const FollowerAnalyticsSchema = z
  .object({
    totalFollowers: z.int().exactOptional().openapi({ type: 'integer' }),
    followerGrowth: z
      .array(
        z
          .object({
            date: z.iso.date().exactOptional().openapi({ type: 'string', format: 'date' }),
            gained: z.int().exactOptional().openapi({ type: 'integer' }),
            lost: z.int().exactOptional().openapi({ type: 'integer' }),
            net: z.int().exactOptional().openapi({ type: 'integer' }),
          })
          .openapi({
            type: 'object',
            properties: {
              date: { type: 'string', format: 'date' },
              gained: { type: 'integer' },
              lost: { type: 'integer' },
              net: { type: 'integer' },
            },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            date: { type: 'string', format: 'date' },
            gained: { type: 'integer' },
            lost: { type: 'integer' },
            net: { type: 'integer' },
          },
        },
      }),
    demographics: z
      .object({
        topCountries: z
          .array(
            z
              .object({
                country: z.string().exactOptional().openapi({ type: 'string' }),
                percentage: z.number().exactOptional().openapi({ type: 'number' }),
              })
              .openapi({
                type: 'object',
                properties: { country: { type: 'string' }, percentage: { type: 'number' } },
              }),
          )
          .exactOptional()
          .openapi({
            type: 'array',
            items: {
              type: 'object',
              properties: { country: { type: 'string' }, percentage: { type: 'number' } },
            },
          }),
        genderDistribution: z
          .object({
            male: z.number().exactOptional().openapi({ type: 'number' }),
            female: z.number().exactOptional().openapi({ type: 'number' }),
            other: z.number().exactOptional().openapi({ type: 'number' }),
          })
          .exactOptional()
          .openapi({
            type: 'object',
            properties: {
              male: { type: 'number' },
              female: { type: 'number' },
              other: { type: 'number' },
            },
          }),
        ageDistribution: z
          .array(
            z
              .object({
                ageRange: z.string().exactOptional().openapi({ type: 'string' }),
                percentage: z.number().exactOptional().openapi({ type: 'number' }),
              })
              .openapi({
                type: 'object',
                properties: { ageRange: { type: 'string' }, percentage: { type: 'number' } },
              }),
          )
          .exactOptional()
          .openapi({
            type: 'array',
            items: {
              type: 'object',
              properties: { ageRange: { type: 'string' }, percentage: { type: 'number' } },
            },
          }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          topCountries: {
            type: 'array',
            items: {
              type: 'object',
              properties: { country: { type: 'string' }, percentage: { type: 'number' } },
            },
          },
          genderDistribution: {
            type: 'object',
            properties: {
              male: { type: 'number' },
              female: { type: 'number' },
              other: { type: 'number' },
            },
          },
          ageDistribution: {
            type: 'array',
            items: {
              type: 'object',
              properties: { ageRange: { type: 'string' }, percentage: { type: 'number' } },
            },
          },
        },
      }),
    topInterests: z
      .array(
        z
          .object({
            interest: z.string().exactOptional().openapi({ type: 'string' }),
            percentage: z.number().exactOptional().openapi({ type: 'number' }),
          })
          .openapi({
            type: 'object',
            properties: { interest: { type: 'string' }, percentage: { type: 'number' } },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { interest: { type: 'string' }, percentage: { type: 'number' } },
        },
      }),
    activeHours: z
      .array(
        z
          .object({
            hour: z.int().exactOptional().openapi({ type: 'integer' }),
            activityScore: z.number().exactOptional().openapi({ type: 'number' }),
          })
          .openapi({
            type: 'object',
            properties: { hour: { type: 'integer' }, activityScore: { type: 'number' } },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { hour: { type: 'integer' }, activityScore: { type: 'number' } },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      totalFollowers: { type: 'integer' },
      followerGrowth: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            date: { type: 'string', format: 'date' },
            gained: { type: 'integer' },
            lost: { type: 'integer' },
            net: { type: 'integer' },
          },
        },
      },
      demographics: {
        type: 'object',
        properties: {
          topCountries: {
            type: 'array',
            items: {
              type: 'object',
              properties: { country: { type: 'string' }, percentage: { type: 'number' } },
            },
          },
          genderDistribution: {
            type: 'object',
            properties: {
              male: { type: 'number' },
              female: { type: 'number' },
              other: { type: 'number' },
            },
          },
          ageDistribution: {
            type: 'array',
            items: {
              type: 'object',
              properties: { ageRange: { type: 'string' }, percentage: { type: 'number' } },
            },
          },
        },
      },
      topInterests: {
        type: 'array',
        items: {
          type: 'object',
          properties: { interest: { type: 'string' }, percentage: { type: 'number' } },
        },
      },
      activeHours: {
        type: 'array',
        items: {
          type: 'object',
          properties: { hour: { type: 'integer' }, activityScore: { type: 'number' } },
        },
      },
    },
  })
  .openapi('FollowerAnalytics')

const PostWithAnalyticsSchema = z
  .object({
    id: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    text: z.string().exactOptional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    analytics: PostAnalyticsSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      text: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      analytics: { $ref: '#/components/schemas/PostAnalytics' },
    },
  })
  .openapi('PostWithAnalytics')

const ModerationQueueResponseSchema = z
  .object({
    data: z
      .array(ModerationItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ModerationItem' } }),
    nextCursor: z.string().exactOptional().openapi({ type: 'string' }),
    stats: z
      .object({
        pending: z.int().exactOptional().openapi({ type: 'integer' }),
        inReview: z.int().exactOptional().openapi({ type: 'integer' }),
        resolvedToday: z.int().exactOptional().openapi({ type: 'integer' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          pending: { type: 'integer' },
          inReview: { type: 'integer' },
          resolvedToday: { type: 'integer' },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/ModerationItem' } },
      nextCursor: { type: 'string' },
      stats: {
        type: 'object',
        properties: {
          pending: { type: 'integer' },
          inReview: { type: 'integer' },
          resolvedToday: { type: 'integer' },
        },
      },
    },
  })
  .openapi('ModerationQueueResponse')

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

const CursorParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } }, type: 'string' })

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
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

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
      username: z
        .string()
        .openapi({
          param: { name: 'username', in: 'query', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: '確認結果',
      content: {
        'application/json': {
          schema: z
            .object({
              available: z.boolean().exactOptional().openapi({ type: 'boolean' }),
              reason: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: { available: { type: 'boolean' }, reason: { type: 'string' } },
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
      content: {
        'application/json': {
          schema: z
            .array(MutedWordSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/MutedWord' } }),
        },
      },
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
      wordId: z
        .uuid()
        .openapi({
          param: {
            name: 'wordId',
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

export const getSettingsSessionsRoute = createRoute({
  method: 'get',
  path: '/settings/sessions',
  tags: ['Account Settings'],
  summary: 'ログインセッション一覧',
  operationId: 'listSessions',
  responses: {
    200: {
      description: 'セッション一覧',
      content: {
        'application/json': {
          schema: z
            .array(SessionSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Session' } }),
        },
      },
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
      sessionId: z
        .uuid()
        .openapi({
          param: {
            name: 'sessionId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
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
      content: {
        'application/json': {
          schema: z
            .array(ConnectedAppSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ConnectedApp' } }),
        },
      },
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
      appId: z
        .uuid()
        .openapi({
          param: {
            name: 'appId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
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
          schema: z
            .object({
              requestId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
              estimatedCompletionAt: z.iso
                .datetime()
                .exactOptional()
                .openapi({ type: 'string', format: 'date-time' }),
            })
            .openapi({
              type: 'object',
              properties: {
                requestId: { type: 'string', format: 'uuid' },
                estimatedCompletionAt: { type: 'string', format: 'date-time' },
              },
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
      requestId: z
        .uuid()
        .openapi({
          param: {
            name: 'requestId',
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
    200: {
      description: 'エクスポート状況',
      content: {
        'application/json': {
          schema: z
            .object({
              status: z
                .enum(['pending', 'processing', 'completed', 'failed'])
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['pending', 'processing', 'completed', 'failed'],
                }),
              downloadUrl: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
              expiresAt: z.iso
                .datetime()
                .exactOptional()
                .openapi({ type: 'string', format: 'date-time' }),
            })
            .openapi({
              type: 'object',
              properties: {
                status: { type: 'string', enum: ['pending', 'processing', 'completed', 'failed'] },
                downloadUrl: { type: 'string', format: 'uri' },
                expiresAt: { type: 'string', format: 'date-time' },
              },
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
          schema: z
            .object({ password: z.string().openapi({ type: 'string' }) })
            .openapi({
              type: 'object',
              required: ['password'],
              properties: { password: { type: 'string' } },
            }),
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
      reportId: z
        .uuid()
        .openapi({
          param: {
            name: 'reportId',
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
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['pending', 'in_review', 'resolved'] },
          },
          type: 'string',
          enum: ['pending', 'in_review', 'resolved'],
        }),
      type: z
        .enum(['post', 'user', 'message'])
        .exactOptional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            schema: { type: 'string', enum: ['post', 'user', 'message'] },
          },
          type: 'string',
          enum: ['post', 'user', 'message'],
        }),
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
      itemId: z
        .uuid()
        .openapi({
          param: {
            name: 'itemId',
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
  responses: {
    200: {
      description: 'モデレーション履歴',
      content: {
        'application/json': {
          schema: z
            .array(ModerationActionSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ModerationAction' } }),
        },
      },
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              reason: z.string().openapi({ type: 'string' }),
              duration: z
                .int()
                .exactOptional()
                .openapi({ type: 'integer', description: '凍結期間（時間）。省略で永久' }),
              note: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['reason'],
              properties: {
                reason: { type: 'string' },
                duration: { type: 'integer', description: '凍結期間（時間）。省略で永久' },
                note: { type: 'string' },
              },
            }),
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ note: z.string().exactOptional().openapi({ type: 'string' }) })
            .openapi({ type: 'object', properties: { note: { type: 'string' } } }),
        },
      },
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
      postId: z
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
        }),
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
        .openapi({
          param: {
            name: 'period',
            in: 'query',
            schema: { type: 'string', enum: ['7d', '28d', '90d'], default: '28d' },
          },
          type: 'string',
          enum: ['7d', '28d', '90d'],
          default: '28d',
        }),
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
        .openapi({
          param: {
            name: 'period',
            in: 'query',
            schema: { type: 'string', enum: ['7d', '28d', '90d'], default: '28d' },
          },
          type: 'string',
          enum: ['7d', '28d', '90d'],
          default: '28d',
        }),
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
        .openapi({
          param: {
            name: 'period',
            in: 'query',
            schema: { type: 'string', enum: ['7d', '28d', '90d'], default: '28d' },
          },
          type: 'string',
          enum: ['7d', '28d', '90d'],
          default: '28d',
        }),
      metric: z
        .enum(['impressions', 'engagements', 'likes', 'reposts'])
        .default('impressions')
        .exactOptional()
        .openapi({
          param: {
            name: 'metric',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['impressions', 'engagements', 'likes', 'reposts'],
              default: 'impressions',
            },
          },
          type: 'string',
          enum: ['impressions', 'engagements', 'likes', 'reposts'],
          default: 'impressions',
        }),
      limit: z
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          type: 'integer',
          default: 10,
        }),
    }),
  },
  responses: {
    200: {
      description: 'トップ投稿一覧',
      content: {
        'application/json': {
          schema: z
            .array(PostWithAnalyticsSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/PostWithAnalytics' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
