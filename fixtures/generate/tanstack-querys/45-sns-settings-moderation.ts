import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * Generates TanStack Query cache key for GET /settings/account
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsAccountQueryKey() {
  return ['settings', '/settings/account'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsAccountQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsAccountQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings.account.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.account.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsAccountQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /settings/account
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutSettingsAccountMutationKey() {
  return ['PUT', '/settings/account'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /settings/account
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutSettingsAccountMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutSettingsAccountMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.settings.account.$put>) =>
    parseResponse(client.settings.account.$put(args, clientOptions)),
})

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export function usePutSettingsAccount(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.account.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.account.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.account.$put>) =>
      parseResponse(client.settings.account.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/username/check
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSettingsUsernameCheckQueryKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['settings', '/settings/username/check', args] as const
}

/**
 * Returns TanStack Query query options for GET /settings/username/check
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsUsernameCheckQueryOptions = (
  args: InferRequestType<typeof client.settings.username.check.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsUsernameCheckQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings.username.check.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export function useGetSettingsUsernameCheck(
  args: InferRequestType<typeof client.settings.username.check.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.settings.username.check.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsUsernameCheckQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /settings/privacy
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsPrivacyQueryKey() {
  return ['settings', '/settings/privacy'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/privacy
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsPrivacyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsPrivacyQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings.privacy.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/privacy
 *
 * プライバシー設定取得
 */
export function useGetSettingsPrivacy(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.privacy.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsPrivacyQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /settings/privacy
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutSettingsPrivacyMutationKey() {
  return ['PUT', '/settings/privacy'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /settings/privacy
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutSettingsPrivacyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutSettingsPrivacyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.settings.privacy.$put>) =>
    parseResponse(client.settings.privacy.$put(args, clientOptions)),
})

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export function usePutSettingsPrivacy(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.privacy.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.privacy.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.privacy.$put>) =>
      parseResponse(client.settings.privacy.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/content-preferences
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsContentPreferencesQueryKey() {
  return ['settings', '/settings/content-preferences'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/content-preferences
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsContentPreferencesQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsContentPreferencesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings['content-preferences'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function useGetSettingsContentPreferences(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.settings)['content-preferences']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetSettingsContentPreferencesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /settings/content-preferences
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutSettingsContentPreferencesMutationKey() {
  return ['PUT', '/settings/content-preferences'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /settings/content-preferences
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutSettingsContentPreferencesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutSettingsContentPreferencesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
  ) => parseResponse(client.settings['content-preferences'].$put(args, clientOptions)),
})

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export function usePutSettingsContentPreferences(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.settings)['content-preferences']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => parseResponse(client.settings['content-preferences'].$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/muted-words
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsMutedWordsQueryKey() {
  return ['settings', '/settings/muted-words'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/muted-words
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsMutedWordsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsMutedWordsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings['muted-words'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function useGetSettingsMutedWords(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['muted-words']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsMutedWordsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /settings/muted-words
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSettingsMutedWordsMutationKey() {
  return ['POST', '/settings/muted-words'] as const
}

/**
 * Returns TanStack Query mutation options for POST /settings/muted-words
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSettingsMutedWordsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSettingsMutedWordsMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.settings)['muted-words']['$post']>) =>
    parseResponse(client.settings['muted-words'].$post(args, clientOptions)),
})

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export function usePostSettingsMutedWords(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['muted-words']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.settings)['muted-words']['$post']>) =>
      parseResponse(client.settings['muted-words'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for DELETE /settings/muted-words/{wordId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteSettingsMutedWordsWordIdMutationKey() {
  return ['DELETE', '/settings/muted-words/:wordId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /settings/muted-words/{wordId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSettingsMutedWordsWordIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSettingsMutedWordsWordIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
  ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(args, clientOptions)),
})

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings)['muted-words'][':wordId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/sessions
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsSessionsQueryKey() {
  return ['settings', '/settings/sessions'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsSessionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsSessionsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings.sessions.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function useGetSettingsSessions(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.sessions.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsSessionsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /settings/sessions/{sessionId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteSettingsSessionsSessionIdMutationKey() {
  return ['DELETE', '/settings/sessions/:sessionId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /settings/sessions/{sessionId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSettingsSessionsSessionIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSettingsSessionsSessionIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
  ) => parseResponse(client.settings.sessions[':sessionId'].$delete(args, clientOptions)),
})

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export function useDeleteSettingsSessionsSessionId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => parseResponse(client.settings.sessions[':sessionId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/connected-apps
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSettingsConnectedAppsQueryKey() {
  return ['settings', '/settings/connected-apps'] as const
}

/**
 * Returns TanStack Query query options for GET /settings/connected-apps
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsConnectedAppsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsConnectedAppsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings['connected-apps'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function useGetSettingsConnectedApps(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.settings)['connected-apps']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetSettingsConnectedAppsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /settings/connected-apps/{appId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteSettingsConnectedAppsAppIdMutationKey() {
  return ['DELETE', '/settings/connected-apps/:appId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /settings/connected-apps/{appId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSettingsConnectedAppsAppIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSettingsConnectedAppsAppIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
  ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(args, clientOptions)),
})

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export function useDeleteSettingsConnectedAppsAppId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings)['connected-apps'][':appId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /settings/data-export
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSettingsDataExportMutationKey() {
  return ['POST', '/settings/data-export'] as const
}

/**
 * Returns TanStack Query mutation options for POST /settings/data-export
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSettingsDataExportMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSettingsDataExportMutationKey(),
  mutationFn: async () =>
    parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
})

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['data-export']['$post']>>>
      >
    >,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /settings/data-export/{requestId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSettingsDataExportRequestIdQueryKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['settings', '/settings/data-export/:requestId', args] as const
}

/**
 * Returns TanStack Query query options for GET /settings/data-export/{requestId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsDataExportRequestIdQueryOptions = (
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsDataExportRequestIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.settings['data-export'][':requestId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export function useGetSettingsDataExportRequestId(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings)['data-export'][':requestId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsDataExportRequestIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /settings/deactivate
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSettingsDeactivateMutationKey() {
  return ['POST', '/settings/deactivate'] as const
}

/**
 * Returns TanStack Query mutation options for POST /settings/deactivate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSettingsDeactivateMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSettingsDeactivateMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.settings.deactivate.$post>) =>
    parseResponse(client.settings.deactivate.$post(args, clientOptions)),
})

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.deactivate.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.deactivate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.deactivate.$post>) =>
      parseResponse(client.settings.deactivate.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /reports
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostReportsMutationKey() {
  return ['POST', '/reports'] as const
}

/**
 * Returns TanStack Query mutation options for POST /reports
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostReportsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostReportsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.reports.$post>) =>
    parseResponse(client.reports.$post(args, clientOptions)),
})

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.reports.$post>>>>>,
    Error,
    InferRequestType<typeof client.reports.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.reports.$post>) =>
      parseResponse(client.reports.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /reports/{reportId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetReportsReportIdQueryKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return ['reports', '/reports/:reportId', args] as const
}

/**
 * Returns TanStack Query query options for GET /reports/{reportId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReportsReportIdQueryOptions = (
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetReportsReportIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.reports[':reportId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export function useGetReportsReportId(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.reports)[':reportId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetReportsReportIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /moderation/queue
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetModerationQueueQueryKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return ['moderation', '/moderation/queue', args] as const
}

/**
 * Returns TanStack Query query options for GET /moderation/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationQueueQueryOptions = (
  args: InferRequestType<typeof client.moderation.queue.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationQueueQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.moderation.queue.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.moderation.queue.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetModerationQueueQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /moderation/items/{itemId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetModerationItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['moderation', '/moderation/items/:itemId', args] as const
}

/**
 * Returns TanStack Query query options for GET /moderation/items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationItemsItemIdQueryOptions = (
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationItemsItemIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.moderation.items[':itemId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /moderation/items/{itemId}
 *
 * モデレーションアイテム詳細
 */
export function useGetModerationItemsItemId(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.moderation.items)[':itemId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetModerationItemsItemIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /moderation/items/{itemId}/action
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostModerationItemsItemIdActionMutationKey() {
  return ['POST', '/moderation/items/:itemId/action'] as const
}

/**
 * Returns TanStack Query mutation options for POST /moderation/items/{itemId}/action
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostModerationItemsItemIdActionMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostModerationItemsItemIdActionMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
  ) => parseResponse(client.moderation.items[':itemId'].action.$post(args, clientOptions)),
})

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.items)[':itemId']['action']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => parseResponse(client.moderation.items[':itemId'].action.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /moderation/users/{userId}/history
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetModerationUsersUserIdHistoryQueryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['moderation', '/moderation/users/:userId/history', args] as const
}

/**
 * Returns TanStack Query query options for GET /moderation/users/{userId}/history
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationUsersUserIdHistoryQueryOptions = (
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationUsersUserIdHistoryQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.moderation.users[':userId'].history.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export function useGetModerationUsersUserIdHistory(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.moderation.users)[':userId']['history']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetModerationUsersUserIdHistoryQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /moderation/users/{userId}/suspend
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostModerationUsersUserIdSuspendMutationKey() {
  return ['POST', '/moderation/users/:userId/suspend'] as const
}

/**
 * Returns TanStack Query mutation options for POST /moderation/users/{userId}/suspend
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostModerationUsersUserIdSuspendMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostModerationUsersUserIdSuspendMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
  ) => parseResponse(client.moderation.users[':userId'].suspend.$post(args, clientOptions)),
})

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.users)[':userId']['suspend']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].suspend.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /moderation/users/{userId}/unsuspend
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostModerationUsersUserIdUnsuspendMutationKey() {
  return ['POST', '/moderation/users/:userId/unsuspend'] as const
}

/**
 * Returns TanStack Query mutation options for POST /moderation/users/{userId}/unsuspend
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostModerationUsersUserIdUnsuspendMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostModerationUsersUserIdUnsuspendMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
  ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, clientOptions)),
})

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /analytics/posts/{postId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAnalyticsPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return ['analytics', '/analytics/posts/:postId', args] as const
}

/**
 * Returns TanStack Query query options for GET /analytics/posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsPostsPostIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.analytics.posts[':postId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export function useGetAnalyticsPostsPostId(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.analytics.posts)[':postId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsPostsPostIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /analytics/account
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAnalyticsAccountQueryKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  return ['analytics', '/analytics/account', args] as const
}

/**
 * Returns TanStack Query query options for GET /analytics/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsAccountQueryOptions = (
  args: InferRequestType<typeof client.analytics.account.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsAccountQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.analytics.account.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /analytics/account
 *
 * アカウント分析取得
 */
export function useGetAnalyticsAccount(
  args: InferRequestType<typeof client.analytics.account.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.analytics.account.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsAccountQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /analytics/followers
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAnalyticsFollowersQueryKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return ['analytics', '/analytics/followers', args] as const
}

/**
 * Returns TanStack Query query options for GET /analytics/followers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsFollowersQueryOptions = (
  args: InferRequestType<typeof client.analytics.followers.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsFollowersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.analytics.followers.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /analytics/followers
 *
 * フォロワー分析取得
 */
export function useGetAnalyticsFollowers(
  args: InferRequestType<typeof client.analytics.followers.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.analytics.followers.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsFollowersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /analytics/top-posts
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['analytics', '/analytics/top-posts', args] as const
}

/**
 * Returns TanStack Query query options for GET /analytics/top-posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsTopPostsQueryOptions = (
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsTopPostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.analytics['top-posts'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /analytics/top-posts
 *
 * トップ投稿取得
 */
export function useGetAnalyticsTopPosts(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.analytics)['top-posts']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsTopPostsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
