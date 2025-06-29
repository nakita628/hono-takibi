/**
 * Generate import handlers
 * @param { { [fileName: string]: string[] } } handlerImportsMap - Handler imports map
 * @param { string } output - Output file path
 * @returns { string[] } Import handlers
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
