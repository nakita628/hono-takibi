import { useQuery, useMutation } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetNotificationsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', args] as const
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export function useGetNotificationsUnreadCount(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNotificationsUnreadCountQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.notifications)['mark-read']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
  })
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNotificationsSettingsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.notifications.settings.$put> | undefined,
    Error,
    InferRequestType<typeof client.notifications.settings.$put>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDmConversationsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations
 */
export function getGetDmConversationsQueryKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', args] as const
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.dm.conversations.$post> | undefined,
    Error,
    InferRequestType<typeof client.dm.conversations.$post>
  >({
    mutationFn: async (args) => parseResponse(client.dm.conversations.$post(args, clientOptions)),
  })
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDmConversationsConversationIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['/dm/conversations/:conversationId', args] as const
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDmConversationsConversationIdMessagesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}/messages
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['/dm/conversations/:conversationId/messages', args] as const
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
  })
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
  })
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
  })
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
  })
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
  })
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDmUnreadCountQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /dm/unread-count
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSearchPostsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.search.posts.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /search/posts
 */
export function getGetSearchPostsQueryKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['/search/posts', args] as const
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSearchUsersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.search.users.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /search/users
 */
export function getGetSearchUsersQueryKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['/search/users', args] as const
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSearchHashtagsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsQueryKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', args] as const
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSearchRecentQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /search/recent
 */
export function getGetSearchRecentQueryKey() {
  return ['/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.search.recent.$delete> | undefined,
    Error,
    void
  >({
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTrendsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.trends.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /trends
 */
export function getGetTrendsQueryKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', args] as const
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTrendsLocationsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /trends/locations
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSuggestionsUsersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersQueryKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', args] as const
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
  })
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSuggestionsTopicsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['/suggestions/topics'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
  })
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
  })
}
