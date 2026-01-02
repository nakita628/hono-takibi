import { createRoute, z } from '@hono/zod-openapi'

const NotificationSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    title: z.string().openapi({ type: 'string' }),
    body: z.string().optional().openapi({ type: 'string' }),
    type: z
      .enum(['info', 'success', 'warning', 'error', 'system'])
      .openapi({ type: 'string', enum: ['info', 'success', 'warning', 'error', 'system'] }),
    read: z.boolean().openapi({ type: 'boolean' }),
    data: z.looseObject({}).optional().openapi({ type: 'object', additionalProperties: true }),
    actionUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    imageUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    readAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title', 'type', 'read', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      body: { type: 'string' },
      type: { type: 'string', enum: ['info', 'success', 'warning', 'error', 'system'] },
      read: { type: 'boolean' },
      data: { type: 'object', additionalProperties: true },
      actionUrl: { type: 'string', format: 'uri' },
      imageUrl: { type: 'string', format: 'uri' },
      createdAt: { type: 'string', format: 'date-time' },
      readAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Notification')

const SendMessageRequestSchema = z
  .object({
    channel: z
      .enum(['email', 'sms', 'push', 'in_app'])
      .openapi({ type: 'string', enum: ['email', 'sms', 'push', 'in_app'] }),
    to: z
      .union([
        z
          .string()
          .openapi({ type: 'string', description: 'メールアドレス、電話番号、またはユーザーID' }),
        z
          .array(z.string().openapi({ type: 'string' }))
          .max(100)
          .openapi({ type: 'array', items: { type: 'string' }, maxItems: 100 }),
      ])
      .openapi({
        oneOf: [
          { type: 'string', description: 'メールアドレス、電話番号、またはユーザーID' },
          { type: 'array', items: { type: 'string' }, maxItems: 100 },
        ],
      }),
    templateId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    subject: z.string().optional().openapi({ type: 'string', description: 'メールの場合の件名' }),
    body: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'テンプレートを使わない場合の本文' }),
    html: z.string().optional().openapi({ type: 'string', description: 'メールのHTML本文' }),
    variables: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'テンプレート変数',
      }),
    data: z
      .looseObject({})
      .optional()
      .openapi({
        type: 'object',
        additionalProperties: true,
        description: 'プッシュ通知の追加データ',
      }),
    priority: z
      .enum(['low', 'normal', 'high'])
      .default('normal')
      .optional()
      .openapi({ type: 'string', enum: ['low', 'normal', 'high'], default: 'normal' }),
    scheduledAt: z.iso
      .datetime()
      .optional()
      .openapi({ type: 'string', format: 'date-time', description: '予約送信日時' }),
  })
  .openapi({
    type: 'object',
    required: ['channel', 'to'],
    properties: {
      channel: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
      to: {
        oneOf: [
          { type: 'string', description: 'メールアドレス、電話番号、またはユーザーID' },
          { type: 'array', items: { type: 'string' }, maxItems: 100 },
        ],
      },
      templateId: { type: 'string', format: 'uuid' },
      subject: { type: 'string', description: 'メールの場合の件名' },
      body: { type: 'string', description: 'テンプレートを使わない場合の本文' },
      html: { type: 'string', description: 'メールのHTML本文' },
      variables: {
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'テンプレート変数',
      },
      data: { type: 'object', additionalProperties: true, description: 'プッシュ通知の追加データ' },
      priority: { type: 'string', enum: ['low', 'normal', 'high'], default: 'normal' },
      scheduledAt: { type: 'string', format: 'date-time', description: '予約送信日時' },
    },
  })
  .openapi('SendMessageRequest')

