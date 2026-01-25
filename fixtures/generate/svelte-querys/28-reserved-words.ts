import { createMutation, createQuery } from '@tanstack/svelte-query'
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetClassQueryKey(),
    queryFn: async () => parseResponse(client.class.$get(undefined, clientOptions)),
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
export function getGetClassQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetClassQueryKey(),
    queryFn: async () => parseResponse(client.class.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetInterfaceQueryKey(),
    queryFn: async () => parseResponse(client.interface.$get(undefined, clientOptions)),
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
export function getGetInterfaceQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetInterfaceQueryKey(),
    queryFn: async () => parseResponse(client.interface.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTypeQueryKey(),
    queryFn: async () => parseResponse(client.type.$get(undefined, clientOptions)),
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
export function getGetTypeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTypeQueryKey(),
    queryFn: async () => parseResponse(client.type.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetReturnQueryKey(),
    queryFn: async () => parseResponse(client.return.$get(undefined, clientOptions)),
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
export function getGetReturnQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetReturnQueryKey(),
    queryFn: async () => parseResponse(client.return.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetImportQueryKey(),
    queryFn: async () => parseResponse(client.import.$get(undefined, clientOptions)),
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
export function getGetImportQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetImportQueryKey(),
    queryFn: async () => parseResponse(client.import.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetExportQueryKey(),
    queryFn: async () => parseResponse(client.export.$get(undefined, clientOptions)),
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
export function getGetExportQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetExportQueryKey(),
    queryFn: async () => parseResponse(client.export.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetDefaultQueryKey(),
    queryFn: async () => parseResponse(client.default.$get(undefined, clientOptions)),
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
export function getGetDefaultQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDefaultQueryKey(),
    queryFn: async () => parseResponse(client.default.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetVoidQueryKey(),
    queryFn: async () => parseResponse(client.void.$get(undefined, clientOptions)),
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
export function getGetVoidQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetVoidQueryKey(),
    queryFn: async () => parseResponse(client.void.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNullQueryKey(),
    queryFn: async () => parseResponse(client.null.$get(undefined, clientOptions)),
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
export function getGetNullQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNullQueryKey(),
    queryFn: async () => parseResponse(client.null.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTrueQueryKey(),
    queryFn: async () => parseResponse(client.true.$get(undefined, clientOptions)),
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
export function getGetTrueQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTrueQueryKey(),
    queryFn: async () => parseResponse(client.true.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFalseQueryKey(),
    queryFn: async () => parseResponse(client.false.$get(undefined, clientOptions)),
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
export function getGetFalseQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetFalseQueryKey(),
    queryFn: async () => parseResponse(client.false.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetIfQueryKey(),
    queryFn: async () => parseResponse(client.if.$get(undefined, clientOptions)),
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
export function getGetIfQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetIfQueryKey(),
    queryFn: async () => parseResponse(client.if.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetElseQueryKey(),
    queryFn: async () => parseResponse(client.else.$get(undefined, clientOptions)),
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
export function getGetElseQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetElseQueryKey(),
    queryFn: async () => parseResponse(client.else.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetForQueryKey(),
    queryFn: async () => parseResponse(client.for.$get(undefined, clientOptions)),
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
export function getGetForQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetForQueryKey(),
    queryFn: async () => parseResponse(client.for.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWhileQueryKey(),
    queryFn: async () => parseResponse(client.while.$get(undefined, clientOptions)),
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
export function getGetWhileQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetWhileQueryKey(),
    queryFn: async () => parseResponse(client.while.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSwitchQueryKey(),
    queryFn: async () => parseResponse(client.switch.$get(undefined, clientOptions)),
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
export function getGetSwitchQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSwitchQueryKey(),
    queryFn: async () => parseResponse(client.switch.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCaseQueryKey(),
    queryFn: async () => parseResponse(client.case.$get(undefined, clientOptions)),
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
export function getGetCaseQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCaseQueryKey(),
    queryFn: async () => parseResponse(client.case.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetBreakQueryKey(),
    queryFn: async () => parseResponse(client.break.$get(undefined, clientOptions)),
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
export function getGetBreakQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBreakQueryKey(),
    queryFn: async () => parseResponse(client.break.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetContinueQueryKey(),
    queryFn: async () => parseResponse(client.continue.$get(undefined, clientOptions)),
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
export function getGetContinueQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetContinueQueryKey(),
    queryFn: async () => parseResponse(client.continue.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTryQueryKey(),
    queryFn: async () => parseResponse(client.try.$get(undefined, clientOptions)),
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
export function getGetTryQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTryQueryKey(),
    queryFn: async () => parseResponse(client.try.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCatchQueryKey(),
    queryFn: async () => parseResponse(client.catch.$get(undefined, clientOptions)),
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
export function getGetCatchQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCatchQueryKey(),
    queryFn: async () => parseResponse(client.catch.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFinallyQueryKey(),
    queryFn: async () => parseResponse(client.finally.$get(undefined, clientOptions)),
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
export function getGetFinallyQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetFinallyQueryKey(),
    queryFn: async () => parseResponse(client.finally.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetThrowQueryKey(),
    queryFn: async () => parseResponse(client.throw.$get(undefined, clientOptions)),
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
export function getGetThrowQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetThrowQueryKey(),
    queryFn: async () => parseResponse(client.throw.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAsyncQueryKey(),
    queryFn: async () => parseResponse(client.async.$get(undefined, clientOptions)),
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
export function getGetAsyncQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAsyncQueryKey(),
    queryFn: async () => parseResponse(client.async.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAwaitQueryKey(),
    queryFn: async () => parseResponse(client.await.$get(undefined, clientOptions)),
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
export function getGetAwaitQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAwaitQueryKey(),
    queryFn: async () => parseResponse(client.await.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetYieldQueryKey(),
    queryFn: async () => parseResponse(client.yield.$get(undefined, clientOptions)),
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
export function getGetYieldQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetYieldQueryKey(),
    queryFn: async () => parseResponse(client.yield.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStaticQueryKey(),
    queryFn: async () => parseResponse(client.static.$get(undefined, clientOptions)),
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
export function getGetStaticQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetStaticQueryKey(),
    queryFn: async () => parseResponse(client.static.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
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
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPrivateQueryKey(),
    queryFn: async () => parseResponse(client.private.$get(undefined, clientOptions)),
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
export function getGetPrivateQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPrivateQueryKey(),
    queryFn: async () => parseResponse(client.private.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProtectedQueryKey(),
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
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
export function getGetProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetProtectedQueryKey(),
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAbstractQueryKey(),
    queryFn: async () => parseResponse(client.abstract.$get(undefined, clientOptions)),
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
export function getGetAbstractQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAbstractQueryKey(),
    queryFn: async () => parseResponse(client.abstract.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFinalQueryKey(),
    queryFn: async () => parseResponse(client.final.$get(undefined, clientOptions)),
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
export function getGetFinalQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetFinalQueryKey(),
    queryFn: async () => parseResponse(client.final.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetExtendsQueryKey(),
    queryFn: async () => parseResponse(client.extends.$get(undefined, clientOptions)),
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
export function getGetExtendsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetExtendsQueryKey(),
    queryFn: async () => parseResponse(client.extends.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetImplementsQueryKey(),
    queryFn: async () => parseResponse(client.implements.$get(undefined, clientOptions)),
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
export function getGetImplementsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetImplementsQueryKey(),
    queryFn: async () => parseResponse(client.implements.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPackageQueryKey(),
    queryFn: async () => parseResponse(client.package.$get(undefined, clientOptions)),
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
export function getGetPackageQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPackageQueryKey(),
    queryFn: async () => parseResponse(client.package.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEnumQueryKey(),
    queryFn: async () => parseResponse(client.enum.$get(undefined, clientOptions)),
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
export function getGetEnumQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetEnumQueryKey(),
    queryFn: async () => parseResponse(client.enum.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetConstQueryKey(),
    queryFn: async () => parseResponse(client.const.$get(undefined, clientOptions)),
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
export function getGetConstQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetConstQueryKey(),
    queryFn: async () => parseResponse(client.const.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetLetQueryKey(),
    queryFn: async () => parseResponse(client.let.$get(undefined, clientOptions)),
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
export function getGetLetQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetLetQueryKey(),
    queryFn: async () => parseResponse(client.let.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetVarQueryKey(),
    queryFn: async () => parseResponse(client.var.$get(undefined, clientOptions)),
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
export function getGetVarQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetVarQueryKey(),
    queryFn: async () => parseResponse(client.var.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetThisQueryKey(),
    queryFn: async () => parseResponse(client.this.$get(undefined, clientOptions)),
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
export function getGetThisQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetThisQueryKey(),
    queryFn: async () => parseResponse(client.this.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSuperQueryKey(),
    queryFn: async () => parseResponse(client.super.$get(undefined, clientOptions)),
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
export function getGetSuperQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSuperQueryKey(),
    queryFn: async () => parseResponse(client.super.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSelfQueryKey(),
    queryFn: async () => parseResponse(client.self.$get(undefined, clientOptions)),
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
export function getGetSelfQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSelfQueryKey(),
    queryFn: async () => parseResponse(client.self.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetConstructorQueryKey(),
    queryFn: async () => parseResponse(client.constructor.$get(undefined, clientOptions)),
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
export function getGetConstructorQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetConstructorQueryKey(),
    queryFn: async () => parseResponse(client.constructor.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPrototypeQueryKey(),
    queryFn: async () => parseResponse(client.prototype.$get(undefined, clientOptions)),
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
export function getGetPrototypeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPrototypeQueryKey(),
    queryFn: async () => parseResponse(client.prototype.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetToStringQueryKey(),
    queryFn: async () => parseResponse(client.toString.$get(undefined, clientOptions)),
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
export function getGetToStringQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetToStringQueryKey(),
    queryFn: async () => parseResponse(client.toString.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetValueOfQueryKey(),
    queryFn: async () => parseResponse(client.valueOf.$get(undefined, clientOptions)),
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
export function getGetValueOfQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetValueOfQueryKey(),
    queryFn: async () => parseResponse(client.valueOf.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetHasOwnPropertyQueryKey(),
    queryFn: async () => parseResponse(client.hasOwnProperty.$get(undefined, clientOptions)),
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
export function getGetHasOwnPropertyQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetHasOwnPropertyQueryKey(),
    queryFn: async () => parseResponse(client.hasOwnProperty.$get(undefined, clientOptions)),
  }
}

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNameCollisionsQueryKey(),
    queryFn: async () => parseResponse(client['name-collisions'].$get(undefined, clientOptions)),
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
export function getGetNameCollisionsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNameCollisionsQueryKey(),
    queryFn: async () => parseResponse(client['name-collisions'].$get(undefined, clientOptions)),
  }
}
