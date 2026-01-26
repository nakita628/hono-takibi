import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialAuthorizeProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialCallbackProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.social.token.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /social/token',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.social.token.$post> }) =>
      parseResponse(client.social.token.$post(arg, clientOptions)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.social.token.native.$post>,
    Error,
    string,
    InferRequestType<typeof client.social.token.native.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /social/token/native',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.social.token.native.$post> },
    ) => parseResponse(client.social.token.native.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersAdminKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.providers.admin.$post>,
    Error,
    string,
    InferRequestType<typeof client.providers.admin.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /providers/admin',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.providers.admin.$post> }) =>
      parseResponse(client.providers.admin.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersProviderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /providers/:providerId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$put']> },
    ) => parseResponse(client.providers[':providerId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /providers/:providerId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$delete']> },
    ) => parseResponse(client.providers[':providerId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /providers/:providerId/test',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']> },
    ) => parseResponse(client.providers[':providerId'].test.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAccountLinkedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.account.link)[':provider']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /account/link/:provider',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$post']> },
    ) => parseResponse(client.account.link[':provider'].$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /account/link/:provider',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$delete']> },
    ) => parseResponse(client.account.link[':provider'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.enterprise.sso.$post>,
    Error,
    string,
    InferRequestType<typeof client.enterprise.sso.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /enterprise/sso',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.enterprise.sso.$post> }) =>
      parseResponse(client.enterprise.sso.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /enterprise/sso/:configId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']> },
    ) => parseResponse(client.enterprise.sso[':configId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /enterprise/sso/:configId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']> },
    ) => parseResponse(client.enterprise.sso[':configId'].$delete(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoDomainLookupKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataKey(
  args?: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', ...(args ? [args] : [])] as const
}
