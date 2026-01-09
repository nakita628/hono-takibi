import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export async function getSettingsAccount(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['account']['$get'](args)
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export async function putSettingsAccount(args: {
  json: { language?: string; timezone?: string; country?: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['account']['$put'](args)
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export async function getSettingsUsernameCheck(args: {
  query: { username: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['username']['check']['$get'](args)
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export async function getSettingsPrivacy(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['privacy']['$get'](args)
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export async function putSettingsPrivacy(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['settings']['privacy']['$put'](args)
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export async function getSettingsContentPreferences(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['content-preferences']['$get'](args)
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export async function putSettingsContentPreferences(args: {
  json: {
    sensitiveContentFilter?: 'hide' | 'warn' | 'show'
    autoplayVideos?: 'always' | 'wifi' | 'never'
    dataUsage?: 'default' | 'reduced'
    qualityFilter?: boolean
    hideViewCounts?: boolean
    hideLikeCounts?: boolean
  }
  options?: ClientRequestOptions
}) {
  return await client['settings']['content-preferences']['$put'](args)
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export async function getSettingsMutedWords(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['muted-words']['$get'](args)
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export async function postSettingsMutedWords(args: {
  json: {
    word: string
    matchWholeWord?: boolean
    duration?: number
    scope?: 'all' | 'home_timeline' | 'notifications'
  }
  options?: ClientRequestOptions
}) {
  return await client['settings']['muted-words']['$post'](args)
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export async function deleteSettingsMutedWordsWordId(args: {
  param: { wordId: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['muted-words'][':wordId']['$delete'](args)
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export async function getSettingsSessions(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['sessions']['$get'](args)
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export async function deleteSettingsSessionsSessionId(args: {
  param: { sessionId: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['sessions'][':sessionId']['$delete'](args)
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export async function getSettingsConnectedApps(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['connected-apps']['$get'](args)
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export async function deleteSettingsConnectedAppsAppId(args: {
  param: { appId: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['connected-apps'][':appId']['$delete'](args)
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export async function postSettingsDataExport(args?: { options?: ClientRequestOptions }) {
  return await client['settings']['data-export']['$post'](args)
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export async function getSettingsDataExportRequestId(args: {
  param: { requestId: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['data-export'][':requestId']['$get'](args)
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export async function postSettingsDeactivate(args: {
  json: { password: string }
  options?: ClientRequestOptions
}) {
  return await client['settings']['deactivate']['$post'](args)
}

/**
 * POST /reports
 *
 * 通報作成
 */
export async function postReports(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.reports.$post(args)
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export async function getReportsReportId(args: {
  param: { reportId: string }
  options?: ClientRequestOptions
}) {
  return await client['reports'][':reportId']['$get'](args)
}

/**
 * GET /moderation/queue
 *
 * モデレーションキュー取得
 *
 * モデレーター用
 */
export async function getModerationQueue(args: {
  query: {
    status?: 'pending' | 'in_review' | 'resolved'
    type?: 'post' | 'user' | 'message'
    cursor?: string
    limit?: number
  }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['queue']['$get'](args)
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export async function getModerationItemsItemId(args: {
  param: { itemId: string }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['items'][':itemId']['$get'](args)
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export async function postModerationItemsItemIdAction(args: {
  param: { itemId: string }
  json: {
    action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
    note?: string
    suspensionDuration?: number
    notifyUser?: boolean
  }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['items'][':itemId']['action']['$post'](args)
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export async function getModerationUsersUserIdHistory(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['users'][':userId']['history']['$get'](args)
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export async function postModerationUsersUserIdSuspend(args: {
  param: { userId: string }
  json: { reason: string; duration?: number; note?: string }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['users'][':userId']['suspend']['$post'](args)
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export async function postModerationUsersUserIdUnsuspend(args: {
  param: { userId: string }
  json: { note?: string }
  options?: ClientRequestOptions
}) {
  return await client['moderation']['users'][':userId']['unsuspend']['$post'](args)
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export async function getAnalyticsPostsPostId(args: {
  param: { postId: string }
  options?: ClientRequestOptions
}) {
  return await client['analytics']['posts'][':postId']['$get'](args)
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export async function getAnalyticsAccount(args: {
  query: { period?: '7d' | '28d' | '90d' }
  options?: ClientRequestOptions
}) {
  return await client['analytics']['account']['$get'](args)
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export async function getAnalyticsFollowers(args: {
  query: { period?: '7d' | '28d' | '90d' }
  options?: ClientRequestOptions
}) {
  return await client['analytics']['followers']['$get'](args)
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export async function getAnalyticsTopPosts(args: {
  query: {
    period?: '7d' | '28d' | '90d'
    metric?: 'impressions' | 'engagements' | 'likes' | 'reposts'
    limit?: number
  }
  options?: ClientRequestOptions
}) {
  return await client['analytics']['top-posts']['$get'](args)
}
