import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * Generates Vue Query cache key for GET /notifications
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.notifications.$get>>,
) {
  return ['notifications', 'GET', '/notifications', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /notifications
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNotificationsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /notifications/{notificationId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.notifications)[':notificationId']['$get']>>,
) {
  return ['notifications', 'GET', '/notifications/:notificationId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /notifications/{notificationId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.notifications)[':notificationId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /notifications/{notificationId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteNotificationsNotificationIdMutationKey() {
  return ['notifications', 'DELETE', '/notifications/:notificationId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /notifications/{notificationId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteNotificationsNotificationIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteNotificationsNotificationIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
  ) => parseResponse(client.notifications[':notificationId'].$delete(args, clientOptions)),
})

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteNotificationsNotificationIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /notifications/{notificationId}/read
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsNotificationIdReadMutationKey() {
  return ['notifications', 'POST', '/notifications/:notificationId/read'] as const
}

/**
 * Returns Vue Query mutation options for POST /notifications/{notificationId}/read
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNotificationsNotificationIdReadMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostNotificationsNotificationIdReadMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>,
  ) => parseResponse(client.notifications[':notificationId'].read.$post(args, clientOptions)),
})

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function usePostNotificationsNotificationIdRead(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.notifications)[':notificationId']['read']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostNotificationsNotificationIdReadMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /notifications/read-all
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsReadAllMutationKey() {
  return ['notifications', 'POST', '/notifications/read-all'] as const
}

/**
 * Returns Vue Query mutation options for POST /notifications/read-all
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNotificationsReadAllMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostNotificationsReadAllMutationKey(),
  mutationFn: async () =>
    parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
})

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function usePostNotificationsReadAll(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.notifications)['read-all']['$post']>>
            >
          >
        >,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostNotificationsReadAllMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /notifications/unread-count
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['notifications', 'GET', '/notifications/unread-count'] as const
}

/**
 * Returns Vue Query query options for GET /notifications/unread-count
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.notifications)['unread-count']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetNotificationsUnreadCountQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /messages/send
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesSendMutationKey() {
  return ['messages', 'POST', '/messages/send'] as const
}

/**
 * Returns Vue Query mutation options for POST /messages/send
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMessagesSendMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMessagesSendMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.messages.send.$post>) =>
    parseResponse(client.messages.send.$post(args, clientOptions)),
})

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.send.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.messages.send.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostMessagesSendMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /messages/send-batch
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesSendBatchMutationKey() {
  return ['messages', 'POST', '/messages/send-batch'] as const
}

/**
 * Returns Vue Query mutation options for POST /messages/send-batch
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMessagesSendBatchMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMessagesSendBatchMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.messages)['send-batch']['$post']>) =>
    parseResponse(client.messages['send-batch'].$post(args, clientOptions)),
})

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function usePostMessagesSendBatch(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.messages)['send-batch']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.messages)['send-batch']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostMessagesSendBatchMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /messages/{messageId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMessagesMessageIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.messages)[':messageId']['$get']>>,
) {
  return ['messages', 'GET', '/messages/:messageId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /messages/{messageId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.messages)[':messageId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /templates
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTemplatesQueryKey(
  args: MaybeRef<InferRequestType<typeof client.templates.$get>>,
) {
  return ['templates', 'GET', '/templates', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /templates
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTemplatesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /templates
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTemplatesMutationKey() {
  return ['templates', 'POST', '/templates'] as const
}

/**
 * Returns Vue Query mutation options for POST /templates
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTemplatesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTemplatesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
    parseResponse(client.templates.$post(args, clientOptions)),
})

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.templates.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTemplatesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /templates/{templateId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.templates)[':templateId']['$get']>>,
) {
  return ['templates', 'GET', '/templates/:templateId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /templates/{templateId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.templates)[':templateId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /templates/{templateId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutTemplatesTemplateIdMutationKey() {
  return ['templates', 'PUT', '/templates/:templateId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /templates/{templateId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutTemplatesTemplateIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutTemplatesTemplateIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.templates)[':templateId']['$put']>) =>
    parseResponse(client.templates[':templateId'].$put(args, clientOptions)),
})

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.templates)[':templateId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.templates)[':templateId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutTemplatesTemplateIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /templates/{templateId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTemplatesTemplateIdMutationKey() {
  return ['templates', 'DELETE', '/templates/:templateId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /templates/{templateId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTemplatesTemplateIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteTemplatesTemplateIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.templates)[':templateId']['$delete']>) =>
    parseResponse(client.templates[':templateId'].$delete(args, clientOptions)),
})

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function useDeleteTemplatesTemplateId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteTemplatesTemplateIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /templates/{templateId}/preview
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTemplatesTemplateIdPreviewMutationKey() {
  return ['templates', 'POST', '/templates/:templateId/preview'] as const
}

/**
 * Returns Vue Query mutation options for POST /templates/{templateId}/preview
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTemplatesTemplateIdPreviewMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostTemplatesTemplateIdPreviewMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
  ) => parseResponse(client.templates[':templateId'].preview.$post(args, clientOptions)),
})

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function usePostTemplatesTemplateIdPreview(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.templates)[':templateId']['preview']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostTemplatesTemplateIdPreviewMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/preferences
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['channels', 'GET', '/channels/preferences'] as const
}

/**
 * Returns Vue Query query options for GET /channels/preferences
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$get>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsPreferencesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /channels/preferences
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsPreferencesMutationKey() {
  return ['channels', 'PUT', '/channels/preferences'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/preferences
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsPreferencesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutChannelsPreferencesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.channels.preferences.$put>) =>
    parseResponse(client.channels.preferences.$put(args, clientOptions)),
})

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$put>>>
          >
        >,
        Error,
        InferRequestType<typeof client.channels.preferences.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsPreferencesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/devices
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetChannelsDevicesQueryKey() {
  return ['channels', 'GET', '/channels/devices'] as const
}

/**
 * Returns Vue Query query options for GET /channels/devices
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsDevicesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/devices
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsDevicesMutationKey() {
  return ['channels', 'POST', '/channels/devices'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/devices
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsDevicesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostChannelsDevicesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.channels.devices.$post>) =>
    parseResponse(client.channels.devices.$post(args, clientOptions)),
})

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.channels.devices.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsDevicesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/devices/{deviceId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsDevicesDeviceIdMutationKey() {
  return ['channels', 'DELETE', '/channels/devices/:deviceId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/devices/{deviceId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsDevicesDeviceIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsDevicesDeviceIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
  ) => parseResponse(client.channels.devices[':deviceId'].$delete(args, clientOptions)),
})

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function useDeleteChannelsDevicesDeviceId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsDevicesDeviceIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebhooksQueryKey() {
  return ['webhooks', 'GET', '/webhooks'] as const
}

/**
 * Returns Vue Query query options for GET /webhooks
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebhooksQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksMutationKey() {
  return ['webhooks', 'POST', '/webhooks'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWebhooksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
    parseResponse(client.webhooks.$post(args, clientOptions)),
})

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.webhooks.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhookId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>>,
) {
  return ['webhooks', 'GET', '/webhooks/:webhookId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /webhooks/{webhookId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /webhooks/{webhookId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'PUT', '/webhooks/:webhookId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /webhooks/{webhookId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutWebhooksWebhookIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutWebhooksWebhookIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>) =>
    parseResponse(client.webhooks[':webhookId'].$put(args, clientOptions)),
})

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutWebhooksWebhookIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /webhooks/{webhookId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'DELETE', '/webhooks/:webhookId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webhooks/{webhookId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebhooksWebhookIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebhooksWebhookIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>) =>
    parseResponse(client.webhooks[':webhookId'].$delete(args, clientOptions)),
})

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteWebhooksWebhookIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /webhooks/{webhookId}/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksWebhookIdTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/:webhookId/test'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks/{webhookId}/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksWebhookIdTestMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebhooksWebhookIdTestMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
  ) => parseResponse(client.webhooks[':webhookId'].test.$post(args, clientOptions)),
})

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function usePostWebhooksWebhookIdTest(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['test']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostWebhooksWebhookIdTestMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
