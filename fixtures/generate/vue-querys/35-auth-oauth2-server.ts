import { useQuery, useMutation } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOauthAuthorizeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth.authorize.$get(args, clientOptions)),
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
 * POST /oauth/token
 *
 * トークンエンドポイント
 *
 * アクセストークンを発行します。
 * Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。
 */
export function usePostOauthToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.oauth.token.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.token.$post>
  >({ mutationFn: async (args) => parseResponse(client.oauth.token.$post(args, clientOptions)) })
}

/**
 * POST /oauth/revoke
 *
 * トークン無効化
 *
 * アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）
 */
export function usePostOauthRevoke(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.oauth.revoke.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.revoke.$post>
  >({ mutationFn: async (args) => parseResponse(client.oauth.revoke.$post(args, clientOptions)) })
}

/**
 * POST /oauth/introspect
 *
 * トークン情報取得
 *
 * トークンの有効性と情報を取得します（RFC 7662）
 */
export function usePostOauthIntrospect(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.oauth.introspect.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.introspect.$post>
  >({
    mutationFn: async (args) => parseResponse(client.oauth.introspect.$post(args, clientOptions)),
  })
}

/**
 * POST /oauth/device/code
 *
 * デバイス認可リクエスト
 *
 * デバイスフロー用の認可コードを発行します（RFC 8628）
 */
export function usePostOauthDeviceCode(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.oauth.device.code.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.device.code.$post>
  >({
    mutationFn: async (args) => parseResponse(client.oauth.device.code.$post(args, clientOptions)),
  })
}

/**
 * GET /oauth/userinfo
 *
 * ユーザー情報取得
 *
 * OpenID Connect UserInfo エンドポイント
 */
export function useGetOauthUserinfo(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauthUserinfoQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth.userinfo.$get(undefined, clientOptions)),
  })
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
export function useGetWellKnownOpenidConfiguration(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWellKnownOpenidConfigurationQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['.well-known']['openid-configuration'].$get(undefined, clientOptions)),
  })
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
export function useGetWellKnownJwksJson(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWellKnownJwksJsonQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['.well-known']['jwks.json'].$get(undefined, clientOptions)),
  })
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
export function useGetOauthClients(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauthClientsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth.clients.$get(undefined, clientOptions)),
  })
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
export function usePostOauthClients(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.oauth.clients.$post> | undefined,
    Error,
    InferRequestType<typeof client.oauth.clients.$post>
  >({ mutationFn: async (args) => parseResponse(client.oauth.clients.$post(args, clientOptions)) })
}

/**
 * GET /oauth/clients/{clientId}
 *
 * クライアント詳細取得
 */
export function useGetOauthClientsClientId(
  args: InferRequestType<(typeof client.oauth.clients)[':clientId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOauthClientsClientIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth.clients[':clientId'].$get(args, clientOptions)),
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
 * PUT /oauth/clients/{clientId}
 *
 * クライアント更新
 */
export function usePutOauthClientsClientId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.oauth.clients[':clientId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /oauth/clients/{clientId}
 *
 * クライアント削除
 */
export function useDeleteOauthClientsClientId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.oauth.clients[':clientId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /oauth/clients/{clientId}/secret
 *
 * クライアントシークレット再生成
 */
export function usePostOauthClientsClientIdSecret(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.oauth.clients)[':clientId']['secret']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.clients)[':clientId']['secret']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.oauth.clients[':clientId'].secret.$post(args, clientOptions)),
  })
}

/**
 * GET /oauth/consents
 *
 * 同意一覧取得
 *
 * ユーザーが許可したアプリケーション一覧
 */
export function useGetOauthConsents(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauthConsentsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth.consents.$get(undefined, clientOptions)),
  })
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
export function useDeleteOauthConsentsClientId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.oauth.consents)[':clientId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.oauth.consents)[':clientId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.oauth.consents[':clientId'].$delete(args, clientOptions)),
  })
}
