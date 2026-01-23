import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.sessions.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/sessions', args] as const) : null
  return useSWR<InferResponseType<typeof client.sessions.$get>, Error>(
    key,
    async () => parseResponse(client.sessions.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions
 */
export function getGetSessionsKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['GET', '/sessions', args] as const
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.$post>
  >(
    'POST /sessions',
    async (_, { arg }) => parseResponse(client.sessions.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.sessions.current.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/sessions/current'] as const) : null
  return useSWR<InferResponseType<typeof client.sessions.current.$get>, Error>(
    key,
    async () => parseResponse(client.sessions.current.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/current
 */
export function getGetSessionsCurrentKey() {
  return ['GET', '/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.current.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.current.$delete>,
    Error,
    string,
    void
  >(
    'DELETE /sessions/current',
    async () => parseResponse(client.sessions.current.$delete(undefined, options?.client)),
    options?.swr,
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.current.refresh.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.current.refresh.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  >(
    'POST /sessions/current/refresh',
    async (_, { arg }) =>
      parseResponse(client.sessions.current.refresh.$post(arg, options?.client)),
    options?.swr,
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.current.extend.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.extend.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.current.extend.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.current.extend.$post>
  >(
    'POST /sessions/current/extend',
    async (_, { arg }) => parseResponse(client.sessions.current.extend.$post(arg, options?.client)),
    options?.swr,
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.current.activity.$post>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.current.activity.$post>,
    Error,
    string,
    void
  >(
    'POST /sessions/current/activity',
    async () => parseResponse(client.sessions.current.activity.$post(undefined, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.sessions)[':sessionId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/sessions/:sessionId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.sessions)[':sessionId']['$get']>, Error>(
    key,
    async () => parseResponse(client.sessions[':sessionId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdKey(
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
export function useDeleteSessionsSessionId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >(
    'DELETE /sessions/:sessionId',
    async (_, { arg }) =>
      parseResponse(client.sessions[':sessionId'].$delete(arg, options?.client)),
    options?.swr,
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.sessions)['revoke-all']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.sessions)['revoke-all']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  >(
    'POST /sessions/revoke-all',
    async (_, { arg }) => parseResponse(client.sessions['revoke-all'].$post(arg, options?.client)),
    options?.swr,
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.sessions.validate.$post>
  >(
    'POST /sessions/validate',
    async (_, { arg }) => parseResponse(client.sessions.validate.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.sessions.history.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/sessions/history', args] as const) : null
  return useSWR<InferResponseType<typeof client.sessions.history.$get>, Error>(
    key,
    async () => parseResponse(client.sessions.history.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/history
 */
export function getGetSessionsHistoryKey(
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.sessions)['security-events']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/sessions/security-events', args] as const) : null
  return useSWR<InferResponseType<(typeof client.sessions)['security-events']['$get']>, Error>(
    key,
    async () => parseResponse(client.sessions['security-events'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['GET', '/sessions/security-events', args] as const
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.sessions.policies.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/sessions/policies'] as const) : null
  return useSWR<InferResponseType<typeof client.sessions.policies.$get>, Error>(
    key,
    async () => parseResponse(client.sessions.policies.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesKey() {
  return ['GET', '/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.sessions.policies.$put>,
    Error,
    string,
    InferRequestType<typeof client.sessions.policies.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.sessions.policies.$put>,
    Error,
    string,
    InferRequestType<typeof client.sessions.policies.$put>
  >(
    'PUT /sessions/policies',
    async (_, { arg }) => parseResponse(client.sessions.policies.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/sessions/trusted-devices'] as const) : null
  return useSWR<InferResponseType<(typeof client.sessions)['trusted-devices']['$get']>, Error>(
    key,
    async () => parseResponse(client.sessions['trusted-devices'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesKey() {
  return ['GET', '/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  >(
    'POST /sessions/trusted-devices',
    async (_, { arg }) =>
      parseResponse(client.sessions['trusted-devices'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  >(
    'DELETE /sessions/trusted-devices/:deviceId',
    async (_, { arg }) =>
      parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(arg, options?.client)),
    options?.swr,
  )
}
