import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export function useGetSocialAuthorizeProvider(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSocialAuthorizeProviderQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /social/authorize/{provider}
 */
export function getGetSocialAuthorizeProviderQueryKey(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  return ['/social/authorize/:provider', args] as const
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export function useGetSocialCallbackProvider(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSocialCallbackProviderQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /social/callback/{provider}
 */
export function getGetSocialCallbackProviderQueryKey(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  return ['/social/callback/:provider', args] as const
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function usePostSocialToken(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.$post>) =>
      parseResponse(client.social.token.$post(args, clientOptions)),
  })
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.native.$post>) =>
      parseResponse(client.social.token.native.$post(args, clientOptions)),
  })
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetProvidersQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.providers.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /providers
 */
export function getGetProvidersQueryKey() {
  return ['/providers'] as const
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function useGetProvidersAdmin(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetProvidersAdminQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /providers/admin
 */
export function getGetProvidersAdminQueryKey() {
  return ['/providers/admin'] as const
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function usePostProvidersAdmin(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.providers.admin.$post>) =>
      parseResponse(client.providers.admin.$post(args, clientOptions)),
  })
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function useGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProvidersProviderIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /providers/{providerId}
 */
export function getGetProvidersProviderIdQueryKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['/providers/:providerId', args] as const
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$put']>) =>
      parseResponse(client.providers[':providerId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => parseResponse(client.providers[':providerId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => parseResponse(client.providers[':providerId'].test.$post(args, clientOptions)),
  })
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAccountLinkedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /account/linked
 */
export function getGetAccountLinkedQueryKey() {
  return ['/account/linked'] as const
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function usePostAccountLinkProvider(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => parseResponse(client.account.link[':provider'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => parseResponse(client.account.link[':provider'].$delete(args, clientOptions)),
  })
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetEnterpriseSsoQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['/enterprise/sso'] as const
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function usePostEnterpriseSso(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.enterprise.sso.$post>) =>
      parseResponse(client.enterprise.sso.$post(args, clientOptions)),
  })
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function useGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEnterpriseSsoConfigIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['/enterprise/sso/:configId', args] as const
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function useGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEnterpriseSsoDomainLookupQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/domain-lookup
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  return ['/enterprise/sso/domain-lookup', args] as const
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export function useGetEnterpriseSsoConfigIdMetadata(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEnterpriseSsoConfigIdMetadataQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', args] as const
}
