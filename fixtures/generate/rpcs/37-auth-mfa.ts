import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export async function getMfaStatus(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['mfa']['status']['$get'](args, options)
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export async function getMfaMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['mfa']['methods']['$get'](args, options)
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export async function putMfaPreferred(
  args: { json: { method: 'totp' | 'sms' | 'email' | 'webauthn'; methodId?: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['preferred']['$put'](args, options)
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export async function postMfaTotpSetup(
  args: { json: { issuer?: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['totp']['setup']['$post'](args, options)
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export async function postMfaTotpVerify(
  args: { json: { code: string; secret: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['totp']['verify']['$post'](args, options)
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export async function deleteMfaTotp(
  args: { json: { code: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['totp']['$delete'](args, options)
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export async function postMfaSmsSetup(
  args: { json: { phoneNumber: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['sms']['setup']['$post'](args, options)
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export async function postMfaSmsVerify(
  args: { json: { challengeId: string; code: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['sms']['verify']['$post'](args, options)
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export async function deleteMfaSmsMethodId(
  args: { param: { methodId: string }; json: { verificationCode: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['sms'][':methodId']['$delete'](args, options)
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export async function postMfaEmailSetup(
  args: { json: { email?: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['email']['setup']['$post'](args, options)
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export async function postMfaEmailVerify(
  args: { json: { challengeId: string; code: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['email']['verify']['$post'](args, options)
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export async function postMfaWebauthnRegisterOptions(
  args: {
    json: {
      authenticatorType?: 'platform' | 'cross-platform' | 'any'
      residentKey?: 'discouraged' | 'preferred' | 'required'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['register']['options']['$post'](args, options)
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export async function postMfaWebauthnRegisterVerify(
  args: {
    json: {
      id: string
      rawId: string
      response: { clientDataJSON?: string; attestationObject?: string; transports?: string[] }
      type: string
      name?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['register']['verify']['$post'](args, options)
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export async function getMfaWebauthnCredentials(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['credentials']['$get'](args, options)
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export async function deleteMfaWebauthnCredentialsCredentialId(
  args: { param: { credentialId: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['credentials'][':credentialId']['$delete'](args, options)
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export async function patchMfaWebauthnCredentialsCredentialId(
  args: { param: { credentialId: string }; json: { name?: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['credentials'][':credentialId']['$patch'](args, options)
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export async function postMfaBackupCodesGenerate(
  args: { json: { verificationCode: string; count?: number } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['backup-codes']['generate']['$post'](args, options)
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export async function getMfaBackupCodesStatus(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['mfa']['backup-codes']['status']['$get'](args, options)
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export async function postMfaChallenge(
  args: {
    json: { mfaToken: string; method?: 'totp' | 'sms' | 'email' | 'webauthn' | 'backup_code' }
  },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['challenge']['$post'](args, options)
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export async function postMfaChallengeSend(
  args: { json: { challengeId: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['challenge']['send']['$post'](args, options)
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export async function postMfaVerify(
  args: {
    json:
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
      | { challengeId: string; method: 'backup_code'; code: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['verify']['$post'](args, options)
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export async function postMfaWebauthnAuthenticateOptions(
  args: { json: { challengeId: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['webauthn']['authenticate']['options']['$post'](args, options)
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export async function postMfaRecovery(
  args: { json: { email: string } },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['recovery']['$post'](args, options)
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export async function postMfaRecoveryVerify(
  args: {
    json: { token: string; identityVerification: { dateOfBirth?: string; lastFourDigits?: string } }
  },
  options?: ClientRequestOptions,
) {
  return await client['mfa']['recovery']['verify']['$post'](args, options)
}
