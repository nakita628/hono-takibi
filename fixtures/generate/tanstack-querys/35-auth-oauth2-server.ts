import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.oauth.authorize.$get>,
      Error,
      InferResponseType<typeof client.oauth.authorize.$get>,
      readonly ['/oauth/authorize', InferRequestType<typeof client.oauth.authorize.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthAuthorizeQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth.authorize.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth/authorize
 */
export function getGetOauthAuthorizeQueryKey(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
) {
  return ['/oauth/authorize', args] as const
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.oauth.token.$post>) =>
        parseResponse(client.oauth.token.$post(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.oauth.revoke.$post>) =>
        parseResponse(client.oauth.revoke.$post(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.oauth.introspect.$post>) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.oauth.device.code.$post>) =>
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.oauth.userinfo.$get>,
      Error,
      InferResponseType<typeof client.oauth.userinfo.$get>,
      readonly ['/oauth/userinfo']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthUserinfoQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth.userinfo.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth/userinfo
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>,
      Error,
      InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>,
      readonly ['/.well-known/openid-configuration']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWellKnownOpenidConfigurationQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['.well-known']['openid-configuration'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /.well-known/openid-configuration
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>,
      Error,
      InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>,
      readonly ['/.well-known/jwks.json']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWellKnownJwksJsonQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['.well-known']['jwks.json'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /.well-known/jwks.json
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.oauth.clients.$get>,
      Error,
      InferResponseType<typeof client.oauth.clients.$get>,
      readonly ['/oauth/clients']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthClientsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth.clients.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth/clients
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.oauth.clients.$post>) =>
        parseResponse(client.oauth.clients.$post(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>,
      Error,
      InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>,
      readonly [
        '/oauth/clients/:clientId',
        InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthClientsClientIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.oauth.clients[':clientId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth/clients/{clientId}
 */
export function getGetOauthClientsClientIdQueryKey(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return ['/oauth/clients/:clientId', args] as const
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
      ) => parseResponse(client.oauth.clients[':clientId'].$put(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
      ) => parseResponse(client.oauth.clients[':clientId'].$delete(args, options?.client)),
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
      ) => parseResponse(client.oauth.clients[':clientId'].secret.$post(args, options?.client)),
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.oauth.consents.$get>,
      Error,
      InferResponseType<typeof client.oauth.consents.$get>,
      readonly ['/oauth/consents']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthConsentsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth.consents.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth/consents
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
      ) => parseResponse(client.oauth.consents[':clientId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}
