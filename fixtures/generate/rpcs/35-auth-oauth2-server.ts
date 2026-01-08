import { client } from '../clients/35-auth-oauth2-server'

/**
 * GET /oauth/authorize
 *
 * 認可エンドポイント
 *
 * Authorization Code フローの認可リクエスト。
ユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。
 */
export async function getOauthAuthorize(params: {
  query: {
    response_type: 'code' | 'token'
    client_id: string
    redirect_uri: string
    scope: string
    state: string
    code_challenge: string
    code_challenge_method: 'plain' | 'S256'
    nonce: string
    prompt: 'none' | 'login' | 'consent' | 'select_account'
    login_hint: string
    ui_locales: string
  }
}) {
  return await client.oauth.authorize.$get({ query: params.query })
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
  body:
    | {
        grant_type: 'authorization_code'
        code: string
        redirect_uri: string
        client_id: string
        client_secret?: string
        code_verifier?: string
      }
    | { grant_type: 'client_credentials'; client_id: string; client_secret: string; scope?: string }
    | {
        grant_type: 'refresh_token'
        refresh_token: string
        client_id?: string
        client_secret?: string
        scope?: string
      }
    | {
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
        device_code: string
        client_id: string
      }
    | {
        grant_type: 'password'
        username: string
        password: string
        client_id?: string
        client_secret?: string
        scope?: string
      },
) {
  return await client.oauth.token.$post({ json: body })
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export async function postOauthRevoke(body: {
  token: string
  token_type_hint?: 'access_token' | 'refresh_token'
  client_id?: string
  client_secret?: string
}) {
  return await client.oauth.revoke.$post({ json: body })
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export async function postOauthIntrospect(body: {
  token: string
  token_type_hint?: 'access_token' | 'refresh_token'
}) {
  return await client.oauth.introspect.$post({ json: body })
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export async function postOauthDeviceCode(body: { client_id: string; scope?: string }) {
  return await client.oauth.device.code.$post({ json: body })
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export async function getOauthUserinfo() {
  return await client.oauth.userinfo.$get()
}

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export async function getWellKnownOpenidConfiguration() {
  return await client['.well-known']['openid-configuration'].$get()
}

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export async function getWellKnownJwksJson() {
  return await client['.well-known']['jwks.json'].$get()
}

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export async function getOauthClients() {
  return await client.oauth.clients.$get()
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export async function postOauthClients(body: {
  clientName: string
  clientType?: 'public' | 'confidential'
  redirectUris: string[]
  grantTypes?: (
    | 'authorization_code'
    | 'client_credentials'
    | 'refresh_token'
    | 'password'
    | 'urn:ietf:params:oauth:grant-type:device_code'
  )[]
  responseTypes?: ('code' | 'token')[]
  scope?: string
  logoUri?: string
  clientUri?: string
  policyUri?: string
  tosUri?: string
  contacts?: string[]
  tokenEndpointAuthMethod?: 'client_secret_basic' | 'client_secret_post' | 'none'
}) {
  return await client.oauth.clients.$post({ json: body })
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export async function getOauthClientsClientId(params: { path: { clientId: string } }) {
  return await client.oauth.clients[':clientId'].$get({ param: params.path })
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export async function putOauthClientsClientId(
  params: { path: { clientId: string } },
  body: {
    clientName?: string
    redirectUris?: string[]
    grantTypes?: string[]
    responseTypes?: string[]
    scope?: string
    logoUri?: string
    clientUri?: string
    policyUri?: string
    tosUri?: string
    contacts?: string[]
  },
) {
  return await client.oauth.clients[':clientId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export async function deleteOauthClientsClientId(params: { path: { clientId: string } }) {
  return await client.oauth.clients[':clientId'].$delete({ param: params.path })
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export async function postOauthClientsClientIdSecret(params: { path: { clientId: string } }) {
  return await client.oauth.clients[':clientId'].secret.$post({ param: params.path })
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export async function getOauthConsents() {
  return await client.oauth.consents.$get()
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export async function deleteOauthConsentsClientId(params: { path: { clientId: string } }) {
  return await client.oauth.consents[':clientId'].$delete({ param: params.path })
}
