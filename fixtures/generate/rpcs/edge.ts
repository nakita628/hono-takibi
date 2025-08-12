import { client } from '../index.ts'

/**
 * Polymorphic object with discriminator
 *
 * POST /polymorphic
 */
export async function postPolymorphic(body: any) {
  return await client.polymorphic.$post({ json: body })
}

/**
 * Search with complex query
 *
 * GET /search
 */
export async function getSearch(params: { query: { q: string; filter: any; exclude: any } }) {
  return await client.search.$get({
    query: { q: params.query.q, filter: params.query.filter, exclude: params.query.exclude },
  })
}

/**
 * Multi-step object definition using allOf
 *
 * PUT /multi-step
 */
export async function putMultiStep(body: any) {
  return (await client.multi) - step.$put({ json: body })
}
