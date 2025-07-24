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
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${normalizedPath}'`)
    } else {
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${importPath}'`)
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

/**
 * Generates an import map that associates route names with their corresponding import file path.
 *
 * This is useful for dynamically constructing import statements in code generation,
 * ensuring that each route is grouped under its appropriate file.
 *
 * @param routeMappings - An array of route mapping objects containing route name, handler name, and path.
 * @param output - The output TypeScript file name (e.g., 'user.ts'). Used to determine the import path.
 * @returns A record where each key is an import path (e.g., 'user.ts') and the value is an array of route names imported from that path.
 */
export function importMap(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
  output: `${string}.ts`,
): { [importPath: `${string}.ts`]: string[] } {
  const importsMap: { [importPath: string]: string[] } = {}
  for (const { routeName } of routeMappings) {
    const match = output.match(/[^/]+\.ts$/)
    const importPath = match ? match[0] : output

    if (!importsMap[importPath]) {
      importsMap[importPath] = []
    }
    importsMap[importPath].push(routeName)
  }

  return importsMap
}

/**
 * Generates the application route handlers.
 *
 * @param routeMappings - An array of route definitions with route and handler names.
 * @returns A string of `.openapi(...)` calls joined by newline.
 */
export function applyOpenapiRoutes(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
) {
  return routeMappings
    .map(({ routeName, handlerName }) => {
      return `.openapi(${routeName},${handlerName})`
    })
    .join('\n')
}
