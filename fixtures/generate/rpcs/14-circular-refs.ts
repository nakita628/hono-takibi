import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export async function getTrees(options?: ClientRequestOptions) {
  return await client.trees.$get(undefined, options)
}

/**
 * POST /trees
 */
export async function postTrees(
  args: InferRequestType<typeof client.trees.$post>,
  options?: ClientRequestOptions,
) {
  return await client.trees.$post(args, options)
}

/**
 * GET /graphs
 */
export async function getGraphs(options?: ClientRequestOptions) {
  return await client.graphs.$get(undefined, options)
}

/**
 * GET /linked-lists
 */
export async function getLinkedLists(options?: ClientRequestOptions) {
  return await client['linked-lists'].$get(undefined, options)
}

/**
 * GET /social-network
 */
export async function getSocialNetwork(options?: ClientRequestOptions) {
  return await client['social-network'].$get(undefined, options)
}

/**
 * GET /file-system
 */
export async function getFileSystem(options?: ClientRequestOptions) {
  return await client['file-system'].$get(undefined, options)
}

/**
 * GET /comments
 */
export async function getComments(options?: ClientRequestOptions) {
  return await client.comments.$get(undefined, options)
}

/**
 * GET /polymorphic
 */
export async function getPolymorphic(options?: ClientRequestOptions) {
  return await client.polymorphic.$get(undefined, options)
}

/**
 * GET /categories
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await client.categories.$get(undefined, options)
}

/**
 * GET /workflow
 */
export async function getWorkflow(options?: ClientRequestOptions) {
  return await client.workflow.$get(undefined, options)
}
