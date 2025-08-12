import { client } from '../index.ts'

/**
 * Polymorphic object with discriminator
 *
 * POST /polymorphic
 */
export async function postPolymorphic(
  body:
    | ({ type: string } & { livesLeft?: number })
    | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' }),
) {
  return await client.polymorphic.$post({ json: body })
}

/**
 * Search with complex query
 *
 * GET /search
 */
export async function getSearch(params: {
  query: { q: string; filter: string | string[]; exclude: unknown }
}) {
  return await client.search.$get({
    query: { q: params.query.q, filter: params.query.filter, exclude: params.query.exclude },
  })
}

/**
 * Multi-step object definition using allOf
 *
 * PUT /multi-step
 */
export async function putMultiStep(
  body: { id: string; metadata?: { [key: string]: string } | null } & { step?: number },
) {
  return await client['multi-step'].$put({ json: body })
}
