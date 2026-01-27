import { useQuery, useMutation } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.class.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetClassQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /class
 * Uses $url() for type-safe key generation
 */
export function getGetClassQueryKey() {
  return [client.class.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /class
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetClassQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetClassQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.class.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /interface
 */
export function useGetInterface(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.interface.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetInterfaceQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /interface
 * Uses $url() for type-safe key generation
 */
export function getGetInterfaceQueryKey() {
  return [client.interface.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /interface
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInterfaceQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetInterfaceQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.type.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTypeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /type
 * Uses $url() for type-safe key generation
 */
export function getGetTypeQueryKey() {
  return [client.type.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /type
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTypeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTypeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.type.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * POST /function
 */
export function usePostFunction(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.function.$post>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.function.$post(undefined, clientOptions)),
  })
}

/**
 * GET /return
 */
export function useGetReturn(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.return.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetReturnQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /return
 * Uses $url() for type-safe key generation
 */
export function getGetReturnQueryKey() {
  return [client.return.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /return
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReturnQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetReturnQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.return.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /import
 */
export function useGetImport(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.import.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetImportQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /import
 * Uses $url() for type-safe key generation
 */
export function getGetImportQueryKey() {
  return [client.import.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /import
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImportQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetImportQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.import.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /export
 */
export function useGetExport(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.export.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetExportQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /export
 * Uses $url() for type-safe key generation
 */
export function getGetExportQueryKey() {
  return [client.export.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /export
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExportQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExportQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.export.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /default
 */
export function useGetDefault(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.default.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetDefaultQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /default
 * Uses $url() for type-safe key generation
 */
export function getGetDefaultQueryKey() {
  return [client.default.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /default
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDefaultQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDefaultQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.new.$post>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.new.$post(undefined, clientOptions)),
  })
}

/**
 * DELETE /delete
 */
export function useDeleteDelete(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.delete.$delete>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.delete.$delete(undefined, clientOptions)),
  })
}

/**
 * GET /void
 */
export function useGetVoid(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.void.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetVoidQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /void
 * Uses $url() for type-safe key generation
 */
export function getGetVoidQueryKey() {
  return [client.void.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /void
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoidQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVoidQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.void.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /null
 */
export function useGetNull(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.null.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNullQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /null
 * Uses $url() for type-safe key generation
 */
export function getGetNullQueryKey() {
  return [client.null.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /null
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNullQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.null.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /true
 */
export function useGetTrue(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.true.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTrueQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /true
 * Uses $url() for type-safe key generation
 */
export function getGetTrueQueryKey() {
  return [client.true.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /true
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTrueQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.true.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /false
 */
export function useGetFalse(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.false.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetFalseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /false
 * Uses $url() for type-safe key generation
 */
export function getGetFalseQueryKey() {
  return [client.false.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /false
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFalseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFalseQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.false.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /if
 */
export function useGetIf(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.if.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetIfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /if
 * Uses $url() for type-safe key generation
 */
export function getGetIfQueryKey() {
  return [client.if.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /if
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetIfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetIfQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.if.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /else
 */
export function useGetElse(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.else.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetElseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /else
 * Uses $url() for type-safe key generation
 */
export function getGetElseQueryKey() {
  return [client.else.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /else
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetElseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetElseQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.else.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /for
 */
export function useGetFor(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.for.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetForQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /for
 * Uses $url() for type-safe key generation
 */
export function getGetForQueryKey() {
  return [client.for.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /for
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetForQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetForQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.for.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /while
 */
export function useGetWhile(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.while.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetWhileQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /while
 * Uses $url() for type-safe key generation
 */
export function getGetWhileQueryKey() {
  return [client.while.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /while
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWhileQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWhileQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.while.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /switch
 */
export function useGetSwitch(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.switch.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSwitchQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /switch
 * Uses $url() for type-safe key generation
 */
export function getGetSwitchQueryKey() {
  return [client.switch.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /switch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSwitchQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSwitchQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.switch.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /case
 */
export function useGetCase(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.case.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCaseQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /case
 * Uses $url() for type-safe key generation
 */
export function getGetCaseQueryKey() {
  return [client.case.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /case
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCaseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCaseQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.case.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /break
 */
export function useGetBreak(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.break.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetBreakQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /break
 * Uses $url() for type-safe key generation
 */
export function getGetBreakQueryKey() {
  return [client.break.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /break
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBreakQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetBreakQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.break.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /continue
 */
export function useGetContinue(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.continue.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetContinueQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /continue
 * Uses $url() for type-safe key generation
 */
export function getGetContinueQueryKey() {
  return [client.continue.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /continue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetContinueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetContinueQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.try.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTryQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /try
 * Uses $url() for type-safe key generation
 */
export function getGetTryQueryKey() {
  return [client.try.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /try
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTryQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTryQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.try.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /catch
 */
export function useGetCatch(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.catch.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCatchQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /catch
 * Uses $url() for type-safe key generation
 */
export function getGetCatchQueryKey() {
  return [client.catch.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /catch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCatchQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCatchQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.catch.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /finally
 */
export function useGetFinally(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.finally.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetFinallyQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /finally
 * Uses $url() for type-safe key generation
 */
export function getGetFinallyQueryKey() {
  return [client.finally.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /finally
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinallyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFinallyQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.throw.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetThrowQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /throw
 * Uses $url() for type-safe key generation
 */
export function getGetThrowQueryKey() {
  return [client.throw.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /throw
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThrowQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetThrowQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.throw.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /async
 */
export function useGetAsync(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.async.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAsyncQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /async
 * Uses $url() for type-safe key generation
 */
export function getGetAsyncQueryKey() {
  return [client.async.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /async
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAsyncQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAsyncQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.async.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /await
 */
export function useGetAwait(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.await.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAwaitQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /await
 * Uses $url() for type-safe key generation
 */
export function getGetAwaitQueryKey() {
  return [client.await.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /await
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAwaitQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAwaitQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.await.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /yield
 */
export function useGetYield(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.yield.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetYieldQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /yield
 * Uses $url() for type-safe key generation
 */
export function getGetYieldQueryKey() {
  return [client.yield.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /yield
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetYieldQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetYieldQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.yield.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /static
 */
export function useGetStatic(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.static.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetStaticQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /static
 * Uses $url() for type-safe key generation
 */
export function getGetStaticQueryKey() {
  return [client.static.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /static
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStaticQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStaticQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.static.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /public
 */
export function useGetPublic(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /public
 * Uses $url() for type-safe key generation
 */
export function getGetPublicQueryKey() {
  return [client.public.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPublicQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.public.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /private
 */
export function useGetPrivate(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.private.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPrivateQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /private
 * Uses $url() for type-safe key generation
 */
export function getGetPrivateQueryKey() {
  return [client.private.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrivateQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrivateQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.protected.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /protected
 * Uses $url() for type-safe key generation
 */
export function getGetProtectedQueryKey() {
  return [client.protected.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProtectedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProtectedQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.abstract.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAbstractQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /abstract
 * Uses $url() for type-safe key generation
 */
export function getGetAbstractQueryKey() {
  return [client.abstract.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /abstract
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAbstractQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAbstractQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.final.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetFinalQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /final
 * Uses $url() for type-safe key generation
 */
export function getGetFinalQueryKey() {
  return [client.final.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /final
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinalQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFinalQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.final.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /extends
 */
export function useGetExtends(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.extends.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetExtendsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /extends
 * Uses $url() for type-safe key generation
 */
export function getGetExtendsQueryKey() {
  return [client.extends.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /extends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtendsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExtendsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.implements.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetImplementsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /implements
 * Uses $url() for type-safe key generation
 */
export function getGetImplementsQueryKey() {
  return [client.implements.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /implements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImplementsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetImplementsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.package.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPackageQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /package
 * Uses $url() for type-safe key generation
 */
export function getGetPackageQueryKey() {
  return [client.package.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /package
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPackageQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPackageQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enum.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetEnumQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /enum
 * Uses $url() for type-safe key generation
 */
export function getGetEnumQueryKey() {
  return [client.enum.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnumQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEnumQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.enum.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /const
 */
export function useGetConst(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.const.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetConstQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /const
 * Uses $url() for type-safe key generation
 */
export function getGetConstQueryKey() {
  return [client.const.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConstQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.const.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /let
 */
export function useGetLet(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.let.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetLetQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /let
 * Uses $url() for type-safe key generation
 */
export function getGetLetQueryKey() {
  return [client.let.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /let
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLetQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetLetQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.let.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /var
 */
export function useGetVar(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.var.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetVarQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /var
 * Uses $url() for type-safe key generation
 */
export function getGetVarQueryKey() {
  return [client.var.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /var
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVarQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVarQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.var.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /this
 */
export function useGetThis(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.this.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetThisQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /this
 * Uses $url() for type-safe key generation
 */
export function getGetThisQueryKey() {
  return [client.this.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /this
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThisQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetThisQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.this.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /super
 */
export function useGetSuper(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.super.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSuperQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /super
 * Uses $url() for type-safe key generation
 */
export function getGetSuperQueryKey() {
  return [client.super.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /super
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuperQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSuperQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.super.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /self
 */
export function useGetSelf(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.self.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSelfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /self
 * Uses $url() for type-safe key generation
 */
export function getGetSelfQueryKey() {
  return [client.self.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /self
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSelfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSelfQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.self.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /constructor
 */
export function useGetConstructor(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.constructor.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetConstructorQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /constructor
 * Uses $url() for type-safe key generation
 */
export function getGetConstructorQueryKey() {
  return [client.constructor.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /constructor
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstructorQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConstructorQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.prototype.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPrototypeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /prototype
 * Uses $url() for type-safe key generation
 */
export function getGetPrototypeQueryKey() {
  return [client.prototype.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /prototype
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrototypeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrototypeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.toString.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetToStringQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /toString
 * Uses $url() for type-safe key generation
 */
export function getGetToStringQueryKey() {
  return [client.toString.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /toString
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetToStringQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetToStringQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.valueOf.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetValueOfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /valueOf
 * Uses $url() for type-safe key generation
 */
export function getGetValueOfQueryKey() {
  return [client.valueOf.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /valueOf
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetValueOfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetValueOfQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hasOwnProperty.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetHasOwnPropertyQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /hasOwnProperty
 * Uses $url() for type-safe key generation
 */
export function getGetHasOwnPropertyQueryKey() {
  return [client.hasOwnProperty.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /hasOwnProperty
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHasOwnPropertyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetHasOwnPropertyQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['name-collisions']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNameCollisionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /name-collisions
 * Uses $url() for type-safe key generation
 */
export function getGetNameCollisionsQueryKey() {
  return [client['name-collisions'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /name-collisions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNameCollisionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNameCollisionsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['name-collisions'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
