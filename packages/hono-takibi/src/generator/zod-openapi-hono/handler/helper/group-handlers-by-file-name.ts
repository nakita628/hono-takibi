export function groupHandlersByFileName(
  handlers: {
    fileName: `${string}.ts`
    testFileName: `${string}.ts`
    routeHandlerContents: string[]
    routeNames: string[]
  }[],
): {
  fileName: `${string}.ts`
  testFileName: `${string}.ts`
  routeHandlerContents: string[]
  routeNames: string[]
}[] {
  return Array.from(
    handlers
      .reduce((acc, handler) => {
        const existing = acc.get(handler.fileName)
        const mergedHandler = {
          fileName: handler.fileName,
          testFileName: handler.testFileName,
          routeHandlerContents: existing
            ? [...existing.routeHandlerContents, ...handler.routeHandlerContents]
            : [...handler.routeHandlerContents],
          routeNames: existing
            ? [...existing.routeNames, ...handler.routeNames]
            : [...handler.routeNames],
        }
        return acc.set(handler.fileName, mergedHandler)
      }, new Map())
      .values(),
  )
}
