import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export async function getApiKeys(args: {
  query: {
    page?: number
    limit?: number
    status?: 'active' | 'revoked' | 'expired'
    environment?: 'production' | 'staging' | 'development' | 'test'
  }
  options?: ClientRequestOptions
}) {
  return await client['api-keys']['$get'](args)
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export async function postApiKeys(args: {
  json: {
    name: string
    description?: string
    environment: 'production' | 'staging' | 'development' | 'test'
    scopes?: string[]
    expiresAt?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['api-keys']['$post'](args)
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export async function getApiKeysKeyId(args: {
  param: { keyId: string }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['$get'](args)
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export async function deleteApiKeysKeyId(args: {
  param: { keyId: string }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['$delete'](args)
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export async function patchApiKeysKeyId(args: {
  param: { keyId: string }
  json: { name?: string; description?: string; scopes?: string[] }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['$patch'](args)
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export async function postApiKeysKeyIdRevoke(args: {
  param: { keyId: string }
  json: { reason?: string }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['revoke']['$post'](args)
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export async function postApiKeysKeyIdRotate(args: {
  param: { keyId: string }
  json: { gracePeriodHours?: number }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['rotate']['$post'](args)
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export async function getApiKeysKeyIdUsage(args: {
  param: { keyId: string }
  query: { from: string; to: string; granularity?: 'hour' | 'day' | 'week' | 'month' }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['usage']['$get'](args)
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export async function getApiKeysKeyIdRateLimitCurrent(args: {
  param: { keyId: string }
  options?: ClientRequestOptions
}) {
  return await client['api-keys'][':keyId']['rate-limit']['current']['$get'](args)
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export async function postApiKeysVerify(args: {
  json: { apiKey: string; requiredScopes?: string[] }
  options?: ClientRequestOptions
}) {
  return await client['api-keys']['verify']['$post'](args)
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export async function getScopes(args?: { options?: ClientRequestOptions }) {
  return await client.scopes.$get(args)
}
