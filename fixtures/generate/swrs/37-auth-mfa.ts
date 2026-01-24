import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function useGetMfaStatus(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaStatusKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/status
 */
export function getGetMfaStatusKey() {
  return ['/mfa/status'] as const
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export function useGetMfaMethods(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaMethodsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/methods
 */
export function getGetMfaMethodsKey() {
  return ['/mfa/methods'] as const
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function usePutMfaPreferred(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /mfa/preferred',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.preferred.$put> }) =>
      parseResponse(client.mfa.preferred.$put(arg, options?.client)),
  )
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/totp/setup',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.totp.setup.$post> }) =>
      parseResponse(client.mfa.totp.setup.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/totp/verify',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.totp.verify.$post> }) =>
      parseResponse(client.mfa.totp.verify.$post(arg, options?.client)),
  )
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /mfa/totp',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.totp.$delete> }) =>
      parseResponse(client.mfa.totp.$delete(arg, options?.client)),
  )
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/sms/setup',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.sms.setup.$post> }) =>
      parseResponse(client.mfa.sms.setup.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/sms/verify',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.sms.verify.$post> }) =>
      parseResponse(client.mfa.sms.verify.$post(arg, options?.client)),
  )
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /mfa/sms/:methodId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']> },
    ) => parseResponse(client.mfa.sms[':methodId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/email/setup',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.email.setup.$post> }) =>
      parseResponse(client.mfa.email.setup.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/email/verify',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.email.verify.$post> }) =>
      parseResponse(client.mfa.email.verify.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/webauthn/register/options',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.options.$post> },
    ) => parseResponse(client.mfa.webauthn.register.options.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/webauthn/register/verify',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.verify.$post> },
    ) => parseResponse(client.mfa.webauthn.register.verify.$post(arg, options?.client)),
  )
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function useGetMfaWebauthnCredentials(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaWebauthnCredentialsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/webauthn/credentials
 */
export function getGetMfaWebauthnCredentialsKey() {
  return ['/mfa/webauthn/credentials'] as const
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function useDeleteMfaWebauthnCredentialsCredentialId(options?: {
  client?: ClientRequestOptions
}) {
  return useSWRMutation(
    'DELETE /mfa/webauthn/credentials/:credentialId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
      },
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(arg, options?.client)),
  )
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(options?: {
  client?: ClientRequestOptions
}) {
  return useSWRMutation(
    'PATCH /mfa/webauthn/credentials/:credentialId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
      },
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(arg, options?.client)),
  )
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/backup-codes/generate',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']> },
    ) => parseResponse(client.mfa['backup-codes'].generate.$post(arg, options?.client)),
  )
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function useGetMfaBackupCodesStatus(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaBackupCodesStatusKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/backup-codes/status
 */
export function getGetMfaBackupCodesStatusKey() {
  return ['/mfa/backup-codes/status'] as const
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function usePostMfaChallenge(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/challenge',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.$post> }) =>
      parseResponse(client.mfa.challenge.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/challenge/send',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.send.$post> }) =>
      parseResponse(client.mfa.challenge.send.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/verify',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.verify.$post> }) =>
      parseResponse(client.mfa.verify.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/webauthn/authenticate/options',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post> },
    ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/recovery',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mfa.recovery.$post> }) =>
      parseResponse(client.mfa.recovery.$post(arg, options?.client)),
  )
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mfa/recovery/verify',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.mfa.recovery.verify.$post> },
    ) => parseResponse(client.mfa.recovery.verify.$post(arg, options?.client)),
  )
}
