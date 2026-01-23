import { useQuery, useMutation } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSessionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.$post>
  >({ mutationFn: async (args) => parseResponse(client.sessions.$post(args, clientOptions)) })
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSessionsCurrentQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/current
 */
export function getGetSessionsCurrentQueryKey() {
  return ['/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.$delete> | undefined,
    Error,
    void
  >({
    mutationFn: async () =>
      parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.refresh.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions.current.refresh.$post(args, clientOptions)),
  })
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.extend.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.current.extend.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions.current.extend.$post(args, clientOptions)),
  })
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.current.activity.$post> | undefined,
    Error,
    void
  >({
    mutationFn: async () =>
      parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
  })
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSessionsSessionIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdQueryKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return ['/sessions/:sessionId', args] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.sessions)['revoke-all']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions['revoke-all'].$post(args, clientOptions)),
  })
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.validate.$post> | undefined,
    Error,
    InferRequestType<typeof client.sessions.validate.$post>
  >({
    mutationFn: async (args) => parseResponse(client.sessions.validate.$post(args, clientOptions)),
  })
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSessionsHistoryQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/history
 */
export function getGetSessionsHistoryQueryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['/sessions/history', args] as const
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSessionsSecurityEventsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsQueryKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['/sessions/security-events', args] as const
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSessionsPoliciesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesQueryKey() {
  return ['/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.sessions.policies.$put> | undefined,
    Error,
    InferRequestType<typeof client.sessions.policies.$put>
  >({
    mutationFn: async (args) => parseResponse(client.sessions.policies.$put(args, clientOptions)),
  })
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSessionsTrustedDevicesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesQueryKey() {
  return ['/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.sessions)['trusted-devices']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions['trusted-devices'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(args, clientOptions)),
  })
}
