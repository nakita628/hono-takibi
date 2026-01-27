import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function createGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 * Uses $url() for type-safe key generation
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10QueryKey(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return [
    client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
      ':p10'
    ].$url(args).pathname,
  ] as const
}

/**
 * Returns Svelte Query query options for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
        ':p10'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /query-styles
 */
export function createGetQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetQueryStylesQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /query-styles
 * Uses $url() for type-safe key generation
 */
export function getGetQueryStylesQueryKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return [client['query-styles'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /query-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryStylesQueryOptions = (
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetQueryStylesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetPathStylesSimpleLabelMatrix(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetPathStylesSimpleLabelMatrixQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /path-styles/{simple}/{label}/{matrix}
 * Uses $url() for type-safe key generation
 */
export function getGetPathStylesSimpleLabelMatrixQueryKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return [client['path-styles'][':simple'][':label'][':matrix'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /path-styles/{simple}/{label}/{matrix}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPathStylesSimpleLabelMatrixQueryOptions = (
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPathStylesSimpleLabelMatrixQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetHeaderStyles(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetHeaderStylesQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /header-styles
 * Uses $url() for type-safe key generation
 */
export function getGetHeaderStylesQueryKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return [client['header-styles'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /header-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHeaderStylesQueryOptions = (
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetHeaderStylesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetCookieStyles(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetCookieStylesQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /cookie-styles
 * Uses $url() for type-safe key generation
 */
export function getGetCookieStylesQueryKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return [client['cookie-styles'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /cookie-styles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCookieStylesQueryOptions = (
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCookieStylesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetManyQueryParams(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetManyQueryParamsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /many-query-params
 * Uses $url() for type-safe key generation
 */
export function getGetManyQueryParamsQueryKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return [client['many-query-params'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /many-query-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetManyQueryParamsQueryOptions = (
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetManyQueryParamsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetParameterContent(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetParameterContentQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /parameter-content
 * Uses $url() for type-safe key generation
 */
export function getGetParameterContentQueryKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return [client['parameter-content'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /parameter-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetParameterContentQueryOptions = (
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetParameterContentQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetDeprecatedParams(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetDeprecatedParamsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /deprecated-params
 * Uses $url() for type-safe key generation
 */
export function getGetDeprecatedParamsQueryKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return [client['deprecated-params'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedParamsQueryOptions = (
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDeprecatedParamsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetExamplesParams(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  return createQuery(() => ({
    ...getGetExamplesParamsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /examples-params
 * Uses $url() for type-safe key generation
 */
export function getGetExamplesParamsQueryKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return [client['examples-params'].$url(args).pathname] as const
}

/**
 * Returns Svelte Query query options for GET /examples-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExamplesParamsQueryOptions = (
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetExamplesParamsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['examples-params'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
