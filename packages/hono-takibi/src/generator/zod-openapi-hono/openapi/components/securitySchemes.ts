import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'

export function securitySchemes(components: Components, exportSecuritySchemes: boolean): string {
  const { securitySchemes } = components
  if (!securitySchemes) return ''

  return Object.keys(securitySchemes)
    .map((k) => {
      return `${exportSecuritySchemes ? 'export const' : 'const'} ${toIdentifierPascalCase(ensureSuffix(k, 'SecurityScheme'))} = ${JSON.stringify(securitySchemes[k])}`
    })
    .join('\n\n')
}
