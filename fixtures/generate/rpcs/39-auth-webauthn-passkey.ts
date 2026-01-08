import type { InferRequestType } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export async function postWebauthnRegisterOptions(
  arg: InferRequestType<(typeof client)['webauthn']['register']['options']['$post']>,
) {
  return await client['webauthn']['register']['options']['$post'](arg)
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export async function postWebauthnRegisterVerify(
  arg: InferRequestType<(typeof client)['webauthn']['register']['verify']['$post']>,
) {
  return await client['webauthn']['register']['verify']['$post'](arg)
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export async function postWebauthnAuthenticateOptions(
  arg: InferRequestType<(typeof client)['webauthn']['authenticate']['options']['$post']>,
) {
  return await client['webauthn']['authenticate']['options']['$post'](arg)
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export async function postWebauthnAuthenticateVerify(
  arg: InferRequestType<(typeof client)['webauthn']['authenticate']['verify']['$post']>,
) {
  return await client['webauthn']['authenticate']['verify']['$post'](arg)
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export async function getWebauthnCredentials() {
  return await client['webauthn']['credentials']['$get']()
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export async function getWebauthnCredentialsCredentialId(
  arg: InferRequestType<(typeof client)['webauthn']['credentials'][':credentialId']['$get']>,
) {
  return await client['webauthn']['credentials'][':credentialId']['$get'](arg)
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export async function deleteWebauthnCredentialsCredentialId(
  arg: InferRequestType<(typeof client)['webauthn']['credentials'][':credentialId']['$delete']>,
) {
  return await client['webauthn']['credentials'][':credentialId']['$delete'](arg)
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export async function patchWebauthnCredentialsCredentialId(
  arg: InferRequestType<(typeof client)['webauthn']['credentials'][':credentialId']['$patch']>,
) {
  return await client['webauthn']['credentials'][':credentialId']['$patch'](arg)
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export async function getWebauthnSettings() {
  return await client['webauthn']['settings']['$get']()
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export async function getWebauthnSettingsRp() {
  return await client['webauthn']['settings']['rp']['$get']()
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export async function putWebauthnSettingsRp(
  arg: InferRequestType<(typeof client)['webauthn']['settings']['rp']['$put']>,
) {
  return await client['webauthn']['settings']['rp']['$put'](arg)
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export async function getWebauthnAuthenticators() {
  return await client['webauthn']['authenticators']['$get']()
}
