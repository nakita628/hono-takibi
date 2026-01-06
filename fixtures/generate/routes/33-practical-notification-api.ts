import { createRoute, z } from '@hono/zod-openapi'

const NotificationSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    body: z.string().exactOptional(),
    type: z.enum(['info', 'success', 'warning', 'error', 'system']),
    read: z.boolean(),
    data: z.looseObject({}).exactOptional(),
    actionUrl: z.url().exactOptional(),
    imageUrl: z.url().exactOptional(),
    createdAt: z.iso.datetime(),
    readAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'title', 'type', 'read', 'createdAt'] })
  .openapi('Notification')

const SendMessageRequestSchema = z
  .object({
    channel: z.enum(['email', 'sms', 'push', 'in_app']),
    to: z.xor([
      z.string().openapi({ description: 'メールアドレス、電話番号、またはユーザーID' }),
      z.array(z.string()).max(100).openapi({ maxItems: 100 }),
    ]),
    templateId: z.uuid().exactOptional(),
    subject: z.string().exactOptional().openapi({ description: 'メールの場合の件名' }),
    body: z.string().exactOptional().openapi({ description: 'テンプレートを使わない場合の本文' }),
    html: z.string().exactOptional().openapi({ description: 'メールのHTML本文' }),
    variables: z
      .record(z.string(), z.string())
      .exactOptional()
      .openapi({ description: 'テンプレート変数' }),
    data: z.looseObject({}).exactOptional().openapi({ description: 'プッシュ通知の追加データ' }),
    priority: z.enum(['low', 'normal', 'high']).default('normal').exactOptional(),
    scheduledAt: z.iso.datetime().exactOptional().openapi({ description: '予約送信日時' }),
  })
  .openapi({ required: ['channel', 'to'] })
  .openapi('SendMessageRequest')

const MessageResultSchema = z
  .object({
    messageId: z.uuid(),
    status: z.enum(['queued', 'sending', 'sent', 'delivered', 'failed']),
    scheduledAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['messageId', 'status'] })
  .openapi('MessageResult')

const BatchMessageResultSchema = z
  .object({
    batchId: z.uuid(),
    total: z.int(),
    queued: z.int(),
    failed: z.int(),
    errors: z
      .array(z.object({ index: z.int().exactOptional(), error: z.string().exactOptional() }))
      .exactOptional(),
  })
  .openapi({ required: ['batchId', 'total', 'queued', 'failed'] })
  .openapi('BatchMessageResult')

const MessageStatusSchema = z
  .object({
    id: z.uuid(),
    channel: z.enum(['email', 'sms', 'push', 'in_app']),
    to: z.string().exactOptional(),
    status: z.enum([
      'queued',
      'sending',
      'sent',
      'delivered',
      'opened',
      'clicked',
      'bounced',
      'failed',
    ]),
    error: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
    sentAt: z.iso.datetime().exactOptional(),
    deliveredAt: z.iso.datetime().exactOptional(),
    openedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'channel', 'status', 'createdAt'] })
  .openapi('MessageStatus')

const TemplateSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    channel: z.enum(['email', 'sms', 'push', 'in_app']),
    subject: z.string().exactOptional(),
    body: z.string().exactOptional(),
    html: z.string().exactOptional(),
    variables: z
      .array(
        z.object({
          name: z.string().exactOptional(),
          required: z.boolean().exactOptional(),
          default: z.string().exactOptional(),
        }),
      )
      .exactOptional(),
    active: z.boolean().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'channel', 'createdAt'] })
  .openapi('Template')

const CreateTemplateRequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    channel: z.enum(['email', 'sms', 'push', 'in_app']),
    subject: z.string().exactOptional(),
    body: z.string(),
    html: z.string().exactOptional(),
    variables: z.array(
      z
        .object({
          name: z.string(),
          required: z.boolean().default(false).exactOptional(),
          default: z.string().exactOptional(),
        })
        .exactOptional()
        .openapi({ required: ['name'] }),
    ),
  })
  .openapi({ required: ['name', 'channel', 'body'] })
  .openapi('CreateTemplateRequest')

const UpdateTemplateRequestSchema = z
  .object({
    name: z.string().min(1).max(200).exactOptional(),
    description: z.string().exactOptional(),
    subject: z.string().exactOptional(),
    body: z.string().exactOptional(),
    html: z.string().exactOptional(),
    variables: z.array(
      z
        .object({
          name: z.string(),
          required: z.boolean().exactOptional(),
          default: z.string().exactOptional(),
        })
        .exactOptional()
        .openapi({ required: ['name'] }),
    ),
    active: z.boolean().exactOptional(),
  })
  .openapi('UpdateTemplateRequest')

