import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export async function postPolymorphic(args: {
  json:
    | ({ type: string } & { livesLeft?: number })
    | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' })
  options?: ClientRequestOptions
}) {
  return await client.polymorphic.$post(args)
}

/**
 * GET /search
 *
 * Search with complex query
 */
export async function getSearch(args: {
  query: { q: string; filter?: string | string[]; exclude?: unknown }
  options?: ClientRequestOptions
}) {
  return await client.search.$get(args)
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export async function putMultiStep(args: {
  json: { id: string; metadata?: { [key: string]: string } | null } & { step?: number }
  options?: ClientRequestOptions
}) {
  return await client['multi-step']['$put'](args)
}
