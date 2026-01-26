import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
          init: { ...clientOptions?.init, signal },
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
export const getGetTreesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTreesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.trees.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
          init: { ...clientOptions?.init, signal },
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
export const getGetGraphsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetGraphsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.graphs.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
          init: { ...clientOptions?.init, signal },
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
export const getGetLinkedListsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetLinkedListsQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetSocialNetworkQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSocialNetworkQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetFileSystemQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetFileSystemQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetCommentsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCommentsQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetPolymorphicQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPolymorphicQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCategoriesQueryKey(),
    queryFn: ({ signal }) =>
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
          init: { ...clientOptions?.init, signal },
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
export const getGetWorkflowQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWorkflowQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.workflow.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
