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
) {
  const importsMap: { [importPath: string]: string[] } = {}
  for (const { routeName } of routeMappings) {
    const path = output
    if (!path) {
      throw new Error('Output path is required')
    }

    const match = path.match(/[^/]+\.ts$/)
    const importPath = match ? match[0] : path

    if (!importsMap[importPath]) {
      importsMap[importPath] = []
    }
    importsMap[importPath].push(routeName)
  }

  return importsMap
}
