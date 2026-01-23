import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/35-auth-oauth2-server'

/**
 * GET /oauth/authorize
 *
 * 認可エンドポイント
 *
 * Authorization Code フローの認可リクエスト。
 * ユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。
 */
export function useGetOauthAuthorize(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth.authorize.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthAuthorizeQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth.authorize.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /oauth/authorize
 */
export function getGetOauthAuthorizeQueryKey(
  args?: InferRequestType<typeof client.oauth.authorize.$get>,
) {
  return ['/oauth/authorize', ...(args ? [args] : [])] as const
}

/**
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
 * Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export function usePostOauthToken(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.oauth.token.$post> | undefined,
      Error,
      InferRequestType<typeof client.oauth.token.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.oauth.token.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.token.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.oauth.token.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.oauth.revoke.$post> | undefined,
      Error,
      InferRequestType<typeof client.oauth.revoke.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.oauth.revoke.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.revoke.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.oauth.revoke.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.oauth.introspect.$post> | undefined,
      Error,
      InferRequestType<typeof client.oauth.introspect.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.oauth.introspect.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.introspect.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.introspect.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.oauth.device.code.$post> | undefined,
      Error,
      InferRequestType<typeof client.oauth.device.code.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.oauth.device.code.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.device.code.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.device.code.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export function useGetOauthUserinfo(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth.userinfo.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthUserinfoQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth.userinfo.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /oauth/userinfo
 */
export function getGetOauthUserinfoQueryKey() {
  return ['/oauth/userinfo'] as const
}

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export function useGetWellKnownOpenidConfiguration(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWellKnownOpenidConfigurationQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['.well-known']['openid-configuration'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /.well-known/openid-configuration
 */
export function getGetWellKnownOpenidConfigurationQueryKey() {
  return ['/.well-known/openid-configuration'] as const
}

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export function useGetWellKnownJwksJson(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWellKnownJwksJsonQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['.well-known']['jwks.json'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /.well-known/jwks.json
 */
export function getGetWellKnownJwksJsonQueryKey() {
  return ['/.well-known/jwks.json'] as const
}

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export function useGetOauthClients(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth.clients.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthClientsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth.clients.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /oauth/clients
 */
export function getGetOauthClientsQueryKey() {
  return ['/oauth/clients'] as const
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export function usePostOauthClients(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.oauth.clients.$post> | undefined,
      Error,
      InferRequestType<typeof client.oauth.clients.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.oauth.clients.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.clients.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.oauth.clients.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export function useGetOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthClientsClientIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.oauth.clients[':clientId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /oauth/clients/{clientId}
 */
export function getGetOauthClientsClientIdQueryKey(
  args?: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return ['/oauth/clients/:clientId', ...(args ? [args] : [])] as const
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.oauth.clients)[':clientId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.clients[':clientId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.oauth.clients)[':clientId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.clients[':clientId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.oauth.clients)[':clientId']['secret']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['secret']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.clients[':clientId'].secret.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export function useGetOauthConsents(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth.consents.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthConsentsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth.consents.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /oauth/consents
 */
export function getGetOauthConsentsQueryKey() {
  return ['/oauth/consents'] as const
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export function useDeleteOauthConsentsClientId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.oauth.consents)[':clientId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.oauth.consents)[':clientId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.oauth.consents[':clientId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}
