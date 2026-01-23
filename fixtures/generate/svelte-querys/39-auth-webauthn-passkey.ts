import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function createPostWebauthnRegisterOptions(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webauthn.register.options.$post> | undefined,
      Error,
      InferRequestType<typeof client.webauthn.register.options.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webauthn.register.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.register.options.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.register.options.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function createPostWebauthnRegisterVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webauthn.register.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.webauthn.register.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webauthn.register.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.register.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function createPostWebauthnAuthenticateOptions(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webauthn.authenticate.options.$post> | undefined,
      Error,
      InferRequestType<typeof client.webauthn.authenticate.options.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webauthn.authenticate.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.authenticate.options.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function createPostWebauthnAuthenticateVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webauthn.authenticate.verify.$post> | undefined,
      Error,
      InferRequestType<typeof client.webauthn.authenticate.verify.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webauthn.authenticate.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.authenticate.verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function createGetWebauthnCredentials(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.webauthn.credentials.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnCredentialsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.webauthn.credentials.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function createGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnCredentialsCredentialIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.webauthn.credentials[':credentialId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args?: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function createDeleteWebauthnCredentialsCredentialId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.credentials[':credentialId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function createPatchWebauthnCredentialsCredentialId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.credentials[':credentialId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function createGetWebauthnSettings(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.webauthn.settings.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnSettingsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.webauthn.settings.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function createGetWebauthnSettingsRp(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.webauthn.settings.rp.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnSettingsRpQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.webauthn.settings.rp.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function createPutWebauthnSettingsRp(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webauthn.settings.rp.$put> | undefined,
      Error,
      InferRequestType<typeof client.webauthn.settings.rp.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webauthn.settings.rp.$put> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webauthn.settings.rp.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function createGetWebauthnAuthenticators(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.webauthn.authenticators.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnAuthenticatorsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.webauthn.authenticators.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['/webauthn/authenticators'] as const
}
