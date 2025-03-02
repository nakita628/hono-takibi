import type { OpenAPISpec } from '../../../../types'

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
