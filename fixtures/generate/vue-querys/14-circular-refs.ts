import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * Generates Vue Query cache key for GET /trees
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTreesQueryKey() {
  return ['trees', 'GET', '/trees'] as const
}

/**
 * Returns Vue Query query options for GET /trees
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTreesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /trees
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTreesMutationKey() {
  return ['trees', 'POST', '/trees'] as const
}

/**
 * Returns Vue Query mutation options for POST /trees
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$post>>>>>,
        Error,
        InferRequestType<typeof client.trees.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTreesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /graphs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGraphsQueryKey() {
  return ['graphs', 'GET', '/graphs'] as const
}

/**
 * Returns Vue Query query options for GET /graphs
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphs.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGraphsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /linked-lists
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetLinkedListsQueryKey() {
  return ['linked-lists', 'GET', '/linked-lists'] as const
}

/**
 * Returns Vue Query query options for GET /linked-lists
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['linked-lists']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetLinkedListsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /social-network
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSocialNetworkQueryKey() {
  return ['social-network', 'GET', '/social-network'] as const
}

/**
 * Returns Vue Query query options for GET /social-network
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['social-network']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSocialNetworkQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /file-system
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetFileSystemQueryKey() {
  return ['file-system', 'GET', '/file-system'] as const
}

/**
 * Returns Vue Query query options for GET /file-system
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['file-system']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFileSystemQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /comments
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCommentsQueryKey() {
  return ['comments', 'GET', '/comments'] as const
}

/**
 * Returns Vue Query query options for GET /comments
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comments.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCommentsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /polymorphic
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPolymorphicQueryKey() {
  return ['polymorphic', 'GET', '/polymorphic'] as const
}

/**
 * Returns Vue Query query options for GET /polymorphic
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPolymorphicQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /categories
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCategoriesQueryKey() {
  return ['categories', 'GET', '/categories'] as const
}

/**
 * Returns Vue Query query options for GET /categories
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCategoriesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /workflow
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWorkflowQueryKey() {
  return ['workflow', 'GET', '/workflow'] as const
}

/**
 * Returns Vue Query query options for GET /workflow
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflow.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWorkflowQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
