import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * Generates SWR cache key for GET /sessions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSessionsKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsMutationKey() {
  return ['POST', '/sessions'] as const
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.sessions.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.$post> }) =>
        parseResponse(client.sessions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/current
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSessionsCurrentKey() {
  return ['/sessions/current'] as const
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsCurrentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/current
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteSessionsCurrentMutationKey() {
  return ['DELETE', '/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.$delete>>>
        >
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSessionsCurrentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/refresh
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsCurrentRefreshMutationKey() {
  return ['POST', '/sessions/current/refresh'] as const
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.refresh.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsCurrentRefreshMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.sessions.current.refresh.$post> },
      ) => parseResponse(client.sessions.current.refresh.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/extend
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsCurrentExtendMutationKey() {
  return ['POST', '/sessions/current/extend'] as const
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.extend.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.current.extend.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsCurrentExtendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.sessions.current.extend.$post> },
      ) => parseResponse(client.sessions.current.extend.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/activity
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsCurrentActivityMutationKey() {
  return ['POST', '/sessions/current/activity'] as const
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.activity.$post>>>
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
  const swrKey = customKey ?? getPostSessionsCurrentActivityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/{sessionId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSessionsSessionIdKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return [`/sessions/${args.param.sessionId}`, args] as const
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsSessionIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/{sessionId}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteSessionsSessionIdMutationKey() {
  return ['DELETE', '/sessions/:sessionId'] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSessionsSessionIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
      ) => parseResponse(client.sessions[':sessionId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/revoke-all
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsRevokeAllMutationKey() {
  return ['POST', '/sessions/revoke-all'] as const
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.sessions)['revoke-all']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsRevokeAllMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)['revoke-all']['$post']> },
      ) => parseResponse(client.sessions['revoke-all'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/validate
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsValidateMutationKey() {
  return ['POST', '/sessions/validate'] as const
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.validate.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.validate.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsValidateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.validate.$post> }) =>
        parseResponse(client.sessions.validate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/history
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSessionsHistoryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['/sessions/history', args] as const
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsHistoryKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/security-events
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSessionsSecurityEventsKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['/sessions/security-events', args] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsSecurityEventsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/policies
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSessionsPoliciesKey() {
  return ['/sessions/policies'] as const
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsPoliciesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /sessions/policies
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutSessionsPoliciesMutationKey() {
  return ['PUT', '/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.policies.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.policies.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutSessionsPoliciesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.policies.$put> }) =>
        parseResponse(client.sessions.policies.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/trusted-devices
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSessionsTrustedDevicesKey() {
  return ['/sessions/trusted-devices'] as const
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsTrustedDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/trusted-devices
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostSessionsTrustedDevicesMutationKey() {
  return ['POST', '/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.sessions)['trusted-devices']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSessionsTrustedDevicesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']> },
      ) => parseResponse(client.sessions['trusted-devices'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/trusted-devices/{deviceId}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteSessionsTrustedDevicesDeviceIdMutationKey() {
  return ['DELETE', '/sessions/trusted-devices/:deviceId'] as const
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSessionsTrustedDevicesDeviceIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        },
      ) =>
        parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
