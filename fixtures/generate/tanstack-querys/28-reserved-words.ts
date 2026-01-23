import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.class.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetClassQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.class.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /class
 */
export function getGetClassQueryKey() {
  return ['GET', '/class'] as const
}

/**
 * GET /interface
 */
export function useGetInterface(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.interface.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetInterfaceQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.interface.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /interface
 */
export function getGetInterfaceQueryKey() {
  return ['GET', '/interface'] as const
}

/**
 * GET /type
 */
export function useGetType(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.type.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTypeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.type.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /type
 */
export function getGetTypeQueryKey() {
  return ['GET', '/type'] as const
}

/**
 * POST /function
 */
export function usePostFunction(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.function.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.function.$post> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.function.$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /return
 */
export function useGetReturn(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.return.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetReturnQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.return.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /return
 */
export function getGetReturnQueryKey() {
  return ['GET', '/return'] as const
}

/**
 * GET /import
 */
export function useGetImport(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.import.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetImportQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.import.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /import
 */
export function getGetImportQueryKey() {
  return ['GET', '/import'] as const
}

/**
 * GET /export
 */
export function useGetExport(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.export.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExportQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.export.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /export
 */
export function getGetExportQueryKey() {
  return ['GET', '/export'] as const
}

/**
 * GET /default
 */
export function useGetDefault(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.default.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDefaultQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.default.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /default
 */
export function getGetDefaultQueryKey() {
  return ['GET', '/default'] as const
}

/**
 * POST /new
 */
export function usePostNew(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.new.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.new.$post> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.new.$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /delete
 */
export function useDeleteDelete(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.delete.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.delete.$delete> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.delete.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /void
 */
export function useGetVoid(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.void.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetVoidQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.void.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /void
 */
export function getGetVoidQueryKey() {
  return ['GET', '/void'] as const
}

/**
 * GET /null
 */
export function useGetNull(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.null.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNullQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.null.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /null
 */
export function getGetNullQueryKey() {
  return ['GET', '/null'] as const
}

/**
 * GET /true
 */
export function useGetTrue(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.true.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrueQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.true.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /true
 */
export function getGetTrueQueryKey() {
  return ['GET', '/true'] as const
}

/**
 * GET /false
 */
export function useGetFalse(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.false.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFalseQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.false.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /false
 */
export function getGetFalseQueryKey() {
  return ['GET', '/false'] as const
}

/**
 * GET /if
 */
export function useGetIf(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.if.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetIfQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.if.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /if
 */
export function getGetIfQueryKey() {
  return ['GET', '/if'] as const
}

/**
 * GET /else
 */
export function useGetElse(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.else.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetElseQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.else.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /else
 */
export function getGetElseQueryKey() {
  return ['GET', '/else'] as const
}

/**
 * GET /for
 */
export function useGetFor(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.for.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetForQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.for.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /for
 */
export function getGetForQueryKey() {
  return ['GET', '/for'] as const
}

/**
 * GET /while
 */
export function useGetWhile(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.while.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWhileQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.while.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /while
 */
export function getGetWhileQueryKey() {
  return ['GET', '/while'] as const
}

/**
 * GET /switch
 */
export function useGetSwitch(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.switch.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSwitchQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.switch.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /switch
 */
export function getGetSwitchQueryKey() {
  return ['GET', '/switch'] as const
}

/**
 * GET /case
 */
export function useGetCase(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.case.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCaseQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.case.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /case
 */
export function getGetCaseQueryKey() {
  return ['GET', '/case'] as const
}

/**
 * GET /break
 */
export function useGetBreak(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.break.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBreakQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.break.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /break
 */
export function getGetBreakQueryKey() {
  return ['GET', '/break'] as const
}

/**
 * GET /continue
 */
export function useGetContinue(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.continue.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetContinueQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.continue.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /continue
 */
export function getGetContinueQueryKey() {
  return ['GET', '/continue'] as const
}

/**
 * GET /try
 */
export function useGetTry(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.try.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTryQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.try.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /try
 */
export function getGetTryQueryKey() {
  return ['GET', '/try'] as const
}

/**
 * GET /catch
 */
export function useGetCatch(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.catch.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCatchQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.catch.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /catch
 */
export function getGetCatchQueryKey() {
  return ['GET', '/catch'] as const
}

/**
 * GET /finally
 */
export function useGetFinally(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.finally.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFinallyQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.finally.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /finally
 */
export function getGetFinallyQueryKey() {
  return ['GET', '/finally'] as const
}

/**
 * GET /throw
 */
export function useGetThrow(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.throw.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetThrowQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.throw.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /throw
 */
export function getGetThrowQueryKey() {
  return ['GET', '/throw'] as const
}

/**
 * GET /async
 */
export function useGetAsync(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.async.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAsyncQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.async.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /async
 */
export function getGetAsyncQueryKey() {
  return ['GET', '/async'] as const
}

/**
 * GET /await
 */
export function useGetAwait(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.await.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAwaitQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.await.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /await
 */
export function getGetAwaitQueryKey() {
  return ['GET', '/await'] as const
}

/**
 * GET /yield
 */
export function useGetYield(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.yield.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetYieldQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.yield.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /yield
 */
export function getGetYieldQueryKey() {
  return ['GET', '/yield'] as const
}

/**
 * GET /static
 */
export function useGetStatic(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.static.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStaticQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.static.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /static
 */
export function getGetStaticQueryKey() {
  return ['GET', '/static'] as const
}

/**
 * GET /public
 */
export function useGetPublic(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.public.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPublicQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /private
 */
export function useGetPrivate(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.private.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPrivateQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.private.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /private
 */
export function getGetPrivateQueryKey() {
  return ['GET', '/private'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.protected.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProtectedQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['GET', '/protected'] as const
}

/**
 * GET /abstract
 */
export function useGetAbstract(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.abstract.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAbstractQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.abstract.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /abstract
 */
export function getGetAbstractQueryKey() {
  return ['GET', '/abstract'] as const
}

/**
 * GET /final
 */
export function useGetFinal(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.final.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFinalQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.final.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /final
 */
export function getGetFinalQueryKey() {
  return ['GET', '/final'] as const
}

/**
 * GET /extends
 */
export function useGetExtends(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.extends.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExtendsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.extends.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /extends
 */
export function getGetExtendsQueryKey() {
  return ['GET', '/extends'] as const
}

/**
 * GET /implements
 */
export function useGetImplements(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.implements.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetImplementsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.implements.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /implements
 */
export function getGetImplementsQueryKey() {
  return ['GET', '/implements'] as const
}

/**
 * GET /package
 */
export function useGetPackage(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.package.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPackageQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.package.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /package
 */
export function getGetPackageQueryKey() {
  return ['GET', '/package'] as const
}

/**
 * GET /enum
 */
export function useGetEnum(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.enum.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEnumQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.enum.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /enum
 */
export function getGetEnumQueryKey() {
  return ['GET', '/enum'] as const
}

/**
 * GET /const
 */
export function useGetConst(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.const.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetConstQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.const.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /const
 */
export function getGetConstQueryKey() {
  return ['GET', '/const'] as const
}

/**
 * GET /let
 */
export function useGetLet(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.let.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLetQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.let.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /let
 */
export function getGetLetQueryKey() {
  return ['GET', '/let'] as const
}

/**
 * GET /var
 */
export function useGetVar(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.var.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetVarQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.var.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /var
 */
export function getGetVarQueryKey() {
  return ['GET', '/var'] as const
}

/**
 * GET /this
 */
export function useGetThis(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.this.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetThisQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.this.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /this
 */
export function getGetThisQueryKey() {
  return ['GET', '/this'] as const
}

/**
 * GET /super
 */
export function useGetSuper(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.super.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSuperQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.super.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /super
 */
export function getGetSuperQueryKey() {
  return ['GET', '/super'] as const
}

/**
 * GET /self
 */
export function useGetSelf(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.self.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSelfQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.self.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /self
 */
export function getGetSelfQueryKey() {
  return ['GET', '/self'] as const
}

/**
 * GET /constructor
 */
export function useGetConstructor(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.constructor.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetConstructorQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.constructor.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /constructor
 */
export function getGetConstructorQueryKey() {
  return ['GET', '/constructor'] as const
}

/**
 * GET /prototype
 */
export function useGetPrototype(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.prototype.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPrototypeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.prototype.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /prototype
 */
export function getGetPrototypeQueryKey() {
  return ['GET', '/prototype'] as const
}

/**
 * GET /toString
 */
export function useGetToString(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.toString.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetToStringQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.toString.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /toString
 */
export function getGetToStringQueryKey() {
  return ['GET', '/toString'] as const
}

/**
 * GET /valueOf
 */
export function useGetValueOf(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.valueOf.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetValueOfQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.valueOf.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /valueOf
 */
export function getGetValueOfQueryKey() {
  return ['GET', '/valueOf'] as const
}

/**
 * GET /hasOwnProperty
 */
export function useGetHasOwnProperty(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.hasOwnProperty.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHasOwnPropertyQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.hasOwnProperty.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /hasOwnProperty
 */
export function getGetHasOwnPropertyQueryKey() {
  return ['GET', '/hasOwnProperty'] as const
}

/**
 * GET /name-collisions
 */
export function useGetNameCollisions(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['name-collisions']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNameCollisionsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['name-collisions'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /name-collisions
 */
export function getGetNameCollisionsQueryKey() {
  return ['GET', '/name-collisions'] as const
}
