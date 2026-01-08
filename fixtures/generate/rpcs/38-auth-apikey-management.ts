import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export async function getApiKeys(params: {
  query: {
    page: number
    limit: number
    status: 'active' | 'revoked' | 'expired'
    environment: 'production' | 'staging' | 'development' | 'test'
  }
}) {
  return await client['api-keys'].$get({ query: params.query })
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export async function postApiKeys(body: {
  name: string
  description?: string
  environment: 'production' | 'staging' | 'development' | 'test'
  scopes?: string[]
  expiresAt?: string
}) {
  return await client['api-keys'].$post({ json: body })
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export async function getApiKeysKeyId(params: { path: { keyId: string } }) {
  return await client['api-keys'][':keyId'].$get({ param: params.path })
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export async function deleteApiKeysKeyId(params: { path: { keyId: string } }) {
  return await client['api-keys'][':keyId'].$delete({ param: params.path })
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export async function patchApiKeysKeyId(
  params: { path: { keyId: string } },
  body: { name?: string; description?: string; scopes?: string[] },
) {
  return await client['api-keys'][':keyId'].$patch({ param: params.path, json: body })
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export async function postApiKeysKeyIdRevoke(
  params: { path: { keyId: string } },
  body: { reason?: string },
) {
  return await client['api-keys'][':keyId'].revoke.$post({ param: params.path, json: body })
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export async function postApiKeysKeyIdRotate(
  params: { path: { keyId: string } },
  body: { gracePeriodHours?: number },
) {
  return await client['api-keys'][':keyId'].rotate.$post({ param: params.path, json: body })
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export async function getApiKeysKeyIdUsage(params: {
  path: { keyId: string }
  query: { from: string; to: string; granularity: 'hour' | 'day' | 'week' | 'month' }
}) {
  return await client['api-keys'][':keyId'].usage.$get({ param: params.path, query: params.query })
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export async function getApiKeysKeyIdRateLimitCurrent(params: { path: { keyId: string } }) {
  return await client['api-keys'][':keyId']['rate-limit'].current.$get({ param: params.path })
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export async function postApiKeysVerify(body: { apiKey: string; requiredScopes?: string[] }) {
  return await client['api-keys'].verify.$post({ json: body })
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export async function getScopes() {
  return await client.scopes.$get()
}
