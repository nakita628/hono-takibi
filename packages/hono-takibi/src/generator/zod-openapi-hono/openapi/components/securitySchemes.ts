import type { Components } from '../../../../openapi/index.js'
import { declareConst, jsonExpr, securitySchemeConstName } from './helpers.js'

/**
 * Generates TypeScript code for OpenAPI component securitySchemes.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the securityScheme variables.
 * @returns A string of TypeScript code with securityScheme definitions.
 */
export function securitySchemes(components: Components, exportSchema: boolean): string {
  const { securitySchemes } = components
  if (!securitySchemes) return ''

  return Object.keys(securitySchemes)
    .map((key) => {
      const expr = jsonExpr(securitySchemes[key])
      return declareConst(securitySchemeConstName(key), expr, exportSchema)
    })
    .join('\n\n')
}
