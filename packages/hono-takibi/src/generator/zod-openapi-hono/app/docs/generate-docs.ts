import type { OpenAPISpec } from '../../../../type'

/**
 * Generate docs
 * @param { OpenAPISpec } openAPISpec - OpenAPI spec
 * @returns { { openapi: string | undefined, info: OpenAPISpec['info'], servers: OpenAPISpec['servers'], externalDocs: OpenAPISpec['externalDocs'], tags: OpenAPISpec['tags'] } } Docs
 */
export function generateDocs(openAPISpec: OpenAPISpec): {
  openapi: string | undefined
  info: OpenAPISpec['info']
  servers: OpenAPISpec['servers']
  externalDocs: OpenAPISpec['externalDocs']
  tags: OpenAPISpec['tags']
} {
  return {
    openapi: openAPISpec.openapi,
    info: openAPISpec.info,
    servers: openAPISpec.servers,
    externalDocs: openAPISpec.externalDocs,
    tags: openAPISpec.tags,
  }
}
