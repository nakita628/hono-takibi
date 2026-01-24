import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
export function usePostSessions(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.$post> }) =>
      parseResponse(client.sessions.$post(arg, options?.client)),
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
export function useDeleteSessionsCurrent(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('DELETE /sessions/current', async () =>
    parseResponse(client.sessions.current.$delete(undefined, options?.client)),
  )
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions/current/refresh',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.sessions.current.refresh.$post> },
    ) => parseResponse(client.sessions.current.refresh.$post(arg, options?.client)),
  )
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions/current/extend',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.sessions.current.extend.$post> },
    ) => parseResponse(client.sessions.current.extend.$post(arg, options?.client)),
  )
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('POST /sessions/current/activity', async () =>
    parseResponse(client.sessions.current.activity.$post(undefined, options?.client)),
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
export function useDeleteSessionsSessionId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /sessions/:sessionId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
    ) => parseResponse(client.sessions[':sessionId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions/revoke-all',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)['revoke-all']['$post']> },
    ) => parseResponse(client.sessions['revoke-all'].$post(arg, options?.client)),
  )
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions/validate',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.validate.$post> }) =>
      parseResponse(client.sessions.validate.$post(arg, options?.client)),
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
export function usePutSessionsPolicies(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /sessions/policies',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.sessions.policies.$put> }) =>
      parseResponse(client.sessions.policies.$put(arg, options?.client)),
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
export function usePostSessionsTrustedDevices(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /sessions/trusted-devices',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']> },
    ) => parseResponse(client.sessions['trusted-devices'].$post(arg, options?.client)),
  )
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  client?: ClientRequestOptions
}) {
  return useSWRMutation(
    'DELETE /sessions/trusted-devices/:deviceId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
      },
    ) =>
      parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(arg, options?.client)),
  )
}
