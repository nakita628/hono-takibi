import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function useGetMfaStatus(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.status.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMfaStatusQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /mfa/status
 * Uses $url() for type-safe key generation
 */
export function getGetMfaStatusQueryKey() {
  return [client.mfa.status.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /mfa/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaStatusQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaStatusQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.mfa.status.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export function useGetMfaMethods(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.methods.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMfaMethodsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /mfa/methods
 * Uses $url() for type-safe key generation
 */
export function getGetMfaMethodsQueryKey() {
  return [client.mfa.methods.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /mfa/methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaMethodsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaMethodsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.mfa.methods.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function usePutMfaPreferred(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.preferred.$put>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.preferred.$put>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.preferred.$put>) =>
      parseResponse(client.mfa.preferred.$put(args, clientOptions)),
  })
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.setup.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.totp.setup.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.setup.$post>) =>
      parseResponse(client.mfa.totp.setup.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.verify.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.totp.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.verify.$post>) =>
      parseResponse(client.mfa.totp.verify.$post(args, clientOptions)),
  })
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.$delete>>>>
          >
        | undefined,
        Error,
        InferRequestType<typeof client.mfa.totp.$delete>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.$delete>) =>
      parseResponse(client.mfa.totp.$delete(args, clientOptions)),
  })
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.setup.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.sms.setup.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.setup.$post>) =>
      parseResponse(client.mfa.sms.setup.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.verify.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.sms.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.verify.$post>) =>
      parseResponse(client.mfa.sms.verify.$post(args, clientOptions)),
  })
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.mfa.sms)[':methodId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>) =>
      parseResponse(client.mfa.sms[':methodId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.setup.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.email.setup.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.setup.$post>) =>
      parseResponse(client.mfa.email.setup.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.verify.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.email.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.verify.$post>) =>
      parseResponse(client.mfa.email.verify.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.mfa.webauthn.register.options.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.webauthn.register.options.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.options.$post>) =>
      parseResponse(client.mfa.webauthn.register.options.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.mfa.webauthn.register.verify.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>) =>
      parseResponse(client.mfa.webauthn.register.verify.$post(args, clientOptions)),
  })
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function useGetMfaWebauthnCredentials(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.mfa.webauthn.credentials.$get>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMfaWebauthnCredentialsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /mfa/webauthn/credentials
 * Uses $url() for type-safe key generation
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return [client.mfa.webauthn.credentials.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /mfa/webauthn/credentials
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaWebauthnCredentialsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaWebauthnCredentialsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.mfa.webauthn.credentials.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function useDeleteMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
  })
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.mfa)['backup-codes']['generate']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => parseResponse(client.mfa['backup-codes'].generate.$post(args, clientOptions)),
  })
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function useGetMfaBackupCodesStatus(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.mfa)['backup-codes']['status']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMfaBackupCodesStatusQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /mfa/backup-codes/status
 * Uses $url() for type-safe key generation
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return [client.mfa['backup-codes'].status.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /mfa/backup-codes/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaBackupCodesStatusQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaBackupCodesStatusQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.mfa['backup-codes'].status.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function usePostMfaChallenge(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.challenge.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.$post>) =>
      parseResponse(client.mfa.challenge.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.send.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.challenge.send.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.send.$post>) =>
      parseResponse(client.mfa.challenge.send.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.verify.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.verify.$post>) =>
      parseResponse(client.mfa.verify.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.mfa.webauthn.authenticate.options.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.mfa.recovery.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.$post>) =>
      parseResponse(client.mfa.recovery.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.verify.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.mfa.recovery.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.verify.$post>) =>
      parseResponse(client.mfa.recovery.verify.$post(args, clientOptions)),
  })
}
