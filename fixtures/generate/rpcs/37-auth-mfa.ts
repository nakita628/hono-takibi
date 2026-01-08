import type { InferRequestType } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export async function getMfaStatus() {
  return await client['mfa']['status']['$get']()
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export async function getMfaMethods() {
  return await client['mfa']['methods']['$get']()
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export async function putMfaPreferred(
  arg: InferRequestType<(typeof client)['mfa']['preferred']['$put']>,
) {
  return await client['mfa']['preferred']['$put'](arg)
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export async function postMfaTotpSetup(
  arg: InferRequestType<(typeof client)['mfa']['totp']['setup']['$post']>,
) {
  return await client['mfa']['totp']['setup']['$post'](arg)
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export async function postMfaTotpVerify(
  arg: InferRequestType<(typeof client)['mfa']['totp']['verify']['$post']>,
) {
  return await client['mfa']['totp']['verify']['$post'](arg)
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export async function deleteMfaTotp(
  arg: InferRequestType<(typeof client)['mfa']['totp']['$delete']>,
) {
  return await client['mfa']['totp']['$delete'](arg)
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export async function postMfaSmsSetup(
  arg: InferRequestType<(typeof client)['mfa']['sms']['setup']['$post']>,
) {
  return await client['mfa']['sms']['setup']['$post'](arg)
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export async function postMfaSmsVerify(
  arg: InferRequestType<(typeof client)['mfa']['sms']['verify']['$post']>,
) {
  return await client['mfa']['sms']['verify']['$post'](arg)
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export async function deleteMfaSmsMethodId(
  arg: InferRequestType<(typeof client)['mfa']['sms'][':methodId']['$delete']>,
) {
  return await client['mfa']['sms'][':methodId']['$delete'](arg)
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export async function postMfaEmailSetup(
  arg: InferRequestType<(typeof client)['mfa']['email']['setup']['$post']>,
) {
  return await client['mfa']['email']['setup']['$post'](arg)
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export async function postMfaEmailVerify(
  arg: InferRequestType<(typeof client)['mfa']['email']['verify']['$post']>,
) {
  return await client['mfa']['email']['verify']['$post'](arg)
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export async function postMfaWebauthnRegisterOptions(
  arg: InferRequestType<(typeof client)['mfa']['webauthn']['register']['options']['$post']>,
) {
  return await client['mfa']['webauthn']['register']['options']['$post'](arg)
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export async function postMfaWebauthnRegisterVerify(
  arg: InferRequestType<(typeof client)['mfa']['webauthn']['register']['verify']['$post']>,
) {
  return await client['mfa']['webauthn']['register']['verify']['$post'](arg)
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export async function getMfaWebauthnCredentials() {
  return await client['mfa']['webauthn']['credentials']['$get']()
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export async function deleteMfaWebauthnCredentialsCredentialId(
  arg: InferRequestType<
    (typeof client)['mfa']['webauthn']['credentials'][':credentialId']['$delete']
  >,
) {
  return await client['mfa']['webauthn']['credentials'][':credentialId']['$delete'](arg)
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export async function patchMfaWebauthnCredentialsCredentialId(
  arg: InferRequestType<
    (typeof client)['mfa']['webauthn']['credentials'][':credentialId']['$patch']
  >,
) {
  return await client['mfa']['webauthn']['credentials'][':credentialId']['$patch'](arg)
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export async function postMfaBackupCodesGenerate(
  arg: InferRequestType<(typeof client)['mfa']['backup-codes']['generate']['$post']>,
) {
  return await client['mfa']['backup-codes']['generate']['$post'](arg)
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export async function getMfaBackupCodesStatus() {
  return await client['mfa']['backup-codes']['status']['$get']()
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export async function postMfaChallenge(
  arg: InferRequestType<(typeof client)['mfa']['challenge']['$post']>,
) {
  return await client['mfa']['challenge']['$post'](arg)
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export async function postMfaChallengeSend(
  arg: InferRequestType<(typeof client)['mfa']['challenge']['send']['$post']>,
) {
  return await client['mfa']['challenge']['send']['$post'](arg)
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export async function postMfaVerify(
  arg: InferRequestType<(typeof client)['mfa']['verify']['$post']>,
) {
  return await client['mfa']['verify']['$post'](arg)
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export async function postMfaWebauthnAuthenticateOptions(
  arg: InferRequestType<(typeof client)['mfa']['webauthn']['authenticate']['options']['$post']>,
) {
  return await client['mfa']['webauthn']['authenticate']['options']['$post'](arg)
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export async function postMfaRecovery(
  arg: InferRequestType<(typeof client)['mfa']['recovery']['$post']>,
) {
  return await client['mfa']['recovery']['$post'](arg)
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export async function postMfaRecoveryVerify(
  arg: InferRequestType<(typeof client)['mfa']['recovery']['verify']['$post']>,
) {
  return await client['mfa']['recovery']['verify']['$post'](arg)
}
