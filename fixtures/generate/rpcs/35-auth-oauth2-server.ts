import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/35-auth-oauth2-server'

/**
 * GET /oauth/authorize
 *
 * 認可エンドポイント
 *
 * Authorization Code フローの認可リクエスト。
 * ユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。
 */
export async function getOauthAuthorize(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.authorize.$get(args, options)
}

/**
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
 * Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export async function postOauthToken(
  args: InferRequestType<typeof client.oauth.token.$post>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.token.$post(args, options)
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export async function postOauthRevoke(
  args: InferRequestType<typeof client.oauth.revoke.$post>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.revoke.$post(args, options)
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export async function postOauthIntrospect(
  args: InferRequestType<typeof client.oauth.introspect.$post>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.introspect.$post(args, options)
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export async function postOauthDeviceCode(
  args: InferRequestType<typeof client.oauth.device.code.$post>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.device.code.$post(args, options)
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export async function getOauthUserinfo(options?: ClientRequestOptions) {
  return await client.oauth.userinfo.$get(undefined, options)
}

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export async function getWellKnownOpenidConfiguration(options?: ClientRequestOptions) {
  return await client['.well-known']['openid-configuration'].$get(undefined, options)
}

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export async function getWellKnownJwksJson(options?: ClientRequestOptions) {
  return await client['.well-known']['jwks.json'].$get(undefined, options)
}

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export async function getOauthClients(options?: ClientRequestOptions) {
  return await client.oauth.clients.$get(undefined, options)
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export async function postOauthClients(
  args: InferRequestType<typeof client.oauth.clients.$post>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.clients.$post(args, options)
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export async function getOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.clients[':clientId'].$get(args, options)
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export async function putOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.clients[':clientId'].$put(args, options)
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export async function deleteOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.clients[':clientId'].$delete(args, options)
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export async function postOauthClientsClientIdSecret(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.clients[':clientId'].secret.$post(args, options)
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export async function getOauthConsents(options?: ClientRequestOptions) {
  return await client.oauth.consents.$get(undefined, options)
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export async function deleteOauthConsentsClientId(
  args: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.oauth.consents[':clientId'].$delete(args, options)
}
