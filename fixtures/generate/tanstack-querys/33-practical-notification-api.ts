import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * Generates TanStack Query cache key for GET /notifications
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['notifications', '/notifications', args] as const
}

/**
 * Returns TanStack Query query options for GET /notifications
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsQueryOptions = (
  args: InferRequestType<typeof client.notifications.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetNotificationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function useGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNotificationsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /notifications/{notificationId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['notifications', '/notifications/:notificationId', args] as const
}

/**
 * Returns TanStack Query query options for GET /notifications/{notificationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsNotificationIdQueryOptions = (
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetNotificationsNotificationIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications[':notificationId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function useGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.notifications)[':notificationId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNotificationsNotificationIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.notifications)[':notificationId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => parseResponse(client.notifications[':notificationId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)[':notificationId']['read']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>,
    ) => parseResponse(client.notifications[':notificationId'].read.$post(args, clientOptions)),
  })
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)['read-all']['$post']>>
        >
      >
    >,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /notifications/unread-count
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['notifications', '/notifications/unread-count'] as const
}

/**
 * Returns TanStack Query query options for GET /notifications/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsUnreadCountQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetNotificationsUnreadCountQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications['unread-count'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)['unread-count']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetNotificationsUnreadCountQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.send.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.messages.send.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.messages.send.$post>) =>
      parseResponse(client.messages.send.$post(args, clientOptions)),
  })
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.messages)['send-batch']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.messages)['send-batch']['$post']>) =>
      parseResponse(client.messages['send-batch'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /messages/{messageId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMessagesMessageIdQueryKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['messages', '/messages/:messageId', args] as const
}

/**
 * Returns TanStack Query query options for GET /messages/{messageId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMessagesMessageIdQueryOptions = (
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMessagesMessageIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.messages[':messageId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export function useGetMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.messages)[':messageId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMessagesMessageIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /templates
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['templates', '/templates', args] as const
}

/**
 * Returns TanStack Query query options for GET /templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesQueryOptions = (
  args: InferRequestType<typeof client.templates.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTemplatesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.templates.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function useGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTemplatesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>>,
    Error,
    InferRequestType<typeof client.templates.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /templates/{templateId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['templates', '/templates/:templateId', args] as const
}

/**
 * Returns TanStack Query query options for GET /templates/{templateId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesTemplateIdQueryOptions = (
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTemplatesTemplateIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.templates[':templateId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export function useGetTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.templates)[':templateId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTemplatesTemplateIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.templates)[':templateId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.templates)[':templateId']['$put']>) =>
      parseResponse(client.templates[':templateId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.templates)[':templateId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => parseResponse(client.templates[':templateId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.templates)[':templateId']['preview']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => parseResponse(client.templates[':templateId'].preview.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/preferences
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['channels', '/channels/preferences'] as const
}

/**
 * Returns TanStack Query query options for GET /channels/preferences
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsPreferencesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetChannelsPreferencesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels.preferences.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function useGetChannelsPreferences(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsPreferencesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.channels.preferences.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.channels.preferences.$put>) =>
      parseResponse(client.channels.preferences.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/devices
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetChannelsDevicesQueryKey() {
  return ['channels', '/channels/devices'] as const
}

/**
 * Returns TanStack Query query options for GET /channels/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsDevicesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetChannelsDevicesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels.devices.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function useGetChannelsDevices(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsDevicesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.channels.devices.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.channels.devices.$post>) =>
      parseResponse(client.channels.devices.$post(args, clientOptions)),
  })
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels.devices)[':deviceId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => parseResponse(client.channels.devices[':deviceId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWebhooksQueryKey() {
  return ['webhooks', '/webhooks'] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWebhooksQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function useGetWebhooks(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebhooksQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhookId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['webhooks', '/webhooks/:webhookId', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhookId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks[':webhookId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebhooksWebhookIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>) =>
      parseResponse(client.webhooks[':webhookId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>) =>
      parseResponse(client.webhooks[':webhookId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['test']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => parseResponse(client.webhooks[':webhookId'].test.$post(args, clientOptions)),
  })
}
