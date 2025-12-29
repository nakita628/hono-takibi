import { client } from '../index.ts'

/**
 * GET /resources
 */
export async function getResources() {
  return await client.resources.$get()
}

/**
 * GET /resources/{id}
 */
export async function getResourcesId(params: { path: { id: string } }) {
  return await client.resources[':id'].$get({ param: params.path })
}

/**
 * PUT /resources/{id}
 */
export async function putResourcesId(
  params: { path: { id: string } },
  body: { id?: string; name?: string; data?: {} },
) {
  return await client.resources[':id'].$put({ param: params.path, json: body })
}

/**
 * GET /download/{id}
 */
export async function getDownloadId(params: { path: { id: string } }) {
  return await client.download[':id'].$get({ param: params.path })
}
