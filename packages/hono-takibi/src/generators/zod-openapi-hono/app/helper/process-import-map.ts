import type { Config } from '../../../../config'

export function processImportMap(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
  config: Config,
) {
  const importsMap: { [importPath: string]: string[] } = {}
  for (const { routeName } of routeMappings) {
    const path = config.output
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
