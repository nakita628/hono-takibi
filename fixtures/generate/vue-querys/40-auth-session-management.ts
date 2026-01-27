import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * Generates Vue Query cache key for GET /sessions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSessionsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.sessions.$get>>,
) {
  return ['sessions', 'GET', '/sessions', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsQueryOptions = (
  args: InferRequestType<typeof client.sessions.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSessionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsMutationKey() {
  return ['sessions', 'POST', '/sessions'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSessionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.sessions.$post>) =>
    parseResponse(client.sessions.$post(args, clientOptions)),
})

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.sessions.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostSessionsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/current
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSessionsCurrentQueryKey() {
  return ['sessions', 'GET', '/sessions/current'] as const
}

/**
 * Returns Vue Query query options for GET /sessions/current
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsCurrentQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSessionsCurrentQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions.current.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsCurrentQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /sessions/current
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSessionsCurrentMutationKey() {
  return ['sessions', 'DELETE', '/sessions/current'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /sessions/current
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSessionsCurrentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteSessionsCurrentMutationKey(),
  mutationFn: async () => parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
})

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.$delete>>>
            >
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteSessionsCurrentMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/current/refresh
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsCurrentRefreshMutationKey() {
  return ['sessions', 'POST', '/sessions/current/refresh'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/current/refresh
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsCurrentRefreshMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSessionsCurrentRefreshMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.sessions.current.refresh.$post>) =>
    parseResponse(client.sessions.current.refresh.$post(args, clientOptions)),
})

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.refresh.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.sessions.current.refresh.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsCurrentRefreshMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/current/extend
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsCurrentExtendMutationKey() {
  return ['sessions', 'POST', '/sessions/current/extend'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/current/extend
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsCurrentExtendMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSessionsCurrentExtendMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.sessions.current.extend.$post>) =>
    parseResponse(client.sessions.current.extend.$post(args, clientOptions)),
})

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.extend.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.sessions.current.extend.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsCurrentExtendMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/current/activity
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsCurrentActivityMutationKey() {
  return ['sessions', 'POST', '/sessions/current/activity'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/current/activity
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsCurrentActivityMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSessionsCurrentActivityMutationKey(),
  mutationFn: async () =>
    parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
})

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.activity.$post>>>
          >
        >,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsCurrentActivityMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/{sessionId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSessionsSessionIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.sessions)[':sessionId']['$get']>>,
) {
  return ['sessions', 'GET', '/sessions/:sessionId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sessions/{sessionId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsSessionIdQueryOptions = (
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSessionsSessionIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions[':sessionId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsSessionIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /sessions/{sessionId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSessionsSessionIdMutationKey() {
  return ['sessions', 'DELETE', '/sessions/:sessionId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /sessions/{sessionId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSessionsSessionIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSessionsSessionIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
    parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
})

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteSessionsSessionIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/revoke-all
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsRevokeAllMutationKey() {
  return ['sessions', 'POST', '/sessions/revoke-all'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/revoke-all
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsRevokeAllMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSessionsRevokeAllMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>) =>
    parseResponse(client.sessions['revoke-all'].$post(args, clientOptions)),
})

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.sessions)['revoke-all']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsRevokeAllMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/validate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsValidateMutationKey() {
  return ['sessions', 'POST', '/sessions/validate'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/validate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsValidateMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSessionsValidateMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.sessions.validate.$post>) =>
    parseResponse(client.sessions.validate.$post(args, clientOptions)),
})

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.validate.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.sessions.validate.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsValidateMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/history
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSessionsHistoryQueryKey(
  args: MaybeRef<InferRequestType<typeof client.sessions.history.$get>>,
) {
  return ['sessions', 'GET', '/sessions/history', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sessions/history
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsHistoryQueryOptions = (
  args: InferRequestType<typeof client.sessions.history.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSessionsHistoryQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions.history.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.sessions.history.$get>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsHistoryQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/security-events
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSessionsSecurityEventsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.sessions)['security-events']['$get']>>,
) {
  return ['sessions', 'GET', '/sessions/security-events', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sessions/security-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsSecurityEventsQueryOptions = (
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSessionsSecurityEventsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions['security-events'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.sessions)['security-events']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsSecurityEventsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/policies
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSessionsPoliciesQueryKey() {
  return ['sessions', 'GET', '/sessions/policies'] as const
}

/**
 * Returns Vue Query query options for GET /sessions/policies
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsPoliciesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSessionsPoliciesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions.policies.$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.policies.$get>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsPoliciesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /sessions/policies
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutSessionsPoliciesMutationKey() {
  return ['sessions', 'PUT', '/sessions/policies'] as const
}

/**
 * Returns Vue Query mutation options for PUT /sessions/policies
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutSessionsPoliciesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutSessionsPoliciesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.sessions.policies.$put>) =>
    parseResponse(client.sessions.policies.$put(args, clientOptions)),
})

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.sessions.policies.$put>>>
          >
        >,
        Error,
        InferRequestType<typeof client.sessions.policies.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutSessionsPoliciesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sessions/trusted-devices
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSessionsTrustedDevicesQueryKey() {
  return ['sessions', 'GET', '/sessions/trusted-devices'] as const
}

/**
 * Returns Vue Query query options for GET /sessions/trusted-devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsTrustedDevicesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSessionsTrustedDevicesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions['trusted-devices'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.sessions)['trusted-devices']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetSessionsTrustedDevicesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /sessions/trusted-devices
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSessionsTrustedDevicesMutationKey() {
  return ['sessions', 'POST', '/sessions/trusted-devices'] as const
}

/**
 * Returns Vue Query mutation options for POST /sessions/trusted-devices
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSessionsTrustedDevicesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSessionsTrustedDevicesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
  ) => parseResponse(client.sessions['trusted-devices'].$post(args, clientOptions)),
})

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.sessions)['trusted-devices']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSessionsTrustedDevicesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /sessions/trusted-devices/{deviceId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSessionsTrustedDevicesDeviceIdMutationKey() {
  return ['sessions', 'DELETE', '/sessions/trusted-devices/:deviceId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /sessions/trusted-devices/{deviceId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSessionsTrustedDevicesDeviceIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSessionsTrustedDevicesDeviceIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
  ) => parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(args, clientOptions)),
})

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteSessionsTrustedDevicesDeviceIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
