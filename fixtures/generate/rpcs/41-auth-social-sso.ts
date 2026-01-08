import type { InferRequestType } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export async function getSocialAuthorizeProvider(
  arg: InferRequestType<(typeof client)['social']['authorize'][':provider']['$get']>,
) {
  return await client['social']['authorize'][':provider']['$get'](arg)
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export async function getSocialCallbackProvider(
  arg: InferRequestType<(typeof client)['social']['callback'][':provider']['$get']>,
) {
  return await client['social']['callback'][':provider']['$get'](arg)
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export async function postSocialToken(
  arg: InferRequestType<(typeof client)['social']['token']['$post']>,
) {
  return await client['social']['token']['$post'](arg)
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export async function postSocialTokenNative(
  arg: InferRequestType<(typeof client)['social']['token']['native']['$post']>,
) {
  return await client['social']['token']['native']['$post'](arg)
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export async function getProviders() {
  return await client.providers.$get()
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export async function getProvidersAdmin() {
  return await client['providers']['admin']['$get']()
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export async function postProvidersAdmin(
  arg: InferRequestType<(typeof client)['providers']['admin']['$post']>,
) {
  return await client['providers']['admin']['$post'](arg)
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export async function getProvidersProviderId(
  arg: InferRequestType<(typeof client)['providers'][':providerId']['$get']>,
) {
  return await client['providers'][':providerId']['$get'](arg)
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export async function putProvidersProviderId(
  arg: InferRequestType<(typeof client)['providers'][':providerId']['$put']>,
) {
  return await client['providers'][':providerId']['$put'](arg)
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export async function deleteProvidersProviderId(
  arg: InferRequestType<(typeof client)['providers'][':providerId']['$delete']>,
) {
  return await client['providers'][':providerId']['$delete'](arg)
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export async function postProvidersProviderIdTest(
  arg: InferRequestType<(typeof client)['providers'][':providerId']['test']['$post']>,
) {
  return await client['providers'][':providerId']['test']['$post'](arg)
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export async function getAccountLinked() {
  return await client['account']['linked']['$get']()
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export async function postAccountLinkProvider(
  arg: InferRequestType<(typeof client)['account']['link'][':provider']['$post']>,
) {
  return await client['account']['link'][':provider']['$post'](arg)
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export async function deleteAccountLinkProvider(
  arg: InferRequestType<(typeof client)['account']['link'][':provider']['$delete']>,
) {
  return await client['account']['link'][':provider']['$delete'](arg)
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export async function getEnterpriseSso() {
  return await client['enterprise']['sso']['$get']()
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export async function postEnterpriseSso(
  arg: InferRequestType<(typeof client)['enterprise']['sso']['$post']>,
) {
  return await client['enterprise']['sso']['$post'](arg)
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export async function getEnterpriseSsoConfigId(
  arg: InferRequestType<(typeof client)['enterprise']['sso'][':configId']['$get']>,
) {
  return await client['enterprise']['sso'][':configId']['$get'](arg)
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export async function putEnterpriseSsoConfigId(
  arg: InferRequestType<(typeof client)['enterprise']['sso'][':configId']['$put']>,
) {
  return await client['enterprise']['sso'][':configId']['$put'](arg)
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export async function deleteEnterpriseSsoConfigId(
  arg: InferRequestType<(typeof client)['enterprise']['sso'][':configId']['$delete']>,
) {
  return await client['enterprise']['sso'][':configId']['$delete'](arg)
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export async function getEnterpriseSsoDomainLookup(
  arg: InferRequestType<(typeof client)['enterprise']['sso']['domain-lookup']['$get']>,
) {
  return await client['enterprise']['sso']['domain-lookup']['$get'](arg)
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export async function getEnterpriseSsoConfigIdMetadata(
  arg: InferRequestType<(typeof client)['enterprise']['sso'][':configId']['metadata']['$get']>,
) {
  return await client['enterprise']['sso'][':configId']['metadata']['$get'](arg)
}
