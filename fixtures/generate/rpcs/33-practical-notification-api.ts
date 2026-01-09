import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(
  args: {
    query: {
      page?: number
      limit?: number
      read?: string
      type?: 'info' | 'success' | 'warning' | 'error' | 'system'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.notifications.$get(args, options)
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export async function getNotificationsNotificationId(
  args: { param: { notificationId: string } },
  options?: ClientRequestOptions,
) {
  return await client['notifications'][':notificationId']['$get'](args, options)
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export async function deleteNotificationsNotificationId(
  args: { param: { notificationId: string } },
  options?: ClientRequestOptions,
) {
  return await client['notifications'][':notificationId']['$delete'](args, options)
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export async function postNotificationsNotificationIdRead(
  args: { param: { notificationId: string } },
  options?: ClientRequestOptions,
) {
  return await client['notifications'][':notificationId']['read']['$post'](args, options)
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export async function postNotificationsReadAll(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['notifications']['read-all']['$post'](args, options)
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export async function getNotificationsUnreadCount(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['notifications']['unread-count']['$get'](args, options)
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export async function postMessagesSend(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['messages']['send']['$post'](args, options)
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export async function postMessagesSendBatch(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['messages']['send-batch']['$post'](args, options)
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export async function getMessagesMessageId(
  args: { param: { messageId: string } },
  options?: ClientRequestOptions,
) {
  return await client['messages'][':messageId']['$get'](args, options)
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export async function getTemplates(
  args: { query: { channel?: 'email' | 'sms' | 'push' | 'in_app'; search?: string } },
  options?: ClientRequestOptions,
) {
  return await client.templates.$get(args, options)
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export async function postTemplates(
  args: {
    json: {
      name: string
      description?: string
      channel: 'email' | 'sms' | 'push' | 'in_app'
      subject?: string
      body: string
      html?: string
      variables?: { name: string; required?: boolean; default?: string }[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.templates.$post(args, options)
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export async function getTemplatesTemplateId(
  args: { param: { templateId: string } },
  options?: ClientRequestOptions,
) {
  return await client['templates'][':templateId']['$get'](args, options)
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export async function putTemplatesTemplateId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['templates'][':templateId']['$put'](args, options)
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export async function deleteTemplatesTemplateId(
  args: { param: { templateId: string } },
  options?: ClientRequestOptions,
) {
  return await client['templates'][':templateId']['$delete'](args, options)
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export async function postTemplatesTemplateIdPreview(
  args: { param: { templateId: string }; json: { variables?: { [key: string]: string } } },
  options?: ClientRequestOptions,
) {
  return await client['templates'][':templateId']['preview']['$post'](args, options)
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export async function getChannelsPreferences(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['channels']['preferences']['$get'](args, options)
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export async function putChannelsPreferences(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['channels']['preferences']['$put'](args, options)
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export async function getChannelsDevices(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['channels']['devices']['$get'](args, options)
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export async function postChannelsDevices(
  args: {
    json: {
      platform: 'ios' | 'android' | 'web'
      token: string
      name?: string
      model?: string
      osVersion?: string
      appVersion?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['channels']['devices']['$post'](args, options)
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export async function deleteChannelsDevicesDeviceId(
  args: { param: { deviceId: string } },
  options?: ClientRequestOptions,
) {
  return await client['channels']['devices'][':deviceId']['$delete'](args, options)
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export async function getWebhooks(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.webhooks.$get(args, options)
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export async function postWebhooks(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.webhooks.$post(args, options)
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export async function getWebhooksWebhookId(
  args: { param: { webhookId: string } },
  options?: ClientRequestOptions,
) {
  return await client['webhooks'][':webhookId']['$get'](args, options)
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export async function putWebhooksWebhookId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['webhooks'][':webhookId']['$put'](args, options)
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export async function deleteWebhooksWebhookId(
  args: { param: { webhookId: string } },
  options?: ClientRequestOptions,
) {
  return await client['webhooks'][':webhookId']['$delete'](args, options)
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export async function postWebhooksWebhookIdTest(
  args: { param: { webhookId: string } },
  options?: ClientRequestOptions,
) {
  return await client['webhooks'][':webhookId']['test']['$post'](args, options)
}
