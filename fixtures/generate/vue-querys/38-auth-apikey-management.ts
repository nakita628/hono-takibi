import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/38-auth-apikey-management'

/**
 * Generates Vue Query cache key for GET /api-keys
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiKeysQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['api-keys']['$get']>>,
) {
  return ['api-keys', 'GET', '/api-keys', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /api-keys
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
export function useGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['$get']>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetApiKeysQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /api-keys
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiKeysMutationKey() {
  return ['api-keys', 'POST', '/api-keys'] as const
}

/**
 * Returns Vue Query mutation options for POST /api-keys
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApiKeysMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostApiKeysMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['$post']>) =>
    parseResponse(client['api-keys'].$post(args, clientOptions)),
})

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['api-keys']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostApiKeysMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiKeysKeyIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>>,
) {
  return ['api-keys', 'GET', '/api-keys/:keyId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /api-keys/{keyId}
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
export function useGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /api-keys/{keyId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteApiKeysKeyIdMutationKey() {
  return ['api-keys', 'DELETE', '/api-keys/:keyId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /api-keys/{keyId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteApiKeysKeyIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteApiKeysKeyIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>) =>
    parseResponse(client['api-keys'][':keyId'].$delete(args, clientOptions)),
})

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function useDeleteApiKeysKeyId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteApiKeysKeyIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /api-keys/{keyId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApiKeysKeyIdMutationKey() {
  return ['api-keys', 'PATCH', '/api-keys/:keyId'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /api-keys/{keyId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApiKeysKeyIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchApiKeysKeyIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>) =>
    parseResponse(client['api-keys'][':keyId'].$patch(args, clientOptions)),
})

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApiKeysKeyIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /api-keys/{keyId}/revoke
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiKeysKeyIdRevokeMutationKey() {
  return ['api-keys', 'POST', '/api-keys/:keyId/revoke'] as const
}

/**
 * Returns Vue Query mutation options for POST /api-keys/{keyId}/revoke
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApiKeysKeyIdRevokeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostApiKeysKeyIdRevokeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
  ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(args, clientOptions)),
})

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function usePostApiKeysKeyIdRevoke(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApiKeysKeyIdRevokeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /api-keys/{keyId}/rotate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiKeysKeyIdRotateMutationKey() {
  return ['api-keys', 'POST', '/api-keys/:keyId/rotate'] as const
}

/**
 * Returns Vue Query mutation options for POST /api-keys/{keyId}/rotate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApiKeysKeyIdRotateMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostApiKeysKeyIdRotateMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
  ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(args, clientOptions)),
})

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApiKeysKeyIdRotateMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}/usage
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiKeysKeyIdUsageQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>>,
) {
  return ['api-keys', 'GET', '/api-keys/:keyId/usage', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /api-keys/{keyId}/usage
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
export function useGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['usage']['$get']>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdUsageQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}/rate-limit/current
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiKeysKeyIdRateLimitCurrentQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>
  >,
) {
  return ['api-keys', 'GET', '/api-keys/:keyId/rate-limit/current', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /api-keys/{keyId}/rate-limit/current
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
export function useGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApiKeysKeyIdRateLimitCurrentQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /api-keys/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiKeysVerifyMutationKey() {
  return ['api-keys', 'POST', '/api-keys/verify'] as const
}

/**
 * Returns Vue Query mutation options for POST /api-keys/verify
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApiKeysVerifyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostApiKeysVerifyMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['verify']['$post']>) =>
    parseResponse(client['api-keys'].verify.$post(args, clientOptions)),
})

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function usePostApiKeysVerify(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['api-keys']['verify']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['api-keys']['verify']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApiKeysVerifyMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /scopes
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetScopesQueryKey() {
  return ['scopes', 'GET', '/scopes'] as const
}

/**
 * Returns Vue Query query options for GET /scopes
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
export function useGetScopes(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.scopes.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetScopesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
