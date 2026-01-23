import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function useGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetNotificationsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', args] as const
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function useGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetNotificationsNotificationIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/{notificationId}
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['/notifications/:notificationId', args] as const
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.notifications)[':notificationId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.notifications[':notificationId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.notifications[':notificationId'].read.$post(args, clientOptions)),
  })
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.notifications)['read-all']['$post']> | undefined,
    Error,
    void
  >({
    mutationFn: async () =>
      parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
  })
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export function useGetNotificationsUnreadCount(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNotificationsUnreadCountQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.messages.send.$post> | undefined,
    Error,
    InferRequestType<typeof client.messages.send.$post>
  >({ mutationFn: async (args) => parseResponse(client.messages.send.$post(args, clientOptions)) })
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.messages)['send-batch']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.messages['send-batch'].$post(args, clientOptions)),
  })
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export function useGetMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetMessagesMessageIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /messages/{messageId}
 */
export function getGetMessagesMessageIdQueryKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['/messages/:messageId', args] as const
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function useGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTemplatesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.templates.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', args] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.templates.$post> | undefined,
    Error,
    InferRequestType<typeof client.templates.$post>
  >({ mutationFn: async (args) => parseResponse(client.templates.$post(args, clientOptions)) })
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export function useGetTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTemplatesTemplateIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /templates/{templateId}
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['/templates/:templateId', args] as const
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.templates[':templateId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.templates[':templateId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.templates[':templateId'].preview.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function useGetChannelsPreferences(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetChannelsPreferencesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.channels.preferences.$put> | undefined,
    Error,
    InferRequestType<typeof client.channels.preferences.$put>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels.preferences.$put(args, clientOptions)),
  })
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function useGetChannelsDevices(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetChannelsDevicesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/devices
 */
export function getGetChannelsDevicesQueryKey() {
  return ['/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.channels.devices.$post> | undefined,
    Error,
    InferRequestType<typeof client.channels.devices.$post>
  >({
    mutationFn: async (args) => parseResponse(client.channels.devices.$post(args, clientOptions)),
  })
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels.devices[':deviceId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function useGetWebhooks(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWebhooksQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks
 */
export function getGetWebhooksQueryKey() {
  return ['/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webhooks.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >({ mutationFn: async (args) => parseResponse(client.webhooks.$post(args, clientOptions)) })
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhookId}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['/webhooks/:webhookId', args] as const
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhookId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhookId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhookId'].test.$post(args, clientOptions)),
  })
}
