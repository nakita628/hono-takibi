import { useQuery, useMutation, queryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 *
 * 現在のユーザーのアクティブなセッション一覧を取得
 */
export function useGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

/**
 * Returns TanStack Query query options for GET /sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsQueryOptions = (
  args: InferRequestType<typeof client.sessions.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSessionsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.$post>,
      variables: InferRequestType<typeof client.sessions.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.sessions.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.$post>) =>
      parseResponse(client.sessions.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsCurrentQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions/current
 */
export function getGetSessionsCurrentQueryKey() {
  return ['/sessions/current'] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/current
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsCurrentQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSessionsCurrentQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions.current.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.$delete> | undefined | undefined,
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
  return useMutation({
    mutationFn: async () =>
      parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.refresh.$post>,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.refresh.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.current.refresh.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.current.refresh.$post>) =>
      parseResponse(client.sessions.current.refresh.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.extend.$post>,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.extend.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.current.extend.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.current.extend.$post>) =>
      parseResponse(client.sessions.current.extend.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.activity.$post>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.activity.$post> | undefined,
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
  return useMutation({
    mutationFn: async () =>
      parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsSessionIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdQueryKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return ['/sessions/:sessionId', args] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/{sessionId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsSessionIdQueryOptions = (
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSessionsSessionIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions[':sessionId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.sessions)[':sessionId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)['revoke-all']['$post']>,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)['revoke-all']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>) =>
      parseResponse(client.sessions['revoke-all'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.validate.$post>,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.validate.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.validate.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.validate.$post>) =>
      parseResponse(client.sessions.validate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsHistoryQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions/history
 */
export function getGetSessionsHistoryQueryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['/sessions/history', args] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/history
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsHistoryQueryOptions = (
  args: InferRequestType<typeof client.sessions.history.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSessionsHistoryQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions.history.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export function useGetSessionsSecurityEvents(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetSessionsSecurityEventsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsQueryKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['/sessions/security-events', args] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/security-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsSecurityEventsQueryOptions = (
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSessionsSecurityEventsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions['security-events'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsPoliciesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesQueryKey() {
  return ['/sessions/policies'] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/policies
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsPoliciesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSessionsPoliciesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions.policies.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.policies.$put>,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.policies.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.policies.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.policies.$put>) =>
      parseResponse(client.sessions.policies.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSessionsTrustedDevicesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesQueryKey() {
  return ['/sessions/trusted-devices'] as const
}

/**
 * Returns TanStack Query query options for GET /sessions/trusted-devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsTrustedDevicesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSessionsTrustedDevicesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions['trusted-devices'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)['trusted-devices']['$post']>,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)['trusted-devices']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => parseResponse(client.sessions['trusted-devices'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
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
      args: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
    ) =>
      parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
