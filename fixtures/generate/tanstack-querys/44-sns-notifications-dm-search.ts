import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
  args?: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', ...(args ? [args] : [])] as const
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
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
  return ['/notifications/unread-count'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.notifications)['mark-read']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.notifications)['mark-read']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.notifications)['mark-read']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.notifications['mark-read'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.notifications.settings.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsSettingsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.notifications.settings.$put> | undefined,
      Error,
      InferRequestType<typeof client.notifications.settings.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.notifications.settings.$put> | undefined,
    Error,
    InferRequestType<typeof client.notifications.settings.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.notifications.settings.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function useGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.dm.conversations.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations
 */
export function getGetDmConversationsQueryKey(
  args?: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', ...(args ? [args] : [])] as const
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.dm.conversations.$post> | undefined,
      Error,
      InferRequestType<typeof client.dm.conversations.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.dm.conversations.$post> | undefined,
    Error,
    InferRequestType<typeof client.dm.conversations.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.conversations.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsConversationIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations/{conversationId}
 */
export function getGetDmConversationsConversationIdQueryKey(
  args?: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['/dm/conversations/:conversationId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.conversations[':conversationId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsConversationIdMessagesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /dm/conversations/{conversationId}/messages
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args?: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['/dm/conversations/:conversationId/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.conversations[':conversationId'].read.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.dm.conversations[':conversationId'].typing.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.messages[':messageId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.messages[':messageId'].reactions.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.dm)['unread-count']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmUnreadCountQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountQueryKey() {
  return ['/dm/unread-count'] as const
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function useGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.search.posts.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchPostsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.search.posts.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /search/posts
 */
export function getGetSearchPostsQueryKey(
  args?: InferRequestType<typeof client.search.posts.$get>,
) {
  return ['/search/posts', ...(args ? [args] : [])] as const
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.search.users.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchUsersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.search.users.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /search/users
 */
export function getGetSearchUsersQueryKey(
  args?: InferRequestType<typeof client.search.users.$get>,
) {
  return ['/search/users', ...(args ? [args] : [])] as const
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.search.hashtags.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchHashtagsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsQueryKey(
  args?: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', ...(args ? [args] : [])] as const
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.search.recent.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchRecentQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /search/recent
 */
export function getGetSearchRecentQueryKey() {
  return ['/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.search.recent.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.search.recent.$delete> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client.search.recent.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export function useGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.trends.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrendsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.trends.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /trends
 */
export function getGetTrendsQueryKey(args?: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', ...(args ? [args] : [])] as const
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.trends.locations.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrendsLocationsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /trends/locations
 */
export function getGetTrendsLocationsQueryKey() {
  return ['/trends/locations'] as const
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function useGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.suggestions.users.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSuggestionsUsersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersQueryKey(
  args?: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', ...(args ? [args] : [])] as const
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.suggestions.users[':userId'].hide.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.suggestions.topics.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSuggestionsTopicsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['/suggestions/topics'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.topics[':topicId'].follow.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.topics[':topicId'].follow.$delete(args, options?.client)),
    },
    queryClient,
  )
}
