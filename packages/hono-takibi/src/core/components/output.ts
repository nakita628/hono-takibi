import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { componentsCode } from '../../generator/zod-openapi-hono/openapi/components/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function components(openAPI: OpenAPI, output: string, readonly?: boolean) {
  return Effect.gen(function* () {
    if (!openAPI.components) return 'No components found'
    const code = componentsCode(openAPI.components, {
      ...(readonly !== undefined ? { readonly } : {}),
      exportSchemas: true,
      exportSchemasTypes: false,
      exportResponses: true,
      exportParameters: true,
      exportParametersTypes: false,
      exportExamples: true,
      exportRequestBodies: true,
      exportHeaders: true,
      exportHeadersTypes: false,
      exportSecuritySchemes: true,
      exportLinks: true,
      exportCallbacks: true,
      exportPathItems: true,
      exportMediaTypes: true,
      exportMediaTypesTypes: false,
    })
    if (code.length === 0) return 'No components found'
    const needsCreateRoute = code.includes('createRoute(')
    const imports = needsCreateRoute ? 'createRoute,z' : 'z'
    const withImports = `import{${imports}}from'@hono/zod-openapi'\n\n${code}`
    yield* emit(withImports, path.dirname(output), output)
    return `Generated components code written to ${output}`
  })
}
