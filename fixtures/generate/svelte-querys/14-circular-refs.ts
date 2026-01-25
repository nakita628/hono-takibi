import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function createGetTrees(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.trees.$get>
      | (() => InferResponseType<typeof client.trees.$get>)
    initialData?:
      | InferResponseType<typeof client.trees.$get>
      | (() => InferResponseType<typeof client.trees.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTreesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.trees.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /trees
 */
export function getGetTreesQueryKey() {
  return ['/trees'] as const
}

/**
 * Returns Svelte Query query options for GET /trees
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
export function createPostTrees(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
      parseResponse(client.trees.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /graphs
 */
export function createGetGraphs(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.graphs.$get>
      | (() => InferResponseType<typeof client.graphs.$get>)
    initialData?:
      | InferResponseType<typeof client.graphs.$get>
      | (() => InferResponseType<typeof client.graphs.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGraphsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.graphs.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /graphs
 */
export function getGetGraphsQueryKey() {
  return ['/graphs'] as const
}

/**
 * Returns Svelte Query query options for GET /graphs
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
export function createGetLinkedLists(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['linked-lists']['$get']>
      | (() => InferResponseType<(typeof client)['linked-lists']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['linked-lists']['$get']>
      | (() => InferResponseType<(typeof client)['linked-lists']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetLinkedListsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['linked-lists'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /linked-lists
 */
export function getGetLinkedListsQueryKey() {
  return ['/linked-lists'] as const
}

/**
 * Returns Svelte Query query options for GET /linked-lists
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
export function createGetSocialNetwork(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['social-network']['$get']>
      | (() => InferResponseType<(typeof client)['social-network']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['social-network']['$get']>
      | (() => InferResponseType<(typeof client)['social-network']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSocialNetworkQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['social-network'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /social-network
 */
export function getGetSocialNetworkQueryKey() {
  return ['/social-network'] as const
}

/**
 * Returns Svelte Query query options for GET /social-network
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
export function createGetFileSystem(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['file-system']['$get']>
      | (() => InferResponseType<(typeof client)['file-system']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['file-system']['$get']>
      | (() => InferResponseType<(typeof client)['file-system']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFileSystemQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['file-system'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /file-system
 */
export function getGetFileSystemQueryKey() {
  return ['/file-system'] as const
}

/**
 * Returns Svelte Query query options for GET /file-system
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
export function createGetComments(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.comments.$get>
      | (() => InferResponseType<typeof client.comments.$get>)
    initialData?:
      | InferResponseType<typeof client.comments.$get>
      | (() => InferResponseType<typeof client.comments.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCommentsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.comments.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /comments
 */
export function getGetCommentsQueryKey() {
  return ['/comments'] as const
}

/**
 * Returns Svelte Query query options for GET /comments
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
export function createGetPolymorphic(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.polymorphic.$get>
      | (() => InferResponseType<typeof client.polymorphic.$get>)
    initialData?:
      | InferResponseType<typeof client.polymorphic.$get>
      | (() => InferResponseType<typeof client.polymorphic.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPolymorphicQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.polymorphic.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /polymorphic
 */
export function getGetPolymorphicQueryKey() {
  return ['/polymorphic'] as const
}

/**
 * Returns Svelte Query query options for GET /polymorphic
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
export function createGetCategories(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.categories.$get>
      | (() => InferResponseType<typeof client.categories.$get>)
    initialData?:
      | InferResponseType<typeof client.categories.$get>
      | (() => InferResponseType<typeof client.categories.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCategoriesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.categories.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * Returns Svelte Query query options for GET /categories
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
export function createGetWorkflow(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.workflow.$get>
      | (() => InferResponseType<typeof client.workflow.$get>)
    initialData?:
      | InferResponseType<typeof client.workflow.$get>
      | (() => InferResponseType<typeof client.workflow.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWorkflowQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.workflow.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /workflow
 */
export function getGetWorkflowQueryKey() {
  return ['/workflow'] as const
}

/**
 * Returns Svelte Query query options for GET /workflow
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWorkflowQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetWorkflowQueryKey(),
    queryFn: async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
  }
}
