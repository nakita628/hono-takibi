import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthAuthorizeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.authorize.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/authorize
 * Uses $url() for type-safe key generation
 */
export function getGetOauthAuthorizeKey(
  args: InferRequestType<typeof client.oauth.authorize.$get>,
) {
  return client.oauth.authorize.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.token.$post> }) =>
        parseResponse(client.oauth.token.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/token
 * Uses $url() for type-safe key generation
 */
export function getPostOauthTokenMutationKey() {
  return `POST ${client.oauth.token.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthRevokeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.revoke.$post> }) =>
        parseResponse(client.oauth.revoke.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/revoke
 * Uses $url() for type-safe key generation
 */
export function getPostOauthRevokeMutationKey() {
  return `POST ${client.oauth.revoke.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthIntrospectMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.introspect.$post> }) =>
        parseResponse(client.oauth.introspect.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/introspect
 * Uses $url() for type-safe key generation
 */
export function getPostOauthIntrospectMutationKey() {
  return `POST ${client.oauth.introspect.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthDeviceCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.device.code.$post> }) =>
        parseResponse(client.oauth.device.code.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/device/code
 * Uses $url() for type-safe key generation
 */
export function getPostOauthDeviceCodeMutationKey() {
  return `POST ${client.oauth.device.code.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthUserinfoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.userinfo.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/userinfo
 * Uses $url() for type-safe key generation
 */
export function getGetOauthUserinfoKey() {
  return client.oauth.userinfo.$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWellKnownOpenidConfigurationKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['.well-known']['openid-configuration'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /.well-known/openid-configuration
 * Uses $url() for type-safe key generation
 */
export function getGetWellKnownOpenidConfigurationKey() {
  return client['.well-known']['openid-configuration'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWellKnownJwksJsonKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['.well-known']['jwks.json'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /.well-known/jwks.json
 * Uses $url() for type-safe key generation
 */
export function getGetWellKnownJwksJsonKey() {
  return client['.well-known']['jwks.json'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthClientsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.clients.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/clients
 * Uses $url() for type-safe key generation
 */
export function getGetOauthClientsKey() {
  return client.oauth.clients.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthClientsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.oauth.clients.$post> }) =>
        parseResponse(client.oauth.clients.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/clients
 * Uses $url() for type-safe key generation
 */
export function getPostOauthClientsMutationKey() {
  return `POST ${client.oauth.clients.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthClientsClientIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.clients[':clientId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/clients/{clientId}
 * Uses $url() for type-safe key generation
 */
export function getGetOauthClientsClientIdKey(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return client.oauth.clients[':clientId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutOauthClientsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']> },
      ) => parseResponse(client.oauth.clients[':clientId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /oauth/clients/{clientId}
 * Uses $url() for type-safe key generation
 */
export function getPutOauthClientsClientIdMutationKey() {
  return `PUT ${client.oauth.clients[':clientId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteOauthClientsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']> },
      ) => parseResponse(client.oauth.clients[':clientId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /oauth/clients/{clientId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteOauthClientsClientIdMutationKey() {
  return `DELETE ${client.oauth.clients[':clientId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostOauthClientsClientIdSecretMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /oauth/clients/{clientId}/secret
 * Uses $url() for type-safe key generation
 */
export function getPostOauthClientsClientIdSecretMutationKey() {
  return `POST ${client.oauth.clients[':clientId'].secret.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthConsentsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth.consents.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth/consents
 * Uses $url() for type-safe key generation
 */
export function getGetOauthConsentsKey() {
  return client.oauth.consents.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteOauthConsentsClientIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']> },
      ) => parseResponse(client.oauth.consents[':clientId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /oauth/consents/{clientId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteOauthConsentsClientIdMutationKey() {
  return `DELETE ${client.oauth.consents[':clientId'].$url().pathname}`
}
