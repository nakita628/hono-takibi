import { constCode } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

export function securitySchemes(components: Components, exportSecuritySchemes: boolean): string {
  const { securitySchemes } = components
  if (!securitySchemes) return ''

  return Object.keys(securitySchemes)
    .map((k) => {
      return `${constCode(exportSecuritySchemes, k, 'SecurityScheme')}${JSON.stringify(securitySchemes[k])}`
    })
    .join('\n\n')
}
