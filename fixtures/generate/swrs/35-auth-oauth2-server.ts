import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/35-auth-oauth2-server'

/**
 * Generates SWR cache key for GET /oauth/authorize
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOauthAuthorizeKey(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
) {
  return ['oauth', 'GET', '/oauth/authorize', args] as const
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauthAuthorizeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.authorize.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthTokenMutationKey() {
  return ['oauth', 'POST', '/oauth/token'] as const
}

/**
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
 * Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export function usePostOauthToken(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.token.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.oauth.token.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.token.$post> }) =>
        parseResponse(client.oauth.token.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/revoke
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthRevokeMutationKey() {
  return ['oauth', 'POST', '/oauth/revoke'] as const
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.revoke.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.oauth.revoke.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthRevokeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.revoke.$post> }) =>
        parseResponse(client.oauth.revoke.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/introspect
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthIntrospectMutationKey() {
  return ['oauth', 'POST', '/oauth/introspect'] as const
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.introspect.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.oauth.introspect.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthIntrospectMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.introspect.$post> }) =>
        parseResponse(client.oauth.introspect.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/device/code
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthDeviceCodeMutationKey() {
  return ['oauth', 'POST', '/oauth/device/code'] as const
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.device.code.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.oauth.device.code.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthDeviceCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.device.code.$post> }) =>
        parseResponse(client.oauth.device.code.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/userinfo
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthUserinfoKey() {
  return ['oauth', 'GET', '/oauth/userinfo'] as const
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export function useGetOauthUserinfo(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauthUserinfoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.userinfo.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /.well-known/openid-configuration
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWellKnownOpenidConfigurationKey() {
  return ['.well-known', 'GET', '/.well-known/openid-configuration'] as const
}

/**
 * GET /.well-known/openid-configuration
 *
 * OpenID Connect Discovery
 *
 * OpenID Connect の設定情報を返します
 */
export function useGetWellKnownOpenidConfiguration(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWellKnownOpenidConfigurationKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['.well-known']['openid-configuration'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /.well-known/jwks.json
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWellKnownJwksJsonKey() {
  return ['.well-known', 'GET', '/.well-known/jwks.json'] as const
}

/**
 * GET /.well-known/jwks.json
 *
 * JSON Web Key Set
 *
 * JWTの検証に使用する公開鍵セット
 */
export function useGetWellKnownJwksJson(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWellKnownJwksJsonKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['.well-known']['jwks.json'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/clients
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthClientsKey() {
  return ['oauth', 'GET', '/oauth/clients'] as const
}

/**
 * GET /oauth/clients
 *
 * クライアント一覧取得
 */
export function useGetOauthClients(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauthClientsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.clients.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/clients
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthClientsMutationKey() {
  return ['oauth', 'POST', '/oauth/clients'] as const
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export function usePostOauthClients(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth.clients.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.oauth.clients.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthClientsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.clients.$post> }) =>
        parseResponse(client.oauth.clients.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/clients/{clientId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOauthClientsClientIdKey(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return ['oauth', 'GET', '/oauth/clients/:clientId', args] as const
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export function useGetOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauthClientsClientIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.clients[':clientId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /oauth/clients/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutOauthClientsClientIdMutationKey() {
  return ['oauth', 'PUT', '/oauth/clients/:clientId'] as const
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutOauthClientsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']> },
      ) => parseResponse(client.oauth.clients[':clientId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /oauth/clients/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteOauthClientsClientIdMutationKey() {
  return ['oauth', 'DELETE', '/oauth/clients/:clientId'] as const
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOauthClientsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']> },
      ) => parseResponse(client.oauth.clients[':clientId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/clients/{clientId}/secret
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOauthClientsClientIdSecretMutationKey() {
  return ['oauth', 'POST', '/oauth/clients/:clientId/secret'] as const
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauthClientsClientIdSecretMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']> },
      ) => parseResponse(client.oauth.clients[':clientId'].secret.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/consents
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthConsentsKey() {
  return ['oauth', 'GET', '/oauth/consents'] as const
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export function useGetOauthConsents(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauthConsentsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.consents.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /oauth/consents/{clientId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteOauthConsentsClientIdMutationKey() {
  return ['oauth', 'DELETE', '/oauth/consents/:clientId'] as const
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export function useDeleteOauthConsentsClientId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.oauth.consents)[':clientId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOauthConsentsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']> },
      ) => parseResponse(client.oauth.consents[':clientId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
