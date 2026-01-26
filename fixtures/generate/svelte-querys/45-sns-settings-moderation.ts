import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function createGetSettingsAccount(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.settings.account.$get>
      | (() => InferResponseType<typeof client.settings.account.$get>)
    initialData?:
      | InferResponseType<typeof client.settings.account.$get>
      | (() => InferResponseType<typeof client.settings.account.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsAccountQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings.account.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/account
 */
export function getGetSettingsAccountQueryKey() {
  return ['/settings/account'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsAccountQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSettingsAccountQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings.account.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /settings/account
 *
 * アカウント設定更新
 */
export function createPutSettingsAccount(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.settings.account.$put>,
      variables: InferRequestType<typeof client.settings.account.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.settings.account.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.settings.account.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.settings.account.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.settings.account.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.settings.account.$put>) =>
      parseResponse(client.settings.account.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export function createGetSettingsUsernameCheck(
  args: InferRequestType<typeof client.settings.username.check.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.settings.username.check.$get>
        | (() => InferResponseType<typeof client.settings.username.check.$get>)
      initialData?:
        | InferResponseType<typeof client.settings.username.check.$get>
        | (() => InferResponseType<typeof client.settings.username.check.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsUsernameCheckQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings.username.check.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/username/check
 */
export function getGetSettingsUsernameCheckQueryKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['/settings/username/check', args] as const
}

/**
 * Returns Svelte Query query options for GET /settings/username/check
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsUsernameCheckQueryOptions = (
  args: InferRequestType<typeof client.settings.username.check.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSettingsUsernameCheckQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings.username.check.$get(args, {
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
export function createGetSettingsPrivacy(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.settings.privacy.$get>
      | (() => InferResponseType<typeof client.settings.privacy.$get>)
    initialData?:
      | InferResponseType<typeof client.settings.privacy.$get>
      | (() => InferResponseType<typeof client.settings.privacy.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsPrivacyQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings.privacy.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/privacy
 */
export function getGetSettingsPrivacyQueryKey() {
  return ['/settings/privacy'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/privacy
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsPrivacyQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSettingsPrivacyQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings.privacy.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /settings/privacy
 *
 * プライバシー設定更新
 */
export function createPutSettingsPrivacy(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.settings.privacy.$put>,
      variables: InferRequestType<typeof client.settings.privacy.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.settings.privacy.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.settings.privacy.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.settings.privacy.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.settings.privacy.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.settings.privacy.$put>) =>
      parseResponse(client.settings.privacy.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function createGetSettingsContentPreferences(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<(typeof client.settings)['content-preferences']['$get']>
      | (() => InferResponseType<(typeof client.settings)['content-preferences']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.settings)['content-preferences']['$get']>
      | (() => InferResponseType<(typeof client.settings)['content-preferences']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsContentPreferencesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings['content-preferences'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/content-preferences
 */
export function getGetSettingsContentPreferencesQueryKey() {
  return ['/settings/content-preferences'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/content-preferences
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsContentPreferencesQueryOptions = (
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSettingsContentPreferencesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings['content-preferences'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /settings/content-preferences
 *
 * コンテンツ設定更新
 */
export function createPutSettingsContentPreferences(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.settings)['content-preferences']['$put']>,
      variables: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.settings)['content-preferences']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => parseResponse(client.settings['content-preferences'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function createGetSettingsMutedWords(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<(typeof client.settings)['muted-words']['$get']>
      | (() => InferResponseType<(typeof client.settings)['muted-words']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.settings)['muted-words']['$get']>
      | (() => InferResponseType<(typeof client.settings)['muted-words']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsMutedWordsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings['muted-words'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/muted-words
 */
export function getGetSettingsMutedWordsQueryKey() {
  return ['/settings/muted-words'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/muted-words
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsMutedWordsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSettingsMutedWordsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings['muted-words'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /settings/muted-words
 *
 * ミュートワード追加
 */
export function createPostSettingsMutedWords(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.settings)['muted-words']['$post']>,
      variables: InferRequestType<(typeof client.settings)['muted-words']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.settings)['muted-words']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.settings)['muted-words']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.settings)['muted-words']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.settings)['muted-words']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.settings)['muted-words']['$post']>) =>
      parseResponse(client.settings['muted-words'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function createDeleteSettingsMutedWordsWordId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function createGetSettingsSessions(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.settings.sessions.$get>
      | (() => InferResponseType<typeof client.settings.sessions.$get>)
    initialData?:
      | InferResponseType<typeof client.settings.sessions.$get>
      | (() => InferResponseType<typeof client.settings.sessions.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsSessionsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings.sessions.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/sessions
 */
export function getGetSettingsSessionsQueryKey() {
  return ['/settings/sessions'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsSessionsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSettingsSessionsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings.sessions.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /settings/sessions/{sessionId}
 *
 * セッション無効化
 */
export function createDeleteSettingsSessionsSessionId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.settings.sessions)[':sessionId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => parseResponse(client.settings.sessions[':sessionId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function createGetSettingsConnectedApps(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<(typeof client.settings)['connected-apps']['$get']>
      | (() => InferResponseType<(typeof client.settings)['connected-apps']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.settings)['connected-apps']['$get']>
      | (() => InferResponseType<(typeof client.settings)['connected-apps']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsConnectedAppsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings['connected-apps'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/connected-apps
 */
export function getGetSettingsConnectedAppsQueryKey() {
  return ['/settings/connected-apps'] as const
}

/**
 * Returns Svelte Query query options for GET /settings/connected-apps
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsConnectedAppsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSettingsConnectedAppsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings['connected-apps'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /settings/connected-apps/{appId}
 *
 * 連携アプリ解除
 */
export function createDeleteSettingsConnectedAppsAppId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function createPostSettingsDataExport(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.settings)['data-export']['$post']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client.settings)['data-export']['$post']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () =>
      parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export function createGetSettingsDataExportRequestId(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>
        | (() => InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>
        | (() => InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSettingsDataExportRequestIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.settings['data-export'][':requestId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/data-export/{requestId}
 */
export function getGetSettingsDataExportRequestIdQueryKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['/settings/data-export/:requestId', args] as const
}

/**
 * Returns Svelte Query query options for GET /settings/data-export/{requestId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsDataExportRequestIdQueryOptions = (
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSettingsDataExportRequestIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.settings['data-export'][':requestId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function createPostSettingsDeactivate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.settings.deactivate.$post>,
      variables: InferRequestType<typeof client.settings.deactivate.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.settings.deactivate.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.settings.deactivate.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.settings.deactivate.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.settings.deactivate.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.settings.deactivate.$post>) =>
      parseResponse(client.settings.deactivate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function createPostReports(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.reports.$post>,
      variables: InferRequestType<typeof client.reports.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.reports.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.reports.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.reports.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.reports.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.reports.$post>) =>
      parseResponse(client.reports.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export function createGetReportsReportId(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.reports)[':reportId']['$get']>
        | (() => InferResponseType<(typeof client.reports)[':reportId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.reports)[':reportId']['$get']>
        | (() => InferResponseType<(typeof client.reports)[':reportId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetReportsReportIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.reports[':reportId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /reports/{reportId}
 */
export function getGetReportsReportIdQueryKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return ['/reports/:reportId', args] as const
}

/**
 * Returns Svelte Query query options for GET /reports/{reportId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReportsReportIdQueryOptions = (
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetReportsReportIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.reports[':reportId'].$get(args, {
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
export function createGetModerationQueue(
  args: InferRequestType<typeof client.moderation.queue.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.moderation.queue.$get>
        | (() => InferResponseType<typeof client.moderation.queue.$get>)
      initialData?:
        | InferResponseType<typeof client.moderation.queue.$get>
        | (() => InferResponseType<typeof client.moderation.queue.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetModerationQueueQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.moderation.queue.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/queue
 */
export function getGetModerationQueueQueryKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return ['/moderation/queue', args] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationQueueQueryOptions = (
  args: InferRequestType<typeof client.moderation.queue.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetModerationQueueQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.moderation.queue.$get(args, {
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
export function createGetModerationItemsItemId(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>
        | (() => InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>
        | (() => InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetModerationItemsItemIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.moderation.items[':itemId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/items/{itemId}
 */
export function getGetModerationItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['/moderation/items/:itemId', args] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationItemsItemIdQueryOptions = (
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetModerationItemsItemIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.moderation.items[':itemId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function createPostModerationItemsItemIdAction(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
      variables: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.moderation.items)[':itemId']['action']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => parseResponse(client.moderation.items[':itemId'].action.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export function createGetModerationUsersUserIdHistory(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>
        | (() => InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>
        | (() => InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetModerationUsersUserIdHistoryQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.moderation.users[':userId'].history.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/users/{userId}/history
 */
export function getGetModerationUsersUserIdHistoryQueryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['/moderation/users/:userId/history', args] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/users/{userId}/history
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationUsersUserIdHistoryQueryOptions = (
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetModerationUsersUserIdHistoryQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.moderation.users[':userId'].history.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function createPostModerationUsersUserIdSuspend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
      variables: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].suspend.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function createPostModerationUsersUserIdUnsuspend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
      variables: InferRequestType<
        (typeof client.moderation.users)[':userId']['unsuspend']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.moderation.users)[':userId']['unsuspend']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.moderation.users)[':userId']['unsuspend']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.moderation.users)[':userId']['unsuspend']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export function createGetAnalyticsPostsPostId(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>
        | (() => InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>
        | (() => InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAnalyticsPostsPostIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.analytics.posts[':postId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/posts/{postId}
 */
export function getGetAnalyticsPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return ['/analytics/posts/:postId', args] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAnalyticsPostsPostIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.analytics.posts[':postId'].$get(args, {
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
export function createGetAnalyticsAccount(
  args: InferRequestType<typeof client.analytics.account.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.analytics.account.$get>
        | (() => InferResponseType<typeof client.analytics.account.$get>)
      initialData?:
        | InferResponseType<typeof client.analytics.account.$get>
        | (() => InferResponseType<typeof client.analytics.account.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAnalyticsAccountQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.analytics.account.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/account
 */
export function getGetAnalyticsAccountQueryKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  return ['/analytics/account', args] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsAccountQueryOptions = (
  args: InferRequestType<typeof client.analytics.account.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAnalyticsAccountQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.analytics.account.$get(args, {
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
export function createGetAnalyticsFollowers(
  args: InferRequestType<typeof client.analytics.followers.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.analytics.followers.$get>
        | (() => InferResponseType<typeof client.analytics.followers.$get>)
      initialData?:
        | InferResponseType<typeof client.analytics.followers.$get>
        | (() => InferResponseType<typeof client.analytics.followers.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAnalyticsFollowersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.analytics.followers.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/followers
 */
export function getGetAnalyticsFollowersQueryKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return ['/analytics/followers', args] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/followers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsFollowersQueryOptions = (
  args: InferRequestType<typeof client.analytics.followers.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAnalyticsFollowersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.analytics.followers.$get(args, {
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
export function createGetAnalyticsTopPosts(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.analytics)['top-posts']['$get']>
        | (() => InferResponseType<(typeof client.analytics)['top-posts']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.analytics)['top-posts']['$get']>
        | (() => InferResponseType<(typeof client.analytics)['top-posts']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAnalyticsTopPostsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.analytics['top-posts'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', args] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/top-posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsTopPostsQueryOptions = (
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAnalyticsTopPostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.analytics['top-posts'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
