import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * Generates Svelte Query cache key for GET /api-keys
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApiKeysQueryKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['api-keys', '/api-keys', args] as const
}

/**
 * Returns Svelte Query query options for GET /api-keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiKeysQueryOptions = (
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApiKeysQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['api-keys'].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export function createGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetApiKeysQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function createPostApiKeys(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['$post']>>>>
    >,
    Error,
    InferRequestType<(typeof client)['api-keys']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['$post']>) =>
      parseResponse(client['api-keys'].$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApiKeysKeyIdQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return ['api-keys', '/api-keys/:keyId', args] as const
}

/**
 * Returns Svelte Query query options for GET /api-keys/{keyId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiKeysKeyIdQueryOptions = (
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApiKeysKeyIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['api-keys'][':keyId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function createGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function createDeleteApiKeysKeyId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>) =>
      parseResponse(client['api-keys'][':keyId'].$delete(args, clientOptions)),
  }))
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function createPatchApiKeysKeyId(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>) =>
      parseResponse(client['api-keys'][':keyId'].$patch(args, clientOptions)),
  }))
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function createPostApiKeysKeyIdRevoke(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(args, clientOptions)),
  }))
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function createPostApiKeysKeyIdRotate(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}/usage
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApiKeysKeyIdUsageQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return ['api-keys', '/api-keys/:keyId/usage', args] as const
}

/**
 * Returns Svelte Query query options for GET /api-keys/{keyId}/usage
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiKeysKeyIdUsageQueryOptions = (
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApiKeysKeyIdUsageQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['api-keys'][':keyId'].usage.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function createGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['usage']['$get']>>
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
    const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdUsageQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}/rate-limit/current
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApiKeysKeyIdRateLimitCurrentQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return ['api-keys', '/api-keys/:keyId/rate-limit/current', args] as const
}

/**
 * Returns Svelte Query query options for GET /api-keys/{keyId}/rate-limit/current
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiKeysKeyIdRateLimitCurrentQueryOptions = (
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApiKeysKeyIdRateLimitCurrentQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['api-keys'][':keyId']['rate-limit'].current.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export function createGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>
            >
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
    const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdRateLimitCurrentQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function createPostApiKeysVerify(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['verify']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['verify']['$post']>) =>
      parseResponse(client['api-keys'].verify.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /scopes
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetScopesQueryKey() {
  return ['scopes', '/scopes'] as const
}

/**
 * Returns Svelte Query query options for GET /scopes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetScopesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetScopesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.scopes.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function createGetScopes(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.scopes.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetScopesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
