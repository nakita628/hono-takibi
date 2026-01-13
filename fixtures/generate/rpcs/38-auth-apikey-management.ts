import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export async function getApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'].$get(args, options)
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export async function postApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'].$post(args, options)
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export async function getApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].$get(args, options)
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export async function deleteApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].$delete(args, options)
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export async function patchApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].$patch(args, options)
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export async function postApiKeysKeyIdRevoke(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].revoke.$post(args, options)
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export async function postApiKeysKeyIdRotate(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].rotate.$post(args, options)
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export async function getApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId'].usage.$get(args, options)
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export async function getApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'][':keyId']['rate-limit'].current.$get(args, options)
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export async function postApiKeysVerify(
  args: InferRequestType<(typeof client)['api-keys']['verify']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['api-keys'].verify.$post(args, options)
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export async function getScopes(options?: ClientRequestOptions) {
  return await client.scopes.$get(undefined, options)
}
