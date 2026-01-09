import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export async function getAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$get'](args)
}

/**
 * PUT /all-methods
 */
export async function putAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$put'](args)
}

/**
 * POST /all-methods
 */
export async function postAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$post'](args)
}

/**
 * DELETE /all-methods
 */
export async function deleteAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$delete'](args)
}

/**
 * OPTIONS /all-methods
 */
export async function optionsAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$options'](args)
}

/**
 * HEAD /all-methods
 */
export async function headAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$head'](args)
}

/**
 * PATCH /all-methods
 */
export async function patchAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$patch'](args)
}

/**
 * TRACE /all-methods
 */
export async function traceAllMethods(args?: { options?: ClientRequestOptions }) {
  return await client['all-methods']['$trace'](args)
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export async function getUsersUserIdPostsPostIdCommentsCommentId(args: {
  param: { userId: string; postId: number; commentId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['posts'][':postId']['comments'][':commentId']['$get'](
    args,
  )
}

/**
 * GET /params-test/{pathParam}
 */
export async function getParamsTestPathParam(args: {
  param: { pathParam: string }
  query: { queryParam?: string }
  header: { 'X-Header-Param'?: string }
  cookie: { session_id?: string }
  options?: ClientRequestOptions
}) {
  return await client['params-test'][':pathParam']['$get'](args)
}

/**
 * POST /no-content
 */
export async function postNoContent(args?: { options?: ClientRequestOptions }) {
  return await client['no-content']['$post'](args)
}

/**
 * GET /multi-content
 */
export async function getMultiContent(args?: { options?: ClientRequestOptions }) {
  return await client['multi-content']['$get'](args)
}

/**
 * POST /multi-content
 */
export async function postMultiContent(args: {
  form: { file?: File; metadata?: string } | { field1?: string; field2?: string }
  json: { data?: {} }
  options?: ClientRequestOptions
}) {
  return await client['multi-content']['$post'](args)
}

/**
 * GET /response-ranges
 */
export async function getResponseRanges(args?: { options?: ClientRequestOptions }) {
  return await client['response-ranges']['$get'](args)
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export async function getDeprecated(args?: { options?: ClientRequestOptions }) {
  return await client.deprecated.$get(args)
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export async function getNoOperationId(args?: { options?: ClientRequestOptions }) {
  return await client['no-operation-id']['$get'](args)
}

/**
 * POST /empty-body
 */
export async function postEmptyBody(args: { json: {}; options?: ClientRequestOptions }) {
  return await client['empty-body']['$post'](args)
}

/**
 * GET /circular
 */
export async function getCircular(args?: { options?: ClientRequestOptions }) {
  return await client.circular.$get(args)
}

/**
 * GET /deep-nesting
 */
export async function getDeepNesting(args?: { options?: ClientRequestOptions }) {
  return await client['deep-nesting']['$get'](args)
}

/**
 * GET /array-params
 */
export async function getArrayParams(args: {
  query: { ids?: string[]; tags?: string[]; values?: number[]; coords?: number[] }
  options?: ClientRequestOptions
}) {
  return await client['array-params']['$get'](args)
}

/**
 * GET /object-param
 */
export async function getObjectParam(args: {
  query: { filter?: { name?: string; minPrice?: number; maxPrice?: number } }
  options?: ClientRequestOptions
}) {
  return await client['object-param']['$get'](args)
}
