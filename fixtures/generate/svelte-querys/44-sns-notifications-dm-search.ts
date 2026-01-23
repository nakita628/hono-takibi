import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function createGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.notifications.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /notifications
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
export function createGetNotificationsUnreadCount(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsUnreadCountQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function createPostNotificationsMarkRead(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.notifications)['mark-read']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.notifications)['mark-read']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetNotificationsSettings(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.notifications.settings.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNotificationsSettingsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function createPutNotificationsSettings(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.notifications.settings.$put> | undefined,
      Error,
      InferRequestType<typeof client.notifications.settings.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.dm.conversations.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations
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
export function createPostDmConversations(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.dm.conversations.$post> | undefined,
      Error,
      InferRequestType<typeof client.dm.conversations.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsConversationIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}
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
export function createDeleteDmConversationsConversationId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmConversationsConversationIdMessagesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}/messages
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
export function createPostDmConversationsConversationIdMessages(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostDmConversationsConversationIdRead(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostDmConversationsConversationIdTyping(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteDmMessagesMessageId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostDmMessagesMessageIdReactions(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteDmMessagesMessageIdReactions(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetDmUnreadCount(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.dm)['unread-count']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDmUnreadCountQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountQueryKey() {
  return ['/dm/unread-count'] as const
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function createGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.search.posts.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchPostsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.posts.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search/posts
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
export function createGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.search.users.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search/users
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
export function createGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.search.hashtags.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchHashtagsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search/hashtags
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
export function createGetSearchRecent(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.search.recent.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchRecentQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search/recent
 */
export function getGetSearchRecentQueryKey() {
  return ['/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function createDeleteSearchRecent(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.search.recent.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.trends.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrendsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.trends.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /trends
 */
export function getGetTrendsQueryKey(args?: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', ...(args ? [args] : [])] as const
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function createGetTrendsLocations(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.trends.locations.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrendsLocationsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /trends/locations
 */
export function getGetTrendsLocationsQueryKey() {
  return ['/trends/locations'] as const
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function createGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.suggestions.users.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSuggestionsUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /suggestions/users
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
export function createPostSuggestionsUsersUserIdHide(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetSuggestionsTopics(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.suggestions.topics.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSuggestionsTopicsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['/suggestions/topics'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function createPostTopicsTopicIdFollow(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteTopicsTopicIdFollow(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
