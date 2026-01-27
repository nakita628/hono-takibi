import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * Generates Svelte Query cache key for GET /mfa/status
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaStatusQueryKey() {
  return ['mfa', 'GET', '/mfa/status'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaStatusQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaStatusQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.mfa.status.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function createGetMfaStatus(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.status.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMfaStatusQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /mfa/methods
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaMethodsQueryKey() {
  return ['mfa', 'GET', '/mfa/methods'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaMethodsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaMethodsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.mfa.methods.$get(undefined, {
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
export function createGetMfaMethods(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.methods.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMfaMethodsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /mfa/preferred
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMfaPreferredMutationKey() {
  return ['mfa', 'PUT', '/mfa/preferred'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /mfa/preferred
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMfaPreferredMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMfaPreferredMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.preferred.$put>) =>
    parseResponse(client.mfa.preferred.$put(args, clientOptions)),
})

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function createPutMfaPreferred(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.preferred.$put>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.preferred.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMfaPreferredMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/totp/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaTotpSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/totp/setup'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/totp/setup
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaTotpSetupMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaTotpSetupMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.totp.setup.$post>) =>
    parseResponse(client.mfa.totp.setup.$post(args, clientOptions)),
})

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function createPostMfaTotpSetup(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.setup.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.totp.setup.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaTotpSetupMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/totp/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaTotpVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/totp/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/totp/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaTotpVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaTotpVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.totp.verify.$post>) =>
    parseResponse(client.mfa.totp.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function createPostMfaTotpVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.verify.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.totp.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaTotpVerifyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /mfa/totp
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaTotpMutationKey() {
  return ['mfa', 'DELETE', '/mfa/totp'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /mfa/totp
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMfaTotpMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMfaTotpMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.totp.$delete>) =>
    parseResponse(client.mfa.totp.$delete(args, clientOptions)),
})

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function createDeleteMfaTotp(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.$delete>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.mfa.totp.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMfaTotpMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/sms/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaSmsSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/sms/setup'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/sms/setup
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaSmsSetupMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaSmsSetupMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.sms.setup.$post>) =>
    parseResponse(client.mfa.sms.setup.$post(args, clientOptions)),
})

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function createPostMfaSmsSetup(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.setup.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.sms.setup.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaSmsSetupMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/sms/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaSmsVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/sms/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/sms/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaSmsVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaSmsVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.sms.verify.$post>) =>
    parseResponse(client.mfa.sms.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function createPostMfaSmsVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.verify.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.sms.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaSmsVerifyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /mfa/sms/{methodId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaSmsMethodIdMutationKey() {
  return ['mfa', 'DELETE', '/mfa/sms/:methodId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /mfa/sms/{methodId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMfaSmsMethodIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMfaSmsMethodIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>) =>
    parseResponse(client.mfa.sms[':methodId'].$delete(args, clientOptions)),
})

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function createDeleteMfaSmsMethodId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMfaSmsMethodIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/email/setup
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaEmailSetupMutationKey() {
  return ['mfa', 'POST', '/mfa/email/setup'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/email/setup
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaEmailSetupMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaEmailSetupMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.email.setup.$post>) =>
    parseResponse(client.mfa.email.setup.$post(args, clientOptions)),
})

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function createPostMfaEmailSetup(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.setup.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.email.setup.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaEmailSetupMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/email/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaEmailVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/email/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/email/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaEmailVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaEmailVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.email.verify.$post>) =>
    parseResponse(client.mfa.email.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function createPostMfaEmailVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.verify.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.email.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaEmailVerifyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/webauthn/register/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnRegisterOptionsMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/register/options'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/webauthn/register/options
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaWebauthnRegisterOptionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostMfaWebauthnRegisterOptionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.options.$post>) =>
    parseResponse(client.mfa.webauthn.register.options.$post(args, clientOptions)),
})

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function createPostMfaWebauthnRegisterOptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.register.options.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.mfa.webauthn.register.options.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostMfaWebauthnRegisterOptionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/webauthn/register/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnRegisterVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/register/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/webauthn/register/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaWebauthnRegisterVerifyMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostMfaWebauthnRegisterVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>) =>
    parseResponse(client.mfa.webauthn.register.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function createPostMfaWebauthnRegisterVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.register.verify.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostMfaWebauthnRegisterVerifyMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /mfa/webauthn/credentials
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return ['mfa', 'GET', '/mfa/webauthn/credentials'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/webauthn/credentials
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaWebauthnCredentialsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaWebauthnCredentialsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.mfa.webauthn.credentials.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function createGetMfaWebauthnCredentials(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.mfa.webauthn.credentials.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMfaWebauthnCredentialsQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /mfa/webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMfaWebauthnCredentialsCredentialIdMutationKey() {
  return ['mfa', 'DELETE', '/mfa/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMfaWebauthnCredentialsCredentialIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteMfaWebauthnCredentialsCredentialIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
  ) => parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
})

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function createDeleteMfaWebauthnCredentialsCredentialId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteMfaWebauthnCredentialsCredentialIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /mfa/webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchMfaWebauthnCredentialsCredentialIdMutationKey() {
  return ['mfa', 'PATCH', '/mfa/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchMfaWebauthnCredentialsCredentialIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchMfaWebauthnCredentialsCredentialIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
  ) => parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
})

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function createPatchMfaWebauthnCredentialsCredentialId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPatchMfaWebauthnCredentialsCredentialIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/backup-codes/generate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaBackupCodesGenerateMutationKey() {
  return ['mfa', 'POST', '/mfa/backup-codes/generate'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/backup-codes/generate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaBackupCodesGenerateMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostMfaBackupCodesGenerateMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
  ) => parseResponse(client.mfa['backup-codes'].generate.$post(args, clientOptions)),
})

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function createPostMfaBackupCodesGenerate(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.mfa)['backup-codes']['generate']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostMfaBackupCodesGenerateMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /mfa/backup-codes/status
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return ['mfa', 'GET', '/mfa/backup-codes/status'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/backup-codes/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaBackupCodesStatusQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMfaBackupCodesStatusQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.mfa['backup-codes'].status.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function createGetMfaBackupCodesStatus(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.mfa)['backup-codes']['status']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMfaBackupCodesStatusQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/challenge
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaChallengeMutationKey() {
  return ['mfa', 'POST', '/mfa/challenge'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/challenge
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaChallengeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaChallengeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.$post>) =>
    parseResponse(client.mfa.challenge.$post(args, clientOptions)),
})

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function createPostMfaChallenge(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.challenge.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaChallengeMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/challenge/send
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaChallengeSendMutationKey() {
  return ['mfa', 'POST', '/mfa/challenge/send'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/challenge/send
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaChallengeSendMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaChallengeSendMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.send.$post>) =>
    parseResponse(client.mfa.challenge.send.$post(args, clientOptions)),
})

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function createPostMfaChallengeSend(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.send.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.mfa.challenge.send.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaChallengeSendMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.verify.$post>) =>
    parseResponse(client.mfa.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function createPostMfaVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.verify.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaVerifyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/webauthn/authenticate/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaWebauthnAuthenticateOptionsMutationKey() {
  return ['mfa', 'POST', '/mfa/webauthn/authenticate/options'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/webauthn/authenticate/options
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaWebauthnAuthenticateOptionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostMfaWebauthnAuthenticateOptionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
  ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(args, clientOptions)),
})

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function createPostMfaWebauthnAuthenticateOptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.authenticate.options.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostMfaWebauthnAuthenticateOptionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/recovery
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaRecoveryMutationKey() {
  return ['mfa', 'POST', '/mfa/recovery'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/recovery
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaRecoveryMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaRecoveryMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.$post>) =>
    parseResponse(client.mfa.recovery.$post(args, clientOptions)),
})

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function createPostMfaRecovery(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.mfa.recovery.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaRecoveryMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mfa/recovery/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMfaRecoveryVerifyMutationKey() {
  return ['mfa', 'POST', '/mfa/recovery/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mfa/recovery/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMfaRecoveryVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMfaRecoveryVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.verify.$post>) =>
    parseResponse(client.mfa.recovery.verify.$post(args, clientOptions)),
})

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function createPostMfaRecoveryVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.verify.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.mfa.recovery.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMfaRecoveryVerifyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
