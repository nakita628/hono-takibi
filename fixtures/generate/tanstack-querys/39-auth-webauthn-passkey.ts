import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
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
export function usePostWebauthnRegisterOptions(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.webauthn.register.options.$post>) =>
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
export function usePostWebauthnRegisterVerify(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.webauthn.register.verify.$post>) =>
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
export function usePostWebauthnAuthenticateOptions(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<typeof client.webauthn.authenticate.options.$post>,
      ) => parseResponse(client.webauthn.authenticate.options.$post(args, options?.client)),
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
export function usePostWebauthnAuthenticateVerify(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<typeof client.webauthn.authenticate.verify.$post>,
      ) => parseResponse(client.webauthn.authenticate.verify.$post(args, options?.client)),
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
export function useGetWebauthnCredentials(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.webauthn.credentials.$get>,
      Error,
      InferResponseType<typeof client.webauthn.credentials.$get>,
      readonly ['/webauthn/credentials']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnCredentialsQueryKey()
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      Error,
      InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      readonly [
        '/webauthn/credentials/:credentialId',
        InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnCredentialsCredentialIdQueryKey(args)
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', args] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
      ) =>
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
export function usePatchWebauthnCredentialsCredentialId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
      ) =>
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
export function useGetWebauthnSettings(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.webauthn.settings.$get>,
      Error,
      InferResponseType<typeof client.webauthn.settings.$get>,
      readonly ['/webauthn/settings']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnSettingsQueryKey()
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.webauthn.settings.rp.$get>,
      Error,
      InferResponseType<typeof client.webauthn.settings.rp.$get>,
      readonly ['/webauthn/settings/rp']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnSettingsRpQueryKey()
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.webauthn.settings.rp.$put>) =>
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
export function useGetWebauthnAuthenticators(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.webauthn.authenticators.$get>,
      Error,
      InferResponseType<typeof client.webauthn.authenticators.$get>,
      readonly ['/webauthn/authenticators']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebauthnAuthenticatorsQueryKey()
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['/webauthn/authenticators'] as const
}
