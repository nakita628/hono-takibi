import type { OpenAPI } from '../../../../openapi/index.js'

export function docs(openapi: OpenAPI): {
  openapi: string | undefined
  info: OpenAPI['info']
  servers: OpenAPI['servers']
  externalDocs: OpenAPI['externalDocs']
  tags: OpenAPI['tags']
} {
  return {
    openapi: openapi.openapi,
    info: openapi.info,
    servers: openapi.servers,
    externalDocs: openapi.externalDocs,
    tags: openapi.tags,
  }
}
