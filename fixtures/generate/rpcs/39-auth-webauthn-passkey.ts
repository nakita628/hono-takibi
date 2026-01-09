import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export async function postWebauthnRegisterOptions(
  args: {
    json: {
      authenticatorAttachment?: 'platform' | 'cross-platform'
      residentKey?: 'discouraged' | 'preferred' | 'required'
      userVerification?: 'discouraged' | 'preferred' | 'required'
      attestation?: 'none' | 'indirect' | 'direct' | 'enterprise'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.register.options.$post(args, options)
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export async function postWebauthnRegisterVerify(
  args: {
    json: {
      id: string
      rawId: string
      response: {
        clientDataJSON: string
        attestationObject: string
        transports?: ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
        publicKeyAlgorithm?: number
        publicKey?: string
        authenticatorData?: string
      }
      type: 'public-key'
      clientExtensionResults?: { credProps?: { rk?: boolean } }
      authenticatorAttachment?: 'platform' | 'cross-platform'
      name?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.register.verify.$post(args, options)
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export async function postWebauthnAuthenticateOptions(
  args: {
    json: { username?: string; userVerification?: 'discouraged' | 'preferred' | 'required' }
  },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.authenticate.options.$post(args, options)
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export async function postWebauthnAuthenticateVerify(
  args: {
    json: {
      id: string
      rawId: string
      response: {
        clientDataJSON: string
        authenticatorData: string
        signature: string
        userHandle?: string
      }
      type: 'public-key'
      clientExtensionResults?: {}
      authenticatorAttachment?: 'platform' | 'cross-platform'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.authenticate.verify.$post(args, options)
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export async function getWebauthnCredentials(options?: ClientRequestOptions) {
  return await client.webauthn.credentials.$get(undefined, options)
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export async function getWebauthnCredentialsCredentialId(
  args: { param: { credentialId: string } },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.credentials[':credentialId'].$get(args, options)
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export async function deleteWebauthnCredentialsCredentialId(
  args: { param: { credentialId: string } },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.credentials[':credentialId'].$delete(args, options)
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export async function patchWebauthnCredentialsCredentialId(
  args: { param: { credentialId: string }; json: { name?: string } },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.credentials[':credentialId'].$patch(args, options)
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export async function getWebauthnSettings(options?: ClientRequestOptions) {
  return await client.webauthn.settings.$get(undefined, options)
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export async function getWebauthnSettingsRp(options?: ClientRequestOptions) {
  return await client.webauthn.settings.rp.$get(undefined, options)
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export async function putWebauthnSettingsRp(
  args: { json: { name?: string } },
  options?: ClientRequestOptions,
) {
  return await client.webauthn.settings.rp.$put(args, options)
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export async function getWebauthnAuthenticators(options?: ClientRequestOptions) {
  return await client.webauthn.authenticators.$get(undefined, options)
}
