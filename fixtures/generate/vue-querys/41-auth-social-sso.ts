import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/41-auth-social-sso'

/**
 * Generates Vue Query cache key for GET /social/authorize/{provider}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSocialAuthorizeProviderQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.social.authorize)[':provider']['$get']>>,
) {
  return ['social', 'GET', '/social/authorize/:provider', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /social/authorize/{provider}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialAuthorizeProviderQueryOptions = (
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSocialAuthorizeProviderQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.social.authorize[':provider'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.social.authorize)[':provider']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSocialAuthorizeProviderQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /social/callback/{provider}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSocialCallbackProviderQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.social.callback)[':provider']['$get']>>,
) {
  return ['social', 'GET', '/social/callback/:provider', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /social/callback/{provider}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialCallbackProviderQueryOptions = (
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSocialCallbackProviderQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.social.callback[':provider'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.social.callback)[':provider']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSocialCallbackProviderQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /social/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSocialTokenMutationKey() {
  return ['social', 'POST', '/social/token'] as const
}

/**
 * Returns Vue Query mutation options for POST /social/token
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSocialTokenMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSocialTokenMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.social.token.$post>) =>
    parseResponse(client.social.token.$post(args, clientOptions)),
})

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function usePostSocialToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.social.token.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSocialTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /social/token/native
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSocialTokenNativeMutationKey() {
  return ['social', 'POST', '/social/token/native'] as const
}

/**
 * Returns Vue Query mutation options for POST /social/token/native
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSocialTokenNativeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSocialTokenNativeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.social.token.native.$post>) =>
    parseResponse(client.social.token.native.$post(args, clientOptions)),
})

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.social.token.native.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.social.token.native.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSocialTokenNativeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /providers
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetProvidersQueryKey() {
  return ['providers', 'GET', '/providers'] as const
}

/**
 * Returns Vue Query query options for GET /providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProvidersQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.providers.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProvidersQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /providers/admin
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetProvidersAdminQueryKey() {
  return ['providers', 'GET', '/providers/admin'] as const
}

/**
 * Returns Vue Query query options for GET /providers/admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersAdminQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProvidersAdminQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.providers.admin.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function useGetProvidersAdmin(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProvidersAdminQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /providers/admin
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProvidersAdminMutationKey() {
  return ['providers', 'POST', '/providers/admin'] as const
}

/**
 * Returns Vue Query mutation options for POST /providers/admin
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProvidersAdminMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProvidersAdminMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.providers.admin.$post>) =>
    parseResponse(client.providers.admin.$post(args, clientOptions)),
})

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function usePostProvidersAdmin(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.providers.admin.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostProvidersAdminMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /providers/{providerId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProvidersProviderIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.providers)[':providerId']['$get']>>,
) {
  return ['providers', 'GET', '/providers/:providerId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /providers/{providerId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersProviderIdQueryOptions = (
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProvidersProviderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.providers[':providerId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function useGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.providers)[':providerId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProvidersProviderIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /providers/{providerId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutProvidersProviderIdMutationKey() {
  return ['providers', 'PUT', '/providers/:providerId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /providers/{providerId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutProvidersProviderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutProvidersProviderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$put']>) =>
    parseResponse(client.providers[':providerId'].$put(args, clientOptions)),
})

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.providers)[':providerId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.providers)[':providerId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutProvidersProviderIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /providers/{providerId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteProvidersProviderIdMutationKey() {
  return ['providers', 'DELETE', '/providers/:providerId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /providers/{providerId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteProvidersProviderIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteProvidersProviderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$delete']>) =>
    parseResponse(client.providers[':providerId'].$delete(args, clientOptions)),
})

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.providers)[':providerId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.providers)[':providerId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteProvidersProviderIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /providers/{providerId}/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProvidersProviderIdTestMutationKey() {
  return ['providers', 'POST', '/providers/:providerId/test'] as const
}

/**
 * Returns Vue Query mutation options for POST /providers/{providerId}/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProvidersProviderIdTestMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostProvidersProviderIdTestMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
  ) => parseResponse(client.providers[':providerId'].test.$post(args, clientOptions)),
})

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.providers)[':providerId']['test']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostProvidersProviderIdTestMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /account/linked
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAccountLinkedQueryKey() {
  return ['account', 'GET', '/account/linked'] as const
}

/**
 * Returns Vue Query query options for GET /account/linked
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAccountLinkedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAccountLinkedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.account.linked.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.account.linked.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAccountLinkedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /account/link/{provider}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAccountLinkProviderMutationKey() {
  return ['account', 'POST', '/account/link/:provider'] as const
}

/**
 * Returns Vue Query mutation options for POST /account/link/{provider}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAccountLinkProviderMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostAccountLinkProviderMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.account.link)[':provider']['$post']>) =>
    parseResponse(client.account.link[':provider'].$post(args, clientOptions)),
})

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function usePostAccountLinkProvider(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.account.link)[':provider']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.account.link)[':provider']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAccountLinkProviderMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /account/link/{provider}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteAccountLinkProviderMutationKey() {
  return ['account', 'DELETE', '/account/link/:provider'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /account/link/{provider}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteAccountLinkProviderMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteAccountLinkProviderMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
  ) => parseResponse(client.account.link[':provider'].$delete(args, clientOptions)),
})

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.account.link)[':provider']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.account.link)[':provider']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteAccountLinkProviderMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['enterprise', 'GET', '/enterprise/sso'] as const
}

/**
 * Returns Vue Query query options for GET /enterprise/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEnterpriseSsoQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.enterprise.sso.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /enterprise/sso
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEnterpriseSsoMutationKey() {
  return ['enterprise', 'POST', '/enterprise/sso'] as const
}

/**
 * Returns Vue Query mutation options for POST /enterprise/sso
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEnterpriseSsoMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEnterpriseSsoMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.enterprise.sso.$post>) =>
    parseResponse(client.enterprise.sso.$post(args, clientOptions)),
})

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function usePostEnterpriseSso(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.enterprise.sso.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostEnterpriseSsoMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/:configId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /enterprise/sso/{configId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoConfigIdQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEnterpriseSsoConfigIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.enterprise.sso[':configId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function useGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoConfigIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /enterprise/sso/{configId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutEnterpriseSsoConfigIdMutationKey() {
  return ['enterprise', 'PUT', '/enterprise/sso/:configId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /enterprise/sso/{configId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutEnterpriseSsoConfigIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutEnterpriseSsoConfigIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>) =>
    parseResponse(client.enterprise.sso[':configId'].$put(args, clientOptions)),
})

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutEnterpriseSsoConfigIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /enterprise/sso/{configId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteEnterpriseSsoConfigIdMutationKey() {
  return ['enterprise', 'DELETE', '/enterprise/sso/:configId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /enterprise/sso/{configId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteEnterpriseSsoConfigIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteEnterpriseSsoConfigIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
  ) => parseResponse(client.enterprise.sso[':configId'].$delete(args, clientOptions)),
})

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteEnterpriseSsoConfigIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/domain-lookup
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/domain-lookup', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /enterprise/sso/domain-lookup
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoDomainLookupQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEnterpriseSsoDomainLookupQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.enterprise.sso['domain-lookup'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function useGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.enterprise.sso)['domain-lookup']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoDomainLookupQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /enterprise/sso/{configId}/metadata
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/:configId/metadata', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /enterprise/sso/{configId}/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoConfigIdMetadataQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEnterpriseSsoConfigIdMetadataQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.enterprise.sso[':configId'].metadata.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoConfigIdMetadataQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
