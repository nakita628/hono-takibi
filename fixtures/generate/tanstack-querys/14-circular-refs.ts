import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.trees.$get>,
      Error,
      InferResponseType<typeof client.trees.$get>,
      readonly ['/trees']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTreesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.trees.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /trees
 */
export function getGetTreesQueryKey() {
  return ['/trees'] as const
}

/**
 * POST /trees
 */
export function usePostTrees(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.trees.$post> | undefined,
      Error,
      InferRequestType<typeof client.trees.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.trees.$post> | undefined,
    Error,
    InferRequestType<typeof client.trees.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.trees.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /graphs
 */
export function useGetGraphs(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.graphs.$get>,
      Error,
      InferResponseType<typeof client.graphs.$get>,
      readonly ['/graphs']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGraphsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /graphs
 */
export function getGetGraphsQueryKey() {
  return ['/graphs'] as const
}

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['linked-lists']['$get']>,
      Error,
      InferResponseType<(typeof client)['linked-lists']['$get']>,
      readonly ['/linked-lists']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLinkedListsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /linked-lists
 */
export function getGetLinkedListsQueryKey() {
  return ['/linked-lists'] as const
}

/**
 * GET /social-network
 */
export function useGetSocialNetwork(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['social-network']['$get']>,
      Error,
      InferResponseType<(typeof client)['social-network']['$get']>,
      readonly ['/social-network']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSocialNetworkQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /social-network
 */
export function getGetSocialNetworkQueryKey() {
  return ['/social-network'] as const
}

/**
 * GET /file-system
 */
export function useGetFileSystem(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['file-system']['$get']>,
      Error,
      InferResponseType<(typeof client)['file-system']['$get']>,
      readonly ['/file-system']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFileSystemQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /file-system
 */
export function getGetFileSystemQueryKey() {
  return ['/file-system'] as const
}

/**
 * GET /comments
 */
export function useGetComments(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.comments.$get>,
      Error,
      InferResponseType<typeof client.comments.$get>,
      readonly ['/comments']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCommentsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.comments.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /comments
 */
export function getGetCommentsQueryKey() {
  return ['/comments'] as const
}

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.polymorphic.$get>,
      Error,
      InferResponseType<typeof client.polymorphic.$get>,
      readonly ['/polymorphic']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPolymorphicQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /polymorphic
 */
export function getGetPolymorphicQueryKey() {
  return ['/polymorphic'] as const
}

/**
 * GET /categories
 */
export function useGetCategories(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.categories.$get>,
      Error,
      InferResponseType<typeof client.categories.$get>,
      readonly ['/categories']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * GET /workflow
 */
export function useGetWorkflow(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.workflow.$get>,
      Error,
      InferResponseType<typeof client.workflow.$get>,
      readonly ['/workflow']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWorkflowQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /workflow
 */
export function getGetWorkflowQueryKey() {
  return ['/workflow'] as const
}
