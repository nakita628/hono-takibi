import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * Generates SWR cache key for GET /notifications
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return ['/notifications', args] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/{notificationId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetNotificationsNotificationIdKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return [`/notifications/${args.param.notificationId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsNotificationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /notifications/{notificationId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteNotificationsNotificationIdMutationKey() {
  return ['/notifications/:notificationId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteNotificationsNotificationIdMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/{notificationId}/read
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostNotificationsNotificationIdReadMutationKey() {
  return ['/notifications/:notificationId/read'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsNotificationIdReadMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/read-all
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostNotificationsReadAllMutationKey() {
  return ['/notifications/read-all'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsReadAllMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetNotificationsUnreadCountKey() {
  return ['/notifications/unread-count'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /messages/send
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostMessagesSendMutationKey() {
  return ['/messages/send'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMessagesSendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.messages.send.$post> }) =>
        parseResponse(client.messages.send.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /messages/send-batch
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostMessagesSendBatchMutationKey() {
  return ['/messages/send-batch'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMessagesSendBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.messages)['send-batch']['$post']> },
      ) => parseResponse(client.messages['send-batch'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /messages/{messageId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMessagesMessageIdKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return [`/messages/${args.param.messageId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMessagesMessageIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTemplatesKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTemplatesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTemplatesMutationKey() {
  return ['/templates'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTemplatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
        parseResponse(client.templates.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates/{templateId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTemplatesTemplateIdKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return [`/templates/${args.param.templateId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTemplatesTemplateIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /templates/{templateId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutTemplatesTemplateIdMutationKey() {
  return ['/templates/:templateId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutTemplatesTemplateIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$put']> },
      ) => parseResponse(client.templates[':templateId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /templates/{templateId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteTemplatesTemplateIdMutationKey() {
  return ['/templates/:templateId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteTemplatesTemplateIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.templates)[':templateId']['$delete']> },
      ) => parseResponse(client.templates[':templateId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates/{templateId}/preview
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTemplatesTemplateIdPreviewMutationKey() {
  return ['/templates/:templateId/preview'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTemplatesTemplateIdPreviewMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/preferences
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetChannelsPreferencesKey() {
  return ['/channels/preferences'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsPreferencesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/preferences
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsPreferencesMutationKey() {
  return ['/channels/preferences'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsPreferencesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.channels.preferences.$put> }) =>
        parseResponse(client.channels.preferences.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/devices
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetChannelsDevicesKey() {
  return ['/channels/devices'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/devices
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsDevicesMutationKey() {
  return ['/channels/devices'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsDevicesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.channels.devices.$post> }) =>
        parseResponse(client.channels.devices.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/devices/{deviceId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsDevicesDeviceIdMutationKey() {
  return ['/channels/devices/:deviceId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsDevicesDeviceIdMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetWebhooksKey() {
  return ['/webhooks'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWebhooksKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksMutationKey() {
  return ['/webhooks'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
        parseResponse(client.webhooks.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhookId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return [`/webhooks/${args.param.webhookId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWebhooksWebhookIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /webhooks/{webhookId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutWebhooksWebhookIdMutationKey() {
  return ['/webhooks/:webhookId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']> },
      ) => parseResponse(client.webhooks[':webhookId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhookId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['/webhooks/:webhookId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']> },
      ) => parseResponse(client.webhooks[':webhookId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhookId}/test
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksWebhookIdTestMutationKey() {
  return ['/webhooks/:webhookId/test'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']> },
      ) => parseResponse(client.webhooks[':webhookId'].test.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
