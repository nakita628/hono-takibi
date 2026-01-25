import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications
 */
export function getGetNotificationsKey(args?: InferRequestType<typeof client.notifications.$get>) {
  return ['/notifications', ...(args ? [args] : [])] as const
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function useGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsNotificationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/{notificationId}
 */
export function getGetNotificationsNotificationIdKey(
  args?: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['/notifications/:notificationId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)[':notificationId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /notifications/:notificationId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']> },
    ) => parseResponse(client.notifications[':notificationId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /notifications/:notificationId/read',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
      },
    ) => parseResponse(client.notifications[':notificationId'].read.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)['read-all']['$post']>,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /notifications/read-all',
    async () => parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.send.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.send.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /messages/send',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.messages.send.$post> }) =>
      parseResponse(client.messages.send.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.messages)['send-batch']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /messages/send-batch',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.messages)['send-batch']['$post']> },
    ) => parseResponse(client.messages['send-batch'].$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMessagesMessageIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /messages/{messageId}
 */
export function getGetMessagesMessageIdKey(
  args?: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['/messages/:messageId', ...(args ? [args] : [])] as const
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function useGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTemplatesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates
 */
export function getGetTemplatesKey(args?: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', ...(args ? [args] : [])] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.templates.$post>,
    Error,
    string,
    InferRequestType<typeof client.templates.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /templates',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
      parseResponse(client.templates.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTemplatesTemplateIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates/{templateId}
 */
export function getGetTemplatesTemplateIdKey(
  args?: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['/templates/:templateId', ...(args ? [args] : [])] as const
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /templates/:templateId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$put']> },
    ) => parseResponse(client.templates[':templateId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /templates/:templateId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$delete']> },
    ) => parseResponse(client.templates[':templateId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /templates/:templateId/preview',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']> },
    ) => parseResponse(client.templates[':templateId'].preview.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function useGetChannelsPreferences(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsPreferencesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesKey() {
  return ['/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.channels.preferences.$put>,
    Error,
    string,
    InferRequestType<typeof client.channels.preferences.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/preferences',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.channels.preferences.$put> },
    ) => parseResponse(client.channels.preferences.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function useGetChannelsDevices(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/devices
 */
export function getGetChannelsDevicesKey() {
  return ['/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.channels.devices.$post>,
    Error,
    string,
    InferRequestType<typeof client.channels.devices.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/devices',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.channels.devices.$post> }) =>
      parseResponse(client.channels.devices.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/devices/:deviceId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']> },
    ) => parseResponse(client.channels.devices[':deviceId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function useGetWebhooks(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebhooksKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks
 */
export function getGetWebhooksKey() {
  return ['/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
      parseResponse(client.webhooks.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebhooksWebhookIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhookId}
 */
export function getGetWebhooksWebhookIdKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['/webhooks/:webhookId', ...(args ? [args] : [])] as const
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /webhooks/:webhookId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']> },
    ) => parseResponse(client.webhooks[':webhookId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webhooks/:webhookId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']> },
    ) => parseResponse(client.webhooks[':webhookId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks/:webhookId/test',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']> },
    ) => parseResponse(client.webhooks[':webhookId'].test.$post(arg, clientOptions)),
    mutationOptions,
  )
}
