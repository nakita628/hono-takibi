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
