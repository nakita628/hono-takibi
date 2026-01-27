import { useQuery, useMutation } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

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
  return useQuery({ ...getGetNotificationsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /notifications
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return [client.notifications.$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.notifications.$get(args, {
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
  return useQuery({ ...getGetNotificationsUnreadCountQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /notifications/unread-count
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return [client.notifications['unread-count'].$url().pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.notifications['unread-count'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)['mark-read']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
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
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$get>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotificationsSettingsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /notifications/settings
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsSettingsQueryKey() {
  return [client.notifications.settings.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /notifications/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsSettingsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNotificationsSettingsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.notifications.settings.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$put>>>
      >
    >,
    Error,
    InferRequestType<typeof client.notifications.settings.$put>
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
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function useGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetDmConversationsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsQueryKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return [client.dm.conversations.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /dm/conversations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsQueryOptions = (
  args: InferRequestType<typeof client.dm.conversations.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.dm.conversations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.dm.conversations.$post>
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
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetDmConversationsConversationIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations/{conversationId}
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return [client.dm.conversations[':conversationId'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /dm/conversations/{conversationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.dm.conversations[':conversationId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
  mutation?: UseMutationOptions<
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
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetDmConversationsConversationIdMessagesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations/{conversationId}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return [client.dm.conversations[':conversationId'].messages.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /dm/conversations/{conversationId}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.dm.conversations[':conversationId'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
  mutation?: UseMutationOptions<
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
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
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
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
  mutation?: UseMutationOptions<
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
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
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
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
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
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
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
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.dm)['unread-count']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetDmUnreadCountQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /dm/unread-count
 * Uses $url() for type-safe key generation
 */
export function getGetDmUnreadCountQueryKey() {
  return [client.dm['unread-count'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /dm/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmUnreadCountQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDmUnreadCountQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.dm['unread-count'].$get(undefined, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.posts.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSearchPostsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /search/posts
 * Uses $url() for type-safe key generation
 */
export function getGetSearchPostsQueryKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return [client.search.posts.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /search/posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchPostsQueryOptions = (
  args: InferRequestType<typeof client.search.posts.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchPostsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.search.posts.$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.users.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSearchUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /search/users
 * Uses $url() for type-safe key generation
 */
export function getGetSearchUsersQueryKey(args: InferRequestType<typeof client.search.users.$get>) {
  return [client.search.users.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /search/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchUsersQueryOptions = (
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchUsersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.search.users.$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.hashtags.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSearchHashtagsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /search/hashtags
 * Uses $url() for type-safe key generation
 */
export function getGetSearchHashtagsQueryKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return [client.search.hashtags.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /search/hashtags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchHashtagsQueryOptions = (
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchHashtagsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.search.hashtags.$get(args, {
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSearchRecentQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /search/recent
 * Uses $url() for type-safe key generation
 */
export function getGetSearchRecentQueryKey() {
  return [client.search.recent.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /search/recent
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchRecentQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSearchRecentQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.search.recent.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$delete>>>>
      >
    | undefined,
    Error,
    void
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
 * GET /trends
 *
 * トレンド取得
 */
export function useGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTrendsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /trends
 * Uses $url() for type-safe key generation
 */
export function getGetTrendsQueryKey(args: InferRequestType<typeof client.trends.$get>) {
  return [client.trends.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /trends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsQueryOptions = (
  args: InferRequestType<typeof client.trends.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrendsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.trends.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.locations.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTrendsLocationsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /trends/locations
 * Uses $url() for type-safe key generation
 */
export function getGetTrendsLocationsQueryKey() {
  return [client.trends.locations.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /trends/locations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsLocationsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTrendsLocationsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.trends.locations.$get(undefined, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.users.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSuggestionsUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /suggestions/users
 * Uses $url() for type-safe key generation
 */
export function getGetSuggestionsUsersQueryKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return [client.suggestions.users.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /suggestions/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsUsersQueryOptions = (
  args: InferRequestType<typeof client.suggestions.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSuggestionsUsersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.suggestions.users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.suggestions.users)[':userId']['hide']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
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
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.topics.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSuggestionsTopicsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /suggestions/topics
 * Uses $url() for type-safe key generation
 */
export function getGetSuggestionsTopicsQueryKey() {
  return [client.suggestions.topics.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /suggestions/topics
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsTopicsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSuggestionsTopicsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.suggestions.topics.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
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
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
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
