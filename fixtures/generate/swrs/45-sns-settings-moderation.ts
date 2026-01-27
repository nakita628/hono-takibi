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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsAccountKey() {
  return client.settings.account.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutSettingsAccountMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.account.$put> }) =>
        parseResponse(client.settings.account.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/account
 * Uses $url() for type-safe key generation
 */
export function getPutSettingsAccountMutationKey() {
  return `PUT ${client.settings.account.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsUsernameCheckKey(
  args: InferRequestType<typeof client.settings.username.check.$get>,
) {
  return client.settings.username.check.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsPrivacyKey() {
  return client.settings.privacy.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutSettingsPrivacyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.privacy.$put> }) =>
        parseResponse(client.settings.privacy.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/privacy
 * Uses $url() for type-safe key generation
 */
export function getPutSettingsPrivacyMutationKey() {
  return `PUT ${client.settings.privacy.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsContentPreferencesKey() {
  return client.settings['content-preferences'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutSettingsContentPreferencesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.settings)['content-preferences']['$put']> },
      ) => parseResponse(client.settings['content-preferences'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /settings/content-preferences
 * Uses $url() for type-safe key generation
 */
export function getPutSettingsContentPreferencesMutationKey() {
  return `PUT ${client.settings['content-preferences'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsMutedWordsKey() {
  return client.settings['muted-words'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostSettingsMutedWordsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.settings)['muted-words']['$post']> },
      ) => parseResponse(client.settings['muted-words'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/muted-words
 * Uses $url() for type-safe key generation
 */
export function getPostSettingsMutedWordsMutationKey() {
  return `POST ${client.settings['muted-words'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteSettingsMutedWordsWordIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/muted-words/{wordId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteSettingsMutedWordsWordIdMutationKey() {
  return `DELETE ${client.settings['muted-words'][':wordId'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsSessionsKey() {
  return client.settings.sessions.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteSettingsSessionsSessionIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/sessions/{sessionId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteSettingsSessionsSessionIdMutationKey() {
  return `DELETE ${client.settings.sessions[':sessionId'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsConnectedAppsKey() {
  return client.settings['connected-apps'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteSettingsConnectedAppsAppIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /settings/connected-apps/{appId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteSettingsConnectedAppsAppIdMutationKey() {
  return `DELETE ${client.settings['connected-apps'][':appId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostSettingsDataExportMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.settings['data-export'].$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/data-export
 * Uses $url() for type-safe key generation
 */
export function getPostSettingsDataExportMutationKey() {
  return `POST ${client.settings['data-export'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSettingsDataExportRequestIdKey(
  args: InferRequestType<(typeof client.settings)['data-export'][':requestId']['$get']>,
) {
  return client.settings['data-export'][':requestId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostSettingsDeactivateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.deactivate.$post> }) =>
        parseResponse(client.settings.deactivate.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /settings/deactivate
 * Uses $url() for type-safe key generation
 */
export function getPostSettingsDeactivateMutationKey() {
  return `POST ${client.settings.deactivate.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostReportsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.reports.$post> }) =>
        parseResponse(client.reports.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /reports
 * Uses $url() for type-safe key generation
 */
export function getPostReportsMutationKey() {
  return `POST ${client.reports.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetReportsReportIdKey(
  args: InferRequestType<(typeof client.reports)[':reportId']['$get']>,
) {
  return client.reports[':reportId'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetModerationQueueKey(
  args: InferRequestType<typeof client.moderation.queue.$get>,
) {
  return client.moderation.queue.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetModerationItemsItemIdKey(
  args: InferRequestType<(typeof client.moderation.items)[':itemId']['$get']>,
) {
  return client.moderation.items[':itemId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostModerationItemsItemIdActionMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/items/{itemId}/action
 * Uses $url() for type-safe key generation
 */
export function getPostModerationItemsItemIdActionMutationKey() {
  return `POST ${client.moderation.items[':itemId'].action.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetModerationUsersUserIdHistoryKey(
  args: InferRequestType<(typeof client.moderation.users)[':userId']['history']['$get']>,
) {
  return client.moderation.users[':userId'].history.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostModerationUsersUserIdSuspendMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/users/{userId}/suspend
 * Uses $url() for type-safe key generation
 */
export function getPostModerationUsersUserIdSuspendMutationKey() {
  return `POST ${client.moderation.users[':userId'].suspend.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostModerationUsersUserIdUnsuspendMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /moderation/users/{userId}/unsuspend
 * Uses $url() for type-safe key generation
 */
export function getPostModerationUsersUserIdUnsuspendMutationKey() {
  return `POST ${client.moderation.users[':userId'].unsuspend.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetAnalyticsPostsPostIdKey(
  args: InferRequestType<(typeof client.analytics.posts)[':postId']['$get']>,
) {
  return client.analytics.posts[':postId'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetAnalyticsAccountKey(
  args: InferRequestType<typeof client.analytics.account.$get>,
) {
  return client.analytics.account.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetAnalyticsFollowersKey(
  args: InferRequestType<typeof client.analytics.followers.$get>,
) {
  return client.analytics.followers.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetAnalyticsTopPostsKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return client.analytics['top-posts'].$url(args).pathname
}
