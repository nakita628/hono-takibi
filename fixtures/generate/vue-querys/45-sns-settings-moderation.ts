import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsAccountQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/account
 */
export function getGetSettingsAccountQueryKey() {
  return ['/settings/account'] as const
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export function usePutSettingsAccount(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.settings.account.$put> | undefined,
    Error,
    InferRequestType<typeof client.settings.account.$put>
  >({
    mutationFn: async (args) => parseResponse(client.settings.account.$put(args, clientOptions)),
  })
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export function useGetSettingsUsernameCheck(
  args: InferRequestType<typeof client.settings.username.check.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSettingsUsernameCheckQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/username/check
 */
export function getGetSettingsUsernameCheckQueryKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['/settings/username/check', args] as const
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export function useGetSettingsPrivacy(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsPrivacyQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/privacy
 */
export function getGetSettingsPrivacyQueryKey() {
  return ['/settings/privacy'] as const
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export function usePutSettingsPrivacy(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.settings.privacy.$put> | undefined,
    Error,
    InferRequestType<typeof client.settings.privacy.$put>
  >({
    mutationFn: async (args) => parseResponse(client.settings.privacy.$put(args, clientOptions)),
  })
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function useGetSettingsContentPreferences(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsContentPreferencesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/content-preferences
 */
export function getGetSettingsContentPreferencesQueryKey() {
  return ['/settings/content-preferences'] as const
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export function usePutSettingsContentPreferences(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings)['content-preferences']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings['content-preferences'].$put(args, clientOptions)),
  })
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function useGetSettingsMutedWords(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsMutedWordsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/muted-words
 */
export function getGetSettingsMutedWordsQueryKey() {
  return ['/settings/muted-words'] as const
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export function usePostSettingsMutedWords(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings)['muted-words']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings['muted-words'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings['muted-words'][':wordId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function useGetSettingsSessions(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsSessionsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/sessions
 */
export function getGetSettingsSessionsQueryKey() {
  return ['/settings/sessions'] as const
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export function useDeleteSettingsSessionsSessionId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings.sessions[':sessionId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function useGetSettingsConnectedApps(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSettingsConnectedAppsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/connected-apps
 */
export function getGetSettingsConnectedAppsQueryKey() {
  return ['/settings/connected-apps'] as const
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export function useDeleteSettingsConnectedAppsAppId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings['connected-apps'][':appId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.settings)['data-export']['$post']> | undefined,
    Error,
    void
  >({
    mutationFn: async () =>
      parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
  })
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export function useGetSettingsDataExportRequestId(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSettingsDataExportRequestIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /settings/data-export/{requestId}
 */
export function getGetSettingsDataExportRequestIdQueryKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['/settings/data-export/:requestId', args] as const
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.settings.deactivate.$post> | undefined,
    Error,
    InferRequestType<typeof client.settings.deactivate.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.settings.deactivate.$post(args, clientOptions)),
  })
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.reports.$post> | undefined,
    Error,
    InferRequestType<typeof client.reports.$post>
  >({ mutationFn: async (args) => parseResponse(client.reports.$post(args, clientOptions)) })
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export function useGetReportsReportId(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetReportsReportIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /reports/{reportId}
 */
export function getGetReportsReportIdQueryKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return ['/reports/:reportId', args] as const
}

/**
 * GET /moderation/queue
 *
 * モデレーションキュー取得
 *
 * モデレーター用
 */
export function useGetModerationQueue(
  args: InferRequestType<typeof client.moderation.queue.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetModerationQueueQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /moderation/queue
 */
export function getGetModerationQueueQueryKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return ['/moderation/queue', args] as const
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export function useGetModerationItemsItemId(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetModerationItemsItemIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /moderation/items/{itemId}
 */
export function getGetModerationItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['/moderation/items/:itemId', args] as const
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.moderation.items[':itemId'].action.$post(args, clientOptions)),
  })
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export function useGetModerationUsersUserIdHistory(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetModerationUsersUserIdHistoryQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /moderation/users/{userId}/history
 */
export function getGetModerationUsersUserIdHistoryQueryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['/moderation/users/:userId/history', args] as const
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.moderation.users[':userId'].suspend.$post(args, clientOptions)),
  })
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, clientOptions)),
  })
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export function useGetAnalyticsPostsPostId(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetAnalyticsPostsPostIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /analytics/posts/{postId}
 */
export function getGetAnalyticsPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return ['/analytics/posts/:postId', args] as const
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export function useGetAnalyticsAccount(
  args: InferRequestType<typeof client.analytics.account.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetAnalyticsAccountQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /analytics/account
 */
export function getGetAnalyticsAccountQueryKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  return ['/analytics/account', args] as const
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export function useGetAnalyticsFollowers(
  args: InferRequestType<typeof client.analytics.followers.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetAnalyticsFollowersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /analytics/followers
 */
export function getGetAnalyticsFollowersQueryKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return ['/analytics/followers', args] as const
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export function useGetAnalyticsTopPosts(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetAnalyticsTopPostsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', args] as const
}
