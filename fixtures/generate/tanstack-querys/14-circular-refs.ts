import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTreesQueryKey(),
    queryFn: async () => parseResponse(client.trees.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /trees
 */
export function getGetTreesQueryKey() {
  return ['/trees'] as const
}

/**
 * Returns TanStack Query query options for GET /trees
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTreesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTreesQueryKey(),
    queryFn: async () => parseResponse(client.trees.$get(undefined, clientOptions)),
  }
}

/**
 * POST /trees
 */
export function usePostTrees(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.trees.$post>,
      variables: InferRequestType<typeof client.trees.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.trees.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.trees.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.trees.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.trees.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
      parseResponse(client.trees.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /graphs
 */
export function useGetGraphs(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGraphsQueryKey(),
    queryFn: async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /graphs
 */
export function getGetGraphsQueryKey() {
  return ['/graphs'] as const
}

/**
 * Returns TanStack Query query options for GET /graphs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGraphsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetGraphsQueryKey(),
    queryFn: async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
  }
}

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetLinkedListsQueryKey(),
    queryFn: async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /linked-lists
 */
export function getGetLinkedListsQueryKey() {
  return ['/linked-lists'] as const
}

/**
 * Returns TanStack Query query options for GET /linked-lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetLinkedListsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetLinkedListsQueryKey(),
    queryFn: async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /social-network
 */
export function useGetSocialNetwork(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSocialNetworkQueryKey(),
    queryFn: async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /social-network
 */
export function getGetSocialNetworkQueryKey() {
  return ['/social-network'] as const
}

/**
 * Returns TanStack Query query options for GET /social-network
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSocialNetworkQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSocialNetworkQueryKey(),
    queryFn: async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /file-system
 */
export function useGetFileSystem(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetFileSystemQueryKey(),
    queryFn: async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /file-system
 */
export function getGetFileSystemQueryKey() {
  return ['/file-system'] as const
}

/**
 * Returns TanStack Query query options for GET /file-system
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetFileSystemQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetFileSystemQueryKey(),
    queryFn: async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /comments
 */
export function useGetComments(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCommentsQueryKey(),
    queryFn: async () => parseResponse(client.comments.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /comments
 */
export function getGetCommentsQueryKey() {
  return ['/comments'] as const
}

/**
 * Returns TanStack Query query options for GET /comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCommentsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCommentsQueryKey(),
    queryFn: async () => parseResponse(client.comments.$get(undefined, clientOptions)),
  }
}

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPolymorphicQueryKey(),
    queryFn: async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /polymorphic
 */
export function getGetPolymorphicQueryKey() {
  return ['/polymorphic'] as const
}

/**
 * Returns TanStack Query query options for GET /polymorphic
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPolymorphicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPolymorphicQueryKey(),
    queryFn: async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
  }
}

/**
 * GET /categories
 */
export function useGetCategories(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCategoriesQueryKey(),
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * Returns TanStack Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCategoriesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCategoriesQueryKey(),
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
  }
}

/**
 * GET /workflow
 */
export function useGetWorkflow(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWorkflowQueryKey(),
    queryFn: async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /workflow
 */
export function getGetWorkflowQueryKey() {
  return ['/workflow'] as const
}

/**
 * Returns TanStack Query query options for GET /workflow
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWorkflowQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetWorkflowQueryKey(),
    queryFn: async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
  }
}
