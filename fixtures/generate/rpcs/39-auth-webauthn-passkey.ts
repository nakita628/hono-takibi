import { client } from '../index.ts'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export async function postWebauthnRegisterOptions(body: {
  authenticatorAttachment?: 'platform' | 'cross-platform'
  residentKey?: 'discouraged' | 'preferred' | 'required'
  userVerification?: 'discouraged' | 'preferred' | 'required'
  attestation?: 'none' | 'indirect' | 'direct' | 'enterprise'
}) {
  return await client.webauthn.register.options.$post({ json: body })
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export async function postWebauthnRegisterVerify(body: {
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
}) {
  return await client.webauthn.register.verify.$post({ json: body })
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export async function postWebauthnAuthenticateOptions(body: {
  username?: string
  userVerification?: 'discouraged' | 'preferred' | 'required'
}) {
  return await client.webauthn.authenticate.options.$post({ json: body })
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export async function postWebauthnAuthenticateVerify(body: {
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
}) {
  return await client.webauthn.authenticate.verify.$post({ json: body })
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export async function getWebauthnCredentials() {
  return await client.webauthn.credentials.$get()
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export async function getWebauthnCredentialsCredentialId(params: {
  path: { credentialId: string }
}) {
  return await client.webauthn.credentials[':credentialId'].$get({ param: params.path })
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export async function deleteWebauthnCredentialsCredentialId(params: {
  path: { credentialId: string }
}) {
  return await client.webauthn.credentials[':credentialId'].$delete({ param: params.path })
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export async function patchWebauthnCredentialsCredentialId(
  params: { path: { credentialId: string } },
  body: { name?: string },
) {
  return await client.webauthn.credentials[':credentialId'].$patch({
    param: params.path,
    json: body,
  })
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export async function getWebauthnSettings() {
  return await client.webauthn.settings.$get()
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export async function getWebauthnSettingsRp() {
  return await client.webauthn.settings.rp.$get()
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export async function putWebauthnSettingsRp(body: { name?: string }) {
  return await client.webauthn.settings.rp.$put({ json: body })
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export async function getWebauthnAuthenticators() {
  return await client.webauthn.authenticators.$get()
}
