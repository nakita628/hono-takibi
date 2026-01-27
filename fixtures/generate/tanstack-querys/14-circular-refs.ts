import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * Generates TanStack Query cache key for GET /trees
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTreesQueryKey() {
  return ['trees', '/trees'] as const
}

/**
 * Returns TanStack Query query options for GET /trees
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTreesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTreesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trees.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trees
 */
export function useGetTrees(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTreesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /trees
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTreesMutationKey() {
  return ['POST', '/trees'] as const
}

/**
 * Returns TanStack Query mutation options for POST /trees
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTreesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTreesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
    parseResponse(client.trees.$post(args, clientOptions)),
})

/**
 * POST /trees
 */
export function usePostTrees(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$post>>>>>,
    Error,
    InferRequestType<typeof client.trees.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
      parseResponse(client.trees.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /graphs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGraphsQueryKey() {
  return ['graphs', '/graphs'] as const
}

/**
 * Returns TanStack Query query options for GET /graphs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGraphsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGraphsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.graphs.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /graphs
 */
export function useGetGraphs(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphs.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGraphsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /linked-lists
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetLinkedListsQueryKey() {
  return ['linked-lists', '/linked-lists'] as const
}

/**
 * Returns TanStack Query query options for GET /linked-lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLinkedListsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetLinkedListsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['linked-lists'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['linked-lists']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetLinkedListsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /social-network
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSocialNetworkQueryKey() {
  return ['social-network', '/social-network'] as const
}

/**
 * Returns TanStack Query query options for GET /social-network
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialNetworkQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSocialNetworkQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['social-network'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /social-network
 */
export function useGetSocialNetwork(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['social-network']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSocialNetworkQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /file-system
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetFileSystemQueryKey() {
  return ['file-system', '/file-system'] as const
}

/**
 * Returns TanStack Query query options for GET /file-system
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFileSystemQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFileSystemQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['file-system'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /file-system
 */
export function useGetFileSystem(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['file-system']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFileSystemQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /comments
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCommentsQueryKey() {
  return ['comments', '/comments'] as const
}

/**
 * Returns TanStack Query query options for GET /comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCommentsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCommentsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.comments.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /comments
 */
export function useGetComments(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comments.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCommentsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /polymorphic
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPolymorphicQueryKey() {
  return ['polymorphic', '/polymorphic'] as const
}

/**
 * Returns TanStack Query query options for GET /polymorphic
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPolymorphicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPolymorphicQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.polymorphic.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPolymorphicQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /categories
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

/**
 * Returns TanStack Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCategoriesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.categories.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCategoriesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /workflow
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWorkflowQueryKey() {
  return ['workflow', '/workflow'] as const
}

/**
 * Returns TanStack Query query options for GET /workflow
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWorkflowQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWorkflowQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.workflow.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /workflow
 */
export function useGetWorkflow(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflow.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWorkflowQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
