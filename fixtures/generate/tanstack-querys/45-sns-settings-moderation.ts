import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/45-sns-settings-moderation'

/**
 * GET /settings/account
 *
 * アカウント設定取得
 */
export function useGetSettingsAccount(options?: {
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
    select?: (
      data: InferResponseType<typeof client.settings.account.$get>,
    ) => InferResponseType<typeof client.settings.account.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsAccountQueryKey(),
    queryFn: async () => parseResponse(client.settings.account.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function usePutSettingsAccount(options?: {
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
  return useMutation({
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
export function useGetSettingsUsernameCheck(
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
      select?: (
        data: InferResponseType<typeof client.settings.username.check.$get>,
      ) => InferResponseType<typeof client.settings.username.check.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsUsernameCheckQueryKey(args),
    queryFn: async () => parseResponse(client.settings.username.check.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function useGetSettingsPrivacy(options?: {
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
    select?: (
      data: InferResponseType<typeof client.settings.privacy.$get>,
    ) => InferResponseType<typeof client.settings.privacy.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsPrivacyQueryKey(),
    queryFn: async () => parseResponse(client.settings.privacy.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function usePutSettingsPrivacy(options?: {
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
  return useMutation({
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
export function useGetSettingsContentPreferences(options?: {
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
    select?: (
      data: InferResponseType<(typeof client.settings)['content-preferences']['$get']>,
    ) => InferResponseType<(typeof client.settings)['content-preferences']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsContentPreferencesQueryKey(),
    queryFn: async () =>
      parseResponse(client.settings['content-preferences'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function usePutSettingsContentPreferences(options?: {
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
  return useMutation({
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
export function useGetSettingsMutedWords(options?: {
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
    select?: (
      data: InferResponseType<(typeof client.settings)['muted-words']['$get']>,
    ) => InferResponseType<(typeof client.settings)['muted-words']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsMutedWordsQueryKey(),
    queryFn: async () =>
      parseResponse(client.settings['muted-words'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function usePostSettingsMutedWords(options?: {
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
  return useMutation({
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
export function useDeleteSettingsMutedWordsWordId(options?: {
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
  return useMutation({
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
export function useGetSettingsSessions(options?: {
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
    select?: (
      data: InferResponseType<typeof client.settings.sessions.$get>,
    ) => InferResponseType<typeof client.settings.sessions.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsSessionsQueryKey(),
    queryFn: async () => parseResponse(client.settings.sessions.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function useDeleteSettingsSessionsSessionId(options?: {
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
  return useMutation({
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
export function useGetSettingsConnectedApps(options?: {
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
    select?: (
      data: InferResponseType<(typeof client.settings)['connected-apps']['$get']>,
    ) => InferResponseType<(typeof client.settings)['connected-apps']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsConnectedAppsQueryKey(),
    queryFn: async () =>
      parseResponse(client.settings['connected-apps'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function useDeleteSettingsConnectedAppsAppId(options?: {
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
  return useMutation({
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
export function usePostSettingsDataExport(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.settings)['data-export']['$post']>,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<(typeof client.settings)['data-export']['$post']> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
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
export function useGetSettingsDataExportRequestId(
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
      select?: (
        data: InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>,
      ) => InferResponseType<(typeof client.settings)['data-export'][':requestId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSettingsDataExportRequestIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.settings['data-export'][':requestId'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function usePostSettingsDeactivate(options?: {
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
  return useMutation({
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
export function usePostReports(options?: {
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
  return useMutation({
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
export function useGetReportsReportId(
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
      select?: (
        data: InferResponseType<(typeof client.reports)[':reportId']['$get']>,
      ) => InferResponseType<(typeof client.reports)[':reportId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetReportsReportIdQueryKey(args),
    queryFn: async () => parseResponse(client.reports[':reportId'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
      select?: (
        data: InferResponseType<typeof client.moderation.queue.$get>,
      ) => InferResponseType<typeof client.moderation.queue.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetModerationQueueQueryKey(args),
    queryFn: async () => parseResponse(client.moderation.queue.$get(args, clientOptions)),
    ...queryOptions,
  })
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
      select?: (
        data: InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>,
      ) => InferResponseType<(typeof client.moderation.items)[':itemId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetModerationItemsItemIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.moderation.items[':itemId'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function usePostModerationItemsItemIdAction(options?: {
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
  return useMutation({
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
export function useGetModerationUsersUserIdHistory(
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
      select?: (
        data: InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>,
      ) => InferResponseType<(typeof client.moderation.users)[':userId']['history']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetModerationUsersUserIdHistoryQueryKey(args),
    queryFn: async () =>
      parseResponse(client.moderation.users[':userId'].history.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function usePostModerationUsersUserIdSuspend(options?: {
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
  return useMutation({
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
export function usePostModerationUsersUserIdUnsuspend(options?: {
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
  return useMutation({
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
export function useGetAnalyticsPostsPostId(
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
      select?: (
        data: InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>,
      ) => InferResponseType<(typeof client.analytics.posts)[':postId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAnalyticsPostsPostIdQueryKey(args),
    queryFn: async () => parseResponse(client.analytics.posts[':postId'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
      select?: (
        data: InferResponseType<typeof client.analytics.account.$get>,
      ) => InferResponseType<typeof client.analytics.account.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAnalyticsAccountQueryKey(args),
    queryFn: async () => parseResponse(client.analytics.account.$get(args, clientOptions)),
    ...queryOptions,
  })
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
      select?: (
        data: InferResponseType<typeof client.analytics.followers.$get>,
      ) => InferResponseType<typeof client.analytics.followers.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAnalyticsFollowersQueryKey(args),
    queryFn: async () => parseResponse(client.analytics.followers.$get(args, clientOptions)),
    ...queryOptions,
  })
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
      select?: (
        data: InferResponseType<(typeof client.analytics)['top-posts']['$get']>,
      ) => InferResponseType<(typeof client.analytics)['top-posts']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAnalyticsTopPostsQueryKey(args),
    queryFn: async () => parseResponse(client.analytics['top-posts'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /analytics/top-posts
 */
export function getGetAnalyticsTopPostsQueryKey(
  args: InferRequestType<(typeof client.analytics)['top-posts']['$get']>,
) {
  return ['/analytics/top-posts', args] as const
}
