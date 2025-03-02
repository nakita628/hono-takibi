import type { SecuritySchemes } from '../../../../type'

export function generateRegisterComponent(securitySchemes: SecuritySchemes) {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
    })
    .join('\n')
}
