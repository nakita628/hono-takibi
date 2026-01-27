import { queryOptions, useQuery } from '@tanstack/vue-query'
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
    ...getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return ['/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10', args] as const
}

/**
 * Returns Vue Query query options for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions = (
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
          ':p10'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
  return useQuery({ ...getGetQueryStylesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /query-styles
 */
export function getGetQueryStylesQueryKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return ['/query-styles', args] as const
}

/**
 * Returns Vue Query query options for GET /query-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryStylesQueryOptions = (
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetQueryStylesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['query-styles'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
    ...getGetPathStylesSimpleLabelMatrixQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /path-styles/{simple}/{label}/{matrix}
 */
export function getGetPathStylesSimpleLabelMatrixQueryKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return ['/path-styles/:simple/:label/:matrix', args] as const
}

/**
 * Returns Vue Query query options for GET /path-styles/{simple}/{label}/{matrix}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPathStylesSimpleLabelMatrixQueryOptions = (
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPathStylesSimpleLabelMatrixQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['path-styles'][':simple'][':label'][':matrix'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetHeaderStylesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /header-styles
 */
export function getGetHeaderStylesQueryKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return ['/header-styles', args] as const
}

/**
 * Returns Vue Query query options for GET /header-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHeaderStylesQueryOptions = (
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetHeaderStylesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['header-styles'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetCookieStylesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /cookie-styles
 */
export function getGetCookieStylesQueryKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return ['/cookie-styles', args] as const
}

/**
 * Returns Vue Query query options for GET /cookie-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCookieStylesQueryOptions = (
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetCookieStylesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['cookie-styles'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetManyQueryParamsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /many-query-params
 */
export function getGetManyQueryParamsQueryKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return ['/many-query-params', args] as const
}

/**
 * Returns Vue Query query options for GET /many-query-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetManyQueryParamsQueryOptions = (
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetManyQueryParamsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['many-query-params'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetParameterContentQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /parameter-content
 */
export function getGetParameterContentQueryKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return ['/parameter-content', args] as const
}

/**
 * Returns Vue Query query options for GET /parameter-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetParameterContentQueryOptions = (
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetParameterContentQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['parameter-content'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetDeprecatedParamsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /deprecated-params
 */
export function getGetDeprecatedParamsQueryKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return ['/deprecated-params', args] as const
}

/**
 * Returns Vue Query query options for GET /deprecated-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedParamsQueryOptions = (
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDeprecatedParamsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['deprecated-params'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  return useQuery({ ...getGetExamplesParamsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /examples-params
 */
export function getGetExamplesParamsQueryKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return ['/examples-params', args] as const
}

/**
 * Returns Vue Query query options for GET /examples-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExamplesParamsQueryOptions = (
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetExamplesParamsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['examples-params'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
