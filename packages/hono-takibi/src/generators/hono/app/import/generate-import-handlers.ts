import type { Config } from '../../../../config'

export function generateImportHandlers(
  handlerImportsMap: { [fileName: string]: string[] },
  config: Config,
) {
  const importHandlers: string[] = []
  for (const [fileName, handlers] of Object.entries(handlerImportsMap)) {
    const uniqueHandlers = Array.from(new Set(handlers))
    importHandlers.push(
      `import { ${uniqueHandlers.join(',')} } from './${config?.handler?.output}/${fileName}';`,
    )
  }
  return importHandlers
}
