import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * Generates SWR cache key for GET /mfa/status
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaStatusKey() {
  return ['mfa', 'GET', '/mfa/status'] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMfaStatusKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/methods
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaMethodsKey() {
  return ['mfa', 'GET', '/mfa/methods'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMfaMethodsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /mfa/preferred
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMfaPreferredMutationKey() {
  return ['mfa', 'PUT', '/mfa/preferred'] as const
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function usePutMfaPreferred(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.preferred.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.preferred.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMfaPreferredMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.preferred.$put> }) =>
        parseResponse(client.mfa.preferred.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/totp/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaTotpSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/totp/setup'] as const
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.setup.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.totp.setup.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaTotpSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.setup.$post> }) =>
        parseResponse(client.mfa.totp.setup.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/totp/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaTotpVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/totp/verify'] as const
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.verify.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.totp.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaTotpVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.verify.$post> }) =>
        parseResponse(client.mfa.totp.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/totp
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaTotpMutationKey() {
  return ['mfa', 'DELETE', '/mfa/totp'] as const
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.$delete>>>>>
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.mfa.totp.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMfaTotpMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.$delete> }) =>
        parseResponse(client.mfa.totp.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/sms/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaSmsSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/sms/setup'] as const
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.setup.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.sms.setup.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaSmsSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.sms.setup.$post> }) =>
        parseResponse(client.mfa.sms.setup.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/sms/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaSmsVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/sms/verify'] as const
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.verify.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.sms.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaSmsVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.sms.verify.$post> }) =>
        parseResponse(client.mfa.sms.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/sms/{methodId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaSmsMethodIdMutationKey() {
  return ['mfa', 'DELETE', '/mfa/sms/:methodId'] as const
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.mfa.sms)[':methodId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMfaSmsMethodIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']> },
      ) => parseResponse(client.mfa.sms[':methodId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/email/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaEmailSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/email/setup'] as const
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.setup.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.email.setup.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaEmailSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.email.setup.$post> }) =>
        parseResponse(client.mfa.email.setup.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/email/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaEmailVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/email/verify'] as const
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.verify.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.email.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaEmailVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.email.verify.$post> }) =>
        parseResponse(client.mfa.email.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/register/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnRegisterOptionsMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/register/options'] as const
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.mfa.webauthn.register.options.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.webauthn.register.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaWebauthnRegisterOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.options.$post> },
      ) => parseResponse(client.mfa.webauthn.register.options.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/register/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnRegisterVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/register/verify'] as const
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.mfa.webauthn.register.verify.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaWebauthnRegisterVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.verify.$post> },
      ) => parseResponse(client.mfa.webauthn.register.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/webauthn/credentials
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaWebauthnCredentialsKey() {
  return ['mfa', 'GET', '/mfa/webauthn/credentials'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMfaWebauthnCredentialsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaWebauthnCredentialsCredentialIdMutationKey() {
  return ['mfa', 'DELETE', '/mfa/webauthn/credentials/:credentialId'] as const
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function useDeleteMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMfaWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
          >
        },
      ) =>
        parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /mfa/webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchMfaWebauthnCredentialsCredentialIdMutationKey() {
  return ['mfa', 'PATCH', '/mfa/webauthn/credentials/:credentialId'] as const
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchMfaWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
        },
      ) =>
        parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/backup-codes/generate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaBackupCodesGenerateMutationKey() {
  return ['mfa', 'POST', '/mfa/backup-codes/generate'] as const
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.mfa)['backup-codes']['generate']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaBackupCodesGenerateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']> },
      ) => parseResponse(client.mfa['backup-codes'].generate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mfa/backup-codes/status
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaBackupCodesStatusKey() {
  return ['mfa', 'GET', '/mfa/backup-codes/status'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMfaBackupCodesStatusKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/challenge
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaChallengeMutationKey() {
  return ['mfa', 'POST', '/mfa/challenge'] as const
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function usePostMfaChallenge(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.challenge.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaChallengeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.$post> }) =>
        parseResponse(client.mfa.challenge.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/challenge/send
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaChallengeSendMutationKey() {
  return ['mfa', 'POST', '/mfa/challenge/send'] as const
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.send.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.challenge.send.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaChallengeSendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.send.$post> }) =>
        parseResponse(client.mfa.challenge.send.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/verify'] as const
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.verify.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.mfa.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.verify.$post> }) =>
        parseResponse(client.mfa.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/authenticate/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnAuthenticateOptionsMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/authenticate/options'] as const
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.mfa.webauthn.authenticate.options.$post>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaWebauthnAuthenticateOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post> },
      ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/recovery
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaRecoveryMutationKey() {
  return ['mfa', 'POST', '/mfa/recovery'] as const
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.recovery.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaRecoveryMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.recovery.$post> }) =>
        parseResponse(client.mfa.recovery.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/recovery/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaRecoveryVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/recovery/verify'] as const
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.verify.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.mfa.recovery.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMfaRecoveryVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.recovery.verify.$post> }) =>
        parseResponse(client.mfa.recovery.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
