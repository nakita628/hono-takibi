import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function takibi(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  componentsOptions: {
    readonly readonly?: boolean
    readonly exportSchemas: boolean
    readonly exportSchemasTypes: boolean
    readonly exportResponses: boolean
    readonly exportParameters: boolean
    readonly exportParametersTypes: boolean
    readonly exportExamples: boolean
    readonly exportRequestBodies: boolean
    readonly exportHeaders: boolean
    readonly exportHeadersTypes: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
    readonly exportPathItems: boolean
    readonly exportMediaTypes: boolean
    readonly exportMediaTypesTypes: boolean
  },
) {
  return Effect.gen(function* () {
    yield* emit(zodOpenAPIHono(openAPI, componentsOptions), path.dirname(output), output)
    return `🔥 Generated code written to ${output}`
  })
}
