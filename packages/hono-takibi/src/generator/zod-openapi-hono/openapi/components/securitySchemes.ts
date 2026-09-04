import { makeConst } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component security schemes.
 *
 * Converts security scheme definitions to JavaScript object constants
 * containing the raw security scheme configuration.
 *
 *
 * @example
 * ```ts
 * securitySchemesCode(components, true)
 * // → 'export const BearerAuthSecurityScheme = {"type":"http","scheme":"bearer"}'
 *
 * securitySchemesCode(components, true, true)
 * // → 'export const BearerAuthSecurityScheme = {"type":"http","scheme":"bearer"} as const'
 * ```
 */
export function securitySchemesCode(
  components: Components,
  exportSecuritySchemes: boolean,
  readonly?: boolean,
) {
  const { securitySchemes } = components
  if (!securitySchemes) return ''
  const asConst = readonly ? ' as const' : ''
  return Object.keys(securitySchemes)
    .map(
      (k) =>
        `${makeConst(exportSecuritySchemes, k, 'SecurityScheme')}${JSON.stringify(securitySchemes[k])}${asConst}`,
    )
    .join('\n\n')
}
