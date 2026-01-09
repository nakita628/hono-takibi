import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export async function getTrees(args?: { options?: ClientRequestOptions }) {
  return await client.trees.$get(args)
}

/**
 * POST /trees
 */
export async function postTrees(args: {
  json: {
    id: string
    value: string
    parent?: unknown
    children?: unknown[]
    metadata?: { [key: string]: unknown }
  }
  options?: ClientRequestOptions
}) {
  return await client.trees.$post(args)
}

/**
 * GET /graphs
 */
export async function getGraphs(args?: { options?: ClientRequestOptions }) {
  return await client.graphs.$get(args)
}

/**
 * GET /linked-lists
 */
export async function getLinkedLists(args?: { options?: ClientRequestOptions }) {
  return await client['linked-lists']['$get'](args)
}

/**
 * GET /social-network
 */
export async function getSocialNetwork(args?: { options?: ClientRequestOptions }) {
  return await client['social-network']['$get'](args)
}

/**
 * GET /file-system
 */
export async function getFileSystem(args?: { options?: ClientRequestOptions }) {
  return await client['file-system']['$get'](args)
}

/**
 * GET /comments
 */
export async function getComments(args?: { options?: ClientRequestOptions }) {
  return await client.comments.$get(args)
}

/**
 * GET /polymorphic
 */
export async function getPolymorphic(args?: { options?: ClientRequestOptions }) {
  return await client.polymorphic.$get(args)
}

/**
 * GET /categories
 */
export async function getCategories(args?: { options?: ClientRequestOptions }) {
  return await client.categories.$get(args)
}

/**
 * GET /workflow
 */
export async function getWorkflow(args?: { options?: ClientRequestOptions }) {
  return await client.workflow.$get(args)
}
