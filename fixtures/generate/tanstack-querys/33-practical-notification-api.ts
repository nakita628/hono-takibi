import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.notifications.$get>,
      Error,
      InferResponseType<typeof client.notifications.$get>,
      readonly ['/notifications', InferRequestType<typeof client.notifications.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /notifications
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.notifications)[':notificationId']['$get']>,
      Error,
      InferResponseType<(typeof client.notifications)[':notificationId']['$get']>,
      readonly [
        '/notifications/:notificationId',
        InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsNotificationIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /notifications/{notificationId}
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
export function useDeleteNotificationsNotificationId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
      ) => parseResponse(client.notifications[':notificationId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>,
      ) => parseResponse(client.notifications[':notificationId'].read.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async () =>
        parseResponse(client.notifications['read-all'].$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
 */
export function useGetNotificationsUnreadCount(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
      Error,
      InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
      readonly ['/notifications/unread-count']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsUnreadCountQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /notifications/unread-count
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
export function usePostMessagesSend(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.messages.send.$post>) =>
        parseResponse(client.messages.send.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.messages)['send-batch']['$post']>) =>
        parseResponse(client.messages['send-batch'].$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.messages)[':messageId']['$get']>,
      Error,
      InferResponseType<(typeof client.messages)[':messageId']['$get']>,
      readonly [
        '/messages/:messageId',
        InferRequestType<(typeof client.messages)[':messageId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMessagesMessageIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /messages/{messageId}
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.templates.$get>,
      Error,
      InferResponseType<typeof client.templates.$get>,
      readonly ['/templates', InferRequestType<typeof client.templates.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTemplatesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.templates.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', args] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
        parseResponse(client.templates.$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.templates)[':templateId']['$get']>,
      Error,
      InferResponseType<(typeof client.templates)[':templateId']['$get']>,
      readonly [
        '/templates/:templateId',
        InferRequestType<(typeof client.templates)[':templateId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTemplatesTemplateIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /templates/{templateId}
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
export function usePutTemplatesTemplateId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
      ) => parseResponse(client.templates[':templateId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
      ) => parseResponse(client.templates[':templateId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
      ) => parseResponse(client.templates[':templateId'].preview.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function useGetChannelsPreferences(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.channels.preferences.$get>,
      Error,
      InferResponseType<typeof client.channels.preferences.$get>,
      readonly ['/channels/preferences']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsPreferencesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.channels.preferences.$put>) =>
        parseResponse(client.channels.preferences.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function useGetChannelsDevices(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.channels.devices.$get>,
      Error,
      InferResponseType<typeof client.channels.devices.$get>,
      readonly ['/channels/devices']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsDevicesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/devices
 */
export function getGetChannelsDevicesQueryKey() {
  return ['/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.channels.devices.$post>) =>
        parseResponse(client.channels.devices.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
      ) => parseResponse(client.channels.devices[':deviceId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function useGetWebhooks(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.webhooks.$get>,
      Error,
      InferResponseType<typeof client.webhooks.$get>,
      readonly ['/webhooks']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks
 */
export function getGetWebhooksQueryKey() {
  return ['/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
        parseResponse(client.webhooks.$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.webhooks)[':webhookId']['$get']>,
      Error,
      InferResponseType<(typeof client.webhooks)[':webhookId']['$get']>,
      readonly [
        '/webhooks/:webhookId',
        InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhookId}
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
export function usePutWebhooksWebhookId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>) =>
        parseResponse(client.webhooks[':webhookId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
      ) => parseResponse(client.webhooks[':webhookId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
      ) => parseResponse(client.webhooks[':webhookId'].test.$post(args, options?.client)),
    },
    queryClient,
  )
}
