import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export async function getAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$get'](args, options)
}

/**
 * PUT /all-methods
 */
export async function putAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$put'](args, options)
}

/**
 * POST /all-methods
 */
export async function postAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$post'](args, options)
}

/**
 * DELETE /all-methods
 */
export async function deleteAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$delete'](args, options)
}

/**
 * OPTIONS /all-methods
 */
export async function optionsAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$options'](args, options)
}

/**
 * HEAD /all-methods
 */
export async function headAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$head'](args, options)
}

/**
 * PATCH /all-methods
 */
export async function patchAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$patch'](args, options)
}

/**
 * TRACE /all-methods
 */
export async function traceAllMethods(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-methods']['$trace'](args, options)
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export async function getUsersUserIdPostsPostIdCommentsCommentId(
  args: { param: { userId: string; postId: number; commentId: string } },
  options?: ClientRequestOptions,
) {
  return await client['users'][':userId']['posts'][':postId']['comments'][':commentId']['$get'](
    args,
    options,
  )
}

/**
 * GET /params-test/{pathParam}
 */
export async function getParamsTestPathParam(
  args: {
    param: { pathParam: string }
    query: { queryParam?: string }
    header: { 'X-Header-Param'?: string }
    cookie: { session_id?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['params-test'][':pathParam']['$get'](args, options)
}

/**
 * POST /no-content
 */
export async function postNoContent(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['no-content']['$post'](args, options)
}

/**
 * GET /multi-content
 */
export async function getMultiContent(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['multi-content']['$get'](args, options)
}

/**
 * POST /multi-content
 */
export async function postMultiContent(
  args: {
    form: { file?: File; metadata?: string } | { field1?: string; field2?: string }
    json: { data?: {} }
  },
  options?: ClientRequestOptions,
) {
  return await client['multi-content']['$post'](args, options)
}

/**
 * GET /response-ranges
 */
export async function getResponseRanges(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['response-ranges']['$get'](args, options)
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export async function getDeprecated(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.deprecated.$get(args, options)
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export async function getNoOperationId(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['no-operation-id']['$get'](args, options)
}

/**
 * POST /empty-body
 */
export async function postEmptyBody(args: { json: {} }, options?: ClientRequestOptions) {
  return await client['empty-body']['$post'](args, options)
}

/**
 * GET /circular
 */
export async function getCircular(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.circular.$get(args, options)
}

/**
 * GET /deep-nesting
 */
export async function getDeepNesting(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['deep-nesting']['$get'](args, options)
}

/**
 * GET /array-params
 */
export async function getArrayParams(
  args: { query: { ids?: string[]; tags?: string[]; values?: number[]; coords?: number[] } },
  options?: ClientRequestOptions,
) {
  return await client['array-params']['$get'](args, options)
}

/**
 * GET /object-param
 */
export async function getObjectParam(
  args: { query: { filter?: { name?: string; minPrice?: number; maxPrice?: number } } },
  options?: ClientRequestOptions,
) {
  return await client['object-param']['$get'](args, options)
}
