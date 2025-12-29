import { client } from '../index.ts'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(params: {
  query: {
    page: number
    limit: number
    read: boolean
    type: 'info' | 'success' | 'warning' | 'error' | 'system'
  }
}) {
  return await client.notifications.$get({ query: params.query })
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export async function getNotificationsNotificationId(params: { path: { notificationId: string } }) {
  return await client.notifications[':notificationId'].$get({ param: params.path })
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export async function deleteNotificationsNotificationId(params: {
  path: { notificationId: string }
}) {
  return await client.notifications[':notificationId'].$delete({ param: params.path })
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export async function postNotificationsNotificationIdRead(params: {
  path: { notificationId: string }
}) {
  return await client.notifications[':notificationId'].read.$post({ param: params.path })
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export async function postNotificationsReadAll() {
  return await client.notifications['read-all'].$post()
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export async function getNotificationsUnreadCount() {
  return await client.notifications['unread-count'].$get()
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export async function postMessagesSend(body: {
  channel: 'email' | 'sms' | 'push' | 'in_app'
  to: string | string[]
  templateId?: string
  subject?: string
  body?: string
  html?: string
  variables?: { [key: string]: string }
  data?: { [key: string]: unknown }
  priority?: 'low' | 'normal' | 'high'
  scheduledAt?: string
}) {
  return await client.messages.send.$post({ json: body })
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export async function postMessagesSendBatch(body: {
  messages: {
    channel: 'email' | 'sms' | 'push' | 'in_app'
    to: string | string[]
    templateId?: string
    subject?: string
    body?: string
    html?: string
    variables?: { [key: string]: string }
    data?: { [key: string]: unknown }
    priority?: 'low' | 'normal' | 'high'
    scheduledAt?: string
  }[]
}) {
  return await client.messages['send-batch'].$post({ json: body })
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export async function getMessagesMessageId(params: { path: { messageId: string } }) {
  return await client.messages[':messageId'].$get({ param: params.path })
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export async function getTemplates(params: {
  query: { channel: 'email' | 'sms' | 'push' | 'in_app'; search: string }
}) {
  return await client.templates.$get({ query: params.query })
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export async function postTemplates(body: {
  name: string
  description?: string
  channel: 'email' | 'sms' | 'push' | 'in_app'
  subject?: string
  body: string
  html?: string
  variables?: { name: string; required?: boolean; default?: string }[]
}) {
  return await client.templates.$post({ json: body })
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export async function getTemplatesTemplateId(params: { path: { templateId: string } }) {
  return await client.templates[':templateId'].$get({ param: params.path })
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export async function putTemplatesTemplateId(
  params: { path: { templateId: string } },
  body: {
    name?: string
    description?: string
    subject?: string
    body?: string
    html?: string
    variables?: { name: string; required?: boolean; default?: string }[]
    active?: boolean
  },
) {
  return await client.templates[':templateId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export async function deleteTemplatesTemplateId(params: { path: { templateId: string } }) {
  return await client.templates[':templateId'].$delete({ param: params.path })
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export async function postTemplatesTemplateIdPreview(
  params: { path: { templateId: string } },
  body: { variables?: { [key: string]: string } },
) {
  return await client.templates[':templateId'].preview.$post({ param: params.path, json: body })
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export async function getChannelsPreferences() {
  return await client.channels.preferences.$get()
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export async function putChannelsPreferences(body: {
  email?: {
    enabled?: boolean
    categories?: { [key: string]: boolean }
    quietHours?: { enabled?: boolean; start?: string; end?: string; timezone?: string }
  }
  sms?: {
    enabled?: boolean
    categories?: { [key: string]: boolean }
    quietHours?: { enabled?: boolean; start?: string; end?: string; timezone?: string }
  }
  push?: {
    enabled?: boolean
    categories?: { [key: string]: boolean }
    quietHours?: { enabled?: boolean; start?: string; end?: string; timezone?: string }
  }
  inApp?: {
    enabled?: boolean
    categories?: { [key: string]: boolean }
    quietHours?: { enabled?: boolean; start?: string; end?: string; timezone?: string }
  }
}) {
  return await client.channels.preferences.$put({ json: body })
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export async function getChannelsDevices() {
  return await client.channels.devices.$get()
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export async function postChannelsDevices(body: {
  platform: 'ios' | 'android' | 'web'
  token: string
  name?: string
  model?: string
  osVersion?: string
  appVersion?: string
}) {
  return await client.channels.devices.$post({ json: body })
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export async function deleteChannelsDevicesDeviceId(params: { path: { deviceId: string } }) {
  return await client.channels.devices[':deviceId'].$delete({ param: params.path })
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export async function getWebhooks() {
  return await client.webhooks.$get()
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export async function postWebhooks(body: {
  name?: string
  url: string
  events: (
    | 'message.sent'
    | 'message.delivered'
    | 'message.failed'
    | 'message.opened'
    | 'message.clicked'
    | 'message.bounced'
  )[]
  headers?: { [key: string]: string }
}) {
  return await client.webhooks.$post({ json: body })
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export async function getWebhooksWebhookId(params: { path: { webhookId: string } }) {
  return await client.webhooks[':webhookId'].$get({ param: params.path })
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export async function putWebhooksWebhookId(
  params: { path: { webhookId: string } },
  body: {
    name?: string
    url?: string
    events?: (
      | 'message.sent'
      | 'message.delivered'
      | 'message.failed'
      | 'message.opened'
      | 'message.clicked'
      | 'message.bounced'
    )[]
    active?: boolean
    headers?: { [key: string]: string }
  },
) {
  return await client.webhooks[':webhookId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export async function deleteWebhooksWebhookId(params: { path: { webhookId: string } }) {
  return await client.webhooks[':webhookId'].$delete({ param: params.path })
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export async function postWebhooksWebhookIdTest(params: { path: { webhookId: string } }) {
  return await client.webhooks[':webhookId'].test.$post({ param: params.path })
}
