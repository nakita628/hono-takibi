import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export async function getSettingsAccount() {
  return await client['settings']['account']['$get']()
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export async function putSettingsAccount(arg: {
  json: { language?: string; timezone?: string; country?: string }
}) {
  return await client['settings']['account']['$put'](arg)
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export async function getSettingsUsernameCheck(arg: { query: { username: string } }) {
  return await client['settings']['username']['check']['$get'](arg)
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export async function getSettingsPrivacy() {
  return await client['settings']['privacy']['$get']()
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export async function putSettingsPrivacy(arg: {
  json: {
    protectedPosts?: boolean
    allowTagging?: 'everyone' | 'followers' | 'none'
    allowMentions?: 'everyone' | 'followers' | 'none'
    discoverableByEmail?: boolean
    discoverableByPhone?: boolean
    showLocation?: boolean
    personalizeAds?: boolean
    allowDataSharing?: boolean
  }
}) {
  return await client['settings']['privacy']['$put'](arg)
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export async function getSettingsContentPreferences() {
  return await client['settings']['content-preferences']['$get']()
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export async function putSettingsContentPreferences(arg: {
  json: {
    sensitiveContentFilter?: 'hide' | 'warn' | 'show'
    autoplayVideos?: 'always' | 'wifi' | 'never'
    dataUsage?: 'default' | 'reduced'
    qualityFilter?: boolean
    hideViewCounts?: boolean
    hideLikeCounts?: boolean
  }
}) {
  return await client['settings']['content-preferences']['$put'](arg)
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export async function getSettingsMutedWords() {
  return await client['settings']['muted-words']['$get']()
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export async function postSettingsMutedWords(arg: {
  json: {
    word: string
    matchWholeWord?: boolean
    duration?: number
    scope?: 'all' | 'home_timeline' | 'notifications'
  }
}) {
  return await client['settings']['muted-words']['$post'](arg)
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export async function deleteSettingsMutedWordsWordId(arg: { param: { wordId: string } }) {
  return await client['settings']['muted-words'][':wordId']['$delete'](arg)
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export async function getSettingsSessions() {
  return await client['settings']['sessions']['$get']()
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export async function deleteSettingsSessionsSessionId(arg: { param: { sessionId: string } }) {
  return await client['settings']['sessions'][':sessionId']['$delete'](arg)
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export async function getSettingsConnectedApps() {
  return await client['settings']['connected-apps']['$get']()
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export async function deleteSettingsConnectedAppsAppId(arg: { param: { appId: string } }) {
  return await client['settings']['connected-apps'][':appId']['$delete'](arg)
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export async function postSettingsDataExport() {
  return await client['settings']['data-export']['$post']()
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export async function getSettingsDataExportRequestId(arg: { param: { requestId: string } }) {
  return await client['settings']['data-export'][':requestId']['$get'](arg)
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export async function postSettingsDeactivate(arg: { json: { password: string } }) {
  return await client['settings']['deactivate']['$post'](arg)
}

/**
 * POST /reports
 *
 * 通報作成
 */
export async function postReports(arg: {
  json: {
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
  }
}) {
  return await client.reports.$post(arg)
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export async function getReportsReportId(arg: { param: { reportId: string } }) {
  return await client['reports'][':reportId']['$get'](arg)
}

/**
 * GET /moderation/queue
 *
 * モデレーションキュー取得
 *
 * モデレーター用
 */
export async function getModerationQueue(arg: {
  query: {
    status?: 'pending' | 'in_review' | 'resolved'
    type?: 'post' | 'user' | 'message'
    cursor?: string
    limit?: number
  }
}) {
  return await client['moderation']['queue']['$get'](arg)
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export async function getModerationItemsItemId(arg: { param: { itemId: string } }) {
  return await client['moderation']['items'][':itemId']['$get'](arg)
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export async function postModerationItemsItemIdAction(arg: {
  param: { itemId: string }
  json: {
    action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
    note?: string
    suspensionDuration?: number
    notifyUser?: boolean
  }
}) {
  return await client['moderation']['items'][':itemId']['action']['$post'](arg)
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export async function getModerationUsersUserIdHistory(arg: { param: { userId: string } }) {
  return await client['moderation']['users'][':userId']['history']['$get'](arg)
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export async function postModerationUsersUserIdSuspend(arg: {
  param: { userId: string }
  json: { reason: string; duration?: number; note?: string }
}) {
  return await client['moderation']['users'][':userId']['suspend']['$post'](arg)
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export async function postModerationUsersUserIdUnsuspend(arg: {
  param: { userId: string }
  json: { note?: string }
}) {
  return await client['moderation']['users'][':userId']['unsuspend']['$post'](arg)
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export async function getAnalyticsPostsPostId(arg: { param: { postId: string } }) {
  return await client['analytics']['posts'][':postId']['$get'](arg)
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export async function getAnalyticsAccount(arg: { query: { period?: '7d' | '28d' | '90d' } }) {
  return await client['analytics']['account']['$get'](arg)
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export async function getAnalyticsFollowers(arg: { query: { period?: '7d' | '28d' | '90d' } }) {
  return await client['analytics']['followers']['$get'](arg)
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export async function getAnalyticsTopPosts(arg: {
  query: {
    period?: '7d' | '28d' | '90d'
    metric?: 'impressions' | 'engagements' | 'likes' | 'reposts'
    limit?: number
  }
}) {
  return await client['analytics']['top-posts']['$get'](arg)
}
