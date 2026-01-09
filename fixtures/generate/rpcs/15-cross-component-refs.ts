import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export async function getEntities(
  args: {
    query: {
      filter?: {
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
        value?: string | number | string | string[]
        and?: unknown[]
        or?: unknown[]
      }
      page?: { page?: number; perPage?: number; cursor?: string }
      sort?: { field?: string; direction?: 'asc' | 'desc' }[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.entities.$get(args, options)
}

/**
 * POST /entities
 */
export async function postEntities(
  args: {
    header: { 'Idempotency-Key'?: string }
    json: {
      type: 'user' | 'organization' | 'project' | 'resource'
      attributes: {
        name?: string
        description?: string
        status?: 'active' | 'inactive' | 'pending' | 'archived'
        tags?: { key: string; value: string }[]
        customFields?: {
          [key: string]: string | number | boolean | string[] | { [key: string]: unknown }
        }
      }
      relationships?: {
        parent?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        children?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        owner?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        members?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
      }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.entities.$post(args, options)
}

/**
 * GET /entities/{entityId}
 */
export async function getEntitiesEntityId(
  args: {
    param: { entityId: string }
    query: { include?: ('parent' | 'children' | 'owner' | 'members')[] }
    header: { 'If-None-Match'?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['entities'][':entityId']['$get'](args, options)
}

/**
 * PUT /entities/{entityId}
 */
export async function putEntitiesEntityId(
  args: {
    param: { entityId: string }
    header: { 'If-Match'?: string }
    json: {
      attributes?: {
        name?: string
        description?: string
        status?: 'active' | 'inactive' | 'pending' | 'archived'
        tags?: { key: string; value: string }[]
        customFields?: {
          [key: string]: string | number | boolean | string[] | { [key: string]: unknown }
        }
      }
      relationships?: {
        parent?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        children?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        owner?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
        members?: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
          links?: { self?: string; related?: string }
          meta?: { count?: number; createdAt?: string }
        }
      }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['entities'][':entityId']['$put'](args, options)
}

/**
 * DELETE /entities/{entityId}
 */
export async function deleteEntitiesEntityId(
  args: { param: { entityId: string }; header: { 'If-Match'?: string } },
  options?: ClientRequestOptions,
) {
  return await client['entities'][':entityId']['$delete'](args, options)
}

/**
 * GET /entities/{entityId}/relationships
 */
export async function getEntitiesEntityIdRelationships(
  args: { param: { entityId: string } },
  options?: ClientRequestOptions,
) {
  return await client['entities'][':entityId']['relationships']['$get'](args, options)
}

/**
 * POST /entities/{entityId}/relationships
 */
export async function postEntitiesEntityIdRelationships(
  args: {
    param: { entityId: string }
    json: { type: string; targetId: string; meta?: { count?: number; createdAt?: string } }
  },
  options?: ClientRequestOptions,
) {
  return await client['entities'][':entityId']['relationships']['$post'](args, options)
}

/**
 * POST /batch
 */
export async function postBatch(
  args: {
    json: {
      operations: {
        id?: string
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
        path: string
        headers?: { [key: string]: string }
        body?:
          | {
              type: 'user' | 'organization' | 'project' | 'resource'
              attributes: {
                name?: string
                description?: string
                status?: 'active' | 'inactive' | 'pending' | 'archived'
                tags?: { key: string; value: string }[]
                customFields?: {
                  [key: string]: string | number | boolean | string[] | { [key: string]: unknown }
                }
              }
              relationships?: {
                parent?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                children?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                owner?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                members?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
              }
            }
          | {
              attributes?: {
                name?: string
                description?: string
                status?: 'active' | 'inactive' | 'pending' | 'archived'
                tags?: { key: string; value: string }[]
                customFields?: {
                  [key: string]: string | number | boolean | string[] | { [key: string]: unknown }
                }
              }
              relationships?: {
                parent?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                children?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                owner?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
                members?: {
                  data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
                  links?: { self?: string; related?: string }
                  meta?: { count?: number; createdAt?: string }
                }
              }
            }
      }[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.batch.$post(args, options)
}
