import type { Config } from '../../../../config'

export function generateImportHandlers(
  handlerImportsMap: { [fileName: string]: string[] },
  config: Config,
) {
  const importHandlers: string[] = []
  for (const [fileName, handlers] of Object.entries(handlerImportsMap)) {
    const uniqueHandlers = Array.from(new Set(handlers))
    if (config?.handler?.output === true) {
      const replacePath = config?.output?.replace(/\/[^/]+\.ts$/, '')
      const dirPath = replacePath === undefined ? '.' : replacePath
      const handlerPath = dirPath === 'index.ts' ? 'handler' : `${dirPath}/handler`
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from '${handlerPath}/${fileName}';`,
      )
    }
  }
  return importHandlers
}
