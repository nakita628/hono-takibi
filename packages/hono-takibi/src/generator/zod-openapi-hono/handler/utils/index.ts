/**
 * Generates a route handler function declaration.
 *
 * @param handlerName - The name of the handler function.
 * @param routeName - The name of the route definition.
 * @returns The TypeScript code string for the handler function.
 */
export function handler(handlerName: string, routeName: string): string {
  return `export const ${handlerName}:RouteHandler<typeof ${routeName}>=async(c)=>{}`
}

/**
 * Generates import statements for handler functions.
 *
 * @param handlerImportsMap - A map from file names to handler names.
 * @param output - The output file path (e.g., 'api.ts').
 * @returns An array of import statement strings.
 */
export function importHandlers(
  handlerImportsMap: { [fileName: string]: string[] },
  output: `${string}.ts`,
): string[] {
  const importHandlers: string[] = []
  for (const [fileName, handlers] of Object.entries(handlerImportsMap)) {
    const uniqueHandlers = Array.from(new Set(handlers))

    const replacePath = output?.replace(/\/[^/]+\.ts$/, '')
    const dirPath = replacePath === undefined ? '.' : replacePath
    const handlerPath = 'handlers'
    if (dirPath === '.') {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from '${handlerPath}/${fileName}'`,
      )
    } else {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from './${handlerPath}/${fileName}'`,
      )
    }
  }
  return importHandlers
}

/**
 * Groups route handlers by file name.
 *
 * @param handlers - An array of route handler definitions including file name, test file name, contents, and route names.
 * @returns A deduplicated array of grouped handler definitions per file.
 */
export function groupHandlersByFileName(
  handlers: {
    fileName: `${string}.ts`
    testFileName: `${string}.ts`
    routeHandlerContents: string[]
    routeNames: string[]
  }[],
): {
  fileName: `${string}.ts`
  testFileName: `${string}.ts`
  routeHandlerContents: string[]
  routeNames: string[]
}[] {
  return Array.from(
    handlers
      .reduce((acc, handler) => {
        const existing = acc.get(handler.fileName)
        const mergedHandler = {
          fileName: handler.fileName,
          testFileName: handler.testFileName,
          routeHandlerContents: existing
            ? [...existing.routeHandlerContents, ...handler.routeHandlerContents]
            : [...handler.routeHandlerContents],
          routeNames: existing
            ? [...existing.routeNames, ...handler.routeNames]
            : [...handler.routeNames],
        }
        return acc.set(handler.fileName, mergedHandler)
      }, new Map())
      .values(),
  )
}

/**
 * Generates a map of handler file names to handler names.
 *
 * @param handlerMaps - Array of route mappings including route name, handler name, and path.
 * @returns A map where keys are handler file names and values are arrays of handler names.
 */
export function getHandlerImports(
  handlerMaps: {
    routeName: string
    handlerName: string
    path: string
  }[],
): { [fileName: `${string}.ts`]: string[] } {
  const getHandlerImports: { [fileName: string]: string[] } = {}
  for (const { handlerName, path } of handlerMaps) {
    const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''
    const pathName = (rawSegment === '' ? 'index' : rawSegment)
      .replace(/\{([^}]+)\}/g, '$1')
      .replace(/[^0-9A-Za-z._-]/g, '_')
      .replace(/^[._-]+|[._-]+$/g, '')
      .replace(/__+/g, '_')
      .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
    const fileName = pathName.length === 0 ? 'indexHandler.ts' : `${pathName}Handler.ts`
    if (!getHandlerImports[fileName]) {
      getHandlerImports[fileName] = []
    }
    getHandlerImports[fileName].push(handlerName)
  }
  return getHandlerImports
}
