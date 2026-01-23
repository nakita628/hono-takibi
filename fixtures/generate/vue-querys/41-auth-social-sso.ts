import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.social.authorize)[':provider']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSocialAuthorizeProviderQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /social/authorize/{provider}
 */
export function getGetSocialAuthorizeProviderQueryKey(
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.social.callback)[':provider']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSocialCallbackProviderQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /social/callback/{provider}
 */
export function getGetSocialCallbackProviderQueryKey(
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
export function usePostSocialToken(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.social.token.$post> | undefined,
      Error,
      InferRequestType<typeof client.social.token.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.social.token.$post> | undefined,
    Error,
    InferRequestType<typeof client.social.token.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.social.token.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.social.token.native.$post> | undefined,
      Error,
      InferRequestType<typeof client.social.token.native.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.social.token.native.$post> | undefined,
    Error,
    InferRequestType<typeof client.social.token.native.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.social.token.native.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.providers.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.providers.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function useGetProvidersAdmin(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.providers.admin.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersAdminQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostProvidersAdmin(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.providers.admin.$post> | undefined,
      Error,
      InferRequestType<typeof client.providers.admin.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.providers.admin.$post> | undefined,
    Error,
    InferRequestType<typeof client.providers.admin.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.providers.admin.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.providers)[':providerId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersProviderIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /providers/{providerId}
 */
export function getGetProvidersProviderIdQueryKey(
  args?: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['/providers/:providerId', ...(args ? [args] : [])] as const
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.providers)[':providerId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.providers[':providerId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.providers[':providerId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['test']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.providers)[':providerId']['test']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.providers[':providerId'].test.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.account.linked.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAccountLinkedQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostAccountLinkProvider(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.account.link)[':provider']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.account.link)[':provider']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.account.link)[':provider']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.account.link[':provider'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.account.link)[':provider']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.account.link[':provider'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.enterprise.sso.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostEnterpriseSso(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.enterprise.sso.$post> | undefined,
      Error,
      InferRequestType<typeof client.enterprise.sso.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.enterprise.sso.$post> | undefined,
    Error,
    InferRequestType<typeof client.enterprise.sso.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.enterprise.sso.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoConfigIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args?: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['/enterprise/sso/:configId', ...(args ? [args] : [])] as const
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.enterprise.sso[':configId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.enterprise.sso[':configId'].$delete(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoDomainLookupQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/domain-lookup
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoConfigIdMetadataQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args?: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', ...(args ? [args] : [])] as const
}
