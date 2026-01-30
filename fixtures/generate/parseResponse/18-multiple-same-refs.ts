import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export async function getDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$get(args, options))
}

/**
 * POST /documents
 */
export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

/**
 * GET /documents/{documentId}
 */
export async function getDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents[':documentId'].$get(args, options))
}

/**
 * PUT /documents/{documentId}
 */
export async function putDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents[':documentId'].$put(args, options))
}

/**
 * GET /documents/{documentId}/versions
 */
export async function getDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents[':documentId'].versions.$get(args, options))
}

/**
 * POST /documents/{documentId}/share
 */
export async function postDocumentsDocumentIdShare(
  args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents[':documentId'].share.$post(args, options))
}

/**
 * GET /users/{userId}/documents
 */
export async function getUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].documents.$get(args, options))
}

/**
 * POST /compare
 */
export async function postCompare(
  args: InferRequestType<typeof client.compare.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.compare.$post(args, options))
}

/**
 * GET /templates
 */
export async function getTemplates(options?: ClientRequestOptions) {
  return await parseResponse(client.templates.$get(undefined, options))
}

/**
 * POST /templates
 */
export async function postTemplates(
  args: InferRequestType<typeof client.templates.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.templates.$post(args, options))
}

/**
 * POST /workflows
 */
export async function postWorkflows(
  args: InferRequestType<typeof client.workflows.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.workflows.$post(args, options))
}
