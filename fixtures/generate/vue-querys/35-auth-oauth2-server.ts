import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
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
      placeholderData?:
        | InferResponseType<typeof client.oauth.authorize.$get>
        | (() => InferResponseType<typeof client.oauth.authorize.$get>)
      initialData?:
        | InferResponseType<typeof client.oauth.authorize.$get>
        | (() => InferResponseType<typeof client.oauth.authorize.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthAuthorizeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth.authorize.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth/authorize
 */
export function getGetOauthAuthorizeQueryKey(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
) {
  return ['/oauth/authorize', args] as const
}

/**
 * Returns Vue Query query options for GET /oauth/authorize
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthAuthorizeQueryOptions = (
  args: InferRequestType<typeof client.oauth.authorize.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOauthAuthorizeQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.oauth.authorize.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.oauth.token.$post>,
      variables: InferRequestType<typeof client.oauth.token.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.oauth.token.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.oauth.token.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.oauth.token.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.oauth.token.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.oauth.token.$post>) =>
      parseResponse(client.oauth.token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.oauth.revoke.$post>,
      variables: InferRequestType<typeof client.oauth.revoke.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.oauth.revoke.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.oauth.revoke.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.oauth.revoke.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.oauth.revoke.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.oauth.revoke.$post>) =>
      parseResponse(client.oauth.revoke.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.oauth.introspect.$post>,
      variables: InferRequestType<typeof client.oauth.introspect.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.oauth.introspect.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.oauth.introspect.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.oauth.introspect.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.oauth.introspect.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.oauth.introspect.$post>) =>
      parseResponse(client.oauth.introspect.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.oauth.device.code.$post>,
      variables: InferRequestType<typeof client.oauth.device.code.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.oauth.device.code.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.oauth.device.code.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.oauth.device.code.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.oauth.device.code.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.oauth.device.code.$post>) =>
      parseResponse(client.oauth.device.code.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export function useGetOauthUserinfo(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.oauth.userinfo.$get>
      | (() => InferResponseType<typeof client.oauth.userinfo.$get>)
    initialData?:
      | InferResponseType<typeof client.oauth.userinfo.$get>
      | (() => InferResponseType<typeof client.oauth.userinfo.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthUserinfoQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth.userinfo.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth/userinfo
 */
export function getGetOauthUserinfoQueryKey() {
  return ['/oauth/userinfo'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthUserinfoQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauthUserinfoQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.oauth.userinfo.$get(undefined, {
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
    placeholderData?:
      | InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>
      | (() => InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>
      | (() => InferResponseType<(typeof client)['.well-known']['openid-configuration']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWellKnownOpenidConfigurationQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['.well-known']['openid-configuration'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /.well-known/openid-configuration
 */
export function getGetWellKnownOpenidConfigurationQueryKey() {
  return ['/.well-known/openid-configuration'] as const
}

/**
 * Returns Vue Query query options for GET /.well-known/openid-configuration
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWellKnownOpenidConfigurationQueryOptions = (
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWellKnownOpenidConfigurationQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['.well-known']['openid-configuration'].$get(undefined, {
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
    placeholderData?:
      | InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>
      | (() => InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>
      | (() => InferResponseType<(typeof client)['.well-known']['jwks.json']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWellKnownJwksJsonQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['.well-known']['jwks.json'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /.well-known/jwks.json
 */
export function getGetWellKnownJwksJsonQueryKey() {
  return ['/.well-known/jwks.json'] as const
}

/**
 * Returns Vue Query query options for GET /.well-known/jwks.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWellKnownJwksJsonQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWellKnownJwksJsonQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['.well-known']['jwks.json'].$get(undefined, {
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
    placeholderData?:
      | InferResponseType<typeof client.oauth.clients.$get>
      | (() => InferResponseType<typeof client.oauth.clients.$get>)
    initialData?:
      | InferResponseType<typeof client.oauth.clients.$get>
      | (() => InferResponseType<typeof client.oauth.clients.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthClientsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth.clients.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth/clients
 */
export function getGetOauthClientsQueryKey() {
  return ['/oauth/clients'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/clients
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthClientsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauthClientsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.oauth.clients.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export function usePostOauthClients(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.oauth.clients.$post>,
      variables: InferRequestType<typeof client.oauth.clients.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.oauth.clients.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.oauth.clients.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.oauth.clients.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.oauth.clients.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.oauth.clients.$post>) =>
      parseResponse(client.oauth.clients.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export function useGetOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  options?: {
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
      placeholderData?:
        | InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>
        | (() => InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>
        | (() => InferResponseType<(typeof client.oauth.clients)[':clientId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthClientsClientIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth.clients[':clientId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth/clients/{clientId}
 */
export function getGetOauthClientsClientIdQueryKey(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return ['/oauth/clients/:clientId', args] as const
}

/**
 * Returns Vue Query query options for GET /oauth/clients/{clientId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthClientsClientIdQueryOptions = (
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOauthClientsClientIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.oauth.clients[':clientId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.oauth.clients)[':clientId']['$put']>,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.oauth.clients)[':clientId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>,
    ) => parseResponse(client.oauth.clients[':clientId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.oauth.clients)[':clientId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.oauth.clients)[':clientId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>,
    ) => parseResponse(client.oauth.clients[':clientId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>,
    ) => parseResponse(client.oauth.clients[':clientId'].secret.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export function useGetOauthConsents(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.oauth.consents.$get>
      | (() => InferResponseType<typeof client.oauth.consents.$get>)
    initialData?:
      | InferResponseType<typeof client.oauth.consents.$get>
      | (() => InferResponseType<typeof client.oauth.consents.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthConsentsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth.consents.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth/consents
 */
export function getGetOauthConsentsQueryKey() {
  return ['/oauth/consents'] as const
}

/**
 * Returns Vue Query query options for GET /oauth/consents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthConsentsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauthConsentsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.oauth.consents.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export function useDeleteOauthConsentsClientId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.oauth.consents)[':clientId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.oauth.consents)[':clientId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>,
    ) => parseResponse(client.oauth.consents[':clientId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
