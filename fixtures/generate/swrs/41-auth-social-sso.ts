import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSocialAuthorizeProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /social/authorize/{provider}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetSocialAuthorizeProviderKey(
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
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSocialCallbackProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /social/callback/{provider}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetSocialCallbackProviderKey(
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
export function usePostSocialToken(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.social.token.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSocialTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.social.token.$post> }) =>
        parseResponse(client.social.token.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /social/token
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostSocialTokenMutationKey() {
  return 'POST /social/token'
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.native.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.social.token.native.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSocialTokenNativeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.social.token.native.$post> }) =>
        parseResponse(client.social.token.native.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /social/token/native
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostSocialTokenNativeMutationKey() {
  return 'POST /social/token/native'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProvidersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers
 * Returns structured key [templatePath] for filter-based invalidation
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProvidersAdminKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers/admin
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.providers.admin.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProvidersAdminMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.providers.admin.$post> }) =>
        parseResponse(client.providers.admin.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /providers/admin
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostProvidersAdminMutationKey() {
  return 'POST /providers/admin'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProvidersProviderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers/{providerId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetProvidersProviderIdKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['/providers/:providerId', args] as const
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.providers)[':providerId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutProvidersProviderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$put']> },
      ) => parseResponse(client.providers[':providerId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /providers/{providerId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutProvidersProviderIdMutationKey() {
  return 'PUT /providers/:providerId'
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.providers)[':providerId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteProvidersProviderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$delete']> },
      ) => parseResponse(client.providers[':providerId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /providers/{providerId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteProvidersProviderIdMutationKey() {
  return 'DELETE /providers/:providerId'
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.providers)[':providerId']['test']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProvidersProviderIdTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']> },
      ) => parseResponse(client.providers[':providerId'].test.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /providers/{providerId}/test
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostProvidersProviderIdTestMutationKey() {
  return 'POST /providers/:providerId/test'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAccountLinkedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /account/linked
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.account.link)[':provider']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAccountLinkProviderMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$post']> },
      ) => parseResponse(client.account.link[':provider'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /account/link/{provider}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostAccountLinkProviderMutationKey() {
  return 'POST /account/link/:provider'
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.account.link)[':provider']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAccountLinkProviderMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$delete']> },
      ) => parseResponse(client.account.link[':provider'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /account/link/{provider}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteAccountLinkProviderMutationKey() {
  return 'DELETE /account/link/:provider'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEnterpriseSsoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso
 * Returns structured key [templatePath] for filter-based invalidation
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.enterprise.sso.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEnterpriseSsoMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.enterprise.sso.$post> }) =>
        parseResponse(client.enterprise.sso.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /enterprise/sso
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostEnterpriseSsoMutationKey() {
  return 'POST /enterprise/sso'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetEnterpriseSsoConfigIdKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['/enterprise/sso/:configId', args] as const
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutEnterpriseSsoConfigIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']> },
      ) => parseResponse(client.enterprise.sso[':configId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /enterprise/sso/{configId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutEnterpriseSsoConfigIdMutationKey() {
  return 'PUT /enterprise/sso/:configId'
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteEnterpriseSsoConfigIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']> },
      ) => parseResponse(client.enterprise.sso[':configId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /enterprise/sso/{configId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteEnterpriseSsoConfigIdMutationKey() {
  return 'DELETE /enterprise/sso/:configId'
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEnterpriseSsoDomainLookupKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/domain-lookup
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetEnterpriseSsoDomainLookupKey(
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
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}/metadata
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetEnterpriseSsoConfigIdMetadataKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', args] as const
}
