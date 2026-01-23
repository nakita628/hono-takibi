import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.settings.account.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsAccountQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePutSettingsAccount(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.settings.account.$put> | undefined,
      Error,
      InferRequestType<typeof client.settings.account.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.settings.account.$put> | undefined,
    Error,
    InferRequestType<typeof client.settings.account.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings.account.$put(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.settings.username.check.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsUsernameCheckQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /settings/username/check
 */
export function getGetSettingsUsernameCheckQueryKey(
  args?: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['/settings/username/check', ...(args ? [args] : [])] as const
}

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export function useGetSettingsPrivacy(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.settings.privacy.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsPrivacyQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePutSettingsPrivacy(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.settings.privacy.$put> | undefined,
      Error,
      InferRequestType<typeof client.settings.privacy.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.settings.privacy.$put> | undefined,
    Error,
    InferRequestType<typeof client.settings.privacy.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings.privacy.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function useGetSettingsContentPreferences(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.settings)['content-preferences']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsContentPreferencesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePutSettingsContentPreferences(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.settings)['content-preferences']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.settings)['content-preferences']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings)['content-preferences']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings['content-preferences'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function useGetSettingsMutedWords(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.settings)['muted-words']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsMutedWordsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostSettingsMutedWords(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.settings)['muted-words']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.settings)['muted-words']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings)['muted-words']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings['muted-words'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings['muted-words'][':wordId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function useGetSettingsSessions(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.settings.sessions.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsSessionsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function useDeleteSettingsSessionsSessionId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings.sessions[':sessionId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function useGetSettingsConnectedApps(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.settings)['connected-apps']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsConnectedAppsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function useDeleteSettingsConnectedAppsAppId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings['connected-apps'][':appId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.settings)['data-export']['$post']> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.settings)['data-export']['$post']> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client.settings['data-export'].$post(undefined, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsDataExportRequestIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /settings/data-export/{requestId}
 */
export function getGetSettingsDataExportRequestIdQueryKey(
  args?: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['/settings/data-export/:requestId', ...(args ? [args] : [])] as const
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.settings.deactivate.$post> | undefined,
      Error,
      InferRequestType<typeof client.settings.deactivate.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.settings.deactivate.$post> | undefined,
    Error,
    InferRequestType<typeof client.settings.deactivate.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.settings.deactivate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.reports.$post> | undefined,
      Error,
      InferRequestType<typeof client.reports.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.reports.$post> | undefined,
    Error,
    InferRequestType<typeof client.reports.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.reports.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.reports)[':reportId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetReportsReportIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /reports/{reportId}
 */
export function getGetReportsReportIdQueryKey(
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.moderation.queue.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationQueueQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /moderation/queue
 */
export function getGetModerationQueueQueryKey(
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationItemsItemIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /moderation/items/{itemId}
 */
export function getGetModerationItemsItemIdQueryKey(
  args?: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['/moderation/items/:itemId', ...(args ? [args] : [])] as const
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.moderation.items[':itemId'].action.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationUsersUserIdHistoryQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /moderation/users/{userId}/history
 */
export function getGetModerationUsersUserIdHistoryQueryKey(
  args?: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['/moderation/users/:userId/history', ...(args ? [args] : [])] as const
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.moderation.users[':userId'].suspend.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsPostsPostIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /analytics/posts/{postId}
 */
export function getGetAnalyticsPostsPostIdQueryKey(
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.analytics.account.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsAccountQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /analytics/account
 */
export function getGetAnalyticsAccountQueryKey(
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.analytics.followers.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsFollowersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /analytics/followers
 */
export function getGetAnalyticsFollowersQueryKey(
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.analytics)['top-posts']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsTopPostsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsQueryKey(
  args?: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', ...(args ? [args] : [])] as const
}
