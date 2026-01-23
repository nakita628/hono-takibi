import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
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
export function createGetSocialAuthorizeProvider(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.social.authorize)[':provider']['$get']>,
      Error,
      InferResponseType<(typeof client.social.authorize)[':provider']['$get']>,
      readonly [
        '/social/authorize/:provider',
        InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSocialAuthorizeProviderQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /social/authorize/{provider}
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
export function createGetSocialCallbackProvider(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.social.callback)[':provider']['$get']>,
      Error,
      InferResponseType<(typeof client.social.callback)[':provider']['$get']>,
      readonly [
        '/social/callback/:provider',
        InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSocialCallbackProviderQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /social/callback/{provider}
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
export function createPostSocialToken(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.social.token.$post> | undefined,
      Error,
      InferRequestType<typeof client.social.token.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostSocialTokenNative(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.social.token.native.$post> | undefined,
      Error,
      InferRequestType<typeof client.social.token.native.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProviders(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.providers.$get>,
      Error,
      InferResponseType<typeof client.providers.$get>,
      readonly ['/providers']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.providers.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /providers
 */
export function getGetProvidersQueryKey() {
  return ['/providers'] as const
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function createGetProvidersAdmin(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.providers.admin.$get>,
      Error,
      InferResponseType<typeof client.providers.admin.$get>,
      readonly ['/providers/admin']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersAdminQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /providers/admin
 */
export function getGetProvidersAdminQueryKey() {
  return ['/providers/admin'] as const
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function createPostProvidersAdmin(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.providers.admin.$post> | undefined,
      Error,
      InferRequestType<typeof client.providers.admin.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.providers)[':providerId']['$get']>,
      Error,
      InferResponseType<(typeof client.providers)[':providerId']['$get']>,
      readonly [
        '/providers/:providerId',
        InferRequestType<(typeof client.providers)[':providerId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProvidersProviderIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /providers/{providerId}
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
export function createPutProvidersProviderId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteProvidersProviderId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostProvidersProviderIdTest(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.providers)[':providerId']['test']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetAccountLinked(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.account.linked.$get>,
      Error,
      InferResponseType<typeof client.account.linked.$get>,
      readonly ['/account/linked']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAccountLinkedQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /account/linked
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
export function createPostAccountLinkProvider(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.account.link)[':provider']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.account.link)[':provider']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteAccountLinkProvider(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.account.link)[':provider']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetEnterpriseSso(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.enterprise.sso.$get>,
      Error,
      InferResponseType<typeof client.enterprise.sso.$get>,
      readonly ['/enterprise/sso']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['/enterprise/sso'] as const
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function createPostEnterpriseSso(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.enterprise.sso.$post> | undefined,
      Error,
      InferRequestType<typeof client.enterprise.sso.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>,
      Error,
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>,
      readonly [
        '/enterprise/sso/:configId',
        InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoConfigIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}
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
export function createPutEnterpriseSsoConfigId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteEnterpriseSsoConfigId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
      Error,
      InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
      readonly [
        '/enterprise/sso/domain-lookup',
        InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoDomainLookupQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/domain-lookup
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
export function createGetEnterpriseSsoConfigIdMetadata(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
      Error,
      InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
      readonly [
        '/enterprise/sso/:configId/metadata',
        InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnterpriseSsoConfigIdMetadataQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', args] as const
}
