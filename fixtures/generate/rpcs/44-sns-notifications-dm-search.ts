import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(args: {
  query: {
    cursor?: string
    limit?: number
    types?: string
    filter?: 'all' | 'mentions' | 'verified'
  }
  options?: ClientRequestOptions
}) {
  return await client.notifications.$get(args)
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export async function getNotificationsUnreadCount(args?: { options?: ClientRequestOptions }) {
  return await client['notifications']['unread-count']['$get'](args)
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export async function postNotificationsMarkRead(args: {
  json: { notificationIds?: string[]; maxId?: string }
  options?: ClientRequestOptions
}) {
  return await client['notifications']['mark-read']['$post'](args)
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export async function getNotificationsSettings(args?: { options?: ClientRequestOptions }) {
  return await client['notifications']['settings']['$get'](args)
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export async function putNotificationsSettings(args: {
  json: {
    likes?: boolean
    reposts?: boolean
    quotes?: boolean
    replies?: boolean
    mentions?: boolean
    follows?: boolean
    directMessages?: boolean
    emailNotifications?: { enabled?: boolean; digest?: 'daily' | 'weekly' | 'never' }
    pushNotifications?: boolean
    filterQuality?: 'all' | 'filtered'
  }
  options?: ClientRequestOptions
}) {
  return await client['notifications']['settings']['$put'](args)
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export async function getDmConversations(args: {
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations']['$get'](args)
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export async function postDmConversations(args: {
  json: { participantIds: string[]; name?: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations']['$post'](args)
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export async function getDmConversationsConversationId(args: {
  param: { conversationId: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['$get'](args)
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export async function deleteDmConversationsConversationId(args: {
  param: { conversationId: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['$delete'](args)
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export async function getDmConversationsConversationIdMessages(args: {
  param: { conversationId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['messages']['$get'](args)
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export async function postDmConversationsConversationIdMessages(args: {
  param: { conversationId: string }
  json: { text?: string; mediaIds?: string[]; sharedPostId?: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['messages']['$post'](args)
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export async function postDmConversationsConversationIdRead(args: {
  param: { conversationId: string }
  json: { lastReadMessageId?: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['read']['$post'](args)
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export async function postDmConversationsConversationIdTyping(args: {
  param: { conversationId: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['conversations'][':conversationId']['typing']['$post'](args)
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export async function deleteDmMessagesMessageId(args: {
  param: { messageId: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['messages'][':messageId']['$delete'](args)
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export async function postDmMessagesMessageIdReactions(args: {
  param: { messageId: string }
  json: { emoji: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['messages'][':messageId']['reactions']['$post'](args)
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export async function deleteDmMessagesMessageIdReactions(args: {
  param: { messageId: string }
  query: { emoji: string }
  options?: ClientRequestOptions
}) {
  return await client['dm']['messages'][':messageId']['reactions']['$delete'](args)
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export async function getDmUnreadCount(args?: { options?: ClientRequestOptions }) {
  return await client['dm']['unread-count']['$get'](args)
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export async function getSearchPosts(args: {
  query: {
    q: string
    cursor?: string
    limit?: number
    filter?: 'latest' | 'top' | 'photos' | 'videos'
    from?: string
    to?: string
    since?: string
    until?: string
    lang?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['search']['posts']['$get'](args)
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export async function getSearchUsers(args: {
  query: { q: string; cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['search']['users']['$get'](args)
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export async function getSearchHashtags(args: {
  query: { q: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['search']['hashtags']['$get'](args)
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export async function getSearchRecent(args?: { options?: ClientRequestOptions }) {
  return await client['search']['recent']['$get'](args)
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export async function deleteSearchRecent(args?: { options?: ClientRequestOptions }) {
  return await client['search']['recent']['$delete'](args)
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export async function getTrends(args: {
  query: { woeid?: number; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client.trends.$get(args)
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export async function getTrendsLocations(args?: { options?: ClientRequestOptions }) {
  return await client['trends']['locations']['$get'](args)
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export async function getSuggestionsUsers(args: {
  query: { limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['suggestions']['users']['$get'](args)
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export async function postSuggestionsUsersUserIdHide(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['suggestions']['users'][':userId']['hide']['$post'](args)
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export async function getSuggestionsTopics(args?: { options?: ClientRequestOptions }) {
  return await client['suggestions']['topics']['$get'](args)
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export async function postTopicsTopicIdFollow(args: {
  param: { topicId: string }
  options?: ClientRequestOptions
}) {
  return await client['topics'][':topicId']['follow']['$post'](args)
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export async function deleteTopicsTopicIdFollow(args: {
  param: { topicId: string }
  options?: ClientRequestOptions
}) {
  return await client['topics'][':topicId']['follow']['$delete'](args)
}
