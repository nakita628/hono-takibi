import type { HandlerOutput } from '../zod-openapi-hono-handler.js'

type HandlerMap = Map<string, HandlerOutput>

/**
 * Group handlers by file name helper
 * @param { HandlerOutput[] } handlers - Handlers
 * @returns { HandlerOutput[] } Grouped handlers
 */
export function groupHandlersByFileNameHelper(handlers: HandlerOutput[]): HandlerOutput[] {
  return Array.from(
    handlers
      .reduce<HandlerMap>((acc, handler) => {
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
      .values(),
  )
}
