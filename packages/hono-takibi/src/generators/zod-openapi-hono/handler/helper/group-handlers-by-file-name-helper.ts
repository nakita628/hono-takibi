import type { HandlerOutput } from '../generate-zod-openapi-hono-handler'

type HandlerMap = Map<string, HandlerOutput>

export function groupHandlersByFileNameHelper(handlers: HandlerOutput[]): HandlerOutput[] {
  return Array.from(
    handlers.reduce<HandlerMap>((acc, handler) => {
      const existing = acc.get(handler.fileName)
      const mergedHandler: HandlerOutput = {
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
    .values()
  )
}