const MessageResultSchema = z
  .object({
    messageId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['queued', 'sending', 'sent', 'delivered', 'failed'])
      .openapi({ type: 'string', enum: ['queued', 'sending', 'sent', 'delivered', 'failed'] }),
    scheduledAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['messageId', 'status'],
    properties: {
      messageId: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['queued', 'sending', 'sent', 'delivered', 'failed'] },
      scheduledAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('MessageResult')

const BatchMessageResultSchema = z
  .object({
    batchId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    total: z.int().openapi({ type: 'integer' }),
    queued: z.int().openapi({ type: 'integer' }),
    failed: z.int().openapi({ type: 'integer' }),
    errors: z
      .array(
        z
          .object({
            index: z.int().optional().openapi({ type: 'integer' }),
            error: z.string().optional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: { index: { type: 'integer' }, error: { type: 'string' } },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { index: { type: 'integer' }, error: { type: 'string' } },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['batchId', 'total', 'queued', 'failed'],
    properties: {
      batchId: { type: 'string', format: 'uuid' },
      total: { type: 'integer' },
      queued: { type: 'integer' },
      failed: { type: 'integer' },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: { index: { type: 'integer' }, error: { type: 'string' } },
        },
      },
    },
  })
  .openapi('BatchMessageResult')

const MessageStatusSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    channel: z
      .enum(['email', 'sms', 'push', 'in_app'])
      .openapi({ type: 'string', enum: ['email', 'sms', 'push', 'in_app'] }),
    to: z.string().optional().openapi({ type: 'string' }),
    status: z
      .enum(['queued', 'sending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'])
      .openapi({
        type: 'string',
        enum: ['queued', 'sending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'],
      }),
    error: z.string().optional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    sentAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    deliveredAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    openedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'channel', 'status', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      channel: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
      to: { type: 'string' },
      status: {
        type: 'string',
        enum: ['queued', 'sending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'],
      },
      error: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      sentAt: { type: 'string', format: 'date-time' },
      deliveredAt: { type: 'string', format: 'date-time' },
      openedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('MessageStatus')

const TemplateSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    channel: z
      .enum(['email', 'sms', 'push', 'in_app'])
      .openapi({ type: 'string', enum: ['email', 'sms', 'push', 'in_app'] }),
    subject: z.string().optional().openapi({ type: 'string' }),
    body: z.string().optional().openapi({ type: 'string' }),
    html: z.string().optional().openapi({ type: 'string' }),
    variables: z
      .array(
        z
          .object({
            name: z.string().optional().openapi({ type: 'string' }),
            required: z.boolean().optional().openapi({ type: 'boolean' }),
            default: z.string().optional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              name: { type: 'string' },
              required: { type: 'boolean' },
              default: { type: 'string' },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean' },
            default: { type: 'string' },
          },
        },
      }),
    active: z.boolean().optional().openapi({ type: 'boolean' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'channel', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      channel: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
      subject: { type: 'string' },
      body: { type: 'string' },
      html: { type: 'string' },
      variables: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean' },
            default: { type: 'string' },
          },
        },
      },
      active: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Template')

const CreateTemplateRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    channel: z
      .enum(['email', 'sms', 'push', 'in_app'])
      .openapi({ type: 'string', enum: ['email', 'sms', 'push', 'in_app'] }),
    subject: z.string().optional().openapi({ type: 'string' }),
    body: z.string().openapi({ type: 'string' }),
    html: z.string().optional().openapi({ type: 'string' }),
    variables: z
      .array(
        z
          .object({
            name: z.string().openapi({ type: 'string' }),
            required: z
              .boolean()
              .default(false)
              .optional()
              .openapi({ type: 'boolean', default: false }),
            default: z.string().optional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
              required: { type: 'boolean', default: false },
              default: { type: 'string' },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean', default: false },
            default: { type: 'string' },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'channel', 'body'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      channel: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
      subject: { type: 'string' },
      body: { type: 'string' },
      html: { type: 'string' },
      variables: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean', default: false },
            default: { type: 'string' },
          },
        },
      },
    },
  })
  .openapi('CreateTemplateRequest')

const UpdateTemplateRequestSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(200)
      .optional()
      .openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    subject: z.string().optional().openapi({ type: 'string' }),
    body: z.string().optional().openapi({ type: 'string' }),
    html: z.string().optional().openapi({ type: 'string' }),
    variables: z
      .array(
        z
          .object({
            name: z.string().openapi({ type: 'string' }),
            required: z.boolean().optional().openapi({ type: 'boolean' }),
            default: z.string().optional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
              required: { type: 'boolean' },
              default: { type: 'string' },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean' },
            default: { type: 'string' },
          },
        },
      }),
    active: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      subject: { type: 'string' },
      body: { type: 'string' },
      html: { type: 'string' },
      variables: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            required: { type: 'boolean' },
            default: { type: 'string' },
          },
        },
      },
      active: { type: 'boolean' },
    },
  })
  .openapi('UpdateTemplateRequest')

