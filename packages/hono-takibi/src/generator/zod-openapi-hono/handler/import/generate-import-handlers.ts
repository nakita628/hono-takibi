import type { Config } from '../../../../config'

/**
 * Generate import handlers
 * @param { { [fileName: string]: string[] } } handlerImportsMap - Handler imports map
 * @param { Config } config - Config
 * @returns { string[] } Import handlers
 */
export function generateImportHandlers(
  handlerImportsMap: { [fileName: string]: string[] },
  config: Config,
) {
  const importHandlers: string[] = []
  for (const [fileName, handlers] of Object.entries(handlerImportsMap)) {
    const uniqueHandlers = Array.from(new Set(handlers))

    const replacePath = config?.output?.replace(/\/[^/]+\.ts$/, '')
    const dirPath = replacePath === undefined ? '.' : replacePath
    const handlerPath = 'handler'
    if (dirPath === '.') {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from '${handlerPath}/${fileName}';`,
      )
    } else {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from './${handlerPath}/${fileName}';`,
      )
    }
  }
  return importHandlers
}
