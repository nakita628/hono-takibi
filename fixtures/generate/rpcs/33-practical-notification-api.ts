import { client } from '../clients/33-practical-notification-api'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(arg: {
  query: {
    page?: number
    limit?: number
    read?: string
    type?: 'info' | 'success' | 'warning' | 'error' | 'system'
  }
}) {
  return await client.notifications.$get(arg)
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export async function getNotificationsNotificationId(arg: { param: { notificationId: string } }) {
  return await client['notifications'][':notificationId']['$get'](arg)
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export async function deleteNotificationsNotificationId(arg: {
  param: { notificationId: string }
}) {
  return await client['notifications'][':notificationId']['$delete'](arg)
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export async function postNotificationsNotificationIdRead(arg: {
  param: { notificationId: string }
}) {
  return await client['notifications'][':notificationId']['read']['$post'](arg)
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export async function postNotificationsReadAll() {
  return await client['notifications']['read-all']['$post']()
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export async function getNotificationsUnreadCount() {
  return await client['notifications']['unread-count']['$get']()
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export async function postMessagesSend(arg: {
  json: {
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
  }
}) {
  return await client['messages']['send']['$post'](arg)
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export async function postMessagesSendBatch(arg: {
  json: {
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
  }
}) {
  return await client['messages']['send-batch']['$post'](arg)
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export async function getMessagesMessageId(arg: { param: { messageId: string } }) {
  return await client['messages'][':messageId']['$get'](arg)
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export async function getTemplates(arg: {
  query: { channel?: 'email' | 'sms' | 'push' | 'in_app'; search?: string }
}) {
  return await client.templates.$get(arg)
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export async function postTemplates(arg: {
  json: {
    name: string
    description?: string
    channel: 'email' | 'sms' | 'push' | 'in_app'
    subject?: string
    body: string
    html?: string
    variables?: { name: string; required?: boolean; default?: string }[]
  }
}) {
  return await client.templates.$post(arg)
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export async function getTemplatesTemplateId(arg: { param: { templateId: string } }) {
  return await client['templates'][':templateId']['$get'](arg)
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export async function putTemplatesTemplateId(arg: {
  param: { templateId: string }
  json: {
    name?: string
    description?: string
    subject?: string
    body?: string
    html?: string
    variables?: { name: string; required?: boolean; default?: string }[]
    active?: boolean
  }
}) {
  return await client['templates'][':templateId']['$put'](arg)
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export async function deleteTemplatesTemplateId(arg: { param: { templateId: string } }) {
  return await client['templates'][':templateId']['$delete'](arg)
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export async function postTemplatesTemplateIdPreview(arg: {
  param: { templateId: string }
  json: { variables?: { [key: string]: string } }
}) {
  return await client['templates'][':templateId']['preview']['$post'](arg)
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export async function getChannelsPreferences() {
  return await client['channels']['preferences']['$get']()
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export async function putChannelsPreferences(arg: {
  json: {
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
  }
}) {
  return await client['channels']['preferences']['$put'](arg)
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export async function getChannelsDevices() {
  return await client['channels']['devices']['$get']()
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export async function postChannelsDevices(arg: {
  json: {
    platform: 'ios' | 'android' | 'web'
    token: string
    name?: string
    model?: string
    osVersion?: string
    appVersion?: string
  }
}) {
  return await client['channels']['devices']['$post'](arg)
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export async function deleteChannelsDevicesDeviceId(arg: { param: { deviceId: string } }) {
  return await client['channels']['devices'][':deviceId']['$delete'](arg)
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
export async function postWebhooks(arg: {
  json: {
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
  }
}) {
  return await client.webhooks.$post(arg)
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export async function getWebhooksWebhookId(arg: { param: { webhookId: string } }) {
  return await client['webhooks'][':webhookId']['$get'](arg)
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export async function putWebhooksWebhookId(arg: {
  param: { webhookId: string }
  json: {
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
  }
}) {
  return await client['webhooks'][':webhookId']['$put'](arg)
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export async function deleteWebhooksWebhookId(arg: { param: { webhookId: string } }) {
  return await client['webhooks'][':webhookId']['$delete'](arg)
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export async function postWebhooksWebhookIdTest(arg: { param: { webhookId: string } }) {
  return await client['webhooks'][':webhookId']['test']['$post'](arg)
}
