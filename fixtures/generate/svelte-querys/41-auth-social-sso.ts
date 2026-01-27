import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * Generates Svelte Query cache key for GET /social/authorize/{provider}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSocialAuthorizeProviderQueryKey(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  return ['social', 'GET', '/social/authorize/:provider', args] as const
}

/**
 * Returns Svelte Query query options for GET /social/authorize/{provider}
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
export function createGetSocialAuthorizeProvider(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.social.authorize)[':provider']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSocialAuthorizeProviderQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /social/callback/{provider}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSocialCallbackProviderQueryKey(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  return ['social', 'GET', '/social/callback/:provider', args] as const
}

/**
 * Returns Svelte Query query options for GET /social/callback/{provider}
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
export function createGetSocialCallbackProvider(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.social.callback)[':provider']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSocialCallbackProviderQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /social/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSocialTokenMutationKey() {
  return ['social', 'POST', '/social/token'] as const
}

/**
 * Returns Svelte Query mutation options for POST /social/token
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
export function createPostSocialToken(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.social.token.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostSocialTokenMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /social/token/native
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSocialTokenNativeMutationKey() {
  return ['social', 'POST', '/social/token/native'] as const
}

/**
 * Returns Svelte Query mutation options for POST /social/token/native
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
export function createPostSocialTokenNative(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.social.token.native.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.social.token.native.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostSocialTokenNativeMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /providers
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetProvidersQueryKey() {
  return ['providers', 'GET', '/providers'] as const
}

/**
 * Returns Svelte Query query options for GET /providers
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
export function createGetProviders(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProvidersQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /providers/admin
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetProvidersAdminQueryKey() {
  return ['providers', 'GET', '/providers/admin'] as const
}

/**
 * Returns Svelte Query query options for GET /providers/admin
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
export function createGetProvidersAdmin(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProvidersAdminQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /providers/admin
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProvidersAdminMutationKey() {
  return ['providers', 'POST', '/providers/admin'] as const
}

/**
 * Returns Svelte Query mutation options for POST /providers/admin
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
export function createPostProvidersAdmin(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.providers.admin.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostProvidersAdminMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /providers/{providerId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProvidersProviderIdQueryKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['providers', 'GET', '/providers/:providerId', args] as const
}

/**
 * Returns Svelte Query query options for GET /providers/{providerId}
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
export function createGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.providers)[':providerId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProvidersProviderIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /providers/{providerId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutProvidersProviderIdMutationKey() {
  return ['providers', 'PUT', '/providers/:providerId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /providers/{providerId}
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
export function createPutProvidersProviderId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.providers)[':providerId']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutProvidersProviderIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /providers/{providerId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteProvidersProviderIdMutationKey() {
  return ['providers', 'DELETE', '/providers/:providerId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /providers/{providerId}
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
export function createDeleteProvidersProviderId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteProvidersProviderIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /providers/{providerId}/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProvidersProviderIdTestMutationKey() {
  return ['providers', 'POST', '/providers/:providerId/test'] as const
}

/**
 * Returns Svelte Query mutation options for POST /providers/{providerId}/test
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
export function createPostProvidersProviderIdTest(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.providers)[':providerId']['test']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostProvidersProviderIdTestMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /account/linked
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAccountLinkedQueryKey() {
  return ['account', 'GET', '/account/linked'] as const
}

/**
 * Returns Svelte Query query options for GET /account/linked
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
export function createGetAccountLinked(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.account.linked.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAccountLinkedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /account/link/{provider}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAccountLinkProviderMutationKey() {
  return ['account', 'POST', '/account/link/:provider'] as const
}

/**
 * Returns Svelte Query mutation options for POST /account/link/{provider}
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
export function createPostAccountLinkProvider(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.account.link)[':provider']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.account.link)[':provider']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostAccountLinkProviderMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /account/link/{provider}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteAccountLinkProviderMutationKey() {
  return ['account', 'DELETE', '/account/link/:provider'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /account/link/{provider}
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
export function createDeleteAccountLinkProvider(
  options?: () => {
    mutation?: CreateMutationOptions<
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
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteAccountLinkProviderMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['enterprise', 'GET', '/enterprise/sso'] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso
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
export function createGetEnterpriseSso(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /enterprise/sso
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEnterpriseSsoMutationKey() {
  return ['enterprise', 'POST', '/enterprise/sso'] as const
}

/**
 * Returns Svelte Query mutation options for POST /enterprise/sso
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
export function createPostEnterpriseSso(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.enterprise.sso.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostEnterpriseSsoMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/:configId', args] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso/{configId}
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
export function createGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoConfigIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /enterprise/sso/{configId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutEnterpriseSsoConfigIdMutationKey() {
  return ['enterprise', 'PUT', '/enterprise/sso/:configId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /enterprise/sso/{configId}
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
export function createPutEnterpriseSsoConfigId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutEnterpriseSsoConfigIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /enterprise/sso/{configId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteEnterpriseSsoConfigIdMutationKey() {
  return ['enterprise', 'DELETE', '/enterprise/sso/:configId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /enterprise/sso/{configId}
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
export function createDeleteEnterpriseSsoConfigId(
  options?: () => {
    mutation?: CreateMutationOptions<
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
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteEnterpriseSsoConfigIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/domain-lookup
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/domain-lookup', args] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso/domain-lookup
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
export function createGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)['domain-lookup']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoDomainLookupQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}/metadata
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['enterprise', 'GET', '/enterprise/sso/:configId/metadata', args] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso/{configId}/metadata
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
export function createGetEnterpriseSsoConfigIdMetadata(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEnterpriseSsoConfigIdMetadataQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
