import type { SecuritySchemes } from '../../../../type'

/**
 * Generate register component
 *
 * @function generateRegisterComponent
 * @param securitySchemes - Security schemes
 * @returns register component
 */
export function generateRegisterComponent(securitySchemes: SecuritySchemes) {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
    })
    .join('\n')
}
