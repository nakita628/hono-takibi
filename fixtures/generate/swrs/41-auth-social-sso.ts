import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.social.authorize)[':provider']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialAuthorizeProviderKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.social.authorize)[':provider']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /social/authorize/{provider}
 */
export function getGetSocialAuthorizeProviderKey(
  args?: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  return ['/social/authorize/:provider', ...(args ? [args] : [])] as const
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
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.social.callback)[':provider']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialCallbackProviderKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.social.callback)[':provider']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /social/callback/{provider}
 */
export function getGetSocialCallbackProviderKey(
  args?: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  return ['/social/callback/:provider', ...(args ? [args] : [])] as const
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function usePostSocialToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.social.token.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.social.token.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.$post>
  >(
    'POST /social/token',
    async (_, { arg }) => parseResponse(client.social.token.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.social.token.native.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.native.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.social.token.native.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.native.$post>
  >(
    'POST /social/token/native',
    async (_, { arg }) => parseResponse(client.social.token.native.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.providers.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersKey() : null)
  const query = useSWR<InferResponseType<typeof client.providers.$get>, Error>(
    swrKey,
    async () => parseResponse(client.providers.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /providers
 */
export function getGetProvidersKey() {
  return ['/providers'] as const
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function useGetProvidersAdmin(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.providers.admin.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersAdminKey() : null)
  const query = useSWR<InferResponseType<typeof client.providers.admin.$get>, Error>(
    swrKey,
    async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /providers/admin
 */
export function getGetProvidersAdminKey() {
  return ['/providers/admin'] as const
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function usePostProvidersAdmin(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.providers.admin.$post>,
    Error,
    string,
    InferRequestType<typeof client.providers.admin.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.providers.admin.$post>,
    Error,
    string,
    InferRequestType<typeof client.providers.admin.$post>
  >(
    'POST /providers/admin',
    async (_, { arg }) => parseResponse(client.providers.admin.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function useGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.providers)[':providerId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersProviderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.providers)[':providerId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /providers/{providerId}
 */
export function getGetProvidersProviderIdKey(
  args?: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['/providers/:providerId', ...(args ? [args] : [])] as const
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.providers)[':providerId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  >(
    'PUT /providers/:providerId',
    async (_, { arg }) => parseResponse(client.providers[':providerId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.providers)[':providerId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  >(
    'DELETE /providers/:providerId',
    async (_, { arg }) =>
      parseResponse(client.providers[':providerId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  >(
    'POST /providers/:providerId/test',
    async (_, { arg }) =>
      parseResponse(client.providers[':providerId'].test.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.account.linked.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAccountLinkedKey() : null)
  const query = useSWR<InferResponseType<typeof client.account.linked.$get>, Error>(
    swrKey,
    async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /account/linked
 */
export function getGetAccountLinkedKey() {
  return ['/account/linked'] as const
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function usePostAccountLinkProvider(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.account.link)[':provider']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.account.link)[':provider']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  >(
    'POST /account/link/:provider',
    async (_, { arg }) =>
      parseResponse(client.account.link[':provider'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.account.link)[':provider']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.account.link)[':provider']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  >(
    'DELETE /account/link/:provider',
    async (_, { arg }) =>
      parseResponse(client.account.link[':provider'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.enterprise.sso.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoKey() : null)
  const query = useSWR<InferResponseType<typeof client.enterprise.sso.$get>, Error>(
    swrKey,
    async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /enterprise/sso
 */
export function getGetEnterpriseSsoKey() {
  return ['/enterprise/sso'] as const
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function usePostEnterpriseSso(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.enterprise.sso.$post>,
    Error,
    string,
    InferRequestType<typeof client.enterprise.sso.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.enterprise.sso.$post>,
    Error,
    string,
    InferRequestType<typeof client.enterprise.sso.$post>
  >(
    'POST /enterprise/sso',
    async (_, { arg }) => parseResponse(client.enterprise.sso.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function useGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}
 */
export function getGetEnterpriseSsoConfigIdKey(
  args?: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['/enterprise/sso/:configId', ...(args ? [args] : [])] as const
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  >(
    'PUT /enterprise/sso/:configId',
    async (_, { arg }) =>
      parseResponse(client.enterprise.sso[':configId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  >(
    'DELETE /enterprise/sso/:configId',
    async (_, { arg }) =>
      parseResponse(client.enterprise.sso[':configId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function useGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoDomainLookupKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/domain-lookup
 */
export function getGetEnterpriseSsoDomainLookupKey(
  args?: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  return ['/enterprise/sso/domain-lookup', ...(args ? [args] : [])] as const
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
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdMetadataKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataKey(
  args?: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', ...(args ? [args] : [])] as const
}
