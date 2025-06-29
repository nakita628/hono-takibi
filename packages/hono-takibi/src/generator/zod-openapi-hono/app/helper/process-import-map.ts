/**
 * Process import map
 * @param { { routeName: string, handlerName: string, path: string }[] } routeMappings - Route mappings
 * @returns { { [importPath: string]: string[] } } Import map
 */
export function processImportMap(
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
