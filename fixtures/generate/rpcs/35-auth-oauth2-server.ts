import type { InferRequestType } from 'hono/client'
import { client } from '../clients/35-auth-oauth2-server'

/**
 * GET /oauth/authorize
 *
 * 認可エンドポイント
 *
 * Authorization Code フローの認可リクエスト。
ユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。
 */
export async function getOauthAuthorize(
  arg: InferRequestType<(typeof client)['oauth']['authorize']['$get']>,
) {
  return await client['oauth']['authorize']['$get'](arg)
}

/**
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export async function postOauthToken(
  arg: InferRequestType<(typeof client)['oauth']['token']['$post']>,
) {
  return await client['oauth']['token']['$post'](arg)
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export async function postOauthRevoke(
  arg: InferRequestType<(typeof client)['oauth']['revoke']['$post']>,
) {
  return await client['oauth']['revoke']['$post'](arg)
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export async function postOauthIntrospect(
  arg: InferRequestType<(typeof client)['oauth']['introspect']['$post']>,
) {
  return await client['oauth']['introspect']['$post'](arg)
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export async function postOauthDeviceCode(
  arg: InferRequestType<(typeof client)['oauth']['device']['code']['$post']>,
) {
  return await client['oauth']['device']['code']['$post'](arg)
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export async function getOauthUserinfo() {
  return await client['oauth']['userinfo']['$get']()
}

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export async function getWellKnownOpenidConfiguration() {
  return await client['.well-known']['openid-configuration']['$get']()
}

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export async function getWellKnownJwksJson() {
  return await client['.well-known']['jwks.json']['$get']()
}

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export async function getOauthClients() {
  return await client['oauth']['clients']['$get']()
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export async function postOauthClients(
  arg: InferRequestType<(typeof client)['oauth']['clients']['$post']>,
) {
  return await client['oauth']['clients']['$post'](arg)
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export async function getOauthClientsClientId(
  arg: InferRequestType<(typeof client)['oauth']['clients'][':clientId']['$get']>,
) {
  return await client['oauth']['clients'][':clientId']['$get'](arg)
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export async function putOauthClientsClientId(
  arg: InferRequestType<(typeof client)['oauth']['clients'][':clientId']['$put']>,
) {
  return await client['oauth']['clients'][':clientId']['$put'](arg)
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export async function deleteOauthClientsClientId(
  arg: InferRequestType<(typeof client)['oauth']['clients'][':clientId']['$delete']>,
) {
  return await client['oauth']['clients'][':clientId']['$delete'](arg)
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export async function postOauthClientsClientIdSecret(
  arg: InferRequestType<(typeof client)['oauth']['clients'][':clientId']['secret']['$post']>,
) {
  return await client['oauth']['clients'][':clientId']['secret']['$post'](arg)
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export async function getOauthConsents() {
  return await client['oauth']['consents']['$get']()
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export async function deleteOauthConsentsClientId(
  arg: InferRequestType<(typeof client)['oauth']['consents'][':clientId']['$delete']>,
) {
  return await client['oauth']['consents'][':clientId']['$delete'](arg)
}
