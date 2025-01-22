import { HandlerOutput } from '../generate-zod-openapi-hono-handler'

export function groupHandlersByFileNameHelper(handlers: HandlerOutput[]): HandlerOutput[] {
  const mergedMap = new Map<string, HandlerOutput>()

  for (const handler of handlers) {
    if (mergedMap.has(handler.fileName)) {
      const existing = mergedMap.get(handler.fileName)!
      existing.routeHandlerContents.push(...handler.routeHandlerContents)
    } else {
      mergedMap.set(handler.fileName, {
        fileName: handler.fileName,
        testFileName: handler.testFileName,
        routeHandlerContents: [...handler.routeHandlerContents],
      })
    }
  }

  return Array.from(mergedMap.values())
}
