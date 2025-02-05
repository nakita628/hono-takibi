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
    const importPath = config.output
    if (!importPath) {
      throw new Error('Output path is required')
    }
    if (!importsMap[importPath]) {
      importsMap[importPath] = []
    }
    importsMap[importPath].push(routeName)
  }

  return importsMap
}
