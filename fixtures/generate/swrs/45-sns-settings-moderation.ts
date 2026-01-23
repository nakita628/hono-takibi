import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.settings.account.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/settings/account'] as const) : null
  return useSWR<InferResponseType<typeof client.settings.account.$get>, Error>(
    key,
    async () => parseResponse(client.settings.account.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/account
 */
export function getGetSettingsAccountKey() {
  return ['GET', '/settings/account'] as const
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export function usePutSettingsAccount(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.account.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.account.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.settings.account.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.account.$put>
  >(
    'PUT /settings/account',
    async (_, { arg }) => parseResponse(client.settings.account.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export function useGetSettingsUsernameCheck(
  args: InferRequestType<typeof client.settings.username.check.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.settings.username.check.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/settings/username/check', args] as const) : null
  return useSWR<InferResponseType<typeof client.settings.username.check.$get>, Error>(
    key,
    async () => parseResponse(client.settings.username.check.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/username/check
 */
export function getGetSettingsUsernameCheckKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['GET', '/settings/username/check', args] as const
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export function useGetSettingsPrivacy(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.settings.privacy.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/settings/privacy'] as const) : null
  return useSWR<InferResponseType<typeof client.settings.privacy.$get>, Error>(
    key,
    async () => parseResponse(client.settings.privacy.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/privacy
 */
export function getGetSettingsPrivacyKey() {
  return ['GET', '/settings/privacy'] as const
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export function usePutSettingsPrivacy(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.privacy.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.privacy.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.settings.privacy.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.privacy.$put>
  >(
    'PUT /settings/privacy',
    async (_, { arg }) => parseResponse(client.settings.privacy.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function useGetSettingsContentPreferences(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.settings)['content-preferences']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key =
    options?.enabled !== false ? (['GET', '/settings/content-preferences'] as const) : null
  return useSWR<InferResponseType<(typeof client.settings)['content-preferences']['$get']>, Error>(
    key,
    async () =>
      parseResponse(client.settings['content-preferences'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/content-preferences
 */
export function getGetSettingsContentPreferencesKey() {
  return ['GET', '/settings/content-preferences'] as const
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export function usePutSettingsContentPreferences(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['content-preferences']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings)['content-preferences']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >(
    'PUT /settings/content-preferences',
    async (_, { arg }) =>
      parseResponse(client.settings['content-preferences'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function useGetSettingsMutedWords(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client.settings)['muted-words']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/settings/muted-words'] as const) : null
  return useSWR<InferResponseType<(typeof client.settings)['muted-words']['$get']>, Error>(
    key,
    async () => parseResponse(client.settings['muted-words'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/muted-words
 */
export function getGetSettingsMutedWordsKey() {
  return ['GET', '/settings/muted-words'] as const
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export function usePostSettingsMutedWords(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['muted-words']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings)['muted-words']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >(
    'POST /settings/muted-words',
    async (_, { arg }) => parseResponse(client.settings['muted-words'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >(
    'DELETE /settings/muted-words/:wordId',
    async (_, { arg }) =>
      parseResponse(client.settings['muted-words'][':wordId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function useGetSettingsSessions(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.settings.sessions.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/settings/sessions'] as const) : null
  return useSWR<InferResponseType<typeof client.settings.sessions.$get>, Error>(
    key,
    async () => parseResponse(client.settings.sessions.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/sessions
 */
export function getGetSettingsSessionsKey() {
  return ['GET', '/settings/sessions'] as const
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export function useDeleteSettingsSessionsSessionId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >(
    'DELETE /settings/sessions/:sessionId',
    async (_, { arg }) =>
      parseResponse(client.settings.sessions[':sessionId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function useGetSettingsConnectedApps(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.settings)['connected-apps']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/settings/connected-apps'] as const) : null
  return useSWR<InferResponseType<(typeof client.settings)['connected-apps']['$get']>, Error>(
    key,
    async () => parseResponse(client.settings['connected-apps'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/connected-apps
 */
export function getGetSettingsConnectedAppsKey() {
  return ['GET', '/settings/connected-apps'] as const
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export function useDeleteSettingsConnectedAppsAppId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >(
    'DELETE /settings/connected-apps/:appId',
    async (_, { arg }) =>
      parseResponse(client.settings['connected-apps'][':appId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['data-export']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.settings)['data-export']['$post']>,
    Error,
    string,
    void
  >(
    'POST /settings/data-export',
    async () => parseResponse(client.settings['data-export'].$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export function useGetSettingsDataExportRequestId(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/settings/data-export/:requestId', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.settings['data-export'][':requestId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /settings/data-export/{requestId}
 */
export function getGetSettingsDataExportRequestIdKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['GET', '/settings/data-export/:requestId', args] as const
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.deactivate.$post>,
    Error,
    string,
    InferRequestType<typeof client.settings.deactivate.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.settings.deactivate.$post>,
    Error,
    string,
    InferRequestType<typeof client.settings.deactivate.$post>
  >(
    'POST /settings/deactivate',
    async (_, { arg }) => parseResponse(client.settings.deactivate.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.reports.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.reports.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.$post>
  >(
    'POST /reports',
    async (_, { arg }) => parseResponse(client.reports.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export function useGetReportsReportId(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.reports)[':reportId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/reports/:reportId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.reports)[':reportId']['$get']>, Error>(
    key,
    async () => parseResponse(client.reports[':reportId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /reports/{reportId}
 */
export function getGetReportsReportIdKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return ['GET', '/reports/:reportId', args] as const
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
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.moderation.queue.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/moderation/queue', args] as const) : null
  return useSWR<InferResponseType<typeof client.moderation.queue.$get>, Error>(
    key,
    async () => parseResponse(client.moderation.queue.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /moderation/queue
 */
export function getGetModerationQueueKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return ['GET', '/moderation/queue', args] as const
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export function useGetModerationItemsItemId(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/moderation/items/:itemId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>, Error>(
    key,
    async () => parseResponse(client.moderation.items[':itemId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /moderation/items/{itemId}
 */
export function getGetModerationItemsItemIdKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['GET', '/moderation/items/:itemId', args] as const
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >(
    'POST /moderation/items/:itemId/action',
    async (_, { arg }) =>
      parseResponse(client.moderation.items[':itemId'].action.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export function useGetModerationUsersUserIdHistory(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/moderation/users/:userId/history', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.moderation.users[':userId'].history.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /moderation/users/{userId}/history
 */
export function getGetModerationUsersUserIdHistoryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['GET', '/moderation/users/:userId/history', args] as const
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >(
    'POST /moderation/users/:userId/suspend',
    async (_, { arg }) =>
      parseResponse(client.moderation.users[':userId'].suspend.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >(
    'POST /moderation/users/:userId/unsuspend',
    async (_, { arg }) =>
      parseResponse(client.moderation.users[':userId'].unsuspend.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export function useGetAnalyticsPostsPostId(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/analytics/posts/:postId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>, Error>(
    key,
    async () => parseResponse(client.analytics.posts[':postId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /analytics/posts/{postId}
 */
export function getGetAnalyticsPostsPostIdKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return ['GET', '/analytics/posts/:postId', args] as const
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export function useGetAnalyticsAccount(
  args: InferRequestType<typeof client.analytics.account.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.analytics.account.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/analytics/account', args] as const) : null
  return useSWR<InferResponseType<typeof client.analytics.account.$get>, Error>(
    key,
    async () => parseResponse(client.analytics.account.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /analytics/account
 */
export function getGetAnalyticsAccountKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  return ['GET', '/analytics/account', args] as const
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export function useGetAnalyticsFollowers(
  args: InferRequestType<typeof client.analytics.followers.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.analytics.followers.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/analytics/followers', args] as const) : null
  return useSWR<InferResponseType<typeof client.analytics.followers.$get>, Error>(
    key,
    async () => parseResponse(client.analytics.followers.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /analytics/followers
 */
export function getGetAnalyticsFollowersKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return ['GET', '/analytics/followers', args] as const
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export function useGetAnalyticsTopPosts(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.analytics)['top-posts']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/analytics/top-posts', args] as const) : null
  return useSWR<InferResponseType<(typeof client.analytics)['top-posts']['$get']>, Error>(
    key,
    async () => parseResponse(client.analytics['top-posts'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['GET', '/analytics/top-posts', args] as const
}
