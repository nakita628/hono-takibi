import type { SecuritySchemes } from '../../../../type'

/**
 * Generate register component
 * @param { SecuritySchemes } securitySchemes - Security schemes
 * @returns { string } Register component
 */
export function generateRegisterComponent(securitySchemes: SecuritySchemes) {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
    })
    .join('\n')
}
