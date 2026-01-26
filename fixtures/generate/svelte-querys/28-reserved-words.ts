import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function createGetClass(options?: {
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
      | InferResponseType<typeof client.class.$get>
      | (() => InferResponseType<typeof client.class.$get>)
    initialData?:
      | InferResponseType<typeof client.class.$get>
      | (() => InferResponseType<typeof client.class.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetClassQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.class.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /class
 */
export function getGetClassQueryKey() {
  return ['/class'] as const
}

/**
 * Returns Svelte Query query options for GET /class
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetClassQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetClassQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.class.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /interface
 */
export function createGetInterface(options?: {
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
      | InferResponseType<typeof client.interface.$get>
      | (() => InferResponseType<typeof client.interface.$get>)
    initialData?:
      | InferResponseType<typeof client.interface.$get>
      | (() => InferResponseType<typeof client.interface.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetInterfaceQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.interface.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /interface
 */
export function getGetInterfaceQueryKey() {
  return ['/interface'] as const
}

/**
 * Returns Svelte Query query options for GET /interface
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInterfaceQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetInterfaceQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.interface.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /type
 */
export function createGetType(options?: {
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
      | InferResponseType<typeof client.type.$get>
      | (() => InferResponseType<typeof client.type.$get>)
    initialData?:
      | InferResponseType<typeof client.type.$get>
      | (() => InferResponseType<typeof client.type.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTypeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.type.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /type
 */
export function getGetTypeQueryKey() {
  return ['/type'] as const
}

/**
 * Returns Svelte Query query options for GET /type
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTypeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTypeQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.type.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /function
 */
export function createPostFunction(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.function.$post>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.function.$post> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client.function.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /return
 */
export function createGetReturn(options?: {
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
      | InferResponseType<typeof client.return.$get>
      | (() => InferResponseType<typeof client.return.$get>)
    initialData?:
      | InferResponseType<typeof client.return.$get>
      | (() => InferResponseType<typeof client.return.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetReturnQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.return.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /return
 */
export function getGetReturnQueryKey() {
  return ['/return'] as const
}

/**
 * Returns Svelte Query query options for GET /return
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReturnQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetReturnQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.return.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /import
 */
export function createGetImport(options?: {
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
      | InferResponseType<typeof client.import.$get>
      | (() => InferResponseType<typeof client.import.$get>)
    initialData?:
      | InferResponseType<typeof client.import.$get>
      | (() => InferResponseType<typeof client.import.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetImportQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.import.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /import
 */
export function getGetImportQueryKey() {
  return ['/import'] as const
}

/**
 * Returns Svelte Query query options for GET /import
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImportQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetImportQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.import.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /export
 */
export function createGetExport(options?: {
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
      | InferResponseType<typeof client.export.$get>
      | (() => InferResponseType<typeof client.export.$get>)
    initialData?:
      | InferResponseType<typeof client.export.$get>
      | (() => InferResponseType<typeof client.export.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetExportQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.export.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /export
 */
export function getGetExportQueryKey() {
  return ['/export'] as const
}

/**
 * Returns Svelte Query query options for GET /export
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExportQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetExportQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.export.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /default
 */
export function createGetDefault(options?: {
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
      | InferResponseType<typeof client.default.$get>
      | (() => InferResponseType<typeof client.default.$get>)
    initialData?:
      | InferResponseType<typeof client.default.$get>
      | (() => InferResponseType<typeof client.default.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetDefaultQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.default.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /default
 */
export function getGetDefaultQueryKey() {
  return ['/default'] as const
}

/**
 * Returns Svelte Query query options for GET /default
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDefaultQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDefaultQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.default.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /new
 */
export function createPostNew(options?: {
  mutation?: {
    onSuccess?: (data: InferResponseType<typeof client.new.$post>, variables: undefined) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.new.$post> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client.new.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /delete
 */
export function createDeleteDelete(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.delete.$delete>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.delete.$delete> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client.delete.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /void
 */
export function createGetVoid(options?: {
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
      | InferResponseType<typeof client.void.$get>
      | (() => InferResponseType<typeof client.void.$get>)
    initialData?:
      | InferResponseType<typeof client.void.$get>
      | (() => InferResponseType<typeof client.void.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetVoidQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.void.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /void
 */
export function getGetVoidQueryKey() {
  return ['/void'] as const
}

/**
 * Returns Svelte Query query options for GET /void
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoidQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetVoidQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.void.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /null
 */
export function createGetNull(options?: {
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
      | InferResponseType<typeof client.null.$get>
      | (() => InferResponseType<typeof client.null.$get>)
    initialData?:
      | InferResponseType<typeof client.null.$get>
      | (() => InferResponseType<typeof client.null.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNullQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.null.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /null
 */
export function getGetNullQueryKey() {
  return ['/null'] as const
}

/**
 * Returns Svelte Query query options for GET /null
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNullQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.null.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /true
 */
export function createGetTrue(options?: {
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
      | InferResponseType<typeof client.true.$get>
      | (() => InferResponseType<typeof client.true.$get>)
    initialData?:
      | InferResponseType<typeof client.true.$get>
      | (() => InferResponseType<typeof client.true.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTrueQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.true.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /true
 */
export function getGetTrueQueryKey() {
  return ['/true'] as const
}

/**
 * Returns Svelte Query query options for GET /true
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrueQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTrueQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.true.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /false
 */
export function createGetFalse(options?: {
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
      | InferResponseType<typeof client.false.$get>
      | (() => InferResponseType<typeof client.false.$get>)
    initialData?:
      | InferResponseType<typeof client.false.$get>
      | (() => InferResponseType<typeof client.false.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFalseQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.false.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /false
 */
export function getGetFalseQueryKey() {
  return ['/false'] as const
}

/**
 * Returns Svelte Query query options for GET /false
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFalseQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetFalseQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.false.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /if
 */
export function createGetIf(options?: {
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
      | InferResponseType<typeof client.if.$get>
      | (() => InferResponseType<typeof client.if.$get>)
    initialData?:
      | InferResponseType<typeof client.if.$get>
      | (() => InferResponseType<typeof client.if.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetIfQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.if.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /if
 */
export function getGetIfQueryKey() {
  return ['/if'] as const
}

/**
 * Returns Svelte Query query options for GET /if
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetIfQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetIfQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.if.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /else
 */
export function createGetElse(options?: {
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
      | InferResponseType<typeof client.else.$get>
      | (() => InferResponseType<typeof client.else.$get>)
    initialData?:
      | InferResponseType<typeof client.else.$get>
      | (() => InferResponseType<typeof client.else.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetElseQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.else.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /else
 */
export function getGetElseQueryKey() {
  return ['/else'] as const
}

/**
 * Returns Svelte Query query options for GET /else
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetElseQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetElseQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.else.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /for
 */
export function createGetFor(options?: {
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
      | InferResponseType<typeof client.for.$get>
      | (() => InferResponseType<typeof client.for.$get>)
    initialData?:
      | InferResponseType<typeof client.for.$get>
      | (() => InferResponseType<typeof client.for.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetForQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.for.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /for
 */
export function getGetForQueryKey() {
  return ['/for'] as const
}

/**
 * Returns Svelte Query query options for GET /for
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetForQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetForQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.for.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /while
 */
export function createGetWhile(options?: {
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
      | InferResponseType<typeof client.while.$get>
      | (() => InferResponseType<typeof client.while.$get>)
    initialData?:
      | InferResponseType<typeof client.while.$get>
      | (() => InferResponseType<typeof client.while.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWhileQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.while.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /while
 */
export function getGetWhileQueryKey() {
  return ['/while'] as const
}

/**
 * Returns Svelte Query query options for GET /while
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWhileQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWhileQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.while.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /switch
 */
export function createGetSwitch(options?: {
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
      | InferResponseType<typeof client.switch.$get>
      | (() => InferResponseType<typeof client.switch.$get>)
    initialData?:
      | InferResponseType<typeof client.switch.$get>
      | (() => InferResponseType<typeof client.switch.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSwitchQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.switch.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /switch
 */
export function getGetSwitchQueryKey() {
  return ['/switch'] as const
}

/**
 * Returns Svelte Query query options for GET /switch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSwitchQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSwitchQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.switch.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /case
 */
export function createGetCase(options?: {
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
      | InferResponseType<typeof client.case.$get>
      | (() => InferResponseType<typeof client.case.$get>)
    initialData?:
      | InferResponseType<typeof client.case.$get>
      | (() => InferResponseType<typeof client.case.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCaseQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.case.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /case
 */
export function getGetCaseQueryKey() {
  return ['/case'] as const
}

/**
 * Returns Svelte Query query options for GET /case
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCaseQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCaseQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.case.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /break
 */
export function createGetBreak(options?: {
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
      | InferResponseType<typeof client.break.$get>
      | (() => InferResponseType<typeof client.break.$get>)
    initialData?:
      | InferResponseType<typeof client.break.$get>
      | (() => InferResponseType<typeof client.break.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetBreakQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.break.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /break
 */
export function getGetBreakQueryKey() {
  return ['/break'] as const
}

/**
 * Returns Svelte Query query options for GET /break
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBreakQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetBreakQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.break.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /continue
 */
export function createGetContinue(options?: {
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
      | InferResponseType<typeof client.continue.$get>
      | (() => InferResponseType<typeof client.continue.$get>)
    initialData?:
      | InferResponseType<typeof client.continue.$get>
      | (() => InferResponseType<typeof client.continue.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetContinueQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.continue.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /continue
 */
export function getGetContinueQueryKey() {
  return ['/continue'] as const
}

/**
 * Returns Svelte Query query options for GET /continue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetContinueQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetContinueQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.continue.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /try
 */
export function createGetTry(options?: {
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
      | InferResponseType<typeof client.try.$get>
      | (() => InferResponseType<typeof client.try.$get>)
    initialData?:
      | InferResponseType<typeof client.try.$get>
      | (() => InferResponseType<typeof client.try.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTryQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.try.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /try
 */
export function getGetTryQueryKey() {
  return ['/try'] as const
}

/**
 * Returns Svelte Query query options for GET /try
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTryQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTryQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.try.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /catch
 */
export function createGetCatch(options?: {
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
      | InferResponseType<typeof client.catch.$get>
      | (() => InferResponseType<typeof client.catch.$get>)
    initialData?:
      | InferResponseType<typeof client.catch.$get>
      | (() => InferResponseType<typeof client.catch.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCatchQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.catch.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /catch
 */
export function getGetCatchQueryKey() {
  return ['/catch'] as const
}

/**
 * Returns Svelte Query query options for GET /catch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCatchQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCatchQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.catch.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /finally
 */
export function createGetFinally(options?: {
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
      | InferResponseType<typeof client.finally.$get>
      | (() => InferResponseType<typeof client.finally.$get>)
    initialData?:
      | InferResponseType<typeof client.finally.$get>
      | (() => InferResponseType<typeof client.finally.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFinallyQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.finally.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /finally
 */
export function getGetFinallyQueryKey() {
  return ['/finally'] as const
}

/**
 * Returns Svelte Query query options for GET /finally
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinallyQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetFinallyQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.finally.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /throw
 */
export function createGetThrow(options?: {
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
      | InferResponseType<typeof client.throw.$get>
      | (() => InferResponseType<typeof client.throw.$get>)
    initialData?:
      | InferResponseType<typeof client.throw.$get>
      | (() => InferResponseType<typeof client.throw.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetThrowQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.throw.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /throw
 */
export function getGetThrowQueryKey() {
  return ['/throw'] as const
}

/**
 * Returns Svelte Query query options for GET /throw
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThrowQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetThrowQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.throw.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /async
 */
export function createGetAsync(options?: {
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
      | InferResponseType<typeof client.async.$get>
      | (() => InferResponseType<typeof client.async.$get>)
    initialData?:
      | InferResponseType<typeof client.async.$get>
      | (() => InferResponseType<typeof client.async.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAsyncQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.async.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /async
 */
export function getGetAsyncQueryKey() {
  return ['/async'] as const
}

/**
 * Returns Svelte Query query options for GET /async
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAsyncQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAsyncQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.async.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /await
 */
export function createGetAwait(options?: {
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
      | InferResponseType<typeof client.await.$get>
      | (() => InferResponseType<typeof client.await.$get>)
    initialData?:
      | InferResponseType<typeof client.await.$get>
      | (() => InferResponseType<typeof client.await.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAwaitQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.await.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /await
 */
export function getGetAwaitQueryKey() {
  return ['/await'] as const
}

/**
 * Returns Svelte Query query options for GET /await
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAwaitQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAwaitQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.await.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /yield
 */
export function createGetYield(options?: {
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
      | InferResponseType<typeof client.yield.$get>
      | (() => InferResponseType<typeof client.yield.$get>)
    initialData?:
      | InferResponseType<typeof client.yield.$get>
      | (() => InferResponseType<typeof client.yield.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetYieldQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.yield.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /yield
 */
export function getGetYieldQueryKey() {
  return ['/yield'] as const
}

/**
 * Returns Svelte Query query options for GET /yield
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetYieldQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetYieldQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.yield.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /static
 */
export function createGetStatic(options?: {
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
      | InferResponseType<typeof client.static.$get>
      | (() => InferResponseType<typeof client.static.$get>)
    initialData?:
      | InferResponseType<typeof client.static.$get>
      | (() => InferResponseType<typeof client.static.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStaticQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.static.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /static
 */
export function getGetStaticQueryKey() {
  return ['/static'] as const
}

/**
 * Returns Svelte Query query options for GET /static
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStaticQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetStaticQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.static.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /public
 */
export function createGetPublic(options?: {
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
      | InferResponseType<typeof client.public.$get>
      | (() => InferResponseType<typeof client.public.$get>)
    initialData?:
      | InferResponseType<typeof client.public.$get>
      | (() => InferResponseType<typeof client.public.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPublicQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /private
 */
export function createGetPrivate(options?: {
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
      | InferResponseType<typeof client.private.$get>
      | (() => InferResponseType<typeof client.private.$get>)
    initialData?:
      | InferResponseType<typeof client.private.$get>
      | (() => InferResponseType<typeof client.private.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPrivateQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.private.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /private
 */
export function getGetPrivateQueryKey() {
  return ['/private'] as const
}

/**
 * Returns Svelte Query query options for GET /private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrivateQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPrivateQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.private.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /protected
 */
export function createGetProtected(options?: {
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
      | InferResponseType<typeof client.protected.$get>
      | (() => InferResponseType<typeof client.protected.$get>)
    initialData?:
      | InferResponseType<typeof client.protected.$get>
      | (() => InferResponseType<typeof client.protected.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProtectedQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.protected.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * Returns Svelte Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProtectedQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetProtectedQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.protected.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /abstract
 */
export function createGetAbstract(options?: {
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
      | InferResponseType<typeof client.abstract.$get>
      | (() => InferResponseType<typeof client.abstract.$get>)
    initialData?:
      | InferResponseType<typeof client.abstract.$get>
      | (() => InferResponseType<typeof client.abstract.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAbstractQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.abstract.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /abstract
 */
export function getGetAbstractQueryKey() {
  return ['/abstract'] as const
}

/**
 * Returns Svelte Query query options for GET /abstract
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAbstractQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAbstractQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.abstract.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /final
 */
export function createGetFinal(options?: {
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
      | InferResponseType<typeof client.final.$get>
      | (() => InferResponseType<typeof client.final.$get>)
    initialData?:
      | InferResponseType<typeof client.final.$get>
      | (() => InferResponseType<typeof client.final.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFinalQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.final.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /final
 */
export function getGetFinalQueryKey() {
  return ['/final'] as const
}

/**
 * Returns Svelte Query query options for GET /final
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinalQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetFinalQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.final.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /extends
 */
export function createGetExtends(options?: {
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
      | InferResponseType<typeof client.extends.$get>
      | (() => InferResponseType<typeof client.extends.$get>)
    initialData?:
      | InferResponseType<typeof client.extends.$get>
      | (() => InferResponseType<typeof client.extends.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetExtendsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.extends.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /extends
 */
export function getGetExtendsQueryKey() {
  return ['/extends'] as const
}

/**
 * Returns Svelte Query query options for GET /extends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtendsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetExtendsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.extends.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /implements
 */
export function createGetImplements(options?: {
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
      | InferResponseType<typeof client.implements.$get>
      | (() => InferResponseType<typeof client.implements.$get>)
    initialData?:
      | InferResponseType<typeof client.implements.$get>
      | (() => InferResponseType<typeof client.implements.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetImplementsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.implements.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /implements
 */
export function getGetImplementsQueryKey() {
  return ['/implements'] as const
}

/**
 * Returns Svelte Query query options for GET /implements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImplementsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetImplementsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.implements.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /package
 */
export function createGetPackage(options?: {
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
      | InferResponseType<typeof client.package.$get>
      | (() => InferResponseType<typeof client.package.$get>)
    initialData?:
      | InferResponseType<typeof client.package.$get>
      | (() => InferResponseType<typeof client.package.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPackageQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.package.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /package
 */
export function getGetPackageQueryKey() {
  return ['/package'] as const
}

/**
 * Returns Svelte Query query options for GET /package
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPackageQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPackageQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.package.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /enum
 */
export function createGetEnum(options?: {
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
      | InferResponseType<typeof client.enum.$get>
      | (() => InferResponseType<typeof client.enum.$get>)
    initialData?:
      | InferResponseType<typeof client.enum.$get>
      | (() => InferResponseType<typeof client.enum.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnumQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.enum.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /enum
 */
export function getGetEnumQueryKey() {
  return ['/enum'] as const
}

/**
 * Returns Svelte Query query options for GET /enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnumQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetEnumQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.enum.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /const
 */
export function createGetConst(options?: {
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
      | InferResponseType<typeof client.const.$get>
      | (() => InferResponseType<typeof client.const.$get>)
    initialData?:
      | InferResponseType<typeof client.const.$get>
      | (() => InferResponseType<typeof client.const.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetConstQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.const.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /const
 */
export function getGetConstQueryKey() {
  return ['/const'] as const
}

/**
 * Returns Svelte Query query options for GET /const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetConstQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.const.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /let
 */
export function createGetLet(options?: {
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
      | InferResponseType<typeof client.let.$get>
      | (() => InferResponseType<typeof client.let.$get>)
    initialData?:
      | InferResponseType<typeof client.let.$get>
      | (() => InferResponseType<typeof client.let.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetLetQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.let.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /let
 */
export function getGetLetQueryKey() {
  return ['/let'] as const
}

/**
 * Returns Svelte Query query options for GET /let
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLetQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetLetQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.let.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /var
 */
export function createGetVar(options?: {
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
      | InferResponseType<typeof client.var.$get>
      | (() => InferResponseType<typeof client.var.$get>)
    initialData?:
      | InferResponseType<typeof client.var.$get>
      | (() => InferResponseType<typeof client.var.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetVarQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.var.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /var
 */
export function getGetVarQueryKey() {
  return ['/var'] as const
}

/**
 * Returns Svelte Query query options for GET /var
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVarQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetVarQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.var.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /this
 */
export function createGetThis(options?: {
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
      | InferResponseType<typeof client.this.$get>
      | (() => InferResponseType<typeof client.this.$get>)
    initialData?:
      | InferResponseType<typeof client.this.$get>
      | (() => InferResponseType<typeof client.this.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetThisQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.this.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /this
 */
export function getGetThisQueryKey() {
  return ['/this'] as const
}

/**
 * Returns Svelte Query query options for GET /this
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThisQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetThisQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.this.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /super
 */
export function createGetSuper(options?: {
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
      | InferResponseType<typeof client.super.$get>
      | (() => InferResponseType<typeof client.super.$get>)
    initialData?:
      | InferResponseType<typeof client.super.$get>
      | (() => InferResponseType<typeof client.super.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSuperQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.super.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /super
 */
export function getGetSuperQueryKey() {
  return ['/super'] as const
}

/**
 * Returns Svelte Query query options for GET /super
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuperQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSuperQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.super.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /self
 */
export function createGetSelf(options?: {
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
      | InferResponseType<typeof client.self.$get>
      | (() => InferResponseType<typeof client.self.$get>)
    initialData?:
      | InferResponseType<typeof client.self.$get>
      | (() => InferResponseType<typeof client.self.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSelfQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.self.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /self
 */
export function getGetSelfQueryKey() {
  return ['/self'] as const
}

/**
 * Returns Svelte Query query options for GET /self
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSelfQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSelfQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.self.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /constructor
 */
export function createGetConstructor(options?: {
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
      | InferResponseType<typeof client.constructor.$get>
      | (() => InferResponseType<typeof client.constructor.$get>)
    initialData?:
      | InferResponseType<typeof client.constructor.$get>
      | (() => InferResponseType<typeof client.constructor.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetConstructorQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.constructor.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /constructor
 */
export function getGetConstructorQueryKey() {
  return ['/constructor'] as const
}

/**
 * Returns Svelte Query query options for GET /constructor
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstructorQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetConstructorQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.constructor.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /prototype
 */
export function createGetPrototype(options?: {
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
      | InferResponseType<typeof client.prototype.$get>
      | (() => InferResponseType<typeof client.prototype.$get>)
    initialData?:
      | InferResponseType<typeof client.prototype.$get>
      | (() => InferResponseType<typeof client.prototype.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPrototypeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.prototype.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /prototype
 */
export function getGetPrototypeQueryKey() {
  return ['/prototype'] as const
}

/**
 * Returns Svelte Query query options for GET /prototype
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrototypeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPrototypeQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.prototype.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /toString
 */
export function createGetToString(options?: {
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
      | InferResponseType<typeof client.toString.$get>
      | (() => InferResponseType<typeof client.toString.$get>)
    initialData?:
      | InferResponseType<typeof client.toString.$get>
      | (() => InferResponseType<typeof client.toString.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetToStringQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.toString.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /toString
 */
export function getGetToStringQueryKey() {
  return ['/toString'] as const
}

/**
 * Returns Svelte Query query options for GET /toString
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetToStringQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetToStringQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.toString.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /valueOf
 */
export function createGetValueOf(options?: {
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
      | InferResponseType<typeof client.valueOf.$get>
      | (() => InferResponseType<typeof client.valueOf.$get>)
    initialData?:
      | InferResponseType<typeof client.valueOf.$get>
      | (() => InferResponseType<typeof client.valueOf.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetValueOfQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.valueOf.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /valueOf
 */
export function getGetValueOfQueryKey() {
  return ['/valueOf'] as const
}

/**
 * Returns Svelte Query query options for GET /valueOf
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetValueOfQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetValueOfQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.valueOf.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /hasOwnProperty
 */
export function createGetHasOwnProperty(options?: {
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
      | InferResponseType<typeof client.hasOwnProperty.$get>
      | (() => InferResponseType<typeof client.hasOwnProperty.$get>)
    initialData?:
      | InferResponseType<typeof client.hasOwnProperty.$get>
      | (() => InferResponseType<typeof client.hasOwnProperty.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetHasOwnPropertyQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.hasOwnProperty.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /hasOwnProperty
 */
export function getGetHasOwnPropertyQueryKey() {
  return ['/hasOwnProperty'] as const
}

/**
 * Returns Svelte Query query options for GET /hasOwnProperty
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHasOwnPropertyQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetHasOwnPropertyQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.hasOwnProperty.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /name-collisions
 */
export function createGetNameCollisions(options?: {
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
      | InferResponseType<(typeof client)['name-collisions']['$get']>
      | (() => InferResponseType<(typeof client)['name-collisions']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['name-collisions']['$get']>
      | (() => InferResponseType<(typeof client)['name-collisions']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNameCollisionsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['name-collisions'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /name-collisions
 */
export function getGetNameCollisionsQueryKey() {
  return ['/name-collisions'] as const
}

/**
 * Returns Svelte Query query options for GET /name-collisions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNameCollisionsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNameCollisionsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['name-collisions'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
