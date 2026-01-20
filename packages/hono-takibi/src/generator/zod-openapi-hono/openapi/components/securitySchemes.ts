import { makeConst } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component security schemes.
 *
 * Converts security scheme definitions to JavaScript object constants
 * containing the raw security scheme configuration.
 *
 * @param components - The OpenAPI components object.
 * @param exportSecuritySchemes - Whether to export the security scheme constants.
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns A string of TypeScript code with security scheme definitions.
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
  readonly?: boolean | undefined,
): string {
  const { securitySchemes } = components
  if (!securitySchemes) return ''

  const asConst = readonly ? ' as const' : ''
  return Object.keys(securitySchemes)
    .map((k) => {
      return `${makeConst(exportSecuritySchemes, k, 'SecurityScheme')}${JSON.stringify(securitySchemes[k])}${asConst}`
    })
    .join('\n\n')
}
