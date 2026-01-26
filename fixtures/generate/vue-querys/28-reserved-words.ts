import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(options?: {
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
  return useQuery({ ...getGetClassQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /class
 */
export function getGetClassQueryKey() {
  return ['/class'] as const
}

/**
 * Returns Vue Query query options for GET /class
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
export function useGetInterface(options?: {
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
  return useQuery({ ...getGetInterfaceQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /interface
 */
export function getGetInterfaceQueryKey() {
  return ['/interface'] as const
}

/**
 * Returns Vue Query query options for GET /interface
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
export function useGetType(options?: {
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
  return useQuery({ ...getGetTypeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /type
 */
export function getGetTypeQueryKey() {
  return ['/type'] as const
}

/**
 * Returns Vue Query query options for GET /type
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
export function usePostFunction(options?: {
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
  return useMutation({
    mutationFn: async () => parseResponse(client.function.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /return
 */
export function useGetReturn(options?: {
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
  return useQuery({ ...getGetReturnQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /return
 */
export function getGetReturnQueryKey() {
  return ['/return'] as const
}

/**
 * Returns Vue Query query options for GET /return
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
export function useGetImport(options?: {
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
  return useQuery({ ...getGetImportQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /import
 */
export function getGetImportQueryKey() {
  return ['/import'] as const
}

/**
 * Returns Vue Query query options for GET /import
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
export function useGetExport(options?: {
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
  return useQuery({ ...getGetExportQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /export
 */
export function getGetExportQueryKey() {
  return ['/export'] as const
}

/**
 * Returns Vue Query query options for GET /export
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
export function useGetDefault(options?: {
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
  return useQuery({ ...getGetDefaultQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /default
 */
export function getGetDefaultQueryKey() {
  return ['/default'] as const
}

/**
 * Returns Vue Query query options for GET /default
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
export function usePostNew(options?: {
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
  return useMutation({
    mutationFn: async () => parseResponse(client.new.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /delete
 */
export function useDeleteDelete(options?: {
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
  return useMutation({
    mutationFn: async () => parseResponse(client.delete.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /void
 */
export function useGetVoid(options?: {
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
  return useQuery({ ...getGetVoidQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /void
 */
export function getGetVoidQueryKey() {
  return ['/void'] as const
}

/**
 * Returns Vue Query query options for GET /void
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
export function useGetNull(options?: {
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
  return useQuery({ ...getGetNullQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /null
 */
export function getGetNullQueryKey() {
  return ['/null'] as const
}

/**
 * Returns Vue Query query options for GET /null
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
export function useGetTrue(options?: {
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
  return useQuery({ ...getGetTrueQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /true
 */
export function getGetTrueQueryKey() {
  return ['/true'] as const
}

/**
 * Returns Vue Query query options for GET /true
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
export function useGetFalse(options?: {
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
  return useQuery({ ...getGetFalseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /false
 */
export function getGetFalseQueryKey() {
  return ['/false'] as const
}

/**
 * Returns Vue Query query options for GET /false
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
export function useGetIf(options?: {
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
  return useQuery({ ...getGetIfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /if
 */
export function getGetIfQueryKey() {
  return ['/if'] as const
}

/**
 * Returns Vue Query query options for GET /if
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
export function useGetElse(options?: {
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
  return useQuery({ ...getGetElseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /else
 */
export function getGetElseQueryKey() {
  return ['/else'] as const
}

/**
 * Returns Vue Query query options for GET /else
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
export function useGetFor(options?: {
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
  return useQuery({ ...getGetForQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /for
 */
export function getGetForQueryKey() {
  return ['/for'] as const
}

/**
 * Returns Vue Query query options for GET /for
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
export function useGetWhile(options?: {
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
  return useQuery({ ...getGetWhileQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /while
 */
export function getGetWhileQueryKey() {
  return ['/while'] as const
}

/**
 * Returns Vue Query query options for GET /while
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
export function useGetSwitch(options?: {
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
  return useQuery({ ...getGetSwitchQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /switch
 */
export function getGetSwitchQueryKey() {
  return ['/switch'] as const
}

/**
 * Returns Vue Query query options for GET /switch
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
export function useGetCase(options?: {
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
  return useQuery({ ...getGetCaseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /case
 */
export function getGetCaseQueryKey() {
  return ['/case'] as const
}

/**
 * Returns Vue Query query options for GET /case
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
export function useGetBreak(options?: {
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
  return useQuery({ ...getGetBreakQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /break
 */
export function getGetBreakQueryKey() {
  return ['/break'] as const
}

/**
 * Returns Vue Query query options for GET /break
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
export function useGetContinue(options?: {
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
  return useQuery({ ...getGetContinueQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /continue
 */
export function getGetContinueQueryKey() {
  return ['/continue'] as const
}

/**
 * Returns Vue Query query options for GET /continue
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
export function useGetTry(options?: {
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
  return useQuery({ ...getGetTryQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /try
 */
export function getGetTryQueryKey() {
  return ['/try'] as const
}

/**
 * Returns Vue Query query options for GET /try
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
export function useGetCatch(options?: {
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
  return useQuery({ ...getGetCatchQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /catch
 */
export function getGetCatchQueryKey() {
  return ['/catch'] as const
}

/**
 * Returns Vue Query query options for GET /catch
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
export function useGetFinally(options?: {
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
  return useQuery({ ...getGetFinallyQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /finally
 */
export function getGetFinallyQueryKey() {
  return ['/finally'] as const
}

/**
 * Returns Vue Query query options for GET /finally
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
export function useGetThrow(options?: {
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
  return useQuery({ ...getGetThrowQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /throw
 */
export function getGetThrowQueryKey() {
  return ['/throw'] as const
}

/**
 * Returns Vue Query query options for GET /throw
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
export function useGetAsync(options?: {
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
  return useQuery({ ...getGetAsyncQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /async
 */
export function getGetAsyncQueryKey() {
  return ['/async'] as const
}

/**
 * Returns Vue Query query options for GET /async
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
export function useGetAwait(options?: {
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
  return useQuery({ ...getGetAwaitQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /await
 */
export function getGetAwaitQueryKey() {
  return ['/await'] as const
}

/**
 * Returns Vue Query query options for GET /await
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
export function useGetYield(options?: {
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
  return useQuery({ ...getGetYieldQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /yield
 */
export function getGetYieldQueryKey() {
  return ['/yield'] as const
}

/**
 * Returns Vue Query query options for GET /yield
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
export function useGetStatic(options?: {
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
  return useQuery({ ...getGetStaticQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /static
 */
export function getGetStaticQueryKey() {
  return ['/static'] as const
}

/**
 * Returns Vue Query query options for GET /static
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
export function useGetPublic(options?: {
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
  return useQuery({ ...getGetPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * Returns Vue Query query options for GET /public
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
export function useGetPrivate(options?: {
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
  return useQuery({ ...getGetPrivateQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /private
 */
export function getGetPrivateQueryKey() {
  return ['/private'] as const
}

/**
 * Returns Vue Query query options for GET /private
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
export function useGetProtected(options?: {
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
  return useQuery({ ...getGetProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * Returns Vue Query query options for GET /protected
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
export function useGetAbstract(options?: {
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
  return useQuery({ ...getGetAbstractQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /abstract
 */
export function getGetAbstractQueryKey() {
  return ['/abstract'] as const
}

/**
 * Returns Vue Query query options for GET /abstract
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
export function useGetFinal(options?: {
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
  return useQuery({ ...getGetFinalQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /final
 */
export function getGetFinalQueryKey() {
  return ['/final'] as const
}

/**
 * Returns Vue Query query options for GET /final
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
export function useGetExtends(options?: {
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
  return useQuery({ ...getGetExtendsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /extends
 */
export function getGetExtendsQueryKey() {
  return ['/extends'] as const
}

/**
 * Returns Vue Query query options for GET /extends
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
export function useGetImplements(options?: {
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
  return useQuery({ ...getGetImplementsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /implements
 */
export function getGetImplementsQueryKey() {
  return ['/implements'] as const
}

/**
 * Returns Vue Query query options for GET /implements
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
export function useGetPackage(options?: {
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
  return useQuery({ ...getGetPackageQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /package
 */
export function getGetPackageQueryKey() {
  return ['/package'] as const
}

/**
 * Returns Vue Query query options for GET /package
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
export function useGetEnum(options?: {
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
  return useQuery({ ...getGetEnumQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /enum
 */
export function getGetEnumQueryKey() {
  return ['/enum'] as const
}

/**
 * Returns Vue Query query options for GET /enum
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
export function useGetConst(options?: {
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
  return useQuery({ ...getGetConstQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /const
 */
export function getGetConstQueryKey() {
  return ['/const'] as const
}

/**
 * Returns Vue Query query options for GET /const
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
export function useGetLet(options?: {
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
  return useQuery({ ...getGetLetQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /let
 */
export function getGetLetQueryKey() {
  return ['/let'] as const
}

/**
 * Returns Vue Query query options for GET /let
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
export function useGetVar(options?: {
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
  return useQuery({ ...getGetVarQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /var
 */
export function getGetVarQueryKey() {
  return ['/var'] as const
}

/**
 * Returns Vue Query query options for GET /var
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
export function useGetThis(options?: {
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
  return useQuery({ ...getGetThisQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /this
 */
export function getGetThisQueryKey() {
  return ['/this'] as const
}

/**
 * Returns Vue Query query options for GET /this
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
export function useGetSuper(options?: {
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
  return useQuery({ ...getGetSuperQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /super
 */
export function getGetSuperQueryKey() {
  return ['/super'] as const
}

/**
 * Returns Vue Query query options for GET /super
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
export function useGetSelf(options?: {
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
  return useQuery({ ...getGetSelfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /self
 */
export function getGetSelfQueryKey() {
  return ['/self'] as const
}

/**
 * Returns Vue Query query options for GET /self
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
export function useGetConstructor(options?: {
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
  return useQuery({ ...getGetConstructorQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /constructor
 */
export function getGetConstructorQueryKey() {
  return ['/constructor'] as const
}

/**
 * Returns Vue Query query options for GET /constructor
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
export function useGetPrototype(options?: {
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
  return useQuery({ ...getGetPrototypeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /prototype
 */
export function getGetPrototypeQueryKey() {
  return ['/prototype'] as const
}

/**
 * Returns Vue Query query options for GET /prototype
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
export function useGetToString(options?: {
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
  return useQuery({ ...getGetToStringQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /toString
 */
export function getGetToStringQueryKey() {
  return ['/toString'] as const
}

/**
 * Returns Vue Query query options for GET /toString
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
export function useGetValueOf(options?: {
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
  return useQuery({ ...getGetValueOfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /valueOf
 */
export function getGetValueOfQueryKey() {
  return ['/valueOf'] as const
}

/**
 * Returns Vue Query query options for GET /valueOf
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
export function useGetHasOwnProperty(options?: {
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
  return useQuery({ ...getGetHasOwnPropertyQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /hasOwnProperty
 */
export function getGetHasOwnPropertyQueryKey() {
  return ['/hasOwnProperty'] as const
}

/**
 * Returns Vue Query query options for GET /hasOwnProperty
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
export function useGetNameCollisions(options?: {
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
  return useQuery({ ...getGetNameCollisionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /name-collisions
 */
export function getGetNameCollisionsQueryKey() {
  return ['/name-collisions'] as const
}

/**
 * Returns Vue Query query options for GET /name-collisions
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
