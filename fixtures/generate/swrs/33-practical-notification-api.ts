import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.notifications.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/notifications', args] as const) : null
  return useSWR<InferResponseType<typeof client.notifications.$get>, Error>(
    key,
    async () => parseResponse(client.notifications.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return ['GET', '/notifications', args] as const
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function useGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.notifications)[':notificationId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/notifications/:notificationId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.notifications)[':notificationId']['$get']>, Error>(
    key,
    async () => parseResponse(client.notifications[':notificationId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications/{notificationId}
 */
export function getGetNotificationsNotificationIdKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['GET', '/notifications/:notificationId', args] as const
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)[':notificationId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.notifications)[':notificationId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >(
    'DELETE /notifications/:notificationId',
    async (_, { arg }) =>
      parseResponse(client.notifications[':notificationId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >(
    'POST /notifications/:notificationId/read',
    async (_, { arg }) =>
      parseResponse(client.notifications[':notificationId'].read.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)['read-all']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.notifications)['read-all']['$post']>,
    Error,
    string,
    void
  >(
    'POST /notifications/read-all',
    async () => parseResponse(client.notifications['read-all'].$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/notifications/unread-count'] as const) : null
  return useSWR<InferResponseType<(typeof client.notifications)['unread-count']['$get']>, Error>(
    key,
    async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountKey() {
  return ['GET', '/notifications/unread-count'] as const
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.send.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.send.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.messages.send.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.send.$post>
  >(
    'POST /messages/send',
    async (_, { arg }) => parseResponse(client.messages.send.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.messages)['send-batch']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.messages)['send-batch']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >(
    'POST /messages/send-batch',
    async (_, { arg }) => parseResponse(client.messages['send-batch'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export function useGetMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.messages)[':messageId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/messages/:messageId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.messages)[':messageId']['$get']>, Error>(
    key,
    async () => parseResponse(client.messages[':messageId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /messages/{messageId}
 */
export function getGetMessagesMessageIdKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['GET', '/messages/:messageId', args] as const
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function useGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.templates.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/templates', args] as const) : null
  return useSWR<InferResponseType<typeof client.templates.$get>, Error>(
    key,
    async () => parseResponse(client.templates.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /templates
 */
export function getGetTemplatesKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['GET', '/templates', args] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.templates.$post>,
    Error,
    string,
    InferRequestType<typeof client.templates.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.templates.$post>,
    Error,
    string,
    InferRequestType<typeof client.templates.$post>
  >(
    'POST /templates',
    async (_, { arg }) => parseResponse(client.templates.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export function useGetTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.templates)[':templateId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/templates/:templateId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.templates)[':templateId']['$get']>, Error>(
    key,
    async () => parseResponse(client.templates[':templateId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /templates/{templateId}
 */
export function getGetTemplatesTemplateIdKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['GET', '/templates/:templateId', args] as const
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >(
    'PUT /templates/:templateId',
    async (_, { arg }) => parseResponse(client.templates[':templateId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >(
    'DELETE /templates/:templateId',
    async (_, { arg }) =>
      parseResponse(client.templates[':templateId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >(
    'POST /templates/:templateId/preview',
    async (_, { arg }) =>
      parseResponse(client.templates[':templateId'].preview.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function useGetChannelsPreferences(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.channels.preferences.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/channels/preferences'] as const) : null
  return useSWR<InferResponseType<typeof client.channels.preferences.$get>, Error>(
    key,
    async () => parseResponse(client.channels.preferences.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesKey() {
  return ['GET', '/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.channels.preferences.$put>,
    Error,
    string,
    InferRequestType<typeof client.channels.preferences.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.channels.preferences.$put>,
    Error,
    string,
    InferRequestType<typeof client.channels.preferences.$put>
  >(
    'PUT /channels/preferences',
    async (_, { arg }) => parseResponse(client.channels.preferences.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function useGetChannelsDevices(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.channels.devices.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/channels/devices'] as const) : null
  return useSWR<InferResponseType<typeof client.channels.devices.$get>, Error>(
    key,
    async () => parseResponse(client.channels.devices.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/devices
 */
export function getGetChannelsDevicesKey() {
  return ['GET', '/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.channels.devices.$post>,
    Error,
    string,
    InferRequestType<typeof client.channels.devices.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.channels.devices.$post>,
    Error,
    string,
    InferRequestType<typeof client.channels.devices.$post>
  >(
    'POST /channels/devices',
    async (_, { arg }) => parseResponse(client.channels.devices.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >(
    'DELETE /channels/devices/:deviceId',
    async (_, { arg }) =>
      parseResponse(client.channels.devices[':deviceId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function useGetWebhooks(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.webhooks.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/webhooks'] as const) : null
  return useSWR<InferResponseType<typeof client.webhooks.$get>, Error>(
    key,
    async () => parseResponse(client.webhooks.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks
 */
export function getGetWebhooksKey() {
  return ['GET', '/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >(
    'POST /webhooks',
    async (_, { arg }) => parseResponse(client.webhooks.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.webhooks)[':webhookId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/webhooks/:webhookId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.webhooks)[':webhookId']['$get']>, Error>(
    key,
    async () => parseResponse(client.webhooks[':webhookId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks/{webhookId}
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['GET', '/webhooks/:webhookId', args] as const
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >(
    'PUT /webhooks/:webhookId',
    async (_, { arg }) => parseResponse(client.webhooks[':webhookId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >(
    'DELETE /webhooks/:webhookId',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhookId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >(
    'POST /webhooks/:webhookId/test',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhookId'].test.$post(arg, options?.client)),
    options?.swr,
  )
}
