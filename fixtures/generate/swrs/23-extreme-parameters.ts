import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * Generates SWR cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(
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
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function useGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
            ':p10'
          ].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /query-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetQueryStylesKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return ['query-styles', 'GET', '/query-styles', args] as const
}

/**
 * GET /query-styles
 */
export function useGetQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetQueryStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['query-styles'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /path-styles/{simple}/{label}/{matrix}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPathStylesSimpleLabelMatrixKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return ['path-styles', 'GET', '/path-styles/:simple/:label/:matrix', args] as const
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export function useGetPathStylesSimpleLabelMatrix(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPathStylesSimpleLabelMatrixKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client['path-styles'][':simple'][':label'][':matrix'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /header-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetHeaderStylesKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return ['header-styles', 'GET', '/header-styles', args] as const
}

/**
 * GET /header-styles
 */
export function useGetHeaderStyles(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetHeaderStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['header-styles'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /cookie-styles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetCookieStylesKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return ['cookie-styles', 'GET', '/cookie-styles', args] as const
}

/**
 * GET /cookie-styles
 */
export function useGetCookieStyles(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCookieStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['cookie-styles'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /many-query-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetManyQueryParamsKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return ['many-query-params', 'GET', '/many-query-params', args] as const
}

/**
 * GET /many-query-params
 */
export function useGetManyQueryParams(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetManyQueryParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['many-query-params'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /parameter-content
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetParameterContentKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return ['parameter-content', 'GET', '/parameter-content', args] as const
}

/**
 * GET /parameter-content
 */
export function useGetParameterContent(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetParameterContentKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['parameter-content'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deprecated-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDeprecatedParamsKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return ['deprecated-params', 'GET', '/deprecated-params', args] as const
}

/**
 * GET /deprecated-params
 */
export function useGetDeprecatedParams(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDeprecatedParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deprecated-params'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /examples-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetExamplesParamsKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return ['examples-params', 'GET', '/examples-params', args] as const
}

/**
 * GET /examples-params
 */
export function useGetExamplesParams(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetExamplesParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['examples-params'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
