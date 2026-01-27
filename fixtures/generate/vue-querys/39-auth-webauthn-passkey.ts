import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * Generates Vue Query mutation key for POST /webauthn/register/options
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebauthnRegisterOptionsMutationKey() {
  return ['POST', '/webauthn/register/options'] as const
}

/**
 * Returns Vue Query mutation options for POST /webauthn/register/options
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
export function usePostWebauthnRegisterOptions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.options.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.webauthn.register.options.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webauthn.register.options.$post>) =>
      parseResponse(client.webauthn.register.options.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /webauthn/register/verify
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebauthnRegisterVerifyMutationKey() {
  return ['POST', '/webauthn/register/verify'] as const
}

/**
 * Returns Vue Query mutation options for POST /webauthn/register/verify
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
export function usePostWebauthnRegisterVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.verify.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.webauthn.register.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webauthn.register.verify.$post>) =>
      parseResponse(client.webauthn.register.verify.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /webauthn/authenticate/options
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebauthnAuthenticateOptionsMutationKey() {
  return ['POST', '/webauthn/authenticate/options'] as const
}

/**
 * Returns Vue Query mutation options for POST /webauthn/authenticate/options
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
export function usePostWebauthnAuthenticateOptions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.webauthn.authenticate.options.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.webauthn.authenticate.options.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.options.$post>) =>
      parseResponse(client.webauthn.authenticate.options.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /webauthn/authenticate/verify
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebauthnAuthenticateVerifyMutationKey() {
  return ['POST', '/webauthn/authenticate/verify'] as const
}

/**
 * Returns Vue Query mutation options for POST /webauthn/authenticate/verify
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
export function usePostWebauthnAuthenticateVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.webauthn.authenticate.verify.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.webauthn.authenticate.verify.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.verify.$post>) =>
      parseResponse(client.webauthn.authenticate.verify.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['webauthn', '/webauthn/credentials'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/credentials
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
export function useGetWebauthnCredentials(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.credentials.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetWebauthnCredentialsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials/{credentialId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>>,
) {
  return ['webauthn', '/webauthn/credentials/:credentialId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/credentials/{credentialId}
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
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebauthnCredentialsCredentialIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /webauthn/credentials/{credentialId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteWebauthnCredentialsCredentialIdMutationKey() {
  return ['DELETE', '/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webauthn/credentials/{credentialId}
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
export function useDeleteWebauthnCredentialsCredentialId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
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
      args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for PATCH /webauthn/credentials/{credentialId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPatchWebauthnCredentialsCredentialIdMutationKey() {
  return ['PATCH', '/webauthn/credentials/:credentialId'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /webauthn/credentials/{credentialId}
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
export function usePatchWebauthnCredentialsCredentialId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
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
      args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['webauthn', '/webauthn/settings'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/settings
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
export function useGetWebauthnSettings(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetWebauthnSettingsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings/rp
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['webauthn', '/webauthn/settings/rp'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/settings/rp
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
export function useGetWebauthnSettingsRp(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetWebauthnSettingsRpQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /webauthn/settings/rp
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutWebauthnSettingsRpMutationKey() {
  return ['PUT', '/webauthn/settings/rp'] as const
}

/**
 * Returns Vue Query mutation options for PUT /webauthn/settings/rp
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
export function usePutWebauthnSettingsRp(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$put>>>
          >
        >,
        Error,
        InferRequestType<typeof client.webauthn.settings.rp.$put>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webauthn.settings.rp.$put>) =>
      parseResponse(client.webauthn.settings.rp.$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/authenticators
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['webauthn', '/webauthn/authenticators'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/authenticators
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
export function useGetWebauthnAuthenticators(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticators.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } =
    getGetWebauthnAuthenticatorsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
