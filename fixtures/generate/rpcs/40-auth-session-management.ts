import { client } from '../clients/40-auth-session-management'

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 *
 * 現在のユーザーのアクティブなセッション一覧を取得
 */
export async function getSessions(arg: { query: { includeExpired?: string } }) {
  return await client.sessions.$get(arg)
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export async function postSessions(arg: {
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
}) {
  return await client.sessions.$post(arg)
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export async function getSessionsCurrent() {
  return await client['sessions']['current']['$get']()
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export async function deleteSessionsCurrent() {
  return await client['sessions']['current']['$delete']()
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export async function postSessionsCurrentRefresh(arg: { json: { refreshToken: string } }) {
  return await client['sessions']['current']['refresh']['$post'](arg)
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export async function postSessionsCurrentExtend(arg: { json: { duration?: number } }) {
  return await client['sessions']['current']['extend']['$post'](arg)
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export async function postSessionsCurrentActivity() {
  return await client['sessions']['current']['activity']['$post']()
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export async function getSessionsSessionId(arg: { param: { sessionId: string } }) {
  return await client['sessions'][':sessionId']['$get'](arg)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export async function deleteSessionsSessionId(arg: { param: { sessionId: string } }) {
  return await client['sessions'][':sessionId']['$delete'](arg)
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export async function postSessionsRevokeAll(arg: { json: { includeCurrent?: boolean } }) {
  return await client['sessions']['revoke-all']['$post'](arg)
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export async function postSessionsValidate(arg: {
  json: { accessToken?: string; sessionId?: string }
}) {
  return await client['sessions']['validate']['$post'](arg)
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export async function getSessionsHistory(arg: {
  query: { page?: number; limit?: number; from?: string; to?: string }
}) {
  return await client['sessions']['history']['$get'](arg)
}

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export async function getSessionsSecurityEvents(arg: {
  query: { page?: number; limit?: number; severity?: 'low' | 'medium' | 'high' | 'critical' }
}) {
  return await client['sessions']['security-events']['$get'](arg)
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export async function getSessionsPolicies() {
  return await client['sessions']['policies']['$get']()
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export async function putSessionsPolicies(arg: {
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
}) {
  return await client['sessions']['policies']['$put'](arg)
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export async function getSessionsTrustedDevices() {
  return await client['sessions']['trusted-devices']['$get']()
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export async function postSessionsTrustedDevices(arg: {
  json: { name?: string; trustDuration?: number }
}) {
  return await client['sessions']['trusted-devices']['$post'](arg)
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export async function deleteSessionsTrustedDevicesDeviceId(arg: { param: { deviceId: string } }) {
  return await client['sessions']['trusted-devices'][':deviceId']['$delete'](arg)
}