const ChannelSettingSchema = z
  .object({
    enabled: z.boolean().exactOptional(),
    categories: z
      .record(z.string(), z.boolean())
      .exactOptional()
      .openapi({ description: 'カテゴリ別の通知設定' }),
    quietHours: z.object({
      enabled: z.boolean().exactOptional(),
      start: z
        .string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .exactOptional()
        .openapi({ description: '開始時刻（HH:MM）' }),
      end: z
        .string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .exactOptional()
        .exactOptional()
        .openapi({ description: '終了時刻（HH:MM）' }),
      timezone: z.string().exactOptional(),
    }),
  })
  .openapi('ChannelSetting')

const ChannelPreferencesSchema = z
  .object({
    email: ChannelSettingSchema.exactOptional(),
    sms: ChannelSettingSchema.exactOptional(),
    push: ChannelSettingSchema.exactOptional(),
    inApp: ChannelSettingSchema.exactOptional(),
  })
  .openapi('ChannelPreferences')

const UpdateChannelPreferencesRequestSchema = z
  .object({
    email: ChannelSettingSchema.exactOptional(),
    sms: ChannelSettingSchema.exactOptional(),
    push: ChannelSettingSchema.exactOptional(),
    inApp: ChannelSettingSchema.exactOptional(),
  })
  .openapi('UpdateChannelPreferencesRequest')

const DeviceSchema = z
  .object({
    id: z.string(),
    platform: z.enum(['ios', 'android', 'web']),
    token: z.string(),
    name: z.string().exactOptional(),
    model: z.string().exactOptional(),
    osVersion: z.string().exactOptional(),
    appVersion: z.string().exactOptional(),
    lastActiveAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'platform', 'token', 'createdAt'] })
  .openapi('Device')

const RegisterDeviceRequestSchema = z
  .object({
    platform: z.enum(['ios', 'android', 'web']),
    token: z.string(),
    name: z.string().exactOptional(),
    model: z.string().exactOptional(),
    osVersion: z.string().exactOptional(),
    appVersion: z.string().exactOptional(),
  })
  .openapi({ required: ['platform', 'token'] })
  .openapi('RegisterDeviceRequest')

const WebhookSchema = z
  .object({
    id: z.uuid(),
    name: z.string().exactOptional(),
    url: z.url(),
    events: z.array(
      z.enum([
        'message.sent',
        'message.delivered',
        'message.failed',
        'message.opened',
        'message.clicked',
        'message.bounced',
      ]),
    ),
    secret: z.string().exactOptional().openapi({ description: '署名検証用シークレット' }),
    active: z.boolean(),
    headers: z.record(z.string(), z.string()).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'url', 'events', 'active', 'createdAt'] })
  .openapi('Webhook')

const CreateWebhookRequestSchema = z
  .object({
    name: z.string().max(200).exactOptional(),
    url: z.url(),
    events: z
      .array(
        z.enum([
          'message.sent',
          'message.delivered',
          'message.failed',
          'message.opened',
          'message.clicked',
          'message.bounced',
        ]),
      )
      .min(1)
      .openapi({ minItems: 1 }),
    headers: z.record(z.string(), z.string()).exactOptional(),
  })
  .openapi({ required: ['url', 'events'] })
  .openapi('CreateWebhookRequest')

const UpdateWebhookRequestSchema = z
  .object({
    name: z.string().max(200).exactOptional(),
    url: z.url().exactOptional(),
    events: z
      .array(
        z.enum([
          'message.sent',
          'message.delivered',
          'message.failed',
          'message.opened',
          'message.clicked',
          'message.bounced',
        ]),
      )
      .min(1)
      .exactOptional()
      .openapi({ minItems: 1 }),
    active: z.boolean().exactOptional(),
    headers: z.record(z.string(), z.string()).exactOptional(),
  })
  .openapi('UpdateWebhookRequest')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const NotificationListResponseSchema = z
  .object({ data: z.array(NotificationSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('NotificationListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })

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

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const ApiKeySecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

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
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      read: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            name: 'read',
            in: 'query',
            description: '既読/未読でフィルタ',
            schema: { type: 'boolean' },
          },
        }),
      type: z
        .enum(['info', 'success', 'warning', 'error', 'system'])
        .exactOptional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            description: '通知タイプでフィルタ',
            schema: { type: 'string', enum: ['info', 'success', 'warning', 'error', 'system'] },
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
})

