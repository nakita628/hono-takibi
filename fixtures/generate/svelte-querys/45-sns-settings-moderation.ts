import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function createGetSettingsAccount(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.account.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsAccountQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/account
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsAccountQueryKey() {
  return [client.settings.account.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsAccountQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsAccountQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.account.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.account.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.account.$put>) =>
      parseResponse(client.settings.account.$put(args, clientOptions)),
  }))
}

/**
 * GET /settings/username/check
 *
 * ユーザー名利用可能確認
 */
export function createGetSettingsUsernameCheck(
  args: InferRequestType<typeof client.settings.username.check.$get>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsUsernameCheckQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/username/check
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetSettingsUsernameCheckQueryKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  const u = client.settings.username.check.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /settings/username/check
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsUsernameCheckQueryOptions = (
  args: InferRequestType<typeof client.settings.username.check.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsUsernameCheckQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetSettingsPrivacy(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.privacy.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsPrivacyQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/privacy
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsPrivacyQueryKey() {
  return [client.settings.privacy.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/privacy
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsPrivacyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsPrivacyQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.privacy.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.privacy.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.privacy.$put>) =>
      parseResponse(client.settings.privacy.$put(args, clientOptions)),
  }))
}

/**
 * GET /settings/content-preferences
 *
 * コンテンツ設定取得
 */
export function createGetSettingsContentPreferences(
  options?: () => {
    query?: CreateQueryOptions<
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
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsContentPreferencesQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/content-preferences
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsContentPreferencesQueryKey() {
  return [client.settings['content-preferences'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/content-preferences
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsContentPreferencesQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsContentPreferencesQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['content-preferences']['$put']>,
    ) => parseResponse(client.settings['content-preferences'].$put(args, clientOptions)),
  }))
}

/**
 * GET /settings/muted-words
 *
 * ミュートワード一覧取得
 */
export function createGetSettingsMutedWords(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['muted-words']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsMutedWordsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/muted-words
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsMutedWordsQueryKey() {
  return [client.settings['muted-words'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/muted-words
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsMutedWordsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsMutedWordsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.settings)['muted-words']['$post']>) =>
      parseResponse(client.settings['muted-words'].$post(args, clientOptions)),
  }))
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function createDeleteSettingsMutedWordsWordId(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>,
    ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(args, clientOptions)),
  }))
}

/**
 * GET /settings/sessions
 *
 * ログインセッション一覧
 */
export function createGetSettingsSessions(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.sessions.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsSessionsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/sessions
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsSessionsQueryKey() {
  return [client.settings.sessions.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsSessionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsSessionsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>,
    ) => parseResponse(client.settings.sessions[':sessionId'].$delete(args, clientOptions)),
  }))
}

/**
 * GET /settings/connected-apps
 *
 * 連携アプリ一覧
 */
export function createGetSettingsConnectedApps(
  options?: () => {
    query?: CreateQueryOptions<
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
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsConnectedAppsQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/connected-apps
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsConnectedAppsQueryKey() {
  return [client.settings['connected-apps'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /settings/connected-apps
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsConnectedAppsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSettingsConnectedAppsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>,
    ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(args, clientOptions)),
  }))
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function createPostSettingsDataExport(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
  }))
}

/**
 * GET /settings/data-export/{requestId}
 *
 * データエクスポート状況確認
 */
export function createGetSettingsDataExportRequestId(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSettingsDataExportRequestIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings/data-export/{requestId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetSettingsDataExportRequestIdQueryKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  const u = client.settings['data-export'][':requestId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /settings/data-export/{requestId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSettingsDataExportRequestIdQueryOptions = (
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSettingsDataExportRequestIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.deactivate.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.settings.deactivate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.settings.deactivate.$post>) =>
      parseResponse(client.settings.deactivate.$post(args, clientOptions)),
  }))
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function createPostReports(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.reports.$post>>>>>,
    Error,
    InferRequestType<typeof client.reports.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.reports.$post>) =>
      parseResponse(client.reports.$post(args, clientOptions)),
  }))
}

/**
 * GET /reports/{reportId}
 *
 * 通報詳細取得
 */
export function createGetReportsReportId(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetReportsReportIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /reports/{reportId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetReportsReportIdQueryKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  const u = client.reports[':reportId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /reports/{reportId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReportsReportIdQueryOptions = (
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetReportsReportIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.moderation.queue.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetModerationQueueQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/queue
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetModerationQueueQueryKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  const u = client.moderation.queue.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationQueueQueryOptions = (
  args: InferRequestType<typeof client.moderation.queue.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationQueueQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetModerationItemsItemIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/items/{itemId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetModerationItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  const u = client.moderation.items[':itemId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationItemsItemIdQueryOptions = (
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationItemsItemIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>,
    ) => parseResponse(client.moderation.items[':itemId'].action.$post(args, clientOptions)),
  }))
}

/**
 * GET /moderation/users/{userId}/history
 *
 * ユーザーのモデレーション履歴
 */
export function createGetModerationUsersUserIdHistory(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetModerationUsersUserIdHistoryQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /moderation/users/{userId}/history
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetModerationUsersUserIdHistoryQueryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  const u = client.moderation.users[':userId'].history.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /moderation/users/{userId}/history
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetModerationUsersUserIdHistoryQueryOptions = (
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetModerationUsersUserIdHistoryQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].suspend.$post(args, clientOptions)),
  }))
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function createPostModerationUsersUserIdUnsuspend(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>,
    ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(args, clientOptions)),
  }))
}

/**
 * GET /analytics/posts/{postId}
 *
 * 投稿分析取得
 */
export function createGetAnalyticsPostsPostId(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsPostsPostIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/posts/{postId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetAnalyticsPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  const u = client.analytics.posts[':postId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsPostsPostIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.analytics.account.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsAccountQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/account
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetAnalyticsAccountQueryKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  const u = client.analytics.account.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/account
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsAccountQueryOptions = (
  args: InferRequestType<typeof client.analytics.account.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsAccountQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsFollowersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/followers
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetAnalyticsFollowersQueryKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  const u = client.analytics.followers.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/followers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsFollowersQueryOptions = (
  args: InferRequestType<typeof client.analytics.followers.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsFollowersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnalyticsTopPostsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /analytics/top-posts
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  const u = client.analytics['top-posts'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /analytics/top-posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnalyticsTopPostsQueryOptions = (
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAnalyticsTopPostsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.analytics['top-posts'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
