import { client } from '../index.ts'

/**
 * GET /entities
 */
export async function getEntities(params: {
  query: {
    filter: {
      field?: string
      operator?:
        | 'eq'
        | 'ne'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'in'
        | 'nin'
        | 'contains'
        | 'startsWith'
        | 'endsWith'
      value?: string | number | boolean | string[]
      and?: unknown[]
      or?: unknown[]
    }
    page: { page?: number; perPage?: number; cursor?: string }
    sort: { field?: string; direction?: 'asc' | 'desc' }[]
  }
}) {
  return await client.entities.$get({ query: params.query })
}

/**
 * POST /entities
 */
export async function postEntities() {
  return await client.entities.$post()
}

/**
 * GET /entities/{entityId}
 */
export async function getEntitiesEntityId(params: {
  path: { entityId: string }
  query: { include: ('parent' | 'children' | 'owner' | 'members')[] }
}) {
  return await client.entities[':entityId'].$get({ param: params.path, query: params.query })
}

/**
 * PUT /entities/{entityId}
 */
export async function putEntitiesEntityId(params: { path: { entityId: string } }) {
  return await client.entities[':entityId'].$put({ param: params.path })
}

/**
 * DELETE /entities/{entityId}
 */
export async function deleteEntitiesEntityId(params: { path: { entityId: string } }) {
  return await client.entities[':entityId'].$delete({ param: params.path })
}

/**
 * GET /entities/{entityId}/relationships
 */
export async function getEntitiesEntityIdRelationships(params: { path: { entityId: string } }) {
  return await client.entities[':entityId'].relationships.$get({ param: params.path })
}

/**
 * POST /entities/{entityId}/relationships
 */
export async function postEntitiesEntityIdRelationships(params: { path: { entityId: string } }) {
  return await client.entities[':entityId'].relationships.$post({ param: params.path })
}

/**
 * POST /batch
 */
export async function postBatch() {
  return await client.batch.$post()
}
