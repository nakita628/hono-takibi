import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.notifications.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/notifications', args] as const) : null
  return useSWR<InferResponseType<typeof client.notifications.$get>, Error>(
    key,
    async () => parseResponse(client.notifications.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return ['GET', '/notifications', args] as const
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.notifications)['unread-count']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/notifications/unread-count'] as const) : null
  return useSWR<InferResponseType<(typeof client.notifications)['unread-count']['$get']>, Error>(
    key,
    async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountKey() {
  return ['GET', '/notifications/unread-count'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)['mark-read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.notifications)['mark-read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  >(
    'POST /notifications/mark-read',
    async (_, { arg }) =>
      parseResponse(client.notifications['mark-read'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.notifications.settings.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/notifications/settings'] as const) : null
  return useSWR<InferResponseType<typeof client.notifications.settings.$get>, Error>(
    key,
    async () => parseResponse(client.notifications.settings.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsKey() {
  return ['GET', '/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.notifications.settings.$put>,
    Error,
    string,
    InferRequestType<typeof client.notifications.settings.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.notifications.settings.$put>,
    Error,
    string,
    InferRequestType<typeof client.notifications.settings.$put>
  >(
    'PUT /notifications/settings',
    async (_, { arg }) => parseResponse(client.notifications.settings.$put(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.dm.conversations.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/dm/conversations', args] as const) : null
  return useSWR<InferResponseType<typeof client.dm.conversations.$get>, Error>(
    key,
    async () => parseResponse(client.dm.conversations.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /dm/conversations
 */
export function getGetDmConversationsKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['GET', '/dm/conversations', args] as const
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.dm.conversations.$post>,
    Error,
    string,
    InferRequestType<typeof client.dm.conversations.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.dm.conversations.$post>,
    Error,
    string,
    InferRequestType<typeof client.dm.conversations.$post>
  >(
    'POST /dm/conversations',
    async (_, { arg }) => parseResponse(client.dm.conversations.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/dm/conversations/:conversationId', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.dm.conversations[':conversationId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId}
 */
export function getGetDmConversationsConversationIdKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['GET', '/dm/conversations/:conversationId', args] as const
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  >(
    'DELETE /dm/conversations/:conversationId',
    async (_, { arg }) =>
      parseResponse(client.dm.conversations[':conversationId'].$delete(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/dm/conversations/:conversationId/messages', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.dm.conversations[':conversationId'].messages.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId}/messages
 */
export function getGetDmConversationsConversationIdMessagesKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['GET', '/dm/conversations/:conversationId/messages', args] as const
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  >(
    'POST /dm/conversations/:conversationId/messages',
    async (_, { arg }) =>
      parseResponse(
        client.dm.conversations[':conversationId'].messages.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  >(
    'POST /dm/conversations/:conversationId/read',
    async (_, { arg }) =>
      parseResponse(client.dm.conversations[':conversationId'].read.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  >(
    'POST /dm/conversations/:conversationId/typing',
    async (_, { arg }) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  >(
    'DELETE /dm/messages/:messageId',
    async (_, { arg }) =>
      parseResponse(client.dm.messages[':messageId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  >(
    'POST /dm/messages/:messageId/reactions',
    async (_, { arg }) =>
      parseResponse(client.dm.messages[':messageId'].reactions.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  >(
    'DELETE /dm/messages/:messageId/reactions',
    async (_, { arg }) =>
      parseResponse(client.dm.messages[':messageId'].reactions.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client.dm)['unread-count']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/dm/unread-count'] as const) : null
  return useSWR<InferResponseType<(typeof client.dm)['unread-count']['$get']>, Error>(
    key,
    async () => parseResponse(client.dm['unread-count'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountKey() {
  return ['GET', '/dm/unread-count'] as const
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function useGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.search.posts.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/search/posts', args] as const) : null
  return useSWR<InferResponseType<typeof client.search.posts.$get>, Error>(
    key,
    async () => parseResponse(client.search.posts.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /search/posts
 */
export function getGetSearchPostsKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['GET', '/search/posts', args] as const
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.search.users.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/search/users', args] as const) : null
  return useSWR<InferResponseType<typeof client.search.users.$get>, Error>(
    key,
    async () => parseResponse(client.search.users.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /search/users
 */
export function getGetSearchUsersKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['GET', '/search/users', args] as const
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.search.hashtags.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/search/hashtags', args] as const) : null
  return useSWR<InferResponseType<typeof client.search.hashtags.$get>, Error>(
    key,
    async () => parseResponse(client.search.hashtags.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['GET', '/search/hashtags', args] as const
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.search.recent.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/search/recent'] as const) : null
  return useSWR<InferResponseType<typeof client.search.recent.$get>, Error>(
    key,
    async () => parseResponse(client.search.recent.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /search/recent
 */
export function getGetSearchRecentKey() {
  return ['GET', '/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.search.recent.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.search.recent.$delete>,
    Error,
    string,
    void
  >(
    'DELETE /search/recent',
    async () => parseResponse(client.search.recent.$delete(undefined, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.trends.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/trends', args] as const) : null
  return useSWR<InferResponseType<typeof client.trends.$get>, Error>(
    key,
    async () => parseResponse(client.trends.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /trends
 */
export function getGetTrendsKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['GET', '/trends', args] as const
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.trends.locations.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/trends/locations'] as const) : null
  return useSWR<InferResponseType<typeof client.trends.locations.$get>, Error>(
    key,
    async () => parseResponse(client.trends.locations.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /trends/locations
 */
export function getGetTrendsLocationsKey() {
  return ['GET', '/trends/locations'] as const
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function useGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.suggestions.users.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/suggestions/users', args] as const) : null
  return useSWR<InferResponseType<typeof client.suggestions.users.$get>, Error>(
    key,
    async () => parseResponse(client.suggestions.users.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['GET', '/suggestions/users', args] as const
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  >(
    'POST /suggestions/users/:userId/hide',
    async (_, { arg }) =>
      parseResponse(client.suggestions.users[':userId'].hide.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.suggestions.topics.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/suggestions/topics'] as const) : null
  return useSWR<InferResponseType<typeof client.suggestions.topics.$get>, Error>(
    key,
    async () => parseResponse(client.suggestions.topics.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsKey() {
  return ['GET', '/suggestions/topics'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  >(
    'POST /topics/:topicId/follow',
    async (_, { arg }) =>
      parseResponse(client.topics[':topicId'].follow.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  >(
    'DELETE /topics/:topicId/follow',
    async (_, { arg }) =>
      parseResponse(client.topics[':topicId'].follow.$delete(arg, options?.client)),
    options?.swr,
  )
}
