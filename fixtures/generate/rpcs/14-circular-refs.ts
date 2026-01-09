import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export async function getTrees() {
  return await client.trees.$get()
}

/**
 * POST /trees
 */
export async function postTrees(arg: {
  json: {
    id: string
    value: string
    parent?: unknown
    children?: unknown[]
    metadata?: { [key: string]: unknown }
  }
}) {
  return await client.trees.$post(arg)
}

/**
 * GET /graphs
 */
export async function getGraphs() {
  return await client.graphs.$get()
}

/**
 * GET /linked-lists
 */
export async function getLinkedLists() {
  return await client['linked-lists']['$get']()
}

/**
 * GET /social-network
 */
export async function getSocialNetwork() {
  return await client['social-network']['$get']()
}

/**
 * GET /file-system
 */
export async function getFileSystem() {
  return await client['file-system']['$get']()
}

/**
 * GET /comments
 */
export async function getComments() {
  return await client.comments.$get()
}

/**
 * GET /polymorphic
 */
export async function getPolymorphic() {
  return await client.polymorphic.$get()
}

/**
 * GET /categories
 */
export async function getCategories() {
  return await client.categories.$get()
}

/**
 * GET /workflow
 */
export async function getWorkflow() {
  return await client.workflow.$get()
}
