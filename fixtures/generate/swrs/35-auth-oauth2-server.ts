import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
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
 */
export function getGetOauthAuthorizeKey(
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
export function usePostOauthToken(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/token',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.oauth.token.$post> }) =>
      parseResponse(client.oauth.token.$post(arg, options?.client)),
  )
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/revoke',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.oauth.revoke.$post> }) =>
      parseResponse(client.oauth.revoke.$post(arg, options?.client)),
  )
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/introspect',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.oauth.introspect.$post> }) =>
      parseResponse(client.oauth.introspect.$post(arg, options?.client)),
  )
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/device/code',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.oauth.device.code.$post> }) =>
      parseResponse(client.oauth.device.code.$post(arg, options?.client)),
  )
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
 */
export function getGetOauthUserinfoKey() {
  return ['/oauth/userinfo'] as const
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
 */
export function getGetWellKnownOpenidConfigurationKey() {
  return ['/.well-known/openid-configuration'] as const
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
 */
export function getGetWellKnownJwksJsonKey() {
  return ['/.well-known/jwks.json'] as const
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
 */
export function getGetOauthClientsKey() {
  return ['/oauth/clients'] as const
}

/**
 * POST /oauth/clients
 *
 * クライアント作成
 */
export function usePostOauthClients(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/clients',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.oauth.clients.$post> }) =>
      parseResponse(client.oauth.clients.$post(arg, options?.client)),
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
 */
export function getGetOauthClientsClientIdKey(
  args?: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
) {
  return ['/oauth/clients/:clientId', ...(args ? [args] : [])] as const
}

/**
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /oauth/clients/:clientId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']> },
    ) => parseResponse(client.oauth.clients[':clientId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /oauth/clients/:clientId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']> },
    ) => parseResponse(client.oauth.clients[':clientId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /oauth/clients/:clientId/secret',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']> },
    ) => parseResponse(client.oauth.clients[':clientId'].secret.$post(arg, options?.client)),
  )
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
 */
export function getGetOauthConsentsKey() {
  return ['/oauth/consents'] as const
}

/**
 * DELETE /oauth/consents/{clientId}
 *
 * 同意取り消し
 *
 * アプリケーションへのアクセス許可を取り消します
 */
export function useDeleteOauthConsentsClientId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /oauth/consents/:clientId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']> },
    ) => parseResponse(client.oauth.consents[':clientId'].$delete(arg, options?.client)),
  )
}
