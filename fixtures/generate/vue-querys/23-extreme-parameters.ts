import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * Generates Vue Query cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
    >
  >,
) {
  return [
    'a',
    '/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10',
    unref(args),
  ] as const
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /query-styles
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetQueryStylesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['query-styles']['$get']>>,
) {
  return ['query-styles', '/query-styles', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /query-styles
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['query-styles']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetQueryStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /path-styles/{simple}/{label}/{matrix}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPathStylesSimpleLabelMatrixQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>
  >,
) {
  return ['path-styles', '/path-styles/:simple/:label/:matrix', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /path-styles/{simple}/{label}/{matrix}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /header-styles
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetHeaderStylesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['header-styles']['$get']>>,
) {
  return ['header-styles', '/header-styles', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /header-styles
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['header-styles']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetHeaderStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /cookie-styles
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCookieStylesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['cookie-styles']['$get']>>,
) {
  return ['cookie-styles', '/cookie-styles', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /cookie-styles
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['cookie-styles']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCookieStylesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /many-query-params
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetManyQueryParamsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['many-query-params']['$get']>>,
) {
  return ['many-query-params', '/many-query-params', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /many-query-params
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['many-query-params']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /parameter-content
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetParameterContentQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['parameter-content']['$get']>>,
) {
  return ['parameter-content', '/parameter-content', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /parameter-content
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['parameter-content']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /deprecated-params
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDeprecatedParamsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['deprecated-params']['$get']>>,
) {
  return ['deprecated-params', '/deprecated-params', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /deprecated-params
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['deprecated-params']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /examples-params
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetExamplesParamsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['examples-params']['$get']>>,
) {
  return ['examples-params', '/examples-params', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /examples-params
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['examples-params']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
