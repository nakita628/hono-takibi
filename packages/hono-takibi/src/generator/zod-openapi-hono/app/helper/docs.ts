import type { OpenAPI } from '../../../../openapi/types.js'

/**
 * Extracts top-level OpenAPI document metadata.
 *
 * @param openapi - The OpenAPI object.
 * @returns A partial object containing `openapi`, `info`, `servers`, `externalDocs`, and `tags` if present.
 */
export function docs(openapi: OpenAPI): Partial<{
  openapi: string
  info: OpenAPI['info']
  servers: OpenAPI['servers']
  externalDocs: OpenAPI['externalDocs']
  tags: OpenAPI['tags']
}> {
  return Object.fromEntries(
    Object.entries({
      openapi: openapi.openapi,
      info: openapi.info,
      servers: openapi.servers,
      externalDocs: openapi.externalDocs,
      tags: openapi.tags,
    }).filter(([, value]) => value !== undefined),
  )
}
