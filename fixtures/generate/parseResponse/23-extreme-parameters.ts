import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export async function getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: InferRequestType<
    (typeof client.a)[':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[':p9'].j[
      ':p10'
    ].$get(args, options),
  )
}

/**
 * GET /query-styles
 */
export async function getQueryStyles(
  args: InferRequestType<(typeof client)['query-styles']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['query-styles'].$get(args, options))
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export async function getPathStylesSimpleLabelMatrix(
  args: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client['path-styles'][':simple'][':label'][':matrix'].$get(args, options),
  )
}

/**
 * GET /header-styles
 */
export async function getHeaderStyles(
  args: InferRequestType<(typeof client)['header-styles']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['header-styles'].$get(args, options))
}

/**
 * GET /cookie-styles
 */
export async function getCookieStyles(
  args: InferRequestType<(typeof client)['cookie-styles']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['cookie-styles'].$get(args, options))
}

/**
 * GET /many-query-params
 */
export async function getManyQueryParams(
  args: InferRequestType<(typeof client)['many-query-params']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['many-query-params'].$get(args, options))
}

/**
 * GET /parameter-content
 */
export async function getParameterContent(
  args: InferRequestType<(typeof client)['parameter-content']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['parameter-content'].$get(args, options))
}

/**
 * GET /deprecated-params
 */
export async function getDeprecatedParams(
  args: InferRequestType<(typeof client)['deprecated-params']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['deprecated-params'].$get(args, options))
}

/**
 * GET /examples-params
 */
export async function getExamplesParams(
  args: InferRequestType<(typeof client)['examples-params']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['examples-params'].$get(args, options))
}
