import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.social.authorize)[':provider']['$get']>
        | (() => InferResponseType<(typeof client.social.authorize)[':provider']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.social.authorize)[':provider']['$get']>
        | (() => InferResponseType<(typeof client.social.authorize)[':provider']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSocialAuthorizeProviderQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.social.authorize[':provider'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
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
 * Returns Svelte Query query options for GET /social/authorize/{provider}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialAuthorizeProviderQueryOptions = (
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSocialAuthorizeProviderQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.social.authorize[':provider'].$get(args, {
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
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.social.callback)[':provider']['$get']>
        | (() => InferResponseType<(typeof client.social.callback)[':provider']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.social.callback)[':provider']['$get']>
        | (() => InferResponseType<(typeof client.social.callback)[':provider']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSocialCallbackProviderQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.social.callback[':provider'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
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
 * Returns Svelte Query query options for GET /social/callback/{provider}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialCallbackProviderQueryOptions = (
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSocialCallbackProviderQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.social.callback[':provider'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function createPostSocialToken(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.social.token.$post>,
      variables: InferRequestType<typeof client.social.token.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.social.token.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.social.token.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.social.token.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.social.token.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.$post>) =>
      parseResponse(client.social.token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function createPostSocialTokenNative(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.social.token.native.$post>,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.social.token.native.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.social.token.native.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.native.$post>) =>
      parseResponse(client.social.token.native.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function createGetProviders(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.providers.$get>
      | (() => InferResponseType<typeof client.providers.$get>)
    initialData?:
      | InferResponseType<typeof client.providers.$get>
      | (() => InferResponseType<typeof client.providers.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProvidersQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.providers.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /providers
 */
export function getGetProvidersQueryKey() {
  return ['/providers'] as const
}

/**
 * Returns Svelte Query query options for GET /providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetProvidersQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.providers.$get(undefined, {
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
export function createGetProvidersAdmin(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.providers.admin.$get>
      | (() => InferResponseType<typeof client.providers.admin.$get>)
    initialData?:
      | InferResponseType<typeof client.providers.admin.$get>
      | (() => InferResponseType<typeof client.providers.admin.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProvidersAdminQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.providers.admin.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /providers/admin
 */
export function getGetProvidersAdminQueryKey() {
  return ['/providers/admin'] as const
}

/**
 * Returns Svelte Query query options for GET /providers/admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersAdminQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetProvidersAdminQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.providers.admin.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function createPostProvidersAdmin(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.providers.admin.$post>,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.providers.admin.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.providers.admin.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.providers.admin.$post>) =>
      parseResponse(client.providers.admin.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function createGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.providers)[':providerId']['$get']>
        | (() => InferResponseType<(typeof client.providers)[':providerId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.providers)[':providerId']['$get']>
        | (() => InferResponseType<(typeof client.providers)[':providerId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProvidersProviderIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.providers[':providerId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
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
 * Returns Svelte Query query options for GET /providers/{providerId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersProviderIdQueryOptions = (
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProvidersProviderIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.providers[':providerId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function createPutProvidersProviderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$put']>,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$put']>) =>
      parseResponse(client.providers[':providerId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function createDeleteProvidersProviderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => parseResponse(client.providers[':providerId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function createPostProvidersProviderIdTest(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => parseResponse(client.providers[':providerId'].test.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function createGetAccountLinked(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.account.linked.$get>
      | (() => InferResponseType<typeof client.account.linked.$get>)
    initialData?:
      | InferResponseType<typeof client.account.linked.$get>
      | (() => InferResponseType<typeof client.account.linked.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAccountLinkedQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.account.linked.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /account/linked
 */
export function getGetAccountLinkedQueryKey() {
  return ['/account/linked'] as const
}

/**
 * Returns Svelte Query query options for GET /account/linked
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAccountLinkedQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAccountLinkedQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.account.linked.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function createPostAccountLinkProvider(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$post']>,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => parseResponse(client.account.link[':provider'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function createDeleteAccountLinkProvider(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => parseResponse(client.account.link[':provider'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function createGetEnterpriseSso(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.enterprise.sso.$get>
      | (() => InferResponseType<typeof client.enterprise.sso.$get>)
    initialData?:
      | InferResponseType<typeof client.enterprise.sso.$get>
      | (() => InferResponseType<typeof client.enterprise.sso.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnterpriseSsoQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.enterprise.sso.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['/enterprise/sso'] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetEnterpriseSsoQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.enterprise.sso.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function createPostEnterpriseSso(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.enterprise.sso.$post>,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.enterprise.sso.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.enterprise.sso.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.enterprise.sso.$post>) =>
      parseResponse(client.enterprise.sso.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function createGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)[':configId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnterpriseSsoConfigIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.enterprise.sso[':configId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
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
 * Returns Svelte Query query options for GET /enterprise/sso/{configId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoConfigIdQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEnterpriseSsoConfigIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.enterprise.sso[':configId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function createPutEnterpriseSsoConfigId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']>,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function createDeleteEnterpriseSsoConfigId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function createGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)['domain-lookup']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnterpriseSsoDomainLookupQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.enterprise.sso['domain-lookup'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
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
 * Returns Svelte Query query options for GET /enterprise/sso/domain-lookup
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoDomainLookupQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEnterpriseSsoDomainLookupQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.enterprise.sso['domain-lookup'].$get(args, {
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
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>
        | (() => InferResponseType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnterpriseSsoConfigIdMetadataQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.enterprise.sso[':configId'].metadata.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', args] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso/{configId}/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoConfigIdMetadataQueryOptions = (
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEnterpriseSsoConfigIdMetadataQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.enterprise.sso[':configId'].metadata.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