const ChannelSettingSchema = z
  .object({
    enabled: z.boolean().optional().openapi({ type: 'boolean' }),
    categories: z
      .record(z.string(), z.boolean().openapi({ type: 'boolean' }))
      .optional()
      .openapi({
        type: 'object',
        additionalProperties: { type: 'boolean' },
        description: 'カテゴリ別の通知設定',
      }),
    quietHours: z
      .object({
        enabled: z.boolean().optional().openapi({ type: 'boolean' }),
        start: z
          .string()
          .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .optional()
          .openapi({
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '開始時刻（HH:MM）',
          }),
        end: z
          .string()
          .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .optional()
          .openapi({
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '終了時刻（HH:MM）',
          }),
        timezone: z.string().optional().openapi({ type: 'string' }),
      })
      .optional()
      .openapi({
        type: 'object',
        properties: {
          enabled: { type: 'boolean' },
          start: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '開始時刻（HH:MM）',
          },
          end: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '終了時刻（HH:MM）',
          },
          timezone: { type: 'string' },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      enabled: { type: 'boolean' },
      categories: {
        type: 'object',
        additionalProperties: { type: 'boolean' },
        description: 'カテゴリ別の通知設定',
      },
      quietHours: {
        type: 'object',
        properties: {
          enabled: { type: 'boolean' },
          start: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '開始時刻（HH:MM）',
          },
          end: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            description: '終了時刻（HH:MM）',
          },
          timezone: { type: 'string' },
        },
      },
    },
  })
  .openapi('ChannelSetting')

const ChannelPreferencesSchema = z
  .object({
    email: ChannelSettingSchema.optional(),
    sms: ChannelSettingSchema.optional(),
    push: ChannelSettingSchema.optional(),
    inApp: ChannelSettingSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      email: { $ref: '#/components/schemas/ChannelSetting' },
      sms: { $ref: '#/components/schemas/ChannelSetting' },
      push: { $ref: '#/components/schemas/ChannelSetting' },
      inApp: { $ref: '#/components/schemas/ChannelSetting' },
    },
  })
  .openapi('ChannelPreferences')

const UpdateChannelPreferencesRequestSchema = z
  .object({
    email: ChannelSettingSchema.optional(),
    sms: ChannelSettingSchema.optional(),
    push: ChannelSettingSchema.optional(),
    inApp: ChannelSettingSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      email: { $ref: '#/components/schemas/ChannelSetting' },
      sms: { $ref: '#/components/schemas/ChannelSetting' },
      push: { $ref: '#/components/schemas/ChannelSetting' },
      inApp: { $ref: '#/components/schemas/ChannelSetting' },
    },
  })
  .openapi('UpdateChannelPreferencesRequest')

const DeviceSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    platform: z
      .enum(['ios', 'android', 'web'])
      .openapi({ type: 'string', enum: ['ios', 'android', 'web'] }),
    token: z.string().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
    model: z.string().optional().openapi({ type: 'string' }),
    osVersion: z.string().optional().openapi({ type: 'string' }),
    appVersion: z.string().optional().openapi({ type: 'string' }),
    lastActiveAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'platform', 'token', 'createdAt'],
    properties: {
      id: { type: 'string' },
      platform: { type: 'string', enum: ['ios', 'android', 'web'] },
      token: { type: 'string' },
      name: { type: 'string' },
      model: { type: 'string' },
      osVersion: { type: 'string' },
      appVersion: { type: 'string' },
      lastActiveAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Device')

const RegisterDeviceRequestSchema = z
  .object({
    platform: z
      .enum(['ios', 'android', 'web'])
      .openapi({ type: 'string', enum: ['ios', 'android', 'web'] }),
    token: z.string().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
    model: z.string().optional().openapi({ type: 'string' }),
    osVersion: z.string().optional().openapi({ type: 'string' }),
    appVersion: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['platform', 'token'],
    properties: {
      platform: { type: 'string', enum: ['ios', 'android', 'web'] },
      token: { type: 'string' },
      name: { type: 'string' },
      model: { type: 'string' },
      osVersion: { type: 'string' },
      appVersion: { type: 'string' },
    },
  })
  .openapi('RegisterDeviceRequest')

const WebhookSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().optional().openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    events: z
      .array(
        z
          .enum([
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ])
          .openapi({
            type: 'string',
            enum: [
              'message.sent',
              'message.delivered',
              'message.failed',
              'message.opened',
              'message.clicked',
              'message.bounced',
            ],
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      }),
    secret: z
      .string()
      .optional()
      .openapi({ type: 'string', description: '署名検証用シークレット' }),
    active: z.boolean().openapi({ type: 'boolean' }),
    headers: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'url', 'events', 'active', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      events: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      },
      secret: { type: 'string', description: '署名検証用シークレット' },
      active: { type: 'boolean' },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Webhook')

const CreateWebhookRequestSchema = z
  .object({
    name: z.string().max(200).optional().openapi({ type: 'string', maxLength: 200 }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    events: z
      .array(
        z
          .enum([
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ])
          .openapi({
            type: 'string',
            enum: [
              'message.sent',
              'message.delivered',
              'message.failed',
              'message.opened',
              'message.clicked',
              'message.bounced',
            ],
          }),
      )
      .min(1)
      .openapi({
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      }),
    headers: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'events'],
    properties: {
      name: { type: 'string', maxLength: 200 },
      url: { type: 'string', format: 'uri' },
      events: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
    },
  })
  .openapi('CreateWebhookRequest')

const UpdateWebhookRequestSchema = z
  .object({
    name: z.string().max(200).optional().openapi({ type: 'string', maxLength: 200 }),
    url: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    events: z
      .array(
        z
          .enum([
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ])
          .openapi({
            type: 'string',
            enum: [
              'message.sent',
              'message.delivered',
              'message.failed',
              'message.opened',
              'message.clicked',
              'message.bounced',
            ],
          }),
      )
      .min(1)
      .optional()
      .openapi({
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      }),
    active: z.boolean().optional().openapi({ type: 'boolean' }),
    headers: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', maxLength: 200 },
      url: { type: 'string', format: 'uri' },
      events: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: [
            'message.sent',
            'message.delivered',
            'message.failed',
            'message.opened',
            'message.clicked',
            'message.bounced',
          ],
        },
      },
      active: { type: 'boolean' },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
    },
  })
  .openapi('UpdateWebhookRequest')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('Pagination')

