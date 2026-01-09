import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export async function getTrees(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.trees.$get(args, options)
}

/**
 * POST /trees
 */
export async function postTrees(
  args: {
    json: {
      id: string
      value: string
      parent?: unknown
      children?: unknown[]
      metadata?: { [key: string]: unknown }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.trees.$post(args, options)
}

/**
 * GET /graphs
 */
export async function getGraphs(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.graphs.$get(args, options)
}

/**
 * GET /linked-lists
 */
export async function getLinkedLists(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['linked-lists']['$get'](args, options)
}

/**
 * GET /social-network
 */
export async function getSocialNetwork(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['social-network']['$get'](args, options)
}

/**
 * GET /file-system
 */
export async function getFileSystem(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['file-system']['$get'](args, options)
}

/**
 * GET /comments
 */
export async function getComments(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.comments.$get(args, options)
}

/**
 * GET /polymorphic
 */
export async function getPolymorphic(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.polymorphic.$get(args, options)
}

/**
 * GET /categories
 */
export async function getCategories(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.categories.$get(args, options)
}

/**
 * GET /workflow
 */
export async function getWorkflow(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.workflow.$get(args, options)
}
