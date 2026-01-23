import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export function createGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['api-keys']['$get']>,
      Error,
      InferResponseType<(typeof client)['api-keys']['$get']>,
      readonly ['/api-keys', InferRequestType<(typeof client)['api-keys']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApiKeysQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['api-keys'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /api-keys
 */
export function getGetApiKeysQueryKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['/api-keys', args] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function createPostApiKeys(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client['api-keys'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function createGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>,
      Error,
      InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>,
      readonly ['/api-keys/:keyId', InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApiKeysKeyIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['api-keys'][':keyId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}
 */
export function getGetApiKeysKeyIdQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return ['/api-keys/:keyId', args] as const
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function createDeleteApiKeysKeyId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['api-keys'][':keyId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function createPatchApiKeysKeyId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['api-keys'][':keyId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function createPostApiKeysKeyIdRevoke(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['api-keys'][':keyId'].revoke.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function createPostApiKeysKeyIdRotate(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['api-keys'][':keyId'].rotate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function createGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
      Error,
      InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
      readonly [
        '/api-keys/:keyId/usage',
        InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApiKeysKeyIdUsageQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['api-keys'][':keyId'].usage.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}/usage
 */
export function getGetApiKeysKeyIdUsageQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return ['/api-keys/:keyId/usage', args] as const
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export function createGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
      Error,
      InferResponseType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
      readonly [
        '/api-keys/:keyId/rate-limit/current',
        InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApiKeysKeyIdRateLimitCurrentQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /api-keys/{keyId}/rate-limit/current
 */
export function getGetApiKeysKeyIdRateLimitCurrentQueryKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return ['/api-keys/:keyId/rate-limit/current', args] as const
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function createPostApiKeysVerify(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['api-keys']['verify']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['api-keys']['verify']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['api-keys']['verify']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['api-keys'].verify.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function createGetScopes(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.scopes.$get>,
      Error,
      InferResponseType<typeof client.scopes.$get>,
      readonly ['/scopes']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetScopesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.scopes.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /scopes
 */
export function getGetScopesQueryKey() {
  return ['/scopes'] as const
}
