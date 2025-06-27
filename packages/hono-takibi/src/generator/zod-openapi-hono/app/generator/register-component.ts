import type { SecuritySchemes } from '../../../../openapi/index.js'

/**
 * Generate register component
 * @param { SecuritySchemes } securitySchemes - Security schemes
 * @returns { string } Register component
 */
export function registerComponent(securitySchemes: SecuritySchemes): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
    })
    .join('\n')
}
