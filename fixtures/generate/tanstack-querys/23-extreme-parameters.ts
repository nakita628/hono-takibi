import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * Generates TanStack Query cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return [
    'a',
    'GET',
    '/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions = (
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
        ':p10'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function useGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /query-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetQueryStylesQueryKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return ['query-styles', 'GET', '/query-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /query-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryStylesQueryOptions = (
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetQueryStylesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['query-styles'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /query-styles
 */
export function useGetQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['query-styles']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetQueryStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /path-styles/{simple}/{label}/{matrix}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPathStylesSimpleLabelMatrixQueryKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return ['path-styles', 'GET', '/path-styles/:simple/:label/:matrix', args] as const
}

/**
 * Returns TanStack Query query options for GET /path-styles/{simple}/{label}/{matrix}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPathStylesSimpleLabelMatrixQueryOptions = (
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPathStylesSimpleLabelMatrixQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['path-styles'][':simple'][':label'][':matrix'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPathStylesSimpleLabelMatrixQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /header-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetHeaderStylesQueryKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return ['header-styles', 'GET', '/header-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /header-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHeaderStylesQueryOptions = (
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetHeaderStylesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['header-styles'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['header-styles']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetHeaderStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /cookie-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetCookieStylesQueryKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return ['cookie-styles', 'GET', '/cookie-styles', args] as const
}

/**
 * Returns TanStack Query query options for GET /cookie-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCookieStylesQueryOptions = (
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCookieStylesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['cookie-styles'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['cookie-styles']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCookieStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /many-query-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetManyQueryParamsQueryKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return ['many-query-params', 'GET', '/many-query-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /many-query-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetManyQueryParamsQueryOptions = (
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetManyQueryParamsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['many-query-params'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['many-query-params']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetManyQueryParamsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /parameter-content
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetParameterContentQueryKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return ['parameter-content', 'GET', '/parameter-content', args] as const
}

/**
 * Returns TanStack Query query options for GET /parameter-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetParameterContentQueryOptions = (
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetParameterContentQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['parameter-content'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['parameter-content']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetParameterContentQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /deprecated-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDeprecatedParamsQueryKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return ['deprecated-params', 'GET', '/deprecated-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /deprecated-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedParamsQueryOptions = (
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDeprecatedParamsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['deprecated-params'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['deprecated-params']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDeprecatedParamsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /examples-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetExamplesParamsQueryKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return ['examples-params', 'GET', '/examples-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /examples-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExamplesParamsQueryOptions = (
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetExamplesParamsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['examples-params'].$get(args, {
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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['examples-params']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetExamplesParamsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
