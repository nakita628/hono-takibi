import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications.$get(args, options))
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export async function getNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications[':notificationId'].$get(args, options))
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export async function deleteNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications[':notificationId'].$delete(args, options))
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export async function postNotificationsNotificationIdRead(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications[':notificationId'].read.$post(args, options))
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export async function postNotificationsReadAll(options?: ClientRequestOptions) {
  return await parseResponse(client.notifications['read-all'].$post(undefined, options))
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export async function getNotificationsUnreadCount(options?: ClientRequestOptions) {
  return await parseResponse(client.notifications['unread-count'].$get(undefined, options))
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export async function postMessagesSend(
  args: InferRequestType<typeof client.messages.send.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.messages.send.$post(args, options))
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export async function postMessagesSendBatch(
  args: InferRequestType<(typeof client.messages)['send-batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.messages['send-batch'].$post(args, options))
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export async function getMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.messages[':messageId'].$get(args, options))
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export async function getTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates.$get(args, options))
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export async function postTemplates(
  args: InferRequestType<typeof client.templates.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates.$post(args, options))
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export async function getTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates[':templateId'].$get(args, options))
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export async function putTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates[':templateId'].$put(args, options))
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export async function deleteTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates[':templateId'].$delete(args, options))
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export async function postTemplatesTemplateIdPreview(
  args: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates[':templateId'].preview.$post(args, options))
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export async function getChannelsPreferences(options?: ClientRequestOptions) {
  return await parseResponse(client.channels.preferences.$get(undefined, options))
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export async function putChannelsPreferences(
  args: InferRequestType<typeof client.channels.preferences.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.channels.preferences.$put(args, options))
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export async function getChannelsDevices(options?: ClientRequestOptions) {
  return await parseResponse(client.channels.devices.$get(undefined, options))
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export async function postChannelsDevices(
  args: InferRequestType<typeof client.channels.devices.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.channels.devices.$post(args, options))
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export async function deleteChannelsDevicesDeviceId(
  args: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.channels.devices[':deviceId'].$delete(args, options))
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export async function getWebhooks(options?: ClientRequestOptions) {
  return await parseResponse(client.webhooks.$get(undefined, options))
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export async function postWebhooks(
  args: InferRequestType<typeof client.webhooks.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.$post(args, options))
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export async function getWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks[':webhookId'].$get(args, options))
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export async function putWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks[':webhookId'].$put(args, options))
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export async function deleteWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks[':webhookId'].$delete(args, options))
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export async function postWebhooksWebhookIdTest(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks[':webhookId'].test.$post(args, options))
}
