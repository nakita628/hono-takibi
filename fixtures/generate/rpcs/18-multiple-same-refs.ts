import type { InferRequestType } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export async function getDocuments(arg: InferRequestType<typeof client.documents.$get>) {
  return await client.documents.$get(arg)
}

/**
 * POST /documents
 */
export async function postDocuments(arg: InferRequestType<typeof client.documents.$post>) {
  return await client.documents.$post(arg)
}

/**
 * GET /documents/{documentId}
 */
export async function getDocumentsDocumentId(
  arg: InferRequestType<(typeof client)['documents'][':documentId']['$get']>,
) {
  return await client['documents'][':documentId']['$get'](arg)
}

/**
 * PUT /documents/{documentId}
 */
export async function putDocumentsDocumentId(
  arg: InferRequestType<(typeof client)['documents'][':documentId']['$put']>,
) {
  return await client['documents'][':documentId']['$put'](arg)
}

/**
 * GET /documents/{documentId}/versions
 */
export async function getDocumentsDocumentIdVersions(
  arg: InferRequestType<(typeof client)['documents'][':documentId']['versions']['$get']>,
) {
  return await client['documents'][':documentId']['versions']['$get'](arg)
}

/**
 * POST /documents/{documentId}/share
 */
export async function postDocumentsDocumentIdShare(
  arg: InferRequestType<(typeof client)['documents'][':documentId']['share']['$post']>,
) {
  return await client['documents'][':documentId']['share']['$post'](arg)
}

/**
 * GET /users/{userId}/documents
 */
export async function getUsersUserIdDocuments(
  arg: InferRequestType<(typeof client)['users'][':userId']['documents']['$get']>,
) {
  return await client['users'][':userId']['documents']['$get'](arg)
}

/**
 * POST /compare
 */
export async function postCompare(arg: InferRequestType<typeof client.compare.$post>) {
  return await client.compare.$post(arg)
}

/**
 * GET /templates
 */
export async function getTemplates() {
  return await client.templates.$get()
}

/**
 * POST /templates
 */
export async function postTemplates(arg: InferRequestType<typeof client.templates.$post>) {
  return await client.templates.$post(arg)
}

/**
 * POST /workflows
 */
export async function postWorkflows(arg: InferRequestType<typeof client.workflows.$post>) {
  return await client.workflows.$post(arg)
}
