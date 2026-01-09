import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 *
 * 現在のユーザーのアクティブなセッション一覧を取得
 */
export async function getSessions(
  args: { query: { includeExpired?: string } },
  options?: ClientRequestOptions,
) {
  return await client.sessions.$get(args, options)
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export async function postSessions(
  args: {
    json: {
      grantType: 'password' | 'mfa_token' | 'sso_token' | 'passkey' | 'magic_link' | 'social'
      username?: string
      password?: string
      mfaToken?: string
      mfaCode?: string
      ssoToken?: string
      passkeyResponse?: {}
      magicLinkToken?: string
      socialProvider?: string
      socialToken?: string
      deviceFingerprint?: string
      rememberMe?: boolean
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.sessions.$post(args, options)
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export async function getSessionsCurrent(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['sessions']['current']['$get'](args, options)
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export async function deleteSessionsCurrent(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['sessions']['current']['$delete'](args, options)
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export async function postSessionsCurrentRefresh(
  args: { json: { refreshToken: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['current']['refresh']['$post'](args, options)
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export async function postSessionsCurrentExtend(
  args: { json: { duration?: number } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['current']['extend']['$post'](args, options)
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export async function postSessionsCurrentActivity(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['sessions']['current']['activity']['$post'](args, options)
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export async function getSessionsSessionId(
  args: { param: { sessionId: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions'][':sessionId']['$get'](args, options)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export async function deleteSessionsSessionId(
  args: { param: { sessionId: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions'][':sessionId']['$delete'](args, options)
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export async function postSessionsRevokeAll(
  args: { json: { includeCurrent?: boolean } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['revoke-all']['$post'](args, options)
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export async function postSessionsValidate(
  args: { json: { accessToken?: string; sessionId?: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['validate']['$post'](args, options)
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export async function getSessionsHistory(
  args: { query: { page?: number; limit?: number; from?: string; to?: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['history']['$get'](args, options)
}

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export async function getSessionsSecurityEvents(
  args: {
    query: { page?: number; limit?: number; severity?: 'low' | 'medium' | 'high' | 'critical' }
  },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['security-events']['$get'](args, options)
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export async function getSessionsPolicies(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['sessions']['policies']['$get'](args, options)
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export async function putSessionsPolicies(
  args: {
    json: {
      sessionDuration?: number
      idleTimeout?: number
      maxConcurrentSessions?: number
      concurrentSessionAction?: 'allow' | 'deny' | 'revoke_oldest'
      requireMfaForNewDevice?: boolean
      requireMfaForNewLocation?: boolean
      allowRememberMe?: boolean
      rememberMeDuration?: number
      refreshTokenRotation?: boolean
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['policies']['$put'](args, options)
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export async function getSessionsTrustedDevices(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['sessions']['trusted-devices']['$get'](args, options)
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export async function postSessionsTrustedDevices(
  args: { json: { name?: string; trustDuration?: number } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['trusted-devices']['$post'](args, options)
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export async function deleteSessionsTrustedDevicesDeviceId(
  args: { param: { deviceId: string } },
  options?: ClientRequestOptions,
) {
  return await client['sessions']['trusted-devices'][':deviceId']['$delete'](args, options)
}
