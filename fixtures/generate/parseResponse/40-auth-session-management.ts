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
export async function getSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.$get(args, options))
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export async function postSessions(
  args: InferRequestType<typeof client.sessions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.$post(args, options))
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export async function getSessionsCurrent(options?: ClientRequestOptions) {
  return await parseResponse(client.sessions.current.$get(undefined, options))
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export async function deleteSessionsCurrent(options?: ClientRequestOptions) {
  return await parseResponse(client.sessions.current.$delete(undefined, options))
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export async function postSessionsCurrentRefresh(
  args: InferRequestType<typeof client.sessions.current.refresh.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.current.refresh.$post(args, options))
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export async function postSessionsCurrentExtend(
  args: InferRequestType<typeof client.sessions.current.extend.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.current.extend.$post(args, options))
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export async function postSessionsCurrentActivity(options?: ClientRequestOptions) {
  return await parseResponse(client.sessions.current.activity.$post(undefined, options))
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export async function getSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions[':sessionId'].$get(args, options))
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export async function deleteSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions[':sessionId'].$delete(args, options))
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export async function postSessionsRevokeAll(
  args: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions['revoke-all'].$post(args, options))
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export async function postSessionsValidate(
  args: InferRequestType<typeof client.sessions.validate.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.validate.$post(args, options))
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export async function getSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.history.$get(args, options))
}

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export async function getSessionsSecurityEvents(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions['security-events'].$get(args, options))
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export async function getSessionsPolicies(options?: ClientRequestOptions) {
  return await parseResponse(client.sessions.policies.$get(undefined, options))
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export async function putSessionsPolicies(
  args: InferRequestType<typeof client.sessions.policies.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions.policies.$put(args, options))
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export async function getSessionsTrustedDevices(options?: ClientRequestOptions) {
  return await parseResponse(client.sessions['trusted-devices'].$get(undefined, options))
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export async function postSessionsTrustedDevices(
  args: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions['trusted-devices'].$post(args, options))
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export async function deleteSessionsTrustedDevicesDeviceId(
  args: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(args, options))
}
