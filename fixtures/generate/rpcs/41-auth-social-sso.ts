import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export async function getSocialAuthorizeProvider(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.social.authorize[':provider'].$get(args, options)
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export async function getSocialCallbackProvider(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.social.callback[':provider'].$get(args, options)
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export async function postSocialToken(
  args: { json: { provider: string; code: string; redirectUri: string; codeVerifier?: string } },
  options?: ClientRequestOptions,
) {
  return await client.social.token.$post(args, options)
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export async function postSocialTokenNative(
  args: { json: { provider: string; token: string; tokenType?: 'id_token' | 'access_token' } },
  options?: ClientRequestOptions,
) {
  return await client.social.token.native.$post(args, options)
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export async function getProviders(options?: ClientRequestOptions) {
  return await client.providers.$get(undefined, options)
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export async function getProvidersAdmin(options?: ClientRequestOptions) {
  return await client.providers.admin.$get(undefined, options)
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export async function postProvidersAdmin(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.providers.admin.$post(args, options)
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export async function getProvidersProviderId(
  args: { param: { providerId: string } },
  options?: ClientRequestOptions,
) {
  return await client.providers[':providerId'].$get(args, options)
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export async function putProvidersProviderId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.providers[':providerId'].$put(args, options)
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export async function deleteProvidersProviderId(
  args: { param: { providerId: string } },
  options?: ClientRequestOptions,
) {
  return await client.providers[':providerId'].$delete(args, options)
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export async function postProvidersProviderIdTest(
  args: { param: { providerId: string } },
  options?: ClientRequestOptions,
) {
  return await client.providers[':providerId'].test.$post(args, options)
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export async function getAccountLinked(options?: ClientRequestOptions) {
  return await client.account.linked.$get(undefined, options)
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export async function postAccountLinkProvider(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.account.link[':provider'].$post(args, options)
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export async function deleteAccountLinkProvider(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.account.link[':provider'].$delete(args, options)
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export async function getEnterpriseSso(options?: ClientRequestOptions) {
  return await client.enterprise.sso.$get(undefined, options)
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export async function postEnterpriseSso(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso.$post(args, options)
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export async function getEnterpriseSsoConfigId(
  args: { param: { configId: string } },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso[':configId'].$get(args, options)
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export async function putEnterpriseSsoConfigId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso[':configId'].$put(args, options)
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export async function deleteEnterpriseSsoConfigId(
  args: { param: { configId: string } },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso[':configId'].$delete(args, options)
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export async function getEnterpriseSsoDomainLookup(
  args: { query: { domain: string } },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso['domain-lookup'].$get(args, options)
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export async function getEnterpriseSsoConfigIdMetadata(
  args: { param: { configId: string } },
  options?: ClientRequestOptions,
) {
  return await client.enterprise.sso[':configId'].metadata.$get(args, options)
}
