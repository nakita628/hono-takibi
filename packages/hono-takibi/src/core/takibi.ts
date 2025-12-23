import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, readdir, writeFile } from '../fsp/index.js'
import { app } from '../generator/zod-openapi-hono/app/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/index.js'
import { type OpenAPI, type OpenAPIPaths, parseOpenAPI } from '../openapi/index.js'
import { isHttpMethod, methodPath } from '../utils/index.js'

/**
 * Generates TypeScript code from an OpenAPI spec and optional templates.
 *
 * ```mermaid
 * flowchart TD
 *   A["takibi(input, output, flags)"] --> B["openAPIResult = parseOpenAPI(input)"]
 *   B --> C{"openAPIResult.ok ?"}
 *   C -->|No| D["return { ok:false, error: openAPIResult.error }"]
 *   C -->|Yes| E["openAPI = openAPIResult.value"]
 *   E --> F["honoResult = fmt(zodOpenAPIHono(openAPI, exportOptions))"]
 *   F --> G{"honoResult.ok ?"}
 *   G -->|No| H["return { ok:false, error: honoResult.error }"]
 *   G -->|Yes| I["mkdirResult = mkdir(dirname(output))"]
 *   I --> J{"mkdirResult.ok ?"}
 *   J -->|No| K["return { ok:false, error: mkdirResult.error }"]
 *   J -->|Yes| L["writeResult = writeFile(output, honoResult.value)"]
 *   L --> M{"writeResult.ok ?"}
 *   M -->|No| N["return { ok:false, error: writeResult.error }"]
 *   M -->|Yes| O{"template && output includes '/' ?"}
 *   O -->|No| P["return { ok:true, value: 'Generated code written to ' + output }"]
 *   O -->|Yes| Q["appResult = fmt(app(openAPI, output, basePath))"]
 *   Q --> R{"appResult.ok ?"}
 *   R -->|No| S["return { ok:false, error: appResult.error }"]
 *   R -->|Yes| T["dir = dirname(output)"]
 *   T --> U["readdirResult = readdir(dir)"]
 *   U --> V{"readdirResult.ok ?"}
 *   V -->|No| W["return { ok:false, error: readdirResult.error }"]
 *   V -->|Yes| X["files = readdirResult.value"]
 *   X --> Y["target = join(dir, files includes 'index.ts' ? 'main.ts' : 'index.ts')"]
 *   Y --> Z["writeResult2 = writeFile(target, appResult.value)"]
 *   Z --> ZA{"writeResult2.ok ?"}
 *   ZA -->|No| ZB["return { ok:false, error: writeResult2.error }"]
 *   ZA -->|Yes| ZC["zodOpenAPIHonoHandlerResult = zodOpenAPIHonoHandler(openAPI, output, test)"]
 *   ZC --> ZD{"zodOpenAPIHonoHandlerResult.ok ?"}
 *   ZD -->|No| ZE["return { ok:false, error: zodOpenAPIHonoHandlerResult.error }"]
 *   ZD -->|Yes| ZF["return { ok:true, value: 'Generated code and template files written' }"]
 * ```
 */
export async function takibi(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  template: boolean,
  test: boolean,
  basePath: string,
  componentsOptions?: {
    readonly exportSchemasTypes: boolean
    readonly exportSchemas: boolean
    readonly exportParametersTypes: boolean
    readonly exportParameters: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportRequestBodies: boolean
    readonly exportResponses: boolean
    readonly exportHeadersTypes: boolean
    readonly exportHeaders: boolean
    readonly exportExamples: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
  },
): Promise<
  | {
      readonly ok: true
      readonly value: string
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  try {
    const openAPIResult = await parseOpenAPI(input)
    if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
    const openAPI = openAPIResult.value
    const honoResult = await fmt(zodOpenAPIHono(openAPI, componentsOptions))
    if (!honoResult.ok) return { ok: false, error: honoResult.error }
    const mkdirResult = await mkdir(path.dirname(output))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(output, honoResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }
    /** template */
    if (template && output.includes('/')) {
      const appResult = await fmt(app(openAPI, output, basePath))
      if (!appResult.ok) return { ok: false, error: appResult.error }
      const dir = path.dirname(output)
      const readdirResult = await readdir(dir)
      if (!readdirResult.ok) return { ok: false, error: readdirResult.error }
      const target = path.join(dir, 'index.ts')
      const writeResult = await writeFile(target, appResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
      const zodOpenAPIHonoHandlerResult = await zodOpenAPIHonoHandler(openAPI, output, test)
      if (!zodOpenAPIHonoHandlerResult.ok)
        return { ok: false, error: zodOpenAPIHonoHandlerResult.error }
      return { ok: true, value: 'Generated code and template files written' }
    }
    return {
      ok: true,
      value: `Generated code written to ${output}`,
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Generates route handler files for a Hono app using Zod and OpenAPI.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding empty test files.
 * @returns A `Result` indicating success or error with message.
 */
async function zodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  test: boolean,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const paths: OpenAPIPaths = openapi.paths

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

  for (const handler of mergedHandlers) {
    const routeTypes = Array.from(new Set(handler.routeNames)).join(', ')
    const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${importFrom}';` : ''
    const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${importRouteTypes}`
    const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

    const fmtResult = await fmt(fileContent)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

    if (test) {
      const writeResult = await writeFile(`${handlerPath}/${handler.testFileName}`, '')
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }
  }

  const handlerFiles = mergedHandlers.map((h) => h.fileName)
  const exports = handlerFiles.map((h) => `export * from './${h}'`).join('\n')

  const fmtResult = await fmt(exports)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const writeResult = await writeFile(`${handlerPath}/index.ts`, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: undefined }
}
