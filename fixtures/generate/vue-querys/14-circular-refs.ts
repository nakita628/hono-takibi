import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

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
  return useQuery({ ...getGetTreesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /trees
 * Uses $url() for type-safe key generation
 */
export function getGetTreesQueryKey() {
  return [client.trees.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /trees
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTreesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTreesQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.trees.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
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
      'mutationFn'
    >
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
  return useQuery({ ...getGetGraphsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /graphs
 * Uses $url() for type-safe key generation
 */
export function getGetGraphsQueryKey() {
  return [client.graphs.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /graphs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGraphsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGraphsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.graphs.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
  return useQuery({ ...getGetLinkedListsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /linked-lists
 * Uses $url() for type-safe key generation
 */
export function getGetLinkedListsQueryKey() {
  return [client['linked-lists'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /linked-lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLinkedListsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetLinkedListsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['linked-lists'].$get(undefined, {
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
  return useQuery({ ...getGetSocialNetworkQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /social-network
 * Uses $url() for type-safe key generation
 */
export function getGetSocialNetworkQueryKey() {
  return [client['social-network'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /social-network
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialNetworkQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSocialNetworkQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['social-network'].$get(undefined, {
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
  return useQuery({ ...getGetFileSystemQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /file-system
 * Uses $url() for type-safe key generation
 */
export function getGetFileSystemQueryKey() {
  return [client['file-system'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /file-system
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFileSystemQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFileSystemQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['file-system'].$get(undefined, {
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
  return useQuery({ ...getGetCommentsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /comments
 * Uses $url() for type-safe key generation
 */
export function getGetCommentsQueryKey() {
  return [client.comments.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCommentsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCommentsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.comments.$get(undefined, {
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
  return useQuery({ ...getGetPolymorphicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /polymorphic
 * Uses $url() for type-safe key generation
 */
export function getGetPolymorphicQueryKey() {
  return [client.polymorphic.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /polymorphic
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPolymorphicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPolymorphicQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.polymorphic.$get(undefined, {
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
  return useQuery({ ...getGetCategoriesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /categories
 * Uses $url() for type-safe key generation
 */
export function getGetCategoriesQueryKey() {
  return [client.categories.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCategoriesQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.categories.$get(undefined, {
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
  return useQuery({ ...getGetWorkflowQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /workflow
 * Uses $url() for type-safe key generation
 */
export function getGetWorkflowQueryKey() {
  return [client.workflow.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /workflow
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWorkflowQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWorkflowQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.workflow.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
