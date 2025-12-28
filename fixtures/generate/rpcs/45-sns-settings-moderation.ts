import { client } from '../index.ts'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export async function getSettingsAccount() {
  return await client.settings.account.$get()
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export async function putSettingsAccount(body: {
  language?: string
  timezone?: string
  country?: string
}) {
  return await client.settings.account.$put({ json: body })
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export async function getSettingsUsernameCheck(params: { query: { username: string } }) {
  return await client.settings.username.check.$get({ query: params.query })
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export async function getSettingsPrivacy() {
  return await client.settings.privacy.$get()
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export async function putSettingsPrivacy(body: {
  protectedPosts?: boolean
  allowTagging?: 'everyone' | 'followers' | 'none'
  allowMentions?: 'everyone' | 'followers' | 'none'
  discoverableByEmail?: boolean
  discoverableByPhone?: boolean
  showLocation?: boolean
  personalizeAds?: boolean
  allowDataSharing?: boolean
}) {
  return await client.settings.privacy.$put({ json: body })
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export async function getSettingsContentPreferences() {
  return await client.settings['content-preferences'].$get()
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export async function putSettingsContentPreferences(body: {
  sensitiveContentFilter?: 'hide' | 'warn' | 'show'
  autoplayVideos?: 'always' | 'wifi' | 'never'
  dataUsage?: 'default' | 'reduced'
  qualityFilter?: boolean
  hideViewCounts?: boolean
  hideLikeCounts?: boolean
}) {
  return await client.settings['content-preferences'].$put({ json: body })
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export async function getSettingsMutedWords() {
  return await client.settings['muted-words'].$get()
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export async function postSettingsMutedWords(body: {
  word: string
  matchWholeWord?: boolean
  duration?: number
  scope?: 'all' | 'home_timeline' | 'notifications'
}) {
  return await client.settings['muted-words'].$post({ json: body })
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export async function deleteSettingsMutedWordsWordId(params: { path: { wordId: string } }) {
  return await client.settings['muted-words'][':wordId'].$delete({ param: params.path })
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export async function getSettingsSessions() {
  return await client.settings.sessions.$get()
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export async function deleteSettingsSessionsSessionId(params: { path: { sessionId: string } }) {
  return await client.settings.sessions[':sessionId'].$delete({ param: params.path })
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export async function getSettingsConnectedApps() {
  return await client.settings['connected-apps'].$get()
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export async function deleteSettingsConnectedAppsAppId(params: { path: { appId: string } }) {
  return await client.settings['connected-apps'][':appId'].$delete({ param: params.path })
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export async function postSettingsDataExport() {
  return await client.settings['data-export'].$post()
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export async function getSettingsDataExportRequestId(params: { path: { requestId: string } }) {
  return await client.settings['data-export'][':requestId'].$get({ param: params.path })
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export async function postSettingsDeactivate(body: { password: string }) {
  return await client.settings.deactivate.$post({ json: body })
}

/**
 * POST /reports
 *
 * 通報作成
 */
export async function postReports(body: {
  type: 'post' | 'user' | 'message'
  targetId: string
  reason:
    | 'spam'
    | 'harassment'
    | 'hate_speech'
    | 'violence'
    | 'self_harm'
    | 'misinformation'
    | 'illegal_content'
    | 'copyright'
    | 'impersonation'
    | 'other'
  description?: string
  relatedPostIds?: string[]
}) {
  return await client.reports.$post({ json: body })
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export async function getReportsReportId(params: { path: { reportId: string } }) {
  return await client.reports[':reportId'].$get({ param: params.path })
}

/**
 * GET /moderation/queue
 *
 * モデレーションキュー取得
 *
 * モデレーター用
 */
export async function getModerationQueue(params: {
  query: {
    status: 'pending' | 'in_review' | 'resolved'
    type: 'post' | 'user' | 'message'
    cursor: string
    limit: number
  }
}) {
  return await client.moderation.queue.$get({ query: params.query })
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export async function getModerationItemsItemId(params: { path: { itemId: string } }) {
  return await client.moderation.items[':itemId'].$get({ param: params.path })
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export async function postModerationItemsItemIdAction(
  params: { path: { itemId: string } },
  body: {
    action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
    note?: string
    suspensionDuration?: number
    notifyUser?: boolean
  },
) {
  return await client.moderation.items[':itemId'].action.$post({ param: params.path, json: body })
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export async function getModerationUsersUserIdHistory(params: { path: { userId: string } }) {
  return await client.moderation.users[':userId'].history.$get({ param: params.path })
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export async function postModerationUsersUserIdSuspend(
  params: { path: { userId: string } },
  body: { reason: string; duration?: number; note?: string },
) {
  return await client.moderation.users[':userId'].suspend.$post({ param: params.path, json: body })
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export async function postModerationUsersUserIdUnsuspend(
  params: { path: { userId: string } },
  body: { note?: string },
) {
  return await client.moderation.users[':userId'].unsuspend.$post({
    param: params.path,
    json: body,
  })
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export async function getAnalyticsPostsPostId(params: { path: { postId: string } }) {
  return await client.analytics.posts[':postId'].$get({ param: params.path })
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export async function getAnalyticsAccount(params: { query: { period: '7d' | '28d' | '90d' } }) {
  return await client.analytics.account.$get({ query: params.query })
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export async function getAnalyticsFollowers(params: { query: { period: '7d' | '28d' | '90d' } }) {
  return await client.analytics.followers.$get({ query: params.query })
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export async function getAnalyticsTopPosts(params: {
  query: {
    period: '7d' | '28d' | '90d'
    metric: 'impressions' | 'engagements' | 'likes' | 'reposts'
    limit: number
  }
}) {
  return await client.analytics['top-posts'].$get({ query: params.query })
}
