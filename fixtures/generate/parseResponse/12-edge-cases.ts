import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export async function getAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$get(undefined, options))
}

/**
 * PUT /all-methods
 */
export async function putAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$put(undefined, options))
}

/**
 * POST /all-methods
 */
export async function postAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$post(undefined, options))
}

/**
 * DELETE /all-methods
 */
export async function deleteAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$delete(undefined, options))
}

/**
 * OPTIONS /all-methods
 */
export async function optionsAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$options(undefined, options))
}

/**
 * HEAD /all-methods
 */
export async function headAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$head(undefined, options))
}

/**
 * PATCH /all-methods
 */
export async function patchAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$patch(undefined, options))
}

/**
 * TRACE /all-methods
 */
export async function traceAllMethods(options?: ClientRequestOptions) {
  return await parseResponse(client['all-methods'].$trace(undefined, options))
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export async function getUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, options),
  )
}

/**
 * GET /params-test/{pathParam}
 */
export async function getParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['params-test'][':pathParam'].$get(args, options))
}

/**
 * POST /no-content
 */
export async function postNoContent(options?: ClientRequestOptions) {
  return await parseResponse(client['no-content'].$post(undefined, options))
}

/**
 * GET /multi-content
 */
export async function getMultiContent(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-content'].$get(undefined, options))
}

/**
 * POST /multi-content
 */
export async function postMultiContent(
  args: InferRequestType<(typeof client)['multi-content']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['multi-content'].$post(args, options))
}

/**
 * GET /response-ranges
 */
export async function getResponseRanges(options?: ClientRequestOptions) {
  return await parseResponse(client['response-ranges'].$get(undefined, options))
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export async function getDeprecated(options?: ClientRequestOptions) {
  return await parseResponse(client.deprecated.$get(undefined, options))
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export async function getNoOperationId(options?: ClientRequestOptions) {
  return await parseResponse(client['no-operation-id'].$get(undefined, options))
}

/**
 * POST /empty-body
 */
export async function postEmptyBody(
  args: InferRequestType<(typeof client)['empty-body']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['empty-body'].$post(args, options))
}

/**
 * GET /circular
 */
export async function getCircular(options?: ClientRequestOptions) {
  return await parseResponse(client.circular.$get(undefined, options))
}

/**
 * GET /deep-nesting
 */
export async function getDeepNesting(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nesting'].$get(undefined, options))
}

/**
 * GET /array-params
 */
export async function getArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['array-params'].$get(args, options))
}

/**
 * GET /object-param
 */
export async function getObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['object-param'].$get(args, options))
}
