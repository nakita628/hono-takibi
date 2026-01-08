import type { InferRequestType } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(arg: InferRequestType<typeof client.notifications.$get>) {
  return await client.notifications.$get(arg)
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export async function getNotificationsNotificationId(
  arg: InferRequestType<(typeof client)['notifications'][':notificationId']['$get']>,
) {
  return await client['notifications'][':notificationId']['$get'](arg)
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export async function deleteNotificationsNotificationId(
  arg: InferRequestType<(typeof client)['notifications'][':notificationId']['$delete']>,
) {
  return await client['notifications'][':notificationId']['$delete'](arg)
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export async function postNotificationsNotificationIdRead(
  arg: InferRequestType<(typeof client)['notifications'][':notificationId']['read']['$post']>,
) {
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
export async function postMessagesSend(
  arg: InferRequestType<(typeof client)['messages']['send']['$post']>,
) {
  return await client['messages']['send']['$post'](arg)
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export async function postMessagesSendBatch(
  arg: InferRequestType<(typeof client)['messages']['send-batch']['$post']>,
) {
  return await client['messages']['send-batch']['$post'](arg)
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export async function getMessagesMessageId(
  arg: InferRequestType<(typeof client)['messages'][':messageId']['$get']>,
) {
  return await client['messages'][':messageId']['$get'](arg)
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export async function getTemplates(arg: InferRequestType<typeof client.templates.$get>) {
  return await client.templates.$get(arg)
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export async function postTemplates(arg: InferRequestType<typeof client.templates.$post>) {
  return await client.templates.$post(arg)
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export async function getTemplatesTemplateId(
  arg: InferRequestType<(typeof client)['templates'][':templateId']['$get']>,
) {
  return await client['templates'][':templateId']['$get'](arg)
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export async function putTemplatesTemplateId(
  arg: InferRequestType<(typeof client)['templates'][':templateId']['$put']>,
) {
  return await client['templates'][':templateId']['$put'](arg)
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export async function deleteTemplatesTemplateId(
  arg: InferRequestType<(typeof client)['templates'][':templateId']['$delete']>,
) {
  return await client['templates'][':templateId']['$delete'](arg)
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export async function postTemplatesTemplateIdPreview(
  arg: InferRequestType<(typeof client)['templates'][':templateId']['preview']['$post']>,
) {
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
export async function putChannelsPreferences(
  arg: InferRequestType<(typeof client)['channels']['preferences']['$put']>,
) {
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
export async function postChannelsDevices(
  arg: InferRequestType<(typeof client)['channels']['devices']['$post']>,
) {
  return await client['channels']['devices']['$post'](arg)
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export async function deleteChannelsDevicesDeviceId(
  arg: InferRequestType<(typeof client)['channels']['devices'][':deviceId']['$delete']>,
) {
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
export async function postWebhooks(arg: InferRequestType<typeof client.webhooks.$post>) {
  return await client.webhooks.$post(arg)
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export async function getWebhooksWebhookId(
  arg: InferRequestType<(typeof client)['webhooks'][':webhookId']['$get']>,
) {
  return await client['webhooks'][':webhookId']['$get'](arg)
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export async function putWebhooksWebhookId(
  arg: InferRequestType<(typeof client)['webhooks'][':webhookId']['$put']>,
) {
  return await client['webhooks'][':webhookId']['$put'](arg)
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export async function deleteWebhooksWebhookId(
  arg: InferRequestType<(typeof client)['webhooks'][':webhookId']['$delete']>,
) {
  return await client['webhooks'][':webhookId']['$delete'](arg)
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export async function postWebhooksWebhookIdTest(
  arg: InferRequestType<(typeof client)['webhooks'][':webhookId']['test']['$post']>,
) {
  return await client['webhooks'][':webhookId']['test']['$post'](arg)
}
