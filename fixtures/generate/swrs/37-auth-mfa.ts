import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
 * Uses $url() for type-safe key generation
 */
export function getGetMfaStatusKey() {
  return client.mfa.status.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetMfaMethodsKey() {
  return client.mfa.methods.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutMfaPreferredMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.preferred.$put> }) =>
        parseResponse(client.mfa.preferred.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /mfa/preferred
 * Uses $url() for type-safe key generation
 */
export function getPutMfaPreferredMutationKey() {
  return `PUT ${client.mfa.preferred.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaTotpSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.setup.$post> }) =>
        parseResponse(client.mfa.totp.setup.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/totp/setup
 * Uses $url() for type-safe key generation
 */
export function getPostMfaTotpSetupMutationKey() {
  return `POST ${client.mfa.totp.setup.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaTotpVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.verify.$post> }) =>
        parseResponse(client.mfa.totp.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/totp/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaTotpVerifyMutationKey() {
  return `POST ${client.mfa.totp.verify.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteMfaTotpMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.totp.$delete> }) =>
        parseResponse(client.mfa.totp.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/totp
 * Uses $url() for type-safe key generation
 */
export function getDeleteMfaTotpMutationKey() {
  return `DELETE ${client.mfa.totp.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaSmsSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.sms.setup.$post> }) =>
        parseResponse(client.mfa.sms.setup.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/sms/setup
 * Uses $url() for type-safe key generation
 */
export function getPostMfaSmsSetupMutationKey() {
  return `POST ${client.mfa.sms.setup.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaSmsVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.sms.verify.$post> }) =>
        parseResponse(client.mfa.sms.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/sms/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaSmsVerifyMutationKey() {
  return `POST ${client.mfa.sms.verify.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteMfaSmsMethodIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']> },
      ) => parseResponse(client.mfa.sms[':methodId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/sms/{methodId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteMfaSmsMethodIdMutationKey() {
  return `DELETE ${client.mfa.sms[':methodId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaEmailSetupMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.email.setup.$post> }) =>
        parseResponse(client.mfa.email.setup.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/email/setup
 * Uses $url() for type-safe key generation
 */
export function getPostMfaEmailSetupMutationKey() {
  return `POST ${client.mfa.email.setup.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaEmailVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.email.verify.$post> }) =>
        parseResponse(client.mfa.email.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/email/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaEmailVerifyMutationKey() {
  return `POST ${client.mfa.email.verify.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaWebauthnRegisterOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.options.$post> },
      ) => parseResponse(client.mfa.webauthn.register.options.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/register/options
 * Uses $url() for type-safe key generation
 */
export function getPostMfaWebauthnRegisterOptionsMutationKey() {
  return `POST ${client.mfa.webauthn.register.options.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaWebauthnRegisterVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.register.verify.$post> },
      ) => parseResponse(client.mfa.webauthn.register.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/register/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaWebauthnRegisterVerifyMutationKey() {
  return `POST ${client.mfa.webauthn.register.verify.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetMfaWebauthnCredentialsKey() {
  return client.mfa.webauthn.credentials.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteMfaWebauthnCredentialsCredentialIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mfa/webauthn/credentials/{credentialId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteMfaWebauthnCredentialsCredentialIdMutationKey() {
  return `DELETE ${client.mfa.webauthn.credentials[':credentialId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchMfaWebauthnCredentialsCredentialIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /mfa/webauthn/credentials/{credentialId}
 * Uses $url() for type-safe key generation
 */
export function getPatchMfaWebauthnCredentialsCredentialIdMutationKey() {
  return `PATCH ${client.mfa.webauthn.credentials[':credentialId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaBackupCodesGenerateMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/backup-codes/generate
 * Uses $url() for type-safe key generation
 */
export function getPostMfaBackupCodesGenerateMutationKey() {
  return `POST ${client.mfa['backup-codes'].generate.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetMfaBackupCodesStatusKey() {
  return client.mfa['backup-codes'].status.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaChallengeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.$post> }) =>
        parseResponse(client.mfa.challenge.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/challenge
 * Uses $url() for type-safe key generation
 */
export function getPostMfaChallengeMutationKey() {
  return `POST ${client.mfa.challenge.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaChallengeSendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.challenge.send.$post> }) =>
        parseResponse(client.mfa.challenge.send.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/challenge/send
 * Uses $url() for type-safe key generation
 */
export function getPostMfaChallengeSendMutationKey() {
  return `POST ${client.mfa.challenge.send.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.verify.$post> }) =>
        parseResponse(client.mfa.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaVerifyMutationKey() {
  return `POST ${client.mfa.verify.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaWebauthnAuthenticateOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post> },
      ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/webauthn/authenticate/options
 * Uses $url() for type-safe key generation
 */
export function getPostMfaWebauthnAuthenticateOptionsMutationKey() {
  return `POST ${client.mfa.webauthn.authenticate.options.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaRecoveryMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.recovery.$post> }) =>
        parseResponse(client.mfa.recovery.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/recovery
 * Uses $url() for type-safe key generation
 */
export function getPostMfaRecoveryMutationKey() {
  return `POST ${client.mfa.recovery.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMfaRecoveryVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mfa.recovery.verify.$post> }) =>
        parseResponse(client.mfa.recovery.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mfa/recovery/verify
 * Uses $url() for type-safe key generation
 */
export function getPostMfaRecoveryVerifyMutationKey() {
  return `POST ${client.mfa.recovery.verify.$url().pathname}`
}
