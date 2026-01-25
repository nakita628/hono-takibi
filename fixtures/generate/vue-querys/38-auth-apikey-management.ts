import { useQuery, useMutation } from '@tanstack/vue-query'
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
      select?: (
        data: InferResponseType<(typeof client)['api-keys']['$get']>,
      ) => InferResponseType<(typeof client)['api-keys']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApiKeysQueryKey(args),
    queryFn: async () => parseResponse(client['api-keys'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api-keys
 */
export function getGetApiKeysQueryKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['/api-keys', args] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys']['$post']>,
      variables: InferRequestType<(typeof client)['api-keys']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['api-keys']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['$post']>) =>
      parseResponse(client['api-keys'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function useGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
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
      select?: (
        data: InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>,
      ) => InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApiKeysKeyIdQueryKey(args),
    queryFn: async () => parseResponse(client['api-keys'][':keyId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}
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
export function useDeleteApiKeysKeyId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>) =>
      parseResponse(client['api-keys'][':keyId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']>,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>) =>
      parseResponse(client['api-keys'][':keyId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function usePostApiKeysKeyIdRevoke(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function useGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
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
      select?: (
        data: InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
      ) => InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApiKeysKeyIdUsageQueryKey(args),
    queryFn: async () =>
      parseResponse(client['api-keys'][':keyId'].usage.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}/usage
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
      select?: (
        data: InferResponseType<
          (typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']
        >,
      ) => InferResponseType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApiKeysKeyIdRateLimitCurrentQueryKey(args),
    queryFn: async () =>
      parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api-keys/{keyId}/rate-limit/current
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
export function usePostApiKeysVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['api-keys']['verify']['$post']>,
      variables: InferRequestType<(typeof client)['api-keys']['verify']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['api-keys']['verify']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['api-keys']['verify']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['api-keys']['verify']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['api-keys']['verify']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['api-keys']['verify']['$post']>) =>
      parseResponse(client['api-keys'].verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function useGetScopes(options?: {
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
    select?: (
      data: InferResponseType<typeof client.scopes.$get>,
    ) => InferResponseType<typeof client.scopes.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetScopesQueryKey(),
    queryFn: async () => parseResponse(client.scopes.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /scopes
 */
export function getGetScopesQueryKey() {
  return ['/scopes'] as const
}
