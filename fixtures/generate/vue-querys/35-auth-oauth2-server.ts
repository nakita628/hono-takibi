import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/35-auth-oauth2-server'

/**
 * Generates Vue Query cache key for GET /oauth/authorize
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOauthAuthorizeQueryKey(
  args: MaybeRef<InferRequestType<typeof client.oauth.authorize.$get>>,
) {
  return ['oauth', 'GET', '/oauth/authorize', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /oauth/authorize
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthAuthorizeQueryOptions = (
  args: InferRequestType<typeof client.oauth.authorize.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOauthAuthorizeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth.authorize.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.oauth.authorize.$get>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetOauthAuthorizeQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthTokenMutationKey() {
  return ['oauth', 'POST', '/oauth/token'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/token
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthTokenMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOauthTokenMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.oauth.token.$post>) =>
    parseResponse(client.oauth.token.$post(args, clientOptions)),
})

/**
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
 * Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export function usePostOauthToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.token.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.oauth.token.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/revoke
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthRevokeMutationKey() {
  return ['oauth', 'POST', '/oauth/revoke'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/revoke
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthRevokeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOauthRevokeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.oauth.revoke.$post>) =>
    parseResponse(client.oauth.revoke.$post(args, clientOptions)),
})

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.revoke.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.oauth.revoke.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthRevokeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/introspect
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthIntrospectMutationKey() {
  return ['oauth', 'POST', '/oauth/introspect'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/introspect
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthIntrospectMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOauthIntrospectMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.oauth.introspect.$post>) =>
    parseResponse(client.oauth.introspect.$post(args, clientOptions)),
})

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.oauth.introspect.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.oauth.introspect.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthIntrospectMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/device/code
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthDeviceCodeMutationKey() {
  return ['oauth', 'POST', '/oauth/device/code'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/device/code
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthDeviceCodeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOauthDeviceCodeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.oauth.device.code.$post>) =>
    parseResponse(client.oauth.device.code.$post(args, clientOptions)),
})

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.oauth.device.code.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.oauth.device.code.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthDeviceCodeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /oauth/userinfo
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthUserinfoQueryKey() {
  return ['oauth', 'GET', '/oauth/userinfo'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthUserinfoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauthUserinfoQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth.userinfo.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export function useGetOauthUserinfo(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.userinfo.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauthUserinfoQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /.well-known/openid-configuration
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWellKnownOpenidConfigurationQueryKey() {
  return ['.well-known', 'GET', '/.well-known/openid-configuration'] as const
}

/**
 * Returns Vue Query query options for GET /.well-known/openid-configuration
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWellKnownOpenidConfigurationQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWellKnownOpenidConfigurationQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['.well-known']['openid-configuration'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export function useGetWellKnownOpenidConfiguration(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['.well-known']['openid-configuration']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } =
    getGetWellKnownOpenidConfigurationQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /.well-known/jwks.json
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWellKnownJwksJsonQueryKey() {
  return ['.well-known', 'GET', '/.well-known/jwks.json'] as const
}

/**
 * Returns Vue Query query options for GET /.well-known/jwks.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWellKnownJwksJsonQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWellKnownJwksJsonQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['.well-known']['jwks.json'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export function useGetWellKnownJwksJson(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['.well-known']['jwks.json']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetWellKnownJwksJsonQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /oauth/clients
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthClientsQueryKey() {
  return ['oauth', 'GET', '/oauth/clients'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/clients
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthClientsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauthClientsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth.clients.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export function useGetOauthClients(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.clients.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauthClientsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/clients
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthClientsMutationKey() {
  return ['oauth', 'POST', '/oauth/clients'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/clients
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthClientsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOauthClientsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.oauth.clients.$post>) =>
    parseResponse(client.oauth.clients.$post(args, clientOptions)),
})

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export function usePostOauthClients(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.clients.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.oauth.clients.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthClientsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /oauth/clients/{clientId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOauthClientsClientIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>>,
) {
  return ['oauth', 'GET', '/oauth/clients/:clientId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /oauth/clients/{clientId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthClientsClientIdQueryOptions = (
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOauthClientsClientIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth.clients[':clientId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export function useGetOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetOauthClientsClientIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /oauth/clients/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutOauthClientsClientIdMutationKey() {
  return ['oauth', 'PUT', '/oauth/clients/:clientId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /oauth/clients/{clientId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutOauthClientsClientIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutOauthClientsClientIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>) =>
    parseResponse(client.oauth.clients[':clientId'].$put(args, clientOptions)),
})

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutOauthClientsClientIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /oauth/clients/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteOauthClientsClientIdMutationKey() {
  return ['oauth', 'DELETE', '/oauth/clients/:clientId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /oauth/clients/{clientId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteOauthClientsClientIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteOauthClientsClientIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
  ) => parseResponse(client.oauth.clients[':clientId'].$delete(args, clientOptions)),
})

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteOauthClientsClientIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /oauth/clients/{clientId}/secret
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthClientsClientIdSecretMutationKey() {
  return ['oauth', 'POST', '/oauth/clients/:clientId/secret'] as const
}

/**
 * Returns Vue Query mutation options for POST /oauth/clients/{clientId}/secret
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOauthClientsClientIdSecretMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostOauthClientsClientIdSecretMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
  ) => parseResponse(client.oauth.clients[':clientId'].secret.$post(args, clientOptions)),
})

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostOauthClientsClientIdSecretMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /oauth/consents
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthConsentsQueryKey() {
  return ['oauth', 'GET', '/oauth/consents'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/consents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthConsentsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauthConsentsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth.consents.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export function useGetOauthConsents(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.consents.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauthConsentsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /oauth/consents/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteOauthConsentsClientIdMutationKey() {
  return ['oauth', 'DELETE', '/oauth/consents/:clientId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /oauth/consents/{clientId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteOauthConsentsClientIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteOauthConsentsClientIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
  ) => parseResponse(client.oauth.consents[':clientId'].$delete(args, clientOptions)),
})

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export function useDeleteOauthConsentsClientId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.oauth.consents)[':clientId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteOauthConsentsClientIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
