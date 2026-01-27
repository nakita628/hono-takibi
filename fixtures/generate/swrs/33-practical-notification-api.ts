import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return client.notifications.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsNotificationIdKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return client.notifications[':notificationId'].$url(args).pathname
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.notifications)[':notificationId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteNotificationsNotificationIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']> },
      ) => parseResponse(client.notifications[':notificationId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /notifications/{notificationId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteNotificationsNotificationIdMutationKey() {
  return `DELETE ${client.notifications[':notificationId'].$url().pathname}`
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)[':notificationId']['read']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostNotificationsNotificationIdReadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
        },
      ) => parseResponse(client.notifications[':notificationId'].read.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/{notificationId}/read
 * Uses $url() for type-safe key generation
 */
export function getPostNotificationsNotificationIdReadMutationKey() {
  return `POST ${client.notifications[':notificationId'].read.$url().pathname}`
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)['read-all']['$post']>>
        >
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostNotificationsReadAllMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/read-all
 * Uses $url() for type-safe key generation
 */
export function getPostNotificationsReadAllMutationKey() {
  return `POST ${client.notifications['read-all'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsUnreadCountKey() {
  return client.notifications['unread-count'].$url().pathname
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.send.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.messages.send.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostMessagesSendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.messages.send.$post> }) =>
        parseResponse(client.messages.send.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /messages/send
 * Uses $url() for type-safe key generation
 */
export function getPostMessagesSendMutationKey() {
  return `POST ${client.messages.send.$url().pathname}`
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.messages)['send-batch']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostMessagesSendBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.messages)['send-batch']['$post']> },
      ) => parseResponse(client.messages['send-batch'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /messages/send-batch
 * Uses $url() for type-safe key generation
 */
export function getPostMessagesSendBatchMutationKey() {
  return `POST ${client.messages['send-batch'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetMessagesMessageIdKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return client.messages[':messageId'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetTemplatesKey(args: InferRequestType<typeof client.templates.$get>) {
  return client.templates.$url(args).pathname
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.templates.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostTemplatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
        parseResponse(client.templates.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates
 * Uses $url() for type-safe key generation
 */
export function getPostTemplatesMutationKey() {
  return `POST ${client.templates.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetTemplatesTemplateIdKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return client.templates[':templateId'].$url(args).pathname
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.templates)[':templateId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutTemplatesTemplateIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$put']> },
      ) => parseResponse(client.templates[':templateId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /templates/{templateId}
 * Uses $url() for type-safe key generation
 */
export function getPutTemplatesTemplateIdMutationKey() {
  return `PUT ${client.templates[':templateId'].$url().pathname}`
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.templates)[':templateId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteTemplatesTemplateIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$delete']> },
      ) => parseResponse(client.templates[':templateId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /templates/{templateId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteTemplatesTemplateIdMutationKey() {
  return `DELETE ${client.templates[':templateId'].$url().pathname}`
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.templates)[':templateId']['preview']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostTemplatesTemplateIdPreviewMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']> },
      ) => parseResponse(client.templates[':templateId'].preview.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates/{templateId}/preview
 * Uses $url() for type-safe key generation
 */
export function getPostTemplatesTemplateIdPreviewMutationKey() {
  return `POST ${client.templates[':templateId'].preview.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsPreferencesKey() {
  return client.channels.preferences.$url().pathname
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.channels.preferences.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutChannelsPreferencesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.channels.preferences.$put> }) =>
        parseResponse(client.channels.preferences.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/preferences
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsPreferencesMutationKey() {
  return `PUT ${client.channels.preferences.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsDevicesKey() {
  return client.channels.devices.$url().pathname
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.channels.devices.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsDevicesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.channels.devices.$post> }) =>
        parseResponse(client.channels.devices.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/devices
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsDevicesMutationKey() {
  return `POST ${client.channels.devices.$url().pathname}`
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels.devices)[':deviceId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsDevicesDeviceIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']> },
      ) => parseResponse(client.channels.devices[':deviceId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/devices/{deviceId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsDevicesDeviceIdMutationKey() {
  return `DELETE ${client.channels.devices[':deviceId'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksKey() {
  return client.webhooks.$url().pathname
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.webhooks.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebhooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
        parseResponse(client.webhooks.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks
 * Uses $url() for type-safe key generation
 */
export function getPostWebhooksMutationKey() {
  return `POST ${client.webhooks.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return client.webhooks[':webhookId'].$url(args).pathname
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']> },
      ) => parseResponse(client.webhooks[':webhookId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /webhooks/{webhookId}
 * Uses $url() for type-safe key generation
 */
export function getPutWebhooksWebhookIdMutationKey() {
  return `PUT ${client.webhooks[':webhookId'].$url().pathname}`
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']> },
      ) => parseResponse(client.webhooks[':webhookId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhookId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return `DELETE ${client.webhooks[':webhookId'].$url().pathname}`
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['test']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebhooksWebhookIdTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']> },
      ) => parseResponse(client.webhooks[':webhookId'].test.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhookId}/test
 * Uses $url() for type-safe key generation
 */
export function getPostWebhooksWebhookIdTestMutationKey() {
  return `POST ${client.webhooks[':webhookId'].test.$url().pathname}`
}
