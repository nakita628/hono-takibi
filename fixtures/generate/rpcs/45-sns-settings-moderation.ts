import type { InferRequestType } from 'hono/client'
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
export async function putSettingsAccount(
  arg: InferRequestType<(typeof client)['settings']['account']['$put']>,
) {
  return await client['settings']['account']['$put'](arg)
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export async function getSettingsUsernameCheck(
  arg: InferRequestType<(typeof client)['settings']['username']['check']['$get']>,
) {
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
export async function putSettingsPrivacy(
  arg: InferRequestType<(typeof client)['settings']['privacy']['$put']>,
) {
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
export async function putSettingsContentPreferences(
  arg: InferRequestType<(typeof client)['settings']['content-preferences']['$put']>,
) {
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
export async function postSettingsMutedWords(
  arg: InferRequestType<(typeof client)['settings']['muted-words']['$post']>,
) {
  return await client['settings']['muted-words']['$post'](arg)
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export async function deleteSettingsMutedWordsWordId(
  arg: InferRequestType<(typeof client)['settings']['muted-words'][':wordId']['$delete']>,
) {
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
export async function deleteSettingsSessionsSessionId(
  arg: InferRequestType<(typeof client)['settings']['sessions'][':sessionId']['$delete']>,
) {
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
export async function deleteSettingsConnectedAppsAppId(
  arg: InferRequestType<(typeof client)['settings']['connected-apps'][':appId']['$delete']>,
) {
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
export async function getSettingsDataExportRequestId(
  arg: InferRequestType<(typeof client)['settings']['data-export'][':requestId']['$get']>,
) {
  return await client['settings']['data-export'][':requestId']['$get'](arg)
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export async function postSettingsDeactivate(
  arg: InferRequestType<(typeof client)['settings']['deactivate']['$post']>,
) {
  return await client['settings']['deactivate']['$post'](arg)
}

/**
 * POST /reports
 *
 * 通報作成
 */
export async function postReports(arg: InferRequestType<typeof client.reports.$post>) {
  return await client.reports.$post(arg)
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export async function getReportsReportId(
  arg: InferRequestType<(typeof client)['reports'][':reportId']['$get']>,
) {
  return await client['reports'][':reportId']['$get'](arg)
}

/**
 * GET /moderation/queue
 *
 * モデレーションキュー取得
 *
 * モデレーター用
 */
export async function getModerationQueue(
  arg: InferRequestType<(typeof client)['moderation']['queue']['$get']>,
) {
  return await client['moderation']['queue']['$get'](arg)
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export async function getModerationItemsItemId(
  arg: InferRequestType<(typeof client)['moderation']['items'][':itemId']['$get']>,
) {
  return await client['moderation']['items'][':itemId']['$get'](arg)
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export async function postModerationItemsItemIdAction(
  arg: InferRequestType<(typeof client)['moderation']['items'][':itemId']['action']['$post']>,
) {
  return await client['moderation']['items'][':itemId']['action']['$post'](arg)
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export async function getModerationUsersUserIdHistory(
  arg: InferRequestType<(typeof client)['moderation']['users'][':userId']['history']['$get']>,
) {
  return await client['moderation']['users'][':userId']['history']['$get'](arg)
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export async function postModerationUsersUserIdSuspend(
  arg: InferRequestType<(typeof client)['moderation']['users'][':userId']['suspend']['$post']>,
) {
  return await client['moderation']['users'][':userId']['suspend']['$post'](arg)
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export async function postModerationUsersUserIdUnsuspend(
  arg: InferRequestType<(typeof client)['moderation']['users'][':userId']['unsuspend']['$post']>,
) {
  return await client['moderation']['users'][':userId']['unsuspend']['$post'](arg)
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export async function getAnalyticsPostsPostId(
  arg: InferRequestType<(typeof client)['analytics']['posts'][':postId']['$get']>,
) {
  return await client['analytics']['posts'][':postId']['$get'](arg)
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export async function getAnalyticsAccount(
  arg: InferRequestType<(typeof client)['analytics']['account']['$get']>,
) {
  return await client['analytics']['account']['$get'](arg)
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export async function getAnalyticsFollowers(
  arg: InferRequestType<(typeof client)['analytics']['followers']['$get']>,
) {
  return await client['analytics']['followers']['$get'](arg)
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export async function getAnalyticsTopPosts(
  arg: InferRequestType<(typeof client)['analytics']['top-posts']['$get']>,
) {
  return await client['analytics']['top-posts']['$get'](arg)
}
