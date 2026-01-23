import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function useGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
          ':p10'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export function getGetAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Key(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return ['GET', '/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10', args] as const
}

/**
 * GET /query-styles
 */
export function useGetQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['query-styles']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetQueryStylesKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['query-styles']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['query-styles'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /query-styles
 */
export function getGetQueryStylesKey(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return ['GET', '/query-styles', args] as const
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export function useGetPathStylesSimpleLabelMatrix(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetPathStylesSimpleLabelMatrixKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['path-styles'][':simple'][':label'][':matrix'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /path-styles/{simple}/{label}/{matrix}
 */
export function getGetPathStylesSimpleLabelMatrixKey(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return ['GET', '/path-styles/:simple/:label/:matrix', args] as const
}

/**
 * GET /header-styles
 */
export function useGetHeaderStyles(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['header-styles']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHeaderStylesKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['header-styles']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['header-styles'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /header-styles
 */
export function getGetHeaderStylesKey(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
) {
  return ['GET', '/header-styles', args] as const
}

/**
 * GET /cookie-styles
 */
export function useGetCookieStyles(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['cookie-styles']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCookieStylesKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['cookie-styles']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['cookie-styles'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /cookie-styles
 */
export function getGetCookieStylesKey(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
) {
  return ['GET', '/cookie-styles', args] as const
}

/**
 * GET /many-query-params
 */
export function useGetManyQueryParams(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['many-query-params']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetManyQueryParamsKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['many-query-params']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['many-query-params'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /many-query-params
 */
export function getGetManyQueryParamsKey(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return ['GET', '/many-query-params', args] as const
}

/**
 * GET /parameter-content
 */
export function useGetParameterContent(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['parameter-content']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetParameterContentKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['parameter-content']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['parameter-content'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /parameter-content
 */
export function getGetParameterContentKey(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return ['GET', '/parameter-content', args] as const
}

/**
 * GET /deprecated-params
 */
export function useGetDeprecatedParams(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['deprecated-params']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDeprecatedParamsKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['deprecated-params']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['deprecated-params'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /deprecated-params
 */
export function getGetDeprecatedParamsKey(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return ['GET', '/deprecated-params', args] as const
}

/**
 * GET /examples-params
 */
export function useGetExamplesParams(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['examples-params']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExamplesParamsKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['examples-params']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['examples-params'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /examples-params
 */
export function getGetExamplesParamsKey(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return ['GET', '/examples-params', args] as const
}