export const getNotificationsNotificationIdRoute = createRoute({
  method: 'get',
  path: '/notifications/{notificationId}',
  tags: ['Notifications'],
  summary: '通知詳細取得',
  operationId: 'getNotification',
  request: {
    params: z.object({
      notificationId: z
        .uuid()
        .openapi({
          param: {
            name: 'notificationId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '通知詳細',
      content: { 'application/json': { schema: NotificationSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteNotificationsNotificationIdRoute = createRoute({
  method: 'delete',
  path: '/notifications/{notificationId}',
  tags: ['Notifications'],
  summary: '通知削除',
  operationId: 'deleteNotification',
  request: {
    params: z.object({
      notificationId: z
        .uuid()
        .openapi({
          param: {
            name: 'notificationId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postNotificationsNotificationIdReadRoute = createRoute({
  method: 'post',
  path: '/notifications/{notificationId}/read',
  tags: ['Notifications'],
  summary: '既読にする',
  operationId: 'markAsRead',
  request: {
    params: z.object({
      notificationId: z
        .uuid()
        .openapi({
          param: {
            name: 'notificationId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: { description: '成功', content: { 'application/json': { schema: NotificationSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postNotificationsReadAllRoute = createRoute({
  method: 'post',
  path: '/notifications/read-all',
  tags: ['Notifications'],
  summary: '全て既読にする',
  operationId: 'markAllAsRead',
  responses: {
    200: {
      description: '成功',
      content: {
        'application/json': { schema: z.object({ updatedCount: z.int().exactOptional() }) },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getNotificationsUnreadCountRoute = createRoute({
  method: 'get',
  path: '/notifications/unread-count',
  tags: ['Notifications'],
  summary: '未読件数取得',
  operationId: 'getUnreadCount',
  responses: {
    200: {
      description: '未読件数',
      content: { 'application/json': { schema: z.object({ count: z.int().exactOptional() }) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMessagesSendRoute = createRoute({
  method: 'post',
  path: '/messages/send',
  tags: ['Messages'],
  summary: 'メッセージ送信',
  description: '指定したチャンネルでメッセージを送信します',
  operationId: 'sendMessage',
  request: {
    body: { content: { 'application/json': { schema: SendMessageRequestSchema } }, required: true },
  },
  responses: {
    202: {
      description: '送信受付',
      content: { 'application/json': { schema: MessageResultSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { apiKey: [] }],
})

export const postMessagesSendBatchRoute = createRoute({
  method: 'post',
  path: '/messages/send-batch',
  tags: ['Messages'],
  summary: '一括メッセージ送信',
  operationId: 'sendBatchMessages',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              messages: z.array(SendMessageRequestSchema).max(1000).openapi({ maxItems: 1000 }),
            })
            .openapi({ required: ['messages'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    202: {
      description: '送信受付',
      content: { 'application/json': { schema: BatchMessageResultSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { apiKey: [] }],
})

export const getMessagesMessageIdRoute = createRoute({
  method: 'get',
  path: '/messages/{messageId}',
  tags: ['Messages'],
  summary: 'メッセージ送信状況取得',
  operationId: 'getMessageStatus',
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
        }),
    }),
  },
  responses: {
    200: {
      description: '送信状況',
      content: { 'application/json': { schema: MessageStatusSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }, { apiKey: [] }],
})

export const getTemplatesRoute = createRoute({
  method: 'get',
  path: '/templates',
  tags: ['Templates'],
  summary: 'テンプレート一覧取得',
  operationId: 'listTemplates',
  request: {
    query: z.object({
      channel: z
        .enum(['email', 'sms', 'push', 'in_app'])
        .exactOptional()
        .openapi({
          param: {
            name: 'channel',
            in: 'query',
            schema: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
          },
        }),
      search: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'search', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'テンプレート一覧',
      content: { 'application/json': { schema: z.array(TemplateSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postTemplatesRoute = createRoute({
  method: 'post',
  path: '/templates',
  tags: ['Templates'],
  summary: 'テンプレート作成',
  operationId: 'createTemplate',
  request: {
    body: {
      content: { 'application/json': { schema: CreateTemplateRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: TemplateSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTemplatesTemplateIdRoute = createRoute({
  method: 'get',
  path: '/templates/{templateId}',
  tags: ['Templates'],
  summary: 'テンプレート詳細取得',
  operationId: 'getTemplate',
  request: {
    params: z.object({
      templateId: z
        .uuid()
        .openapi({
          param: {
            name: 'templateId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'テンプレート詳細',
      content: { 'application/json': { schema: TemplateSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putTemplatesTemplateIdRoute = createRoute({
  method: 'put',
  path: '/templates/{templateId}',
  tags: ['Templates'],
  summary: 'テンプレート更新',
  operationId: 'updateTemplate',
  request: {
    params: z.object({
      templateId: z
        .uuid()
        .openapi({
          param: {
            name: 'templateId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateTemplateRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: TemplateSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteTemplatesTemplateIdRoute = createRoute({
  method: 'delete',
  path: '/templates/{templateId}',
  tags: ['Templates'],
  summary: 'テンプレート削除',
  operationId: 'deleteTemplate',
  request: {
    params: z.object({
      templateId: z
        .uuid()
        .openapi({
          param: {
            name: 'templateId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postTemplatesTemplateIdPreviewRoute = createRoute({
  method: 'post',
  path: '/templates/{templateId}/preview',
  tags: ['Templates'],
  summary: 'テンプレートプレビュー',
  operationId: 'previewTemplate',
  request: {
    params: z.object({
      templateId: z
        .uuid()
        .openapi({
          param: {
            name: 'templateId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ variables: z.record(z.string(), z.string()).exactOptional() }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'プレビュー結果',
      content: {
        'application/json': {
          schema: z.object({
            subject: z.string().exactOptional(),
            body: z.string().exactOptional(),
            html: z.string().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getChannelsPreferencesRoute = createRoute({
  method: 'get',
  path: '/channels/preferences',
  tags: ['Channels'],
  summary: 'チャンネル設定取得',
  operationId: 'getChannelPreferences',
  responses: {
    200: {
      description: 'チャンネル設定',
      content: { 'application/json': { schema: ChannelPreferencesSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putChannelsPreferencesRoute = createRoute({
  method: 'put',
  path: '/channels/preferences',
  tags: ['Channels'],
  summary: 'チャンネル設定更新',
  operationId: 'updateChannelPreferences',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateChannelPreferencesRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ChannelPreferencesSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getChannelsDevicesRoute = createRoute({
  method: 'get',
  path: '/channels/devices',
  tags: ['Channels'],
  summary: 'デバイス一覧取得',
  operationId: 'listDevices',
  responses: {
    200: {
      description: 'デバイス一覧',
      content: { 'application/json': { schema: z.array(DeviceSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postChannelsDevicesRoute = createRoute({
  method: 'post',
  path: '/channels/devices',
  tags: ['Channels'],
  summary: 'デバイス登録',
  operationId: 'registerDevice',
  request: {
    body: {
      content: { 'application/json': { schema: RegisterDeviceRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '登録成功', content: { 'application/json': { schema: DeviceSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteChannelsDevicesDeviceIdRoute = createRoute({
  method: 'delete',
  path: '/channels/devices/{deviceId}',
  tags: ['Channels'],
  summary: 'デバイス登録解除',
  operationId: 'unregisterDevice',
  request: {
    params: z.object({
      deviceId: z
        .string()
        .openapi({
          param: { name: 'deviceId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: { 204: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getWebhooksRoute = createRoute({
  method: 'get',
  path: '/webhooks',
  tags: ['Webhooks'],
  summary: 'Webhook一覧取得',
  operationId: 'listWebhooks',
  responses: {
    200: {
      description: 'Webhook一覧',
      content: { 'application/json': { schema: z.array(WebhookSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postWebhooksRoute = createRoute({
  method: 'post',
  path: '/webhooks',
  tags: ['Webhooks'],
  summary: 'Webhook作成',
  operationId: 'createWebhook',
  request: {
    body: {
      content: { 'application/json': { schema: CreateWebhookRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: WebhookSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWebhooksWebhookIdRoute = createRoute({
  method: 'get',
  path: '/webhooks/{webhookId}',
  tags: ['Webhooks'],
  summary: 'Webhook詳細取得',
  operationId: 'getWebhook',
  request: {
    params: z.object({
      webhookId: z
        .uuid()
        .openapi({
          param: {
            name: 'webhookId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'Webhook詳細', content: { 'application/json': { schema: WebhookSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putWebhooksWebhookIdRoute = createRoute({
  method: 'put',
  path: '/webhooks/{webhookId}',
  tags: ['Webhooks'],
  summary: 'Webhook更新',
  operationId: 'updateWebhook',
  request: {
    params: z.object({
      webhookId: z
        .uuid()
        .openapi({
          param: {
            name: 'webhookId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateWebhookRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: WebhookSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteWebhooksWebhookIdRoute = createRoute({
  method: 'delete',
  path: '/webhooks/{webhookId}',
  tags: ['Webhooks'],
  summary: 'Webhook削除',
  operationId: 'deleteWebhook',
  request: {
    params: z.object({
      webhookId: z
        .uuid()
        .openapi({
          param: {
            name: 'webhookId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postWebhooksWebhookIdTestRoute = createRoute({
  method: 'post',
  path: '/webhooks/{webhookId}/test',
  tags: ['Webhooks'],
  summary: 'Webhookテスト送信',
  operationId: 'testWebhook',
  request: {
    params: z.object({
      webhookId: z
        .uuid()
        .openapi({
          param: {
            name: 'webhookId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'テスト結果',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().exactOptional(),
            statusCode: z.int().exactOptional(),
            responseTime: z
              .int()
              .exactOptional()
              .openapi({ description: 'レスポンス時間（ミリ秒）' }),
            error: z.string().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
