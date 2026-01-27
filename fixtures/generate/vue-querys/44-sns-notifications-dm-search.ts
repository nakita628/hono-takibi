import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * Generates Vue Query cache key for GET /notifications
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetNotificationsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.notifications.$get>>,
) {
  return ['notifications', '/notifications', unref(args)] as const
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
 * Generates Vue Query cache key for GET /notifications/unread-count
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['notifications', '/notifications/unread-count'] as const
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
 * 未読通知数取得
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
 * Generates Vue Query mutation key for POST /notifications/mark-read
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostNotificationsMarkReadMutationKey() {
  return ['POST', '/notifications/mark-read'] as const
}

/**
 * Returns Vue Query mutation options for POST /notifications/mark-read
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNotificationsMarkReadMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostNotificationsMarkReadMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>) =>
    parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
})

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.notifications)['mark-read']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.notifications)['mark-read']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/settings
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['notifications', '/notifications/settings'] as const
}

/**
 * Returns Vue Query query options for GET /notifications/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsSettingsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNotificationsSettingsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications.settings.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$get>>>
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
    getGetNotificationsSettingsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /notifications/settings
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutNotificationsSettingsMutationKey() {
  return ['PUT', '/notifications/settings'] as const
}

/**
 * Returns Vue Query mutation options for PUT /notifications/settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutNotificationsSettingsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutNotificationsSettingsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.notifications.settings.$put>) =>
    parseResponse(client.notifications.settings.$put(args, clientOptions)),
})

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$put>>>
          >
        >,
        Error,
        InferRequestType<typeof client.notifications.settings.$put>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.notifications.settings.$put>) =>
      parseResponse(client.notifications.settings.$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDmConversationsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.dm.conversations.$get>>,
) {
  return ['dm', '/dm/conversations', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsQueryOptions = (
  args: InferRequestType<typeof client.dm.conversations.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function useGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetDmConversationsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /dm/conversations
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDmConversationsMutationKey() {
  return ['POST', '/dm/conversations'] as const
}

/**
 * Returns Vue Query mutation options for POST /dm/conversations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostDmConversationsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.dm.conversations.$post>) =>
    parseResponse(client.dm.conversations.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.dm.conversations.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.dm.conversations.$post>) =>
      parseResponse(client.dm.conversations.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>>,
) {
  return ['dm', '/dm/conversations/:conversationId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations/{conversationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations[':conversationId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetDmConversationsConversationIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /dm/conversations/{conversationId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteDmConversationsConversationIdMutationKey() {
  return ['DELETE', '/dm/conversations/:conversationId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /dm/conversations/{conversationId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmConversationsConversationIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmConversationsConversationIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
})

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}/messages
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>
  >,
) {
  return ['dm', '/dm/conversations/:conversationId/messages', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations/{conversationId}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations[':conversationId'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.dm.conversations)[':conversationId']['messages']['$get']
                  >
                >
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
  const { queryKey, queryFn, ...baseOptions } =
    getGetDmConversationsConversationIdMessagesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /dm/conversations/{conversationId}/messages
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDmConversationsConversationIdMessagesMutationKey() {
  return ['POST', '/dm/conversations/:conversationId/messages'] as const
}

/**
 * Returns Vue Query mutation options for POST /dm/conversations/{conversationId}/messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdMessagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdMessagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.dm.conversations)[':conversationId']['messages']['$post']
    >,
  ) =>
    parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /dm/conversations/{conversationId}/read
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDmConversationsConversationIdReadMutationKey() {
  return ['POST', '/dm/conversations/:conversationId/read'] as const
}

/**
 * Returns Vue Query mutation options for POST /dm/conversations/{conversationId}/read
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdReadMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdReadMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /dm/conversations/{conversationId}/typing
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDmConversationsConversationIdTypingMutationKey() {
  return ['POST', '/dm/conversations/:conversationId/typing'] as const
}

/**
 * Returns Vue Query mutation options for POST /dm/conversations/{conversationId}/typing
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdTypingMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdTypingMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /dm/messages/{messageId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteDmMessagesMessageIdMutationKey() {
  return ['DELETE', '/dm/messages/:messageId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /dm/messages/{messageId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmMessagesMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
  ) => parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
})

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /dm/messages/{messageId}/reactions
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDmMessagesMessageIdReactionsMutationKey() {
  return ['POST', '/dm/messages/:messageId/reactions'] as const
}

/**
 * Returns Vue Query mutation options for POST /dm/messages/{messageId}/reactions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmMessagesMessageIdReactionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmMessagesMessageIdReactionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
  ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
})

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /dm/messages/{messageId}/reactions
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteDmMessagesMessageIdReactionsMutationKey() {
  return ['DELETE', '/dm/messages/:messageId/reactions'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /dm/messages/{messageId}/reactions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmMessagesMessageIdReactionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmMessagesMessageIdReactionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
  ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
})

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/unread-count
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetDmUnreadCountQueryKey() {
  return ['dm', '/dm/unread-count'] as const
}

/**
 * Returns Vue Query query options for GET /dm/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmUnreadCountQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDmUnreadCountQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm['unread-count'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.dm)['unread-count']['$get']>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetDmUnreadCountQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /search/posts
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchPostsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.search.posts.$get>>,
) {
  return ['search', '/search/posts', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /search/posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchPostsQueryOptions = (
  args: InferRequestType<typeof client.search.posts.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchPostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.posts.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function useGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.posts.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSearchPostsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /search/users
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchUsersQueryKey(
  args: MaybeRef<InferRequestType<typeof client.search.users.$get>>,
) {
  return ['search', '/search/users', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /search/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchUsersQueryOptions = (
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.users.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSearchUsersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /search/hashtags
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchHashtagsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.search.hashtags.$get>>,
) {
  return ['search', '/search/hashtags', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /search/hashtags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchHashtagsQueryOptions = (
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchHashtagsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.hashtags.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.search.hashtags.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSearchHashtagsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /search/recent
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSearchRecentQueryKey() {
  return ['search', '/search/recent'] as const
}

/**
 * Returns Vue Query query options for GET /search/recent
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchRecentQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSearchRecentQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.recent.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSearchRecentQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /search/recent
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteSearchRecentMutationKey() {
  return ['DELETE', '/search/recent'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /search/recent
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSearchRecentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteSearchRecentMutationKey(),
  mutationFn: async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
})

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$delete>>>
            >
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /trends
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTrendsQueryKey(args: MaybeRef<InferRequestType<typeof client.trends.$get>>) {
  return ['trends', '/trends', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /trends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsQueryOptions = (
  args: InferRequestType<typeof client.trends.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrendsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trends.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trends
 *
 * トレンド取得
 */
export function useGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTrendsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /trends/locations
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTrendsLocationsQueryKey() {
  return ['trends', '/trends/locations'] as const
}

/**
 * Returns Vue Query query options for GET /trends/locations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsLocationsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTrendsLocationsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trends.locations.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.locations.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTrendsLocationsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /suggestions/users
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSuggestionsUsersQueryKey(
  args: MaybeRef<InferRequestType<typeof client.suggestions.users.$get>>,
) {
  return ['suggestions', '/suggestions/users', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /suggestions/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsUsersQueryOptions = (
  args: InferRequestType<typeof client.suggestions.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSuggestionsUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.suggestions.users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function useGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.users.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSuggestionsUsersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /suggestions/users/{userId}/hide
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSuggestionsUsersUserIdHideMutationKey() {
  return ['POST', '/suggestions/users/:userId/hide'] as const
}

/**
 * Returns Vue Query mutation options for POST /suggestions/users/{userId}/hide
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSuggestionsUsersUserIdHideMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSuggestionsUsersUserIdHideMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
  ) => parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
})

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.suggestions.users)[':userId']['hide']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /suggestions/topics
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['suggestions', '/suggestions/topics'] as const
}

/**
 * Returns Vue Query query options for GET /suggestions/topics
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsTopicsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSuggestionsTopicsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.suggestions.topics.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.topics.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSuggestionsTopicsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /topics/{topicId}/follow
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTopicsTopicIdFollowMutationKey() {
  return ['POST', '/topics/:topicId/follow'] as const
}

/**
 * Returns Vue Query mutation options for POST /topics/{topicId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTopicsTopicIdFollowMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostTopicsTopicIdFollowMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
  ) => parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
})

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /topics/{topicId}/follow
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteTopicsTopicIdFollowMutationKey() {
  return ['DELETE', '/topics/:topicId/follow'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /topics/{topicId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTopicsTopicIdFollowMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteTopicsTopicIdFollowMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
  ) => parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
})

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
  })
}
