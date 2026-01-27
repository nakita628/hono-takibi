import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsAccountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/account
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.account.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.settings.account.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutSettingsAccountMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.account.$put> }) =>
        parseResponse(client.settings.account.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/account
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutSettingsAccountMutationKey() {
  return 'PUT /settings/account'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsUsernameCheckKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/username/check
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetSettingsUsernameCheckKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return ['/settings/username/check', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsPrivacyKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/privacy
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.privacy.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.settings.privacy.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutSettingsPrivacyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.privacy.$put> }) =>
        parseResponse(client.settings.privacy.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/privacy
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutSettingsPrivacyMutationKey() {
  return 'PUT /settings/privacy'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsContentPreferencesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/content-preferences
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.settings)['content-preferences']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.settings)['content-preferences']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutSettingsContentPreferencesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.settings)['content-preferences']['$put']> },
      ) => parseResponse(client.settings['content-preferences'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/content-preferences
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutSettingsContentPreferencesMutationKey() {
  return 'PUT /settings/content-preferences'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsMutedWordsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/muted-words
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['muted-words']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.settings)['muted-words']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSettingsMutedWordsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.settings)['muted-words']['$post']> },
      ) => parseResponse(client.settings['muted-words'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/muted-words
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostSettingsMutedWordsMutationKey() {
  return 'POST /settings/muted-words'
}

/**
 * DELETE /settings/muted-words/{wordId}
 *
 * ミュートワード削除
 */
export function useDeleteSettingsMutedWordsWordId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings)['muted-words'][':wordId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSettingsMutedWordsWordIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.settings)['muted-words'][':wordId']['$delete']> },
      ) => parseResponse(client.settings['muted-words'][':wordId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/muted-words/{wordId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteSettingsMutedWordsWordIdMutationKey() {
  return 'DELETE /settings/muted-words/:wordId'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsSessionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/sessions
 * Returns structured key [templatePath] for filter-based invalidation
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
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSettingsSessionsSessionIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.settings.sessions)[':sessionId']['$delete']> },
      ) => parseResponse(client.settings.sessions[':sessionId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/sessions/{sessionId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteSettingsSessionsSessionIdMutationKey() {
  return 'DELETE /settings/sessions/:sessionId'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsConnectedAppsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/connected-apps
 * Returns structured key [templatePath] for filter-based invalidation
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
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.settings)['connected-apps'][':appId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSettingsConnectedAppsAppIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.settings)['connected-apps'][':appId']['$delete']>
        },
      ) => parseResponse(client.settings['connected-apps'][':appId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/connected-apps/{appId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteSettingsConnectedAppsAppIdMutationKey() {
  return 'DELETE /settings/connected-apps/:appId'
}

/**
 * POST /settings/data-export
 *
 * データエクスポートリクエスト
 */
export function usePostSettingsDataExport(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.settings)['data-export']['$post']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSettingsDataExportMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/data-export
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostSettingsDataExportMutationKey() {
  return 'POST /settings/data-export'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSettingsDataExportRequestIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /settings/data-export/{requestId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetSettingsDataExportRequestIdKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return ['/settings/data-export/:requestId', args] as const
}

/**
 * POST /settings/deactivate
 *
 * アカウント一時停止
 */
export function usePostSettingsDeactivate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.deactivate.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.settings.deactivate.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSettingsDeactivateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.deactivate.$post> }) =>
        parseResponse(client.settings.deactivate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/deactivate
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostSettingsDeactivateMutationKey() {
  return 'POST /settings/deactivate'
}

/**
 * POST /reports
 *
 * 通報作成
 */
export function usePostReports(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.reports.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.reports.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostReportsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.reports.$post> }) =>
        parseResponse(client.reports.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /reports
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostReportsMutationKey() {
  return 'POST /reports'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetReportsReportIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /reports/{reportId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetReportsReportIdKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetModerationQueueKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/queue
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetModerationQueueKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetModerationItemsItemIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/items/{itemId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetModerationItemsItemIdKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return ['/moderation/items/:itemId', args] as const
}

/**
 * POST /moderation/items/{itemId}/action
 *
 * モデレーションアクション実行
 */
export function usePostModerationItemsItemIdAction(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.items)[':itemId']['action']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostModerationItemsItemIdActionMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.moderation.items)[':itemId']['action']['$post']>
        },
      ) => parseResponse(client.moderation.items[':itemId'].action.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/items/{itemId}/action
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostModerationItemsItemIdActionMutationKey() {
  return 'POST /moderation/items/:itemId/action'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetModerationUsersUserIdHistoryKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /moderation/users/{userId}/history
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetModerationUsersUserIdHistoryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return ['/moderation/users/:userId/history', args] as const
}

/**
 * POST /moderation/users/{userId}/suspend
 *
 * ユーザー凍結
 */
export function usePostModerationUsersUserIdSuspend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.users)[':userId']['suspend']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostModerationUsersUserIdSuspendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.moderation.users)[':userId']['suspend']['$post']>
        },
      ) => parseResponse(client.moderation.users[':userId'].suspend.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/users/{userId}/suspend
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostModerationUsersUserIdSuspendMutationKey() {
  return 'POST /moderation/users/:userId/suspend'
}

/**
 * POST /moderation/users/{userId}/unsuspend
 *
 * ユーザー凍結解除
 */
export function usePostModerationUsersUserIdUnsuspend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostModerationUsersUserIdUnsuspendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.moderation.users)[':userId']['unsuspend']['$post']>
        },
      ) => parseResponse(client.moderation.users[':userId'].unsuspend.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/users/{userId}/unsuspend
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostModerationUsersUserIdUnsuspendMutationKey() {
  return 'POST /moderation/users/:userId/unsuspend'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAnalyticsPostsPostIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/posts/{postId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetAnalyticsPostsPostIdKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAnalyticsAccountKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/account
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetAnalyticsAccountKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAnalyticsFollowersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/followers
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetAnalyticsFollowersKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAnalyticsTopPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /analytics/top-posts
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetAnalyticsTopPostsKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', args] as const
}