const NotificationListResponseSchema = z
  .object({
    data: z
      .array(NotificationSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Notification' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Notification' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('NotificationListResponse')

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

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
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
        .optional()
        .openapi({
          param: {
            name: 'read',
            in: 'query',
            description: '既読/未読でフィルタ',
            schema: { type: 'boolean' },
          },
          type: 'boolean',
        }),
      type: z
        .enum(['info', 'success', 'warning', 'error', 'system'])
        .optional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            description: '通知タイプでフィルタ',
            schema: { type: 'string', enum: ['info', 'success', 'warning', 'error', 'system'] },
          },
          type: 'string',
          enum: ['info', 'success', 'warning', 'error', 'system'],
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
          format: 'uuid',
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
        'application/json': {
          schema: z
            .object({ updatedCount: z.int().optional().openapi({ type: 'integer' }) })
            .openapi({ type: 'object', properties: { updatedCount: { type: 'integer' } } }),
        },
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
      content: {
        'application/json': {
          schema: z
            .object({ count: z.int().optional().openapi({ type: 'integer' }) })
            .openapi({ type: 'object', properties: { count: { type: 'integer' } } }),
        },
      },
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
              messages: z
                .array(SendMessageRequestSchema)
                .max(1000)
                .openapi({
                  type: 'array',
                  maxItems: 1000,
                  items: { $ref: '#/components/schemas/SendMessageRequest' },
                }),
            })
            .openapi({
              type: 'object',
              required: ['messages'],
              properties: {
                messages: {
                  type: 'array',
                  maxItems: 1000,
                  items: { $ref: '#/components/schemas/SendMessageRequest' },
                },
              },
            }),
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
          type: 'string',
          format: 'uuid',
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
        .optional()
        .openapi({
          param: {
            name: 'channel',
            in: 'query',
            schema: { type: 'string', enum: ['email', 'sms', 'push', 'in_app'] },
          },
          type: 'string',
          enum: ['email', 'sms', 'push', 'in_app'],
        }),
      search: z
        .string()
        .optional()
        .openapi({
          param: { name: 'search', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'テンプレート一覧',
      content: {
        'application/json': {
          schema: z
            .array(TemplateSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Template' } }),
        },
      },
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
          format: 'uuid',
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              variables: z
                .record(z.string(), z.string().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
            })
            .openapi({
              type: 'object',
              properties: {
                variables: { type: 'object', additionalProperties: { type: 'string' } },
              },
            }),
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
          schema: z
            .object({
              subject: z.string().optional().openapi({ type: 'string' }),
              body: z.string().optional().openapi({ type: 'string' }),
              html: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                html: { type: 'string' },
              },
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
      content: {
        'application/json': {
          schema: z
            .array(DeviceSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Device' } }),
        },
      },
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
          type: 'string',
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
      content: {
        'application/json': {
          schema: z
            .array(WebhookSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Webhook' } }),
        },
      },
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'テスト結果',
      content: {
        'application/json': {
          schema: z
            .object({
              success: z.boolean().optional().openapi({ type: 'boolean' }),
              statusCode: z.int().optional().openapi({ type: 'integer' }),
              responseTime: z
                .int()
                .optional()
                .openapi({ type: 'integer', description: 'レスポンス時間（ミリ秒）' }),
              error: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                statusCode: { type: 'integer' },
                responseTime: { type: 'integer', description: 'レスポンス時間（ミリ秒）' },
                error: { type: 'string' },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
