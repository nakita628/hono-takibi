import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.settings.account.$get>,
      Error,
      InferResponseType<typeof client.settings.account.$get>,
      readonly ['/settings/account']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsAccountQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/account
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.settings.account.$put>) =>
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.settings.username.check.$get>,
      Error,
      InferResponseType<typeof client.settings.username.check.$get>,
      readonly [
        '/settings/username/check',
        InferRequestType<typeof client.settings.username.check.$get>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsUsernameCheckQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/username/check
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
export function useGetSettingsPrivacy(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.settings.privacy.$get>,
      Error,
      InferResponseType<typeof client.settings.privacy.$get>,
      readonly ['/settings/privacy']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsPrivacyQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/privacy
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.settings.privacy.$put>) =>
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.settings)['content-preferences']['$get']>,
      Error,
      InferResponseType<(typeof client.settings)['content-preferences']['$get']>,
      readonly ['/settings/content-preferences']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsContentPreferencesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/content-preferences
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
      ) => parseResponse(client.settings['content-preferences'].$put(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.settings)['muted-words']['$get']>,
      Error,
      InferResponseType<(typeof client.settings)['muted-words']['$get']>,
      readonly ['/settings/muted-words']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsMutedWordsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/muted-words
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.settings)['muted-words']['$post']>,
      ) => parseResponse(client.settings['muted-words'].$post(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
      ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.settings.sessions.$get>,
      Error,
      InferResponseType<typeof client.settings.sessions.$get>,
      readonly ['/settings/sessions']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsSessionsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/sessions
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
      ) => parseResponse(client.settings.sessions[':sessionId'].$delete(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.settings)['connected-apps']['$get']>,
      Error,
      InferResponseType<(typeof client.settings)['connected-apps']['$get']>,
      readonly ['/settings/connected-apps']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsConnectedAppsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/connected-apps
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
      Error,
      InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
      readonly [
        '/settings/data-export/:requestId',
        InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSettingsDataExportRequestIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /settings/data-export/{requestId}
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
export function usePostSettingsDeactivate(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.settings.deactivate.$post>) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.reports.$post>) =>
        parseResponse(client.reports.$post(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.reports)[':reportId']['$get']>,
      Error,
      InferResponseType<(typeof client.reports)[':reportId']['$get']>,
      readonly [
        '/reports/:reportId',
        InferRequestType<(typeof client.reports)[':reportId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetReportsReportIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /reports/{reportId}
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.moderation.queue.$get>,
      Error,
      InferResponseType<typeof client.moderation.queue.$get>,
      readonly ['/moderation/queue', InferRequestType<typeof client.moderation.queue.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationQueueQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /moderation/queue
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>,
      Error,
      InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>,
      readonly [
        '/moderation/items/:itemId',
        InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationItemsItemIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /moderation/items/{itemId}
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
export function usePostModerationItemsItemIdAction(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
      ) => parseResponse(client.moderation.items[':itemId'].action.$post(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
      Error,
      InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
      readonly [
        '/moderation/users/:userId/history',
        InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetModerationUsersUserIdHistoryQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /moderation/users/{userId}/history
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
export function usePostModerationUsersUserIdSuspend(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
      ) => parseResponse(client.moderation.users[':userId'].suspend.$post(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
      ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>,
      Error,
      InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>,
      readonly [
        '/analytics/posts/:postId',
        InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsPostsPostIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /analytics/posts/{postId}
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.analytics.account.$get>,
      Error,
      InferResponseType<typeof client.analytics.account.$get>,
      readonly ['/analytics/account', InferRequestType<typeof client.analytics.account.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsAccountQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /analytics/account
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.analytics.followers.$get>,
      Error,
      InferResponseType<typeof client.analytics.followers.$get>,
      readonly ['/analytics/followers', InferRequestType<typeof client.analytics.followers.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsFollowersQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /analytics/followers
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.analytics)['top-posts']['$get']>,
      Error,
      InferResponseType<(typeof client.analytics)['top-posts']['$get']>,
      readonly [
        '/analytics/top-posts',
        InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnalyticsTopPostsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', args] as const
}
