import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'

const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const securitySchemeConstName = (key: string): string =>
  toIdentifier(ensureSuffix(key, 'SecurityScheme'))

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
