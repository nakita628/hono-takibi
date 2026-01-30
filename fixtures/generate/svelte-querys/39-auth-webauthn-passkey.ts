import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * Generates Svelte Query mutation key for POST /webauthn/register/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnRegisterOptionsMutationKey() {
  return ['webauthn', 'POST', '/webauthn/register/options'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webauthn/register/options
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebauthnRegisterOptionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebauthnRegisterOptionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webauthn.register.options.$post>) =>
    parseResponse(client.webauthn.register.options.$post(args, clientOptions)),
})

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function createPostWebauthnRegisterOptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.options.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.webauthn.register.options.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostWebauthnRegisterOptionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webauthn/register/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnRegisterVerifyMutationKey() {
  return ['webauthn', 'POST', '/webauthn/register/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webauthn/register/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebauthnRegisterVerifyMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebauthnRegisterVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webauthn.register.verify.$post>) =>
    parseResponse(client.webauthn.register.verify.$post(args, clientOptions)),
})

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function createPostWebauthnRegisterVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.verify.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.webauthn.register.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostWebauthnRegisterVerifyMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webauthn/authenticate/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnAuthenticateOptionsMutationKey() {
  return ['webauthn', 'POST', '/webauthn/authenticate/options'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webauthn/authenticate/options
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebauthnAuthenticateOptionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebauthnAuthenticateOptionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.options.$post>) =>
    parseResponse(client.webauthn.authenticate.options.$post(args, clientOptions)),
})

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function createPostWebauthnAuthenticateOptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.webauthn.authenticate.options.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.webauthn.authenticate.options.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostWebauthnAuthenticateOptionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webauthn/authenticate/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnAuthenticateVerifyMutationKey() {
  return ['webauthn', 'POST', '/webauthn/authenticate/verify'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webauthn/authenticate/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebauthnAuthenticateVerifyMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebauthnAuthenticateVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.verify.$post>) =>
    parseResponse(client.webauthn.authenticate.verify.$post(args, clientOptions)),
})

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function createPostWebauthnAuthenticateVerify(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.webauthn.authenticate.verify.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.webauthn.authenticate.verify.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostWebauthnAuthenticateVerifyMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['webauthn', 'GET', '/webauthn/credentials'] as const
}

/**
 * Returns Svelte Query query options for GET /webauthn/credentials
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnCredentialsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWebauthnCredentialsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webauthn.credentials.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function createGetWebauthnCredentials(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.credentials.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebauthnCredentialsQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials/{credentialId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['webauthn', 'GET', '/webauthn/credentials/:credentialId', args] as const
}

/**
 * Returns Svelte Query query options for GET /webauthn/credentials/{credentialId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnCredentialsCredentialIdQueryOptions = (
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebauthnCredentialsCredentialIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webauthn.credentials[':credentialId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function createGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$get']>>
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
    const { queryKey, queryFn, ...baseOptions } = getGetWebauthnCredentialsCredentialIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebauthnCredentialsCredentialIdMutationKey() {
  return ['webauthn', 'DELETE', '/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /webauthn/credentials/{credentialId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebauthnCredentialsCredentialIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebauthnCredentialsCredentialIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
  ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
})

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function createDeleteWebauthnCredentialsCredentialId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteWebauthnCredentialsCredentialIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebauthnCredentialsCredentialIdMutationKey() {
  return ['webauthn', 'PATCH', '/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /webauthn/credentials/{credentialId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchWebauthnCredentialsCredentialIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchWebauthnCredentialsCredentialIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
  ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
})

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function createPatchWebauthnCredentialsCredentialId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPatchWebauthnCredentialsCredentialIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['webauthn', 'GET', '/webauthn/settings'] as const
}

/**
 * Returns Svelte Query query options for GET /webauthn/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnSettingsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWebauthnSettingsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webauthn.settings.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function createGetWebauthnSettings(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebauthnSettingsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings/rp
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['webauthn', 'GET', '/webauthn/settings/rp'] as const
}

/**
 * Returns Svelte Query query options for GET /webauthn/settings/rp
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnSettingsRpQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWebauthnSettingsRpQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webauthn.settings.rp.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function createGetWebauthnSettingsRp(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebauthnSettingsRpQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /webauthn/settings/rp
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutWebauthnSettingsRpMutationKey() {
  return ['webauthn', 'PUT', '/webauthn/settings/rp'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /webauthn/settings/rp
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutWebauthnSettingsRpMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutWebauthnSettingsRpMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webauthn.settings.rp.$put>) =>
    parseResponse(client.webauthn.settings.rp.$put(args, clientOptions)),
})

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function createPutWebauthnSettingsRp(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$put>>>
        >
      >,
      Error,
      InferRequestType<typeof client.webauthn.settings.rp.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutWebauthnSettingsRpMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/authenticators
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['webauthn', 'GET', '/webauthn/authenticators'] as const
}

/**
 * Returns Svelte Query query options for GET /webauthn/authenticators
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnAuthenticatorsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWebauthnAuthenticatorsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webauthn.authenticators.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function createGetWebauthnAuthenticators(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticators.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWebauthnAuthenticatorsQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
