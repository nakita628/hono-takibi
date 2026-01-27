import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(args) : null)
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
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 * Uses $url() for type-safe key generation
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
    ':p10'
  ].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetQueryStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['query-styles'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /query-styles
 * Uses $url() for type-safe key generation
 */
export function getGetQueryStylesKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return client['query-styles'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetPathStylesSimpleLabelMatrixKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client['path-styles'][':simple'][':label'][':matrix'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /path-styles/{simple}/{label}/{matrix}
 * Uses $url() for type-safe key generation
 */
export function getGetPathStylesSimpleLabelMatrixKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return client['path-styles'][':simple'][':label'][':matrix'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHeaderStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['header-styles'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /header-styles
 * Uses $url() for type-safe key generation
 */
export function getGetHeaderStylesKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return client['header-styles'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCookieStylesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['cookie-styles'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /cookie-styles
 * Uses $url() for type-safe key generation
 */
export function getGetCookieStylesKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return client['cookie-styles'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetManyQueryParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['many-query-params'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /many-query-params
 * Uses $url() for type-safe key generation
 */
export function getGetManyQueryParamsKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return client['many-query-params'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetParameterContentKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['parameter-content'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /parameter-content
 * Uses $url() for type-safe key generation
 */
export function getGetParameterContentKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return client['parameter-content'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDeprecatedParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deprecated-params'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deprecated-params
 * Uses $url() for type-safe key generation
 */
export function getGetDeprecatedParamsKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return client['deprecated-params'].$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExamplesParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['examples-params'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /examples-params
 * Uses $url() for type-safe key generation
 */
export function getGetExamplesParamsKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return client['examples-params'].$url(args).pathname
}
