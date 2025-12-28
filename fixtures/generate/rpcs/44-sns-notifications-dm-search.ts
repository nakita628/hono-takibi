import { client } from '../index.ts'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export async function getNotifications(params: {
  query: { cursor: string; limit: number; types: string; filter: 'all' | 'mentions' | 'verified' }
}) {
  return await client.notifications.$get({ query: params.query })
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export async function getNotificationsUnreadCount() {
  return await client.notifications['unread-count'].$get()
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export async function postNotificationsMarkRead(body: {
  notificationIds?: string[]
  maxId?: string
}) {
  return await client.notifications['mark-read'].$post({ json: body })
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export async function getNotificationsSettings() {
  return await client.notifications.settings.$get()
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export async function putNotificationsSettings(body: {
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
}) {
  return await client.notifications.settings.$put({ json: body })
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export async function getDmConversations(params: { query: { cursor: string; limit: number } }) {
  return await client.dm.conversations.$get({ query: params.query })
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export async function postDmConversations(body: { participantIds: string[]; name?: string }) {
  return await client.dm.conversations.$post({ json: body })
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export async function getDmConversationsConversationId(params: {
  path: { conversationId: string }
}) {
  return await client.dm.conversations[':conversationId'].$get({ param: params.path })
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export async function deleteDmConversationsConversationId(params: {
  path: { conversationId: string }
}) {
  return await client.dm.conversations[':conversationId'].$delete({ param: params.path })
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export async function getDmConversationsConversationIdMessages(params: {
  path: { conversationId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.dm.conversations[':conversationId'].messages.$get({
    param: params.path,
    query: params.query,
  })
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export async function postDmConversationsConversationIdMessages(
  params: { path: { conversationId: string } },
  body: { text?: string; mediaIds?: string[]; sharedPostId?: string },
) {
  return await client.dm.conversations[':conversationId'].messages.$post({
    param: params.path,
    json: body,
  })
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export async function postDmConversationsConversationIdRead(
  params: { path: { conversationId: string } },
  body: { lastReadMessageId?: string },
) {
  return await client.dm.conversations[':conversationId'].read.$post({
    param: params.path,
    json: body,
  })
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export async function postDmConversationsConversationIdTyping(params: {
  path: { conversationId: string }
}) {
  return await client.dm.conversations[':conversationId'].typing.$post({ param: params.path })
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export async function deleteDmMessagesMessageId(params: { path: { messageId: string } }) {
  return await client.dm.messages[':messageId'].$delete({ param: params.path })
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export async function postDmMessagesMessageIdReactions(
  params: { path: { messageId: string } },
  body: { emoji: string },
) {
  return await client.dm.messages[':messageId'].reactions.$post({ param: params.path, json: body })
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export async function deleteDmMessagesMessageIdReactions(params: {
  path: { messageId: string }
  query: { emoji: string }
}) {
  return await client.dm.messages[':messageId'].reactions.$delete({
    param: params.path,
    query: params.query,
  })
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export async function getDmUnreadCount() {
  return await client.dm['unread-count'].$get()
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export async function getSearchPosts(params: {
  query: {
    q: string
    cursor: string
    limit: number
    filter: 'latest' | 'top' | 'photos' | 'videos'
    from: string
    to: string
    since: string
    until: string
    lang: string
  }
}) {
  return await client.search.posts.$get({ query: params.query })
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export async function getSearchUsers(params: {
  query: { q: string; cursor: string; limit: number }
}) {
  return await client.search.users.$get({ query: params.query })
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export async function getSearchHashtags(params: { query: { q: string; limit: number } }) {
  return await client.search.hashtags.$get({ query: params.query })
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export async function getSearchRecent() {
  return await client.search.recent.$get()
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export async function deleteSearchRecent() {
  return await client.search.recent.$delete()
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export async function getTrends(params: { query: { woeid: number; limit: number } }) {
  return await client.trends.$get({ query: params.query })
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export async function getTrendsLocations() {
  return await client.trends.locations.$get()
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export async function getSuggestionsUsers(params: { query: { limit: number } }) {
  return await client.suggestions.users.$get({ query: params.query })
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export async function postSuggestionsUsersUserIdHide(params: { path: { userId: string } }) {
  return await client.suggestions.users[':userId'].hide.$post({ param: params.path })
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export async function getSuggestionsTopics() {
  return await client.suggestions.topics.$get()
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export async function postTopicsTopicIdFollow(params: { path: { topicId: string } }) {
  return await client.topics[':topicId'].follow.$post({ param: params.path })
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export async function deleteTopicsTopicIdFollow(params: { path: { topicId: string } }) {
  return await client.topics[':topicId'].follow.$delete({ param: params.path })
}
