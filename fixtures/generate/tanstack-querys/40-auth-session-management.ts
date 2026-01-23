import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.sessions.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['GET', '/sessions', args] as const
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.$post> | undefined,
      Error,
      InferRequestType<typeof client.sessions.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.sessions.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.sessions.current.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsCurrentQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/current
 */
export function getGetSessionsCurrentQueryKey() {
  return ['GET', '/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.current.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.$delete> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client.sessions.current.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.current.refresh.$post> | undefined,
      Error,
      InferRequestType<typeof client.sessions.current.refresh.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.refresh.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions.current.refresh.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.current.extend.$post> | undefined,
      Error,
      InferRequestType<typeof client.sessions.current.extend.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.extend.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.current.extend.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions.current.extend.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.current.activity.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.activity.$post> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client.sessions.current.activity.$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.sessions)[':sessionId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsSessionIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdQueryKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return ['GET', '/sessions/:sessionId', args] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions[':sessionId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.sessions)['revoke-all']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.sessions)['revoke-all']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions['revoke-all'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.validate.$post> | undefined,
      Error,
      InferRequestType<typeof client.sessions.validate.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.validate.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.validate.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions.validate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.sessions.history.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsHistoryQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/history
 */
export function getGetSessionsHistoryQueryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['GET', '/sessions/history', args] as const
}

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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.sessions)['security-events']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsSecurityEventsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsQueryKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['GET', '/sessions/security-events', args] as const
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.sessions.policies.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsPoliciesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesQueryKey() {
  return ['GET', '/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.sessions.policies.$put> | undefined,
      Error,
      InferRequestType<typeof client.sessions.policies.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.sessions.policies.$put> | undefined,
    Error,
    InferRequestType<typeof client.sessions.policies.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions.policies.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.sessions)['trusted-devices']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsTrustedDevicesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesQueryKey() {
  return ['GET', '/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.sessions)['trusted-devices']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions['trusted-devices'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.sessions['trusted-devices'][':deviceId'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}
