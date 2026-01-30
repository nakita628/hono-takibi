import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

/**
 * Generates Svelte Query cache key for GET /notifications
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['notifications', 'GET', '/notifications', args] as const
}

/**
 * Returns Svelte Query query options for GET /notifications
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
export function createGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/{notificationId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['notifications', 'GET', '/notifications/:notificationId', args] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/{notificationId}
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
export function createGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsNotificationIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /notifications/{notificationId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteNotificationsNotificationIdMutationKey() {
  return ['notifications', 'DELETE', '/notifications/:notificationId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /notifications/{notificationId}
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
export function createDeleteNotificationsNotificationId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteNotificationsNotificationIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /notifications/{notificationId}/read
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsNotificationIdReadMutationKey() {
  return ['notifications', 'POST', '/notifications/:notificationId/read'] as const
}

/**
 * Returns Svelte Query mutation options for POST /notifications/{notificationId}/read
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
export function createPostNotificationsNotificationIdRead(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostNotificationsNotificationIdReadMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /notifications/read-all
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsReadAllMutationKey() {
  return ['notifications', 'POST', '/notifications/read-all'] as const
}

/**
 * Returns Svelte Query mutation options for POST /notifications/read-all
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
export function createPostNotificationsReadAll(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostNotificationsReadAllMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/unread-count
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['notifications', 'GET', '/notifications/unread-count'] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/unread-count
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
export function createGetNotificationsUnreadCount(
  options?: () => {
    query?: CreateQueryOptions<
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
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsUnreadCountQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /messages/send
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesSendMutationKey() {
  return ['messages', 'POST', '/messages/send'] as const
}

/**
 * Returns Svelte Query mutation options for POST /messages/send
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
export function createPostMessagesSend(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.send.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.messages.send.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMessagesSendMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /messages/send-batch
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesSendBatchMutationKey() {
  return ['messages', 'POST', '/messages/send-batch'] as const
}

/**
 * Returns Svelte Query mutation options for POST /messages/send-batch
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
export function createPostMessagesSendBatch(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.messages)['send-batch']['$post']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.messages)['send-batch']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMessagesSendBatchMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /messages/{messageId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMessagesMessageIdQueryKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['messages', 'GET', '/messages/:messageId', args] as const
}

/**
 * Returns Svelte Query query options for GET /messages/{messageId}
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
export function createGetMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMessagesMessageIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /templates
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['templates', 'GET', '/templates', args] as const
}

/**
 * Returns Svelte Query query options for GET /templates
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
export function createGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTemplatesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /templates
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTemplatesMutationKey() {
  return ['templates', 'POST', '/templates'] as const
}

/**
 * Returns Svelte Query mutation options for POST /templates
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
export function createPostTemplates(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>>,
      Error,
      InferRequestType<typeof client.templates.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTemplatesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /templates/{templateId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['templates', 'GET', '/templates/:templateId', args] as const
}

/**
 * Returns Svelte Query query options for GET /templates/{templateId}
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
export function createGetTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTemplatesTemplateIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /templates/{templateId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutTemplatesTemplateIdMutationKey() {
  return ['templates', 'PUT', '/templates/:templateId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /templates/{templateId}
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
export function createPutTemplatesTemplateId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.templates)[':templateId']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.templates)[':templateId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutTemplatesTemplateIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /templates/{templateId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTemplatesTemplateIdMutationKey() {
  return ['templates', 'DELETE', '/templates/:templateId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /templates/{templateId}
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
export function createDeleteTemplatesTemplateId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteTemplatesTemplateIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /templates/{templateId}/preview
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTemplatesTemplateIdPreviewMutationKey() {
  return ['templates', 'POST', '/templates/:templateId/preview'] as const
}

/**
 * Returns Svelte Query mutation options for POST /templates/{templateId}/preview
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
export function createPostTemplatesTemplateIdPreview(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostTemplatesTemplateIdPreviewMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /channels/preferences
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['channels', 'GET', '/channels/preferences'] as const
}

/**
 * Returns Svelte Query query options for GET /channels/preferences
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
export function createGetChannelsPreferences(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetChannelsPreferencesQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /channels/preferences
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsPreferencesMutationKey() {
  return ['channels', 'PUT', '/channels/preferences'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /channels/preferences
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
export function createPutChannelsPreferences(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.channels.preferences.$put>>>
        >
      >,
      Error,
      InferRequestType<typeof client.channels.preferences.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutChannelsPreferencesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /channels/devices
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetChannelsDevicesQueryKey() {
  return ['channels', 'GET', '/channels/devices'] as const
}

/**
 * Returns Svelte Query query options for GET /channels/devices
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
export function createGetChannelsDevices(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetChannelsDevicesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /channels/devices
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsDevicesMutationKey() {
  return ['channels', 'POST', '/channels/devices'] as const
}

/**
 * Returns Svelte Query mutation options for POST /channels/devices
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
export function createPostChannelsDevices(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.channels.devices.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.channels.devices.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostChannelsDevicesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /channels/devices/{deviceId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsDevicesDeviceIdMutationKey() {
  return ['channels', 'DELETE', '/channels/devices/:deviceId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /channels/devices/{deviceId}
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
export function createDeleteChannelsDevicesDeviceId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteChannelsDevicesDeviceIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webhooks
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebhooksQueryKey() {
  return ['webhooks', 'GET', '/webhooks'] as const
}

/**
 * Returns Svelte Query query options for GET /webhooks
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
export function createGetWebhooks(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebhooksQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksMutationKey() {
  return ['webhooks', 'POST', '/webhooks'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webhooks
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
export function createPostWebhooks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
      Error,
      InferRequestType<typeof client.webhooks.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhookId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['webhooks', 'GET', '/webhooks/:webhookId', args] as const
}

/**
 * Returns Svelte Query query options for GET /webhooks/{webhookId}
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
export function createGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebhooksWebhookIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /webhooks/{webhookId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'PUT', '/webhooks/:webhookId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /webhooks/{webhookId}
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
export function createPutWebhooksWebhookId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhookId']['$put']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutWebhooksWebhookIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /webhooks/{webhookId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'DELETE', '/webhooks/:webhookId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /webhooks/{webhookId}
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
export function createDeleteWebhooksWebhookId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteWebhooksWebhookIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webhooks/{webhookId}/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksWebhookIdTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/:webhookId/test'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webhooks/{webhookId}/test
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
export function createPostWebhooksWebhookIdTest(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksWebhookIdTestMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
