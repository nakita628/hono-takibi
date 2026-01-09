import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export async function getSocialAuthorizeProvider(arg: {
  param: {
    provider:
      | 'google'
      | 'github'
      | 'microsoft'
      | 'apple'
      | 'facebook'
      | 'twitter'
      | 'linkedin'
      | 'slack'
      | 'discord'
      | 'custom'
  }
  query: {
    redirect_uri: string
    state?: string
    scope?: string
    login_hint?: string
    prompt?: 'none' | 'consent' | 'select_account'
  }
}) {
  return await client['social']['authorize'][':provider']['$get'](arg)
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export async function getSocialCallbackProvider(arg: {
  param: {
    provider:
      | 'google'
      | 'github'
      | 'microsoft'
      | 'apple'
      | 'facebook'
      | 'twitter'
      | 'linkedin'
      | 'slack'
      | 'discord'
      | 'custom'
  }
  query: { code?: string; state?: string; error?: string; error_description?: string }
}) {
  return await client['social']['callback'][':provider']['$get'](arg)
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export async function postSocialToken(arg: {
  json: { provider: string; code: string; redirectUri: string; codeVerifier?: string }
}) {
  return await client['social']['token']['$post'](arg)
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export async function postSocialTokenNative(arg: {
  json: { provider: string; token: string; tokenType?: 'id_token' | 'access_token' }
}) {
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
export async function postProvidersAdmin(arg: {
  json: {
    name: string
    type: 'oauth2' | 'oidc'
    clientId: string
    clientSecret: string
    authorizationUrl?: string
    tokenUrl?: string
    userInfoUrl?: string
    scopes?: string[]
    attributeMapping?: {}
    allowedDomains?: string[]
    autoCreateUser?: boolean
    autoLinkUser?: boolean
    icon?: string
    buttonColor?: string
  }
}) {
  return await client['providers']['admin']['$post'](arg)
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export async function getProvidersProviderId(arg: { param: { providerId: string } }) {
  return await client['providers'][':providerId']['$get'](arg)
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export async function putProvidersProviderId(arg: {
  param: { providerId: string }
  json: {
    name?: string
    enabled?: boolean
    clientId?: string
    clientSecret?: string
    authorizationUrl?: string
    tokenUrl?: string
    userInfoUrl?: string
    scopes?: string[]
    attributeMapping?: {}
    allowedDomains?: string[]
    autoCreateUser?: boolean
    autoLinkUser?: boolean
  }
}) {
  return await client['providers'][':providerId']['$put'](arg)
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export async function deleteProvidersProviderId(arg: { param: { providerId: string } }) {
  return await client['providers'][':providerId']['$delete'](arg)
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export async function postProvidersProviderIdTest(arg: { param: { providerId: string } }) {
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
export async function postAccountLinkProvider(arg: {
  param: {
    provider:
      | 'google'
      | 'github'
      | 'microsoft'
      | 'apple'
      | 'facebook'
      | 'twitter'
      | 'linkedin'
      | 'slack'
      | 'discord'
      | 'custom'
  }
  json: { code: string; redirectUri: string }
}) {
  return await client['account']['link'][':provider']['$post'](arg)
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export async function deleteAccountLinkProvider(arg: {
  param: {
    provider:
      | 'google'
      | 'github'
      | 'microsoft'
      | 'apple'
      | 'facebook'
      | 'twitter'
      | 'linkedin'
      | 'slack'
      | 'discord'
      | 'custom'
  }
}) {
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
export async function postEnterpriseSso(arg: {
  json: {
    name: string
    type: 'saml' | 'oidc'
    domains: string[]
    samlConfig?: {
      entityId?: string
      ssoUrl?: string
      sloUrl?: string
      certificate?: string
      signRequest?: boolean
      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512'
      digestAlgorithm?: 'SHA256' | 'SHA512'
      nameIdFormat?: string
      attributeMapping?: {
        email?: string
        name?: string
        firstName?: string
        lastName?: string
        groups?: string
      }
    }
    oidcConfig?: {
      issuer?: string
      clientId?: string
      authorizationEndpoint?: string
      tokenEndpoint?: string
      userInfoEndpoint?: string
      jwksUri?: string
      scopes?: string[]
      attributeMapping?: {}
    }
    userProvisioning?: {}
  }
}) {
  return await client['enterprise']['sso']['$post'](arg)
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export async function getEnterpriseSsoConfigId(arg: { param: { configId: string } }) {
  return await client['enterprise']['sso'][':configId']['$get'](arg)
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export async function putEnterpriseSsoConfigId(arg: {
  param: { configId: string }
  json: {
    name?: string
    enabled?: boolean
    domains?: string[]
    samlConfig?: {
      entityId?: string
      ssoUrl?: string
      sloUrl?: string
      certificate?: string
      signRequest?: boolean
      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512'
      digestAlgorithm?: 'SHA256' | 'SHA512'
      nameIdFormat?: string
      attributeMapping?: {
        email?: string
        name?: string
        firstName?: string
        lastName?: string
        groups?: string
      }
    }
    oidcConfig?: {
      issuer?: string
      clientId?: string
      authorizationEndpoint?: string
      tokenEndpoint?: string
      userInfoEndpoint?: string
      jwksUri?: string
      scopes?: string[]
      attributeMapping?: {}
    }
    userProvisioning?: {}
  }
}) {
  return await client['enterprise']['sso'][':configId']['$put'](arg)
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export async function deleteEnterpriseSsoConfigId(arg: { param: { configId: string } }) {
  return await client['enterprise']['sso'][':configId']['$delete'](arg)
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export async function getEnterpriseSsoDomainLookup(arg: { query: { domain: string } }) {
  return await client['enterprise']['sso']['domain-lookup']['$get'](arg)
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export async function getEnterpriseSsoConfigIdMetadata(arg: { param: { configId: string } }) {
  return await client['enterprise']['sso'][':configId']['metadata']['$get'](arg)
}
