import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function useGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
          ':p10'
        ].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return ['/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10', args] as const
}

/**
 * Returns TanStack Query query options for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
          ':p10'
        ].$get(args, clientOptions),
      ),
  }
}

/**
 * GET /query-styles
 */
export function useGetQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetQueryStylesQueryKey(args),
    queryFn: async () => parseResponse(client['query-styles'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /query-styles
 */
export function getGetQueryStylesQueryKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return ['/query-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /query-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetQueryStylesQueryOptions(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetQueryStylesQueryKey(args),
    queryFn: async () => parseResponse(client['query-styles'].$get(args, clientOptions)),
  }
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export function useGetPathStylesSimpleLabelMatrix(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPathStylesSimpleLabelMatrixQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client['path-styles'][':simple'][':label'][':matrix'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /path-styles/{simple}/{label}/{matrix}
 */
export function getGetPathStylesSimpleLabelMatrixQueryKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return ['/path-styles/:simple/:label/:matrix', args] as const
}

/**
 * Returns TanStack Query query options for GET /path-styles/{simple}/{label}/{matrix}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPathStylesSimpleLabelMatrixQueryOptions(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPathStylesSimpleLabelMatrixQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client['path-styles'][':simple'][':label'][':matrix'].$get(args, clientOptions),
      ),
  }
}

/**
 * GET /header-styles
 */
export function useGetHeaderStyles(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetHeaderStylesQueryKey(args),
    queryFn: async () => parseResponse(client['header-styles'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /header-styles
 */
export function getGetHeaderStylesQueryKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return ['/header-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /header-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHeaderStylesQueryOptions(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetHeaderStylesQueryKey(args),
    queryFn: async () => parseResponse(client['header-styles'].$get(args, clientOptions)),
  }
}

/**
 * GET /cookie-styles
 */
export function useGetCookieStyles(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCookieStylesQueryKey(args),
    queryFn: async () => parseResponse(client['cookie-styles'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /cookie-styles
 */
export function getGetCookieStylesQueryKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return ['/cookie-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /cookie-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCookieStylesQueryOptions(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetCookieStylesQueryKey(args),
    queryFn: async () => parseResponse(client['cookie-styles'].$get(args, clientOptions)),
  }
}

/**
 * GET /many-query-params
 */
export function useGetManyQueryParams(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetManyQueryParamsQueryKey(args),
    queryFn: async () => parseResponse(client['many-query-params'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /many-query-params
 */
export function getGetManyQueryParamsQueryKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return ['/many-query-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /many-query-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetManyQueryParamsQueryOptions(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetManyQueryParamsQueryKey(args),
    queryFn: async () => parseResponse(client['many-query-params'].$get(args, clientOptions)),
  }
}

/**
 * GET /parameter-content
 */
export function useGetParameterContent(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetParameterContentQueryKey(args),
    queryFn: async () => parseResponse(client['parameter-content'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /parameter-content
 */
export function getGetParameterContentQueryKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return ['/parameter-content', args] as const
}

/**
 * Returns TanStack Query query options for GET /parameter-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetParameterContentQueryOptions(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetParameterContentQueryKey(args),
    queryFn: async () => parseResponse(client['parameter-content'].$get(args, clientOptions)),
  }
}

/**
 * GET /deprecated-params
 */
export function useGetDeprecatedParams(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDeprecatedParamsQueryKey(args),
    queryFn: async () => parseResponse(client['deprecated-params'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /deprecated-params
 */
export function getGetDeprecatedParamsQueryKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return ['/deprecated-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /deprecated-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeprecatedParamsQueryOptions(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetDeprecatedParamsQueryKey(args),
    queryFn: async () => parseResponse(client['deprecated-params'].$get(args, clientOptions)),
  }
}

/**
 * GET /examples-params
 */
export function useGetExamplesParams(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetExamplesParamsQueryKey(args),
    queryFn: async () => parseResponse(client['examples-params'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /examples-params
 */
export function getGetExamplesParamsQueryKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return ['/examples-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /examples-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetExamplesParamsQueryOptions(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetExamplesParamsQueryKey(args),
    queryFn: async () => parseResponse(client['examples-params'].$get(args, clientOptions)),
  }
}
