import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions
 */
export function getGetSessionsKey(args?: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', ...(args ? [args] : [])] as const
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
    InferResponseType<typeof client.sessions.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.$post> }) =>
      parseResponse(client.sessions.$post(arg, clientOptions)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsCurrentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/current
 */
export function getGetSessionsCurrentKey() {
  return ['/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.current.$delete> | undefined,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /sessions/current',
    async () => parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.sessions.current.refresh.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/current/refresh',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.sessions.current.refresh.$post> },
    ) => parseResponse(client.sessions.current.refresh.$post(arg, clientOptions)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.sessions.current.extend.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.extend.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/current/extend',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.sessions.current.extend.$post> },
    ) => parseResponse(client.sessions.current.extend.$post(arg, clientOptions)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.sessions.current.activity.$post>,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/current/activity',
    async () => parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsSessionIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdKey(
  args?: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return ['/sessions/:sessionId', ...(args ? [args] : [])] as const
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
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /sessions/:sessionId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
    ) => parseResponse(client.sessions[':sessionId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    InferResponseType<(typeof client.sessions)['revoke-all']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/revoke-all',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)['revoke-all']['$post']> },
    ) => parseResponse(client.sessions['revoke-all'].$post(arg, clientOptions)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.sessions.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/validate',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.validate.$post> }) =>
      parseResponse(client.sessions.validate.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsHistoryKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/history
 */
export function getGetSessionsHistoryKey(
  args?: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['/sessions/history', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsSecurityEventsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsKey(
  args?: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['/sessions/security-events', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsPoliciesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesKey() {
  return ['/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.policies.$put>,
    Error,
    string,
    InferRequestType<typeof client.sessions.policies.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /sessions/policies',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.policies.$put> }) =>
      parseResponse(client.sessions.policies.$put(arg, clientOptions)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsTrustedDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesKey() {
  return ['/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /sessions/trusted-devices',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']> },
    ) => parseResponse(client.sessions['trusted-devices'].$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /sessions/trusted-devices/:deviceId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
      },
    ) => parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}
