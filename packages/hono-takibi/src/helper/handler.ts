import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { isHttpMethod, methodPath } from '../utils/index.js'

/**
 * Generates route handler files for a Hono app using Zod and OpenAPI.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding empty test files.
 * @returns A `Result` indicating success or error with message.
 */
export async function zodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  test: boolean,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const paths: OpenAPI['paths'] = openapi.paths

  const handlers: readonly {
    readonly baseName: string
    readonly routeHandlerContents: string[]
    readonly routeNames: string[]
  }[] = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem)
      .filter(([m]) => isHttpMethod(m))
      .map(([method]) => {
        const routeId = methodPath(method, p)
        const routeHandlerContent = `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`

        const rawSegment = p.replace(/^\/+/, '').split('/')[0] ?? ''
        const sanitized = rawSegment
          .replace(/\{([^}]+)\}/g, '$1')
          .replace(/[^0-9A-Za-z._-]/g, '_')
          .replace(/^[._-]+|[._-]+$/g, '')
          .replace(/__+/g, '_')
          .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())

        const baseName = sanitized === '' ? '__root' : sanitized

        return {
          baseName,
          routeHandlerContents: [routeHandlerContent],
          routeNames: [`${routeId}Route`],
        } satisfies {
          readonly baseName: string
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
        }
      }),
  )

  const mergedHandlers: readonly {
    readonly baseName: string
    readonly routeHandlerContents: string[]
    readonly routeNames: string[]
  }[] = Array.from(
    handlers
      .reduce<
        Map<
          string,
          {
            readonly baseName: string
            readonly routeHandlerContents: string[]
            readonly routeNames: string[]
          }
        >
      >((map, h) => {
        const prev = map.get(h.baseName)
        const next: {
          readonly baseName: string
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
        } = prev
          ? {
              baseName: h.baseName,
              routeHandlerContents: [...prev.routeHandlerContents, ...h.routeHandlerContents],
              routeNames: Array.from(new Set([...prev.routeNames, ...h.routeNames])),
            }
          : {
              baseName: h.baseName,
              routeHandlerContents: [...h.routeHandlerContents],
              routeNames: [...h.routeNames],
            }
        map.set(h.baseName, next)
        return map
      }, new Map())
      .values(),
  )

  const isDot = output === '.' || output === './'
  const baseDir = isDot ? '.' : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeEntryBasename = output.match(/([^/]+)\.ts$/)?.[1] ?? 'index'
  const importFrom = `../${routeEntryBasename}`

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const exports = mergedHandlers.map((h) => `export * from './${h.baseName}'`).join('\n')

  const handlerResults = await Promise.all([
    ...mergedHandlers.map(async (handler) => {
      const routeTypes = Array.from(new Set(handler.routeNames)).join(', ')
      const importRouteTypes = routeTypes
        ? `import type { ${routeTypes} } from '${importFrom}';`
        : ''
      const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${importRouteTypes}`
      const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

      const fmtResult = await fmt(fileContent)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/${handler.baseName}.ts`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testWriteResult = await writeFile(`${handlerPath}/${handler.baseName}.test.ts`, '')
        if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(exports)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/index.ts`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = handlerResults.find((r) => !r.ok)
  if (firstError) return firstError

  return { ok: true, value: undefined }
}
