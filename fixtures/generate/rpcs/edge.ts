import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export async function postPolymorphic(arg: {
  json:
    | ({ type: string } & { livesLeft?: number })
    | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' })
}) {
  return await client.polymorphic.$post(arg)
}

/**
 * GET /search
 *
 * Search with complex query
 */
export async function getSearch(arg: {
  query: { q: string; filter?: string | string[]; exclude?: unknown }
}) {
  return await client.search.$get(arg)
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export async function putMultiStep(arg: {
  json: { id: string; metadata?: { [key: string]: string } | null } & { step?: number }
}) {
  return await client['multi-step']['$put'](arg)
}
