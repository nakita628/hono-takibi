import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export async function getResources(arg: { header: { 'X-Request-ID'?: string } }) {
  return await client.resources.$get(arg)
}

/**
 * GET /resources/{id}
 */
export async function getResourcesId(arg: {
  param: { id: string }
  header: { 'If-None-Match'?: string }
}) {
  return await client['resources'][':id']['$get'](arg)
}

/**
 * PUT /resources/{id}
 */
export async function putResourcesId(arg: {
  param: { id: string }
  header: { 'If-Match': string }
  json: { id?: string; name?: string; data?: {} }
}) {
  return await client['resources'][':id']['$put'](arg)
}

/**
 * GET /download/{id}
 */
export async function getDownloadId(arg: { param: { id: string } }) {
  return await client['download'][':id']['$get'](arg)
}
