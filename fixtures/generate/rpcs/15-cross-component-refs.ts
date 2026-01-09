import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export async function getEntities(arg: {
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
}) {
  return await client.entities.$get(arg)
}

/**
 * POST /entities
 */
export async function postEntities(arg: {
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
}) {
  return await client.entities.$post(arg)
}

/**
 * GET /entities/{entityId}
 */
export async function getEntitiesEntityId(arg: {
  param: { entityId: string }
  query: { include?: ('parent' | 'children' | 'owner' | 'members')[] }
  header: { 'If-None-Match'?: string }
}) {
  return await client['entities'][':entityId']['$get'](arg)
}

/**
 * PUT /entities/{entityId}
 */
export async function putEntitiesEntityId(arg: {
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
}) {
  return await client['entities'][':entityId']['$put'](arg)
}

/**
 * DELETE /entities/{entityId}
 */
export async function deleteEntitiesEntityId(arg: {
  param: { entityId: string }
  header: { 'If-Match'?: string }
}) {
  return await client['entities'][':entityId']['$delete'](arg)
}

/**
 * GET /entities/{entityId}/relationships
 */
export async function getEntitiesEntityIdRelationships(arg: { param: { entityId: string } }) {
  return await client['entities'][':entityId']['relationships']['$get'](arg)
}

/**
 * POST /entities/{entityId}/relationships
 */
export async function postEntitiesEntityIdRelationships(arg: {
  param: { entityId: string }
  json: { type: string; targetId: string; meta?: { count?: number; createdAt?: string } }
}) {
  return await client['entities'][':entityId']['relationships']['$post'](arg)
}

/**
 * POST /batch
 */
export async function postBatch(arg: {
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
}) {
  return await client.batch.$post(arg)
}
