import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function createGetMfaStatus(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.mfa.status.$get>,
      Error,
      InferResponseType<typeof client.mfa.status.$get>,
      readonly ['/mfa/status']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMfaStatusQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /mfa/status
 */
export function getGetMfaStatusQueryKey() {
  return ['/mfa/status'] as const
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export function createGetMfaMethods(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.mfa.methods.$get>,
      Error,
      InferResponseType<typeof client.mfa.methods.$get>,
      readonly ['/mfa/methods']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMfaMethodsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /mfa/methods
 */
export function getGetMfaMethodsQueryKey() {
  return ['/mfa/methods'] as const
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function createPutMfaPreferred(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.preferred.$put> | undefined,
      Error,
      InferRequestType<typeof client.mfa.preferred.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.preferred.$put> | undefined,
    Error,
    InferRequestType<typeof client.mfa.preferred.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.preferred.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function createPostMfaTotpSetup(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.totp.setup.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.totp.setup.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.totp.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.setup.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.totp.setup.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function createPostMfaTotpVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.totp.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.totp.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.totp.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.totp.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function createDeleteMfaTotp(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.totp.$delete> | undefined,
      Error,
      InferRequestType<typeof client.mfa.totp.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.totp.$delete> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.totp.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function createPostMfaSmsSetup(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.sms.setup.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.sms.setup.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.sms.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.sms.setup.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.sms.setup.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function createPostMfaSmsVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.sms.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.sms.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.sms.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.sms.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.sms.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function createDeleteMfaSmsMethodId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.sms[':methodId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function createPostMfaEmailSetup(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.email.setup.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.email.setup.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.email.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.email.setup.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.email.setup.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function createPostMfaEmailVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.email.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.email.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.email.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.email.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.email.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function createPostMfaWebauthnRegisterOptions(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.webauthn.register.options.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.webauthn.register.options.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.webauthn.register.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.register.options.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.webauthn.register.options.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function createPostMfaWebauthnRegisterVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.webauthn.register.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.webauthn.register.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.webauthn.register.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function createGetMfaWebauthnCredentials(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.mfa.webauthn.credentials.$get>,
      Error,
      InferResponseType<typeof client.mfa.webauthn.credentials.$get>,
      readonly ['/mfa/webauthn/credentials']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMfaWebauthnCredentialsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /mfa/webauthn/credentials
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return ['/mfa/webauthn/credentials'] as const
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function createDeleteMfaWebauthnCredentialsCredentialId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.mfa.webauthn.credentials[':credentialId'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function createPatchMfaWebauthnCredentialsCredentialId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.mfa.webauthn.credentials[':credentialId'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function createPostMfaBackupCodesGenerate(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa['backup-codes'].generate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function createGetMfaBackupCodesStatus(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.mfa)['backup-codes']['status']['$get']>,
      Error,
      InferResponseType<(typeof client.mfa)['backup-codes']['status']['$get']>,
      readonly ['/mfa/backup-codes/status']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMfaBackupCodesStatusQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /mfa/backup-codes/status
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return ['/mfa/backup-codes/status'] as const
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function createPostMfaChallenge(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.challenge.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.challenge.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.challenge.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.challenge.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.challenge.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function createPostMfaChallengeSend(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.challenge.send.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.challenge.send.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.challenge.send.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.challenge.send.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.challenge.send.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function createPostMfaVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function createPostMfaWebauthnAuthenticateOptions(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.webauthn.authenticate.options.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function createPostMfaRecovery(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.recovery.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.recovery.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.recovery.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.recovery.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mfa.recovery.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function createPostMfaRecoveryVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mfa.recovery.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.mfa.recovery.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.mfa.recovery.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.recovery.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.mfa.recovery.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}
