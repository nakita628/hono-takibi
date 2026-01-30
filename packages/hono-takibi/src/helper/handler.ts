/**
 * Route handler generation module.
 *
 * Generates skeleton handler files for Hono routes based on OpenAPI operations.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodOpenAPIHonoHandler(openapi, output, test)"] --> B["Extract paths and methods"]
 *   B --> C["Group by first path segment"]
 *   C --> D["Create handlers directory"]
 *   D --> E["For each handler file"]
 *   E --> F["Generate RouteHandler type imports"]
 *   F --> G["Generate empty handler functions"]
 *   G --> H["Write handler file"]
 *   H --> I{"Generate test file?"}
 *   I -->|Yes| J["Write empty test file"]
 *   I -->|No| K["Continue"]
 *   J --> K
 *   K --> L["Write index.ts barrel"]
 *   L --> M["Return result"]
 * ```
 *
 * @module helper/handler
 */
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
    readonly fileName: `${string}.ts`
    readonly testFileName: `${string}.ts`
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

        const pathName = sanitized === '' ? '__root' : sanitized
        const fileName: `${string}.ts` = `${pathName}.ts`
        const testFileName: `${string}.ts` = `${pathName}.test.ts`

        return {
          fileName,
          testFileName,
          routeHandlerContents: [routeHandlerContent],
          routeNames: [`${routeId}Route`],
        } satisfies {
          readonly fileName: `${string}.ts`
          readonly testFileName: `${string}.ts`
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
        }
      }),
  )

  const mergedHandlers: readonly {
    readonly fileName: `${string}.ts`
    readonly testFileName: `${string}.ts`
    readonly routeHandlerContents: string[]
    readonly routeNames: string[]
  }[] = Array.from(
    handlers
      .reduce<
        Map<
          string,
          {
            readonly fileName: `${string}.ts`
            readonly testFileName: `${string}.ts`
            readonly routeHandlerContents: string[]
            readonly routeNames: string[]
          }
        >
      >((map, h) => {
        const prev = map.get(h.fileName)
        const next: {
          readonly fileName: `${string}.ts`
          readonly testFileName: `${string}.ts`
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
        } = prev
          ? {
              fileName: h.fileName,
              testFileName: h.testFileName,
              routeHandlerContents: [...prev.routeHandlerContents, ...h.routeHandlerContents],
              routeNames: Array.from(new Set([...prev.routeNames, ...h.routeNames])),
            }
          : {
              fileName: h.fileName,
              testFileName: h.testFileName,
              routeHandlerContents: [...h.routeHandlerContents],
              routeNames: [...h.routeNames],
            }
        map.set(h.fileName, next)
        return map
      }, new Map())
      .values(),
  )

  const isDot = output === '.' || output === './'
  const baseDir = isDot ? '.' : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeEntryBasename = output.match(/[^/]+\.ts$/)?.[0] ?? 'index.ts'
  const importFrom = `../${routeEntryBasename.replace(/\.ts$/, '')}`

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const handlerFiles = mergedHandlers.map((h) => h.fileName)
  const exports = handlerFiles.map((h) => `export * from './${h}'`).join('\n')

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
      const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testWriteResult = await writeFile(`${handlerPath}/${handler.testFileName}`, '')
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
