import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export async function getMfaStatus() {
  return await client.mfa.status.$get()
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export async function getMfaMethods() {
  return await client.mfa.methods.$get()
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export async function putMfaPreferred(body: {
  method: 'totp' | 'sms' | 'email' | 'webauthn'
  methodId?: string
}) {
  return await client.mfa.preferred.$put({ json: body })
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export async function postMfaTotpSetup(body: { issuer?: string }) {
  return await client.mfa.totp.setup.$post({ json: body })
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export async function postMfaTotpVerify(body: { code: string; secret: string }) {
  return await client.mfa.totp.verify.$post({ json: body })
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export async function deleteMfaTotp(body: { code: string }) {
  return await client.mfa.totp.$delete({ json: body })
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export async function postMfaSmsSetup(body: { phoneNumber: string }) {
  return await client.mfa.sms.setup.$post({ json: body })
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export async function postMfaSmsVerify(body: { challengeId: string; code: string }) {
  return await client.mfa.sms.verify.$post({ json: body })
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export async function deleteMfaSmsMethodId(
  params: { path: { methodId: string } },
  body: { verificationCode: string },
) {
  return await client.mfa.sms[':methodId'].$delete({ param: params.path, json: body })
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export async function postMfaEmailSetup(body: { email?: string }) {
  return await client.mfa.email.setup.$post({ json: body })
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export async function postMfaEmailVerify(body: { challengeId: string; code: string }) {
  return await client.mfa.email.verify.$post({ json: body })
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export async function postMfaWebauthnRegisterOptions(body: {
  authenticatorType?: 'platform' | 'cross-platform' | 'any'
  residentKey?: 'discouraged' | 'preferred' | 'required'
}) {
  return await client.mfa.webauthn.register.options.$post({ json: body })
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export async function postMfaWebauthnRegisterVerify(body: {
  id: string
  rawId: string
  response: { clientDataJSON?: string; attestationObject?: string; transports?: string[] }
  type: string
  name?: string
}) {
  return await client.mfa.webauthn.register.verify.$post({ json: body })
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export async function getMfaWebauthnCredentials() {
  return await client.mfa.webauthn.credentials.$get()
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export async function deleteMfaWebauthnCredentialsCredentialId(params: {
  path: { credentialId: string }
}) {
  return await client.mfa.webauthn.credentials[':credentialId'].$delete({ param: params.path })
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export async function patchMfaWebauthnCredentialsCredentialId(
  params: { path: { credentialId: string } },
  body: { name?: string },
) {
  return await client.mfa.webauthn.credentials[':credentialId'].$patch({
    param: params.path,
    json: body,
  })
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export async function postMfaBackupCodesGenerate(body: {
  verificationCode: string
  count?: number
}) {
  return await client.mfa['backup-codes'].generate.$post({ json: body })
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export async function getMfaBackupCodesStatus() {
  return await client.mfa['backup-codes'].status.$get()
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export async function postMfaChallenge(body: {
  mfaToken: string
  method?: 'totp' | 'sms' | 'email' | 'webauthn' | 'backup_code'
}) {
  return await client.mfa.challenge.$post({ json: body })
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export async function postMfaChallengeSend(body: { challengeId: string }) {
  return await client.mfa.challenge.send.$post({ json: body })
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export async function postMfaVerify(
  body:
    | { challengeId: string; method: 'totp'; code: string }
    | { challengeId: string; method: 'sms' | 'email'; code: string }
    | {
        challengeId: string
        method: 'webauthn'
        credential: {
          id: string
          rawId: string
          response: {
            clientDataJSON?: string
            authenticatorData?: string
            signature?: string
            userHandle?: string
          }
          type: string
        }
      }
    | { challengeId: string; method: 'backup_code'; code: string },
) {
  return await client.mfa.verify.$post({ json: body })
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export async function postMfaWebauthnAuthenticateOptions(body: { challengeId: string }) {
  return await client.mfa.webauthn.authenticate.options.$post({ json: body })
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export async function postMfaRecovery(body: { email: string }) {
  return await client.mfa.recovery.$post({ json: body })
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export async function postMfaRecoveryVerify(body: {
  token: string
  identityVerification: { dateOfBirth?: string; lastFourDigits?: string }
}) {
  return await client.mfa.recovery.verify.$post({ json: body })
}
