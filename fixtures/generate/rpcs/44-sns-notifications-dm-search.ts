import type { InferRequestType } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(arg: InferRequestType<typeof client.notifications.$get>) {
  return await client.notifications.$get(arg)
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export async function getNotificationsUnreadCount() {
  return await client['notifications']['unread-count']['$get']()
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export async function postNotificationsMarkRead(
  arg: InferRequestType<(typeof client)['notifications']['mark-read']['$post']>,
) {
  return await client['notifications']['mark-read']['$post'](arg)
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export async function getNotificationsSettings() {
  return await client['notifications']['settings']['$get']()
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export async function putNotificationsSettings(
  arg: InferRequestType<(typeof client)['notifications']['settings']['$put']>,
) {
  return await client['notifications']['settings']['$put'](arg)
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export async function getDmConversations(
  arg: InferRequestType<(typeof client)['dm']['conversations']['$get']>,
) {
  return await client['dm']['conversations']['$get'](arg)
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export async function postDmConversations(
  arg: InferRequestType<(typeof client)['dm']['conversations']['$post']>,
) {
  return await client['dm']['conversations']['$post'](arg)
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export async function getDmConversationsConversationId(
  arg: InferRequestType<(typeof client)['dm']['conversations'][':conversationId']['$get']>,
) {
  return await client['dm']['conversations'][':conversationId']['$get'](arg)
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export async function deleteDmConversationsConversationId(
  arg: InferRequestType<(typeof client)['dm']['conversations'][':conversationId']['$delete']>,
) {
  return await client['dm']['conversations'][':conversationId']['$delete'](arg)
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export async function getDmConversationsConversationIdMessages(
  arg: InferRequestType<
    (typeof client)['dm']['conversations'][':conversationId']['messages']['$get']
  >,
) {
  return await client['dm']['conversations'][':conversationId']['messages']['$get'](arg)
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export async function postDmConversationsConversationIdMessages(
  arg: InferRequestType<
    (typeof client)['dm']['conversations'][':conversationId']['messages']['$post']
  >,
) {
  return await client['dm']['conversations'][':conversationId']['messages']['$post'](arg)
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export async function postDmConversationsConversationIdRead(
  arg: InferRequestType<(typeof client)['dm']['conversations'][':conversationId']['read']['$post']>,
) {
  return await client['dm']['conversations'][':conversationId']['read']['$post'](arg)
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export async function postDmConversationsConversationIdTyping(
  arg: InferRequestType<
    (typeof client)['dm']['conversations'][':conversationId']['typing']['$post']
  >,
) {
  return await client['dm']['conversations'][':conversationId']['typing']['$post'](arg)
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export async function deleteDmMessagesMessageId(
  arg: InferRequestType<(typeof client)['dm']['messages'][':messageId']['$delete']>,
) {
  return await client['dm']['messages'][':messageId']['$delete'](arg)
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export async function postDmMessagesMessageIdReactions(
  arg: InferRequestType<(typeof client)['dm']['messages'][':messageId']['reactions']['$post']>,
) {
  return await client['dm']['messages'][':messageId']['reactions']['$post'](arg)
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export async function deleteDmMessagesMessageIdReactions(
  arg: InferRequestType<(typeof client)['dm']['messages'][':messageId']['reactions']['$delete']>,
) {
  return await client['dm']['messages'][':messageId']['reactions']['$delete'](arg)
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export async function getDmUnreadCount() {
  return await client['dm']['unread-count']['$get']()
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export async function getSearchPosts(
  arg: InferRequestType<(typeof client)['search']['posts']['$get']>,
) {
  return await client['search']['posts']['$get'](arg)
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export async function getSearchUsers(
  arg: InferRequestType<(typeof client)['search']['users']['$get']>,
) {
  return await client['search']['users']['$get'](arg)
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export async function getSearchHashtags(
  arg: InferRequestType<(typeof client)['search']['hashtags']['$get']>,
) {
  return await client['search']['hashtags']['$get'](arg)
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export async function getSearchRecent() {
  return await client['search']['recent']['$get']()
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export async function deleteSearchRecent() {
  return await client['search']['recent']['$delete']()
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export async function getTrends(arg: InferRequestType<typeof client.trends.$get>) {
  return await client.trends.$get(arg)
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export async function getTrendsLocations() {
  return await client['trends']['locations']['$get']()
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export async function getSuggestionsUsers(
  arg: InferRequestType<(typeof client)['suggestions']['users']['$get']>,
) {
  return await client['suggestions']['users']['$get'](arg)
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export async function postSuggestionsUsersUserIdHide(
  arg: InferRequestType<(typeof client)['suggestions']['users'][':userId']['hide']['$post']>,
) {
  return await client['suggestions']['users'][':userId']['hide']['$post'](arg)
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export async function getSuggestionsTopics() {
  return await client['suggestions']['topics']['$get']()
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export async function postTopicsTopicIdFollow(
  arg: InferRequestType<(typeof client)['topics'][':topicId']['follow']['$post']>,
) {
  return await client['topics'][':topicId']['follow']['$post'](arg)
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export async function deleteTopicsTopicIdFollow(
  arg: InferRequestType<(typeof client)['topics'][':topicId']['follow']['$delete']>,
) {
  return await client['topics'][':topicId']['follow']['$delete'](arg)
}
