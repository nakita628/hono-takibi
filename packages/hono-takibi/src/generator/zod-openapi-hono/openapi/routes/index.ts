import { makeRouteEntries } from '../../../../helper/index.js'
import type { OpenAPI } from '../../../../openapi/index.js'

export function routeCode(openapi: OpenAPI, readonly?: boolean): string {
  return makeRouteEntries(openapi, readonly)
    .map((entry) => entry.code)
    .join('\n\n')
}
