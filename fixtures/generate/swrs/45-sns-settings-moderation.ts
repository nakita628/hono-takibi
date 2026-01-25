import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsAccountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/account
 */
export function getGetSettingsAccountKey() {
  return ['/settings/account'] as const
}

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export function usePutSettingsAccount(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.account.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.account.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /settings/account',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.settings.account.$put> }) =>
      parseResponse(client.settings.account.$put(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsUsernameCheckKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/username/check
 */
export function getGetSettingsUsernameCheckKey(
  args?: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['/settings/username/check', ...(args ? [args] : [])] as const
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export function useGetSettingsPrivacy(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsPrivacyKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/privacy
 */
export function getGetSettingsPrivacyKey() {
  return ['/settings/privacy'] as const
}

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export function usePutSettingsPrivacy(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.privacy.$put>,
    Error,
    string,
    InferRequestType<typeof client.settings.privacy.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /settings/privacy',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.settings.privacy.$put> }) =>
      parseResponse(client.settings.privacy.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function useGetSettingsContentPreferences(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsContentPreferencesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/content-preferences
 */
export function getGetSettingsContentPreferencesKey() {
  return ['/settings/content-preferences'] as const
}

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export function usePutSettingsContentPreferences(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['content-preferences']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /settings/content-preferences',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.settings)['content-preferences']['$put']> },
    ) => parseResponse(client.settings['content-preferences'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function useGetSettingsMutedWords(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsMutedWordsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/muted-words
 */
export function getGetSettingsMutedWordsKey() {
  return ['/settings/muted-words'] as const
}

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export function usePostSettingsMutedWords(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['muted-words']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /settings/muted-words',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.settings)['muted-words']['$post']> },
    ) => parseResponse(client.settings['muted-words'].$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /settings/muted-words/:wordId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']> },
    ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function useGetSettingsSessions(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsSessionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/sessions
 */
export function getGetSettingsSessionsKey() {
  return ['/settings/sessions'] as const
}

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export function useDeleteSettingsSessionsSessionId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /settings/sessions/:sessionId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']> },
    ) => parseResponse(client.settings.sessions[':sessionId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function useGetSettingsConnectedApps(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSettingsConnectedAppsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/connected-apps
 */
export function getGetSettingsConnectedAppsKey() {
  return ['/settings/connected-apps'] as const
}

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export function useDeleteSettingsConnectedAppsAppId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /settings/connected-apps/:appId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']> },
    ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.settings)['data-export']['$post']>,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /settings/data-export',
    async () => parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetSettingsDataExportRequestIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/data-export/{requestId}
 */
export function getGetSettingsDataExportRequestIdKey(
  args?: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['/settings/data-export/:requestId', ...(args ? [args] : [])] as const
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.settings.deactivate.$post>,
    Error,
    string,
    InferRequestType<typeof client.settings.deactivate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /settings/deactivate',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.settings.deactivate.$post> },
    ) => parseResponse(client.settings.deactivate.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.reports.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /reports',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.reports.$post> }) =>
      parseResponse(client.reports.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetReportsReportIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /reports/{reportId}
 */
export function getGetReportsReportIdKey(
  args?: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return ['/reports/:reportId', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetModerationQueueKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/queue
 */
export function getGetModerationQueueKey(
  args?: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return ['/moderation/queue', ...(args ? [args] : [])] as const
}

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export function useGetModerationItemsItemId(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetModerationItemsItemIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/items/{itemId}
 */
export function getGetModerationItemsItemIdKey(
  args?: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['/moderation/items/:itemId', ...(args ? [args] : [])] as const
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /moderation/items/:itemId/action',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']> },
    ) => parseResponse(client.moderation.items[':itemId'].action.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetModerationUsersUserIdHistoryKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/users/{userId}/history
 */
export function getGetModerationUsersUserIdHistoryKey(
  args?: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['/moderation/users/:userId/history', ...(args ? [args] : [])] as const
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /moderation/users/:userId/suspend',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']> },
    ) => parseResponse(client.moderation.users[':userId'].suspend.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /moderation/users/:userId/unsuspend',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
      },
    ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnalyticsPostsPostIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/posts/{postId}
 */
export function getGetAnalyticsPostsPostIdKey(
  args?: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return ['/analytics/posts/:postId', ...(args ? [args] : [])] as const
}

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export function useGetAnalyticsAccount(
  args: InferRequestType<typeof client.analytics.account.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnalyticsAccountKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/account
 */
export function getGetAnalyticsAccountKey(
  args?: InferRequestType<typeof client.analytics.account.$get>,
) {
  return ['/analytics/account', ...(args ? [args] : [])] as const
}

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export function useGetAnalyticsFollowers(
  args: InferRequestType<typeof client.analytics.followers.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnalyticsFollowersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/followers
 */
export function getGetAnalyticsFollowersKey(
  args?: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return ['/analytics/followers', ...(args ? [args] : [])] as const
}

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export function useGetAnalyticsTopPosts(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnalyticsTopPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsKey(
  args?: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', ...(args ? [args] : [])] as const
}
