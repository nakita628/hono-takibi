import type { InferRequestType } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export async function getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  arg: InferRequestType<
    (typeof client)['a'][':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][':p7']['h'][':p8']['i'][':p9']['j'][':p10']['$get']
  >,
) {
  return await client['a'][':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][
    ':p7'
  ]['h'][':p8']['i'][':p9']['j'][':p10']['$get'](arg)
}

/**
 * GET /query-styles
 */
export async function getQueryStyles(
  arg: InferRequestType<(typeof client)['query-styles']['$get']>,
) {
  return await client['query-styles']['$get'](arg)
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export async function getPathStylesSimpleLabelMatrix(
  arg: InferRequestType<(typeof client)['path-styles'][':simple'][':label'][':matrix']['$get']>,
) {
  return await client['path-styles'][':simple'][':label'][':matrix']['$get'](arg)
}

/**
 * GET /header-styles
 */
export async function getHeaderStyles() {
  return await client['header-styles']['$get']()
}

/**
 * GET /cookie-styles
 */
export async function getCookieStyles() {
  return await client['cookie-styles']['$get']()
}

/**
 * GET /many-query-params
 */
export async function getManyQueryParams(
  arg: InferRequestType<(typeof client)['many-query-params']['$get']>,
) {
  return await client['many-query-params']['$get'](arg)
}

/**
 * GET /parameter-content
 */
export async function getParameterContent(
  arg: InferRequestType<(typeof client)['parameter-content']['$get']>,
) {
  return await client['parameter-content']['$get'](arg)
}

/**
 * GET /deprecated-params
 */
export async function getDeprecatedParams(
  arg: InferRequestType<(typeof client)['deprecated-params']['$get']>,
) {
  return await client['deprecated-params']['$get'](arg)
}

/**
 * GET /examples-params
 */
export async function getExamplesParams(
  arg: InferRequestType<(typeof client)['examples-params']['$get']>,
) {
  return await client['examples-params']['$get'](arg)
}
