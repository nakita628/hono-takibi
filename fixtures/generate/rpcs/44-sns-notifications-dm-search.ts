import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: ClientRequestOptions,
) {
  return await client.notifications.$get(args, options)
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export async function getNotificationsUnreadCount(options?: ClientRequestOptions) {
  return await client.notifications['unread-count'].$get(undefined, options)
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export async function postNotificationsMarkRead(
  args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.notifications['mark-read'].$post(args, options)
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export async function getNotificationsSettings(options?: ClientRequestOptions) {
  return await client.notifications.settings.$get(undefined, options)
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export async function putNotificationsSettings(
  args: InferRequestType<typeof client.notifications.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await client.notifications.settings.$put(args, options)
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export async function getDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations.$get(args, options)
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export async function postDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$post>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations.$post(args, options)
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export async function getDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].$get(args, options)
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export async function deleteDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].$delete(args, options)
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export async function getDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].messages.$get(args, options)
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export async function postDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].messages.$post(args, options)
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export async function postDmConversationsConversationIdRead(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].read.$post(args, options)
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export async function postDmConversationsConversationIdTyping(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.conversations[':conversationId'].typing.$post(args, options)
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export async function deleteDmMessagesMessageId(
  args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.messages[':messageId'].$delete(args, options)
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export async function postDmMessagesMessageIdReactions(
  args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.messages[':messageId'].reactions.$post(args, options)
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export async function deleteDmMessagesMessageIdReactions(
  args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.dm.messages[':messageId'].reactions.$delete(args, options)
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export async function getDmUnreadCount(options?: ClientRequestOptions) {
  return await client.dm['unread-count'].$get(undefined, options)
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export async function getSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await client.search.posts.$get(args, options)
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export async function getSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.search.users.$get(args, options)
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export async function getSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: ClientRequestOptions,
) {
  return await client.search.hashtags.$get(args, options)
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export async function getSearchRecent(options?: ClientRequestOptions) {
  return await client.search.recent.$get(undefined, options)
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export async function deleteSearchRecent(options?: ClientRequestOptions) {
  return await client.search.recent.$delete(undefined, options)
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export async function getTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: ClientRequestOptions,
) {
  return await client.trends.$get(args, options)
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export async function getTrendsLocations(options?: ClientRequestOptions) {
  return await client.trends.locations.$get(undefined, options)
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export async function getSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.suggestions.users.$get(args, options)
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export async function postSuggestionsUsersUserIdHide(
  args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.suggestions.users[':userId'].hide.$post(args, options)
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export async function getSuggestionsTopics(options?: ClientRequestOptions) {
  return await client.suggestions.topics.$get(undefined, options)
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export async function postTopicsTopicIdFollow(
  args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.topics[':topicId'].follow.$post(args, options)
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export async function deleteTopicsTopicIdFollow(
  args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.topics[':topicId'].follow.$delete(args, options)
}
