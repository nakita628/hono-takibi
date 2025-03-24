/**
 * Get handler imports
 * @param { { routeName: string, handlerName: string, path: string }[] } handlerMaps - Handler maps
 * @returns { { [fileName: string]: string[] } } Handler imports
 */
export function getHandlerImports(
  handlerMaps: {
    routeName: string
    handlerName: string
    path: string
  }[],
) {
  const getHandlerImports: { [fileName: string]: string[] } = {}
  for (const { handlerName, path } of handlerMaps) {
    const path_name = path
      .replace(/[\/{}-]/g, ' ')
      .trim()
      .split(/\s+/)[0]

    const fileName = path_name.length === 0 ? 'index_handler.ts' : `${path_name}_handler.ts`

    if (!getHandlerImports[fileName]) {
      getHandlerImports[fileName] = []
    }
    getHandlerImports[fileName].push(handlerName)
  }
  return getHandlerImports
}
