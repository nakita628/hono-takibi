/**
 * Generate app route handler
 *
 * @param routeName - Route name
 * @param handlerName - Handler function name
 * @returns A string representing the `.openapi()` route handler call
 */
export function appRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName},${handlerName})`
}

/**
 * Generates import statements for route handler modules.
 *
 * @param importsMap - A map where keys are file paths (ending with `.ts`) and values are arrays of exported identifiers.
 * @returns An array of import statements as strings.
 */
export function importRoutes(importsMap: { [importPath: `${string}.ts`]: string[] }) {
  const importRoutes: string[] = []
  for (const [importPath, names] of Object.entries(importsMap)) {
    const uniqueNames = Array.from(new Set(names))
    if (importPath.includes('index.ts')) {
      const normalizedPath = importPath.replace('index.ts', '')
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${normalizedPath}';`)
    } else {
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${importPath}';`)
    }
  }
  return importRoutes
}

/**
 * Generates registration code for OpenAPI security schemes.
 *
 * @param securitySchemes - A record of security scheme definitions.
 * @returns A string of code registering each security scheme to the OpenAPI registry.
 */
export function registerComponent(securitySchemes: {
  [key: string]: {
    type?: string
    name?: string
    scheme?: string
    bearerFormat?: string
  }
}): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
    })
    .join('\n')
}
