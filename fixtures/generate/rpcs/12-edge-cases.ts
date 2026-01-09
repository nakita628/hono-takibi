import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export async function getAllMethods() {
  return await client['all-methods']['$get']()
}

/**
 * PUT /all-methods
 */
export async function putAllMethods() {
  return await client['all-methods']['$put']()
}

/**
 * POST /all-methods
 */
export async function postAllMethods() {
  return await client['all-methods']['$post']()
}

/**
 * DELETE /all-methods
 */
export async function deleteAllMethods() {
  return await client['all-methods']['$delete']()
}

/**
 * OPTIONS /all-methods
 */
export async function optionsAllMethods() {
  return await client['all-methods']['$options']()
}

/**
 * HEAD /all-methods
 */
export async function headAllMethods() {
  return await client['all-methods']['$head']()
}

/**
 * PATCH /all-methods
 */
export async function patchAllMethods() {
  return await client['all-methods']['$patch']()
}

/**
 * TRACE /all-methods
 */
export async function traceAllMethods() {
  return await client['all-methods']['$trace']()
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export async function getUsersUserIdPostsPostIdCommentsCommentId(arg: {
  param: { userId: string; postId: number; commentId: string }
}) {
  return await client['users'][':userId']['posts'][':postId']['comments'][':commentId']['$get'](arg)
}

/**
 * GET /params-test/{pathParam}
 */
export async function getParamsTestPathParam(arg: {
  param: { pathParam: string }
  query: { queryParam?: string }
  header: { 'X-Header-Param'?: string }
  cookie: { session_id?: string }
}) {
  return await client['params-test'][':pathParam']['$get'](arg)
}

/**
 * POST /no-content
 */
export async function postNoContent() {
  return await client['no-content']['$post']()
}

/**
 * GET /multi-content
 */
export async function getMultiContent() {
  return await client['multi-content']['$get']()
}

/**
 * POST /multi-content
 */
export async function postMultiContent(arg: {
  form: { file?: File; metadata?: string } | { field1?: string; field2?: string }
  json: { data?: {} }
}) {
  return await client['multi-content']['$post'](arg)
}

/**
 * GET /response-ranges
 */
export async function getResponseRanges() {
  return await client['response-ranges']['$get']()
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export async function getDeprecated() {
  return await client.deprecated.$get()
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export async function getNoOperationId() {
  return await client['no-operation-id']['$get']()
}

/**
 * POST /empty-body
 */
export async function postEmptyBody(arg: { json: {} }) {
  return await client['empty-body']['$post'](arg)
}

/**
 * GET /circular
 */
export async function getCircular() {
  return await client.circular.$get()
}

/**
 * GET /deep-nesting
 */
export async function getDeepNesting() {
  return await client['deep-nesting']['$get']()
}

/**
 * GET /array-params
 */
export async function getArrayParams(arg: {
  query: { ids?: string[]; tags?: string[]; values?: number[]; coords?: number[] }
}) {
  return await client['array-params']['$get'](arg)
}

/**
 * GET /object-param
 */
export async function getObjectParam(arg: {
  query: { filter?: { name?: string; minPrice?: number; maxPrice?: number } }
}) {
  return await client['object-param']['$get'](arg)
}
