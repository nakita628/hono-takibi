import path from 'node:path'

import { emit } from '../../emit/index.js'
import { componentsCode } from '../../generator/zod-openapi-hono/openapi/components/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function components(openAPI: OpenAPI, output: string, readonly?: boolean) {
  if (!openAPI.components) return { ok: true, value: 'No components found' } as const
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
  if (code.length === 0) return { ok: true, value: 'No components found' } as const
  const needsCreateRoute = code.includes('createRoute(')
  const imports = needsCreateRoute ? 'createRoute,z' : 'z'
  const withImports = `import{${imports}}from'@hono/zod-openapi'\n\n${code}`
  const emitResult = await emit(withImports, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated components code written to ${output}` } as const
}
