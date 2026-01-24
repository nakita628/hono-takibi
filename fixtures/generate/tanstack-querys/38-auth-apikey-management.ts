import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export function useGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /api-keys
 */
export function getGetApiKeysQueryKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['/api-keys', args] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['$post']>) =>
        parseResponse(client['api-keys'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function useGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /api-keys/{keyId}
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
export function useDeleteApiKeysKeyId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
      ) => parseResponse(client['api-keys'][':keyId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>) =>
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
export function usePostApiKeysKeyIdRevoke(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
      ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
      ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function useGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /api-keys/{keyId}/usage
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
export function useGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /api-keys/{keyId}/rate-limit/current
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
export function usePostApiKeysVerify(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['verify']['$post']>) =>
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
export function useGetScopes(
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /scopes
 */
export function getGetScopesQueryKey() {
  return ['/scopes'] as const
}
