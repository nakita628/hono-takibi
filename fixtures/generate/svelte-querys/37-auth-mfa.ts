import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function createGetMfaStatus(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetMfaStatusQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /mfa/status
 */
export function getGetMfaStatusQueryKey() {
  return ['/mfa/status'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaStatusQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMfaStatusQueryKey(),
    queryFn: ({ signal }) =>
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
export function createGetMfaMethods(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetMfaMethodsQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /mfa/methods
 */
export function getGetMfaMethodsQueryKey() {
  return ['/mfa/methods'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaMethodsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMfaMethodsQueryKey(),
    queryFn: ({ signal }) =>
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
export function createPutMfaPreferred(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.preferred.$put>>>>
      >,
      variables: InferRequestType<typeof client.mfa.preferred.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.preferred.$put>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.preferred.$put>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.preferred.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.preferred.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.preferred.$put>) =>
      parseResponse(client.mfa.preferred.$put(args, clientOptions)),
  }))
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function createPostMfaTotpSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.setup.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.setup.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.setup.$post>) =>
      parseResponse(client.mfa.totp.setup.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function createPostMfaTotpVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.verify.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.verify.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.verify.$post>) =>
      parseResponse(client.mfa.totp.verify.$post(args, clientOptions)),
  }))
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function createDeleteMfaTotp(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.$delete>>>>
          >
        | undefined,
      variables: InferRequestType<typeof client.mfa.totp.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.totp.$delete>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.totp.$delete>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.$delete>) =>
      parseResponse(client.mfa.totp.$delete(args, clientOptions)),
  }))
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function createPostMfaSmsSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.setup.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.sms.setup.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.sms.setup.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.setup.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.sms.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.sms.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.setup.$post>) =>
      parseResponse(client.mfa.sms.setup.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function createPostMfaSmsVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.verify.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.sms.verify.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.sms.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.verify.$post>) =>
      parseResponse(client.mfa.sms.verify.$post(args, clientOptions)),
  }))
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function createDeleteMfaSmsMethodId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.mfa.sms)[':methodId']['$delete']>>
              >
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.mfa.sms)[':methodId']['$delete']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>) =>
      parseResponse(client.mfa.sms[':methodId'].$delete(args, clientOptions)),
  }))
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function createPostMfaEmailSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.setup.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.setup.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.email.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.setup.$post>) =>
      parseResponse(client.mfa.email.setup.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function createPostMfaEmailVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.verify.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.email.verify.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.email.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.verify.$post>) =>
      parseResponse(client.mfa.email.verify.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function createPostMfaWebauthnRegisterOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.register.options.$post>>
          >
        >
      >,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<typeof client.mfa.webauthn.register.options.$post>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.options.$post>) =>
      parseResponse(client.mfa.webauthn.register.options.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function createPostMfaWebauthnRegisterVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.register.verify.$post>>
          >
        >
      >,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<typeof client.mfa.webauthn.register.verify.$post>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>) =>
      parseResponse(client.mfa.webauthn.register.verify.$post(args, clientOptions)),
  }))
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function createGetMfaWebauthnCredentials(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetMfaWebauthnCredentialsQueryOptions(clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /mfa/webauthn/credentials
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return ['/mfa/webauthn/credentials'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/webauthn/credentials
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaWebauthnCredentialsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMfaWebauthnCredentialsQueryKey(),
    queryFn: ({ signal }) =>
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
export function createDeleteMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data:
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
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
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
      error: Error | null,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
  }))
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function createPatchMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>>
          >
        >
      >,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
                >
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
  }))
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function createPostMfaBackupCodesGenerate(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.mfa)['backup-codes']['generate']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.mfa)['backup-codes']['generate']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => parseResponse(client.mfa['backup-codes'].generate.$post(args, clientOptions)),
  }))
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function createGetMfaBackupCodesStatus(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetMfaBackupCodesStatusQueryOptions(clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /mfa/backup-codes/status
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return ['/mfa/backup-codes/status'] as const
}

/**
 * Returns Svelte Query query options for GET /mfa/backup-codes/status
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMfaBackupCodesStatusQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMfaBackupCodesStatusQueryKey(),
    queryFn: ({ signal }) =>
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
export function createPostMfaChallenge(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.challenge.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.challenge.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.challenge.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.challenge.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.$post>) =>
      parseResponse(client.mfa.challenge.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function createPostMfaChallengeSend(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.send.$post>>>
        >
      >,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.challenge.send.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.challenge.send.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.send.$post>) =>
      parseResponse(client.mfa.challenge.send.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function createPostMfaVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.verify.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.verify.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.verify.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.verify.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.verify.$post>) =>
      parseResponse(client.mfa.verify.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function createPostMfaWebauthnAuthenticateOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.mfa.webauthn.authenticate.options.$post>>
          >
        >
      >,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<typeof client.mfa.webauthn.authenticate.options.$post>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function createPostMfaRecovery(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.$post>>>>
      >,
      variables: InferRequestType<typeof client.mfa.recovery.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.recovery.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.recovery.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.recovery.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.$post>) =>
      parseResponse(client.mfa.recovery.$post(args, clientOptions)),
  }))
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function createPostMfaRecoveryVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.verify.$post>>>
        >
      >,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.mfa.recovery.verify.$post>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.recovery.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.verify.$post>) =>
      parseResponse(client.mfa.recovery.verify.$post(args, clientOptions)),
  }))
}
