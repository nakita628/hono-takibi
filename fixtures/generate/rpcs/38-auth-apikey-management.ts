import type { InferRequestType } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export async function getApiKeys(arg: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return await client['api-keys']['$get'](arg)
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export async function postApiKeys(arg: InferRequestType<(typeof client)['api-keys']['$post']>) {
  return await client['api-keys']['$post'](arg)
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export async function getApiKeysKeyId(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return await client['api-keys'][':keyId']['$get'](arg)
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export async function deleteApiKeysKeyId(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
) {
  return await client['api-keys'][':keyId']['$delete'](arg)
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export async function patchApiKeysKeyId(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
) {
  return await client['api-keys'][':keyId']['$patch'](arg)
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export async function postApiKeysKeyIdRevoke(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
) {
  return await client['api-keys'][':keyId']['revoke']['$post'](arg)
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export async function postApiKeysKeyIdRotate(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
) {
  return await client['api-keys'][':keyId']['rotate']['$post'](arg)
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export async function getApiKeysKeyIdUsage(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return await client['api-keys'][':keyId']['usage']['$get'](arg)
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export async function getApiKeysKeyIdRateLimitCurrent(
  arg: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return await client['api-keys'][':keyId']['rate-limit']['current']['$get'](arg)
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export async function postApiKeysVerify(
  arg: InferRequestType<(typeof client)['api-keys']['verify']['$post']>,
) {
  return await client['api-keys']['verify']['$post'](arg)
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export async function getScopes() {
  return await client.scopes.$get()
}
