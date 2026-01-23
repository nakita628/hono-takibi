import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.notifications.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
      ...queryOptions,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.notifications)[':notificationId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsNotificationIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
      ...queryOptions,
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
  return ['GET', '/notifications/:notificationId', args] as const
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.notifications)[':notificationId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.notifications)[':notificationId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.notifications[':notificationId'].$delete(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.notifications[':notificationId'].read.$post(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.notifications)['read-all']['$post']> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.notifications)['read-all']['$post']> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsUnreadCountQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['GET', '/notifications/unread-count'] as const
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.messages.send.$post> | undefined,
      Error,
      InferRequestType<typeof client.messages.send.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.messages.send.$post> | undefined,
    Error,
    InferRequestType<typeof client.messages.send.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.messages.send.$post(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.messages)['send-batch']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.messages)['send-batch']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.messages)['send-batch']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.messages)['send-batch']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.messages)[':messageId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMessagesMessageIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
      ...queryOptions,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.templates.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTemplatesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.templates.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['GET', '/templates', args] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.templates.$post> | undefined,
      Error,
      InferRequestType<typeof client.templates.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.templates.$post> | undefined,
    Error,
    InferRequestType<typeof client.templates.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.templates.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.templates)[':templateId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTemplatesTemplateIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
      ...queryOptions,
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
  return ['GET', '/templates/:templateId', args] as const
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.templates)[':templateId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.templates)[':templateId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.templates[':templateId'].$put(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.templates)[':templateId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.templates[':templateId'].$delete(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.templates[':templateId'].preview.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.channels.preferences.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsPreferencesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['GET', '/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.channels.preferences.$put> | undefined,
      Error,
      InferRequestType<typeof client.channels.preferences.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.channels.preferences.$put> | undefined,
    Error,
    InferRequestType<typeof client.channels.preferences.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.channels.devices.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsDevicesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/devices
 */
export function getGetChannelsDevicesQueryKey() {
  return ['GET', '/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.channels.devices.$post> | undefined,
      Error,
      InferRequestType<typeof client.channels.devices.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.channels.devices.$post> | undefined,
    Error,
    InferRequestType<typeof client.channels.devices.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels.devices[':deviceId'].$delete(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.webhooks.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks
 */
export function getGetWebhooksQueryKey() {
  return ['GET', '/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.webhooks.$post> | undefined,
      Error,
      InferRequestType<typeof client.webhooks.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.webhooks.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.webhooks.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.webhooks)[':webhookId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
      ...queryOptions,
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
  return ['GET', '/webhooks/:webhookId', args] as const
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhookId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webhooks[':webhookId'].$delete(args, options?.client)),
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webhooks[':webhookId'].test.$post(args, options?.client)),
    },
    queryClient,
  )
}
