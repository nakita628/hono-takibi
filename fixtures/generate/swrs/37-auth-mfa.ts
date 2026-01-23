import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function useGetMfaStatus(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.mfa.status.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaStatusKey() : null)
  const query = useSWR<InferResponseType<typeof client.mfa.status.$get>, Error>(
    swrKey,
    async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<typeof client.mfa.methods.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaMethodsKey() : null)
  const query = useSWR<InferResponseType<typeof client.mfa.methods.$get>, Error>(
    swrKey,
    async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePutMfaPreferred(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.preferred.$put>,
    Error,
    string,
    InferRequestType<typeof client.mfa.preferred.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.preferred.$put>,
    Error,
    string,
    InferRequestType<typeof client.mfa.preferred.$put>
  >(
    'PUT /mfa/preferred',
    async (_, { arg }) => parseResponse(client.mfa.preferred.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.totp.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.setup.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.totp.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.setup.$post>
  >(
    'POST /mfa/totp/setup',
    async (_, { arg }) => parseResponse(client.mfa.totp.setup.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.totp.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.totp.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.verify.$post>
  >(
    'POST /mfa/totp/verify',
    async (_, { arg }) => parseResponse(client.mfa.totp.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.totp.$delete>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.totp.$delete>,
    Error,
    string,
    InferRequestType<typeof client.mfa.totp.$delete>
  >(
    'DELETE /mfa/totp',
    async (_, { arg }) => parseResponse(client.mfa.totp.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.sms.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.sms.setup.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.sms.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.sms.setup.$post>
  >(
    'POST /mfa/sms/setup',
    async (_, { arg }) => parseResponse(client.mfa.sms.setup.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.sms.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.sms.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.sms.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.sms.verify.$post>
  >(
    'POST /mfa/sms/verify',
    async (_, { arg }) => parseResponse(client.mfa.sms.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
  >(
    'DELETE /mfa/sms/:methodId',
    async (_, { arg }) => parseResponse(client.mfa.sms[':methodId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.email.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.email.setup.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.email.setup.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.email.setup.$post>
  >(
    'POST /mfa/email/setup',
    async (_, { arg }) => parseResponse(client.mfa.email.setup.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.email.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.email.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.email.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.email.verify.$post>
  >(
    'POST /mfa/email/verify',
    async (_, { arg }) => parseResponse(client.mfa.email.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.webauthn.register.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.register.options.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.webauthn.register.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.register.options.$post>
  >(
    'POST /mfa/webauthn/register/options',
    async (_, { arg }) =>
      parseResponse(client.mfa.webauthn.register.options.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.webauthn.register.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.webauthn.register.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
  >(
    'POST /mfa/webauthn/register/verify',
    async (_, { arg }) =>
      parseResponse(client.mfa.webauthn.register.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function useGetMfaWebauthnCredentials(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.mfa.webauthn.credentials.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaWebauthnCredentialsKey() : null)
  const query = useSWR<InferResponseType<typeof client.mfa.webauthn.credentials.$get>, Error>(
    swrKey,
    async () => parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
  >(
    'DELETE /mfa/webauthn/credentials/:credentialId',
    async (_, { arg }) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
  >(
    'PATCH /mfa/webauthn/credentials/:credentialId',
    async (_, { arg }) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
  >(
    'POST /mfa/backup-codes/generate',
    async (_, { arg }) =>
      parseResponse(client.mfa['backup-codes'].generate.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function useGetMfaBackupCodesStatus(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.mfa)['backup-codes']['status']['$get']>,
    Error
  > & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMfaBackupCodesStatusKey() : null)
  const query = useSWR<
    InferResponseType<(typeof client.mfa)['backup-codes']['status']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePostMfaChallenge(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.challenge.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.challenge.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.challenge.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.challenge.$post>
  >(
    'POST /mfa/challenge',
    async (_, { arg }) => parseResponse(client.mfa.challenge.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.challenge.send.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.challenge.send.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.challenge.send.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.challenge.send.$post>
  >(
    'POST /mfa/challenge/send',
    async (_, { arg }) => parseResponse(client.mfa.challenge.send.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.verify.$post>
  >(
    'POST /mfa/verify',
    async (_, { arg }) => parseResponse(client.mfa.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
  >(
    'POST /mfa/webauthn/authenticate/options',
    async (_, { arg }) =>
      parseResponse(client.mfa.webauthn.authenticate.options.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.recovery.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.recovery.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.recovery.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.recovery.$post>
  >(
    'POST /mfa/recovery',
    async (_, { arg }) => parseResponse(client.mfa.recovery.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mfa.recovery.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.recovery.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mfa.recovery.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.mfa.recovery.verify.$post>
  >(
    'POST /mfa/recovery/verify',
    async (_, { arg }) => parseResponse(client.mfa.recovery.verify.$post(arg, options?.client)),
    options?.swr,
  )
}
