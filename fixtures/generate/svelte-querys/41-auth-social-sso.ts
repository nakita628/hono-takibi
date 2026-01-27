import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
 * Generates Svelte Query cache key for GET /social/authorize/{provider}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetSocialAuthorizeProviderQueryKey(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  const u = client.social.authorize[':provider'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
 * Generates Svelte Query cache key for GET /social/callback/{provider}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetSocialCallbackProviderQueryKey(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  const u = client.social.callback[':provider'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.social.token.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.social.token.$post>) =>
      parseResponse(client.social.token.$post(args, clientOptions)),
  }))
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function createPostSocialTokenNative(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.native.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.social.token.native.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.social.token.native.$post>) =>
      parseResponse(client.social.token.native.$post(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /providers
 * Uses $url() for type-safe key generation
 */
export function getGetProvidersQueryKey() {
  return [client.providers.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProvidersQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
 * Generates Svelte Query cache key for GET /providers/admin
 * Uses $url() for type-safe key generation
 */
export function getGetProvidersAdminQueryKey() {
  return [client.providers.admin.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /providers/admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProvidersAdminQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProvidersAdminQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.providers.admin.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.providers.admin.$post>) =>
      parseResponse(client.providers.admin.$post(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /providers/{providerId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetProvidersProviderIdQueryKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  const u = client.providers[':providerId'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.providers)[':providerId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$put']>) =>
      parseResponse(client.providers[':providerId'].$put(args, clientOptions)),
  }))
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function createDeleteProvidersProviderId(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => parseResponse(client.providers[':providerId'].$delete(args, clientOptions)),
  }))
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function createPostProvidersProviderIdTest(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => parseResponse(client.providers[':providerId'].test.$post(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /account/linked
 * Uses $url() for type-safe key generation
 */
export function getGetAccountLinkedQueryKey() {
  return [client.account.linked.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /account/linked
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAccountLinkedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAccountLinkedQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => parseResponse(client.account.link[':provider'].$post(args, clientOptions)),
  }))
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function createDeleteAccountLinkProvider(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => parseResponse(client.account.link[':provider'].$delete(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /enterprise/sso
 * Uses $url() for type-safe key generation
 */
export function getGetEnterpriseSsoQueryKey() {
  return [client.enterprise.sso.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /enterprise/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnterpriseSsoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEnterpriseSsoQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.enterprise.sso.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.enterprise.sso.$post>) =>
      parseResponse(client.enterprise.sso.$post(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  const u = client.enterprise.sso[':configId'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$put(args, clientOptions)),
  }))
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function createDeleteEnterpriseSsoConfigId(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$delete(args, clientOptions)),
  }))
}

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
 * Generates Svelte Query cache key for GET /enterprise/sso/domain-lookup
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  const u = client.enterprise.sso['domain-lookup'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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

/**
 * Generates Svelte Query cache key for GET /enterprise/sso/{configId}/metadata
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  const u = client.enterprise.sso[':configId'].metadata.$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.enterprise.sso[':configId'].metadata.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
