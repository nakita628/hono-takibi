import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export async function getMfaStatus(options?: ClientRequestOptions) {
  return await client.mfa.status.$get(undefined, options)
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export async function getMfaMethods(options?: ClientRequestOptions) {
  return await client.mfa.methods.$get(undefined, options)
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export async function putMfaPreferred(
  args: InferRequestType<typeof client.mfa.preferred.$put>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.preferred.$put(args, options)
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export async function postMfaTotpSetup(
  args: InferRequestType<typeof client.mfa.totp.setup.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.totp.setup.$post(args, options)
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export async function postMfaTotpVerify(
  args: InferRequestType<typeof client.mfa.totp.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.totp.verify.$post(args, options)
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export async function deleteMfaTotp(
  args: InferRequestType<typeof client.mfa.totp.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.totp.$delete(args, options)
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export async function postMfaSmsSetup(
  args: InferRequestType<typeof client.mfa.sms.setup.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.sms.setup.$post(args, options)
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export async function postMfaSmsVerify(
  args: InferRequestType<typeof client.mfa.sms.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.sms.verify.$post(args, options)
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export async function deleteMfaSmsMethodId(
  args: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.sms[':methodId'].$delete(args, options)
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export async function postMfaEmailSetup(
  args: InferRequestType<typeof client.mfa.email.setup.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.email.setup.$post(args, options)
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export async function postMfaEmailVerify(
  args: InferRequestType<typeof client.mfa.email.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.email.verify.$post(args, options)
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export async function postMfaWebauthnRegisterOptions(
  args: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.webauthn.register.options.$post(args, options)
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export async function postMfaWebauthnRegisterVerify(
  args: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.webauthn.register.verify.$post(args, options)
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export async function getMfaWebauthnCredentials(options?: ClientRequestOptions) {
  return await client.mfa.webauthn.credentials.$get(undefined, options)
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export async function deleteMfaWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.webauthn.credentials[':credentialId'].$delete(args, options)
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export async function patchMfaWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.webauthn.credentials[':credentialId'].$patch(args, options)
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export async function postMfaBackupCodesGenerate(
  args: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.mfa['backup-codes'].generate.$post(args, options)
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export async function getMfaBackupCodesStatus(options?: ClientRequestOptions) {
  return await client.mfa['backup-codes'].status.$get(undefined, options)
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export async function postMfaChallenge(
  args: InferRequestType<typeof client.mfa.challenge.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.challenge.$post(args, options)
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export async function postMfaChallengeSend(
  args: InferRequestType<typeof client.mfa.challenge.send.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.challenge.send.$post(args, options)
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export async function postMfaVerify(
  args: InferRequestType<typeof client.mfa.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.verify.$post(args, options)
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export async function postMfaWebauthnAuthenticateOptions(
  args: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.webauthn.authenticate.options.$post(args, options)
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export async function postMfaRecovery(
  args: InferRequestType<typeof client.mfa.recovery.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.recovery.$post(args, options)
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export async function postMfaRecoveryVerify(
  args: InferRequestType<typeof client.mfa.recovery.verify.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mfa.recovery.verify.$post(args, options)
}
