import { client } from '../index.ts'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export async function postPolymorphic(
  body:
    | ({ type: string } & { livesLeft?: number })
    | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' }),
) {
  return await client.polymorphic.$post({ json: body })
}

/**
 * GET /search
 *
 * Search with complex query
 */
export async function getSearch(params: {
  query: { q: string; filter: string | string[]; exclude: unknown }
}) {
  return await client.search.$get({ query: params.query })
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export async function putMultiStep(
  body: { id: string; metadata?: { [key: string]: string } | null } & { step?: number },
) {
  return await client['multi-step'].$put({ json: body })
}
