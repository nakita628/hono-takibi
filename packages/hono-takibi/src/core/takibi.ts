import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, readdir, writeFile } from '../fsp/index.js'
import { app } from '../generator/zod-openapi-hono/app/index.js'
import zodOpenAPIHono from '../generator/zod-openapi-hono/openapi/index.js'
import { type OpenAPI, type OpenAPIPaths, parseOpenAPI } from '../openapi/index.js'
import { groupHandlersByFileName, isHttpMethod, methodPath } from '../utils/index.js'

/**
 * Generates TypeScript code from an OpenAPI spec and optional templates.
 *
 * ```mermaid
 * flowchart TD
 *   A["takibi(input, output, flags)"] --> B["openAPIResult = parseOpenAPI(input)"]
 *   B --> C{"openAPIResult.ok ?"}
 *   C -->|No| D["return { ok:false, error: openAPIResult.error }"]
 *   C -->|Yes| E["openAPI = openAPIResult.value"]
 *   E --> F["honoResult = fmt(zodOpenAPIHono(openAPI, exportSchema, exportType))"]
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
 *   ZA -->|Yes| ZC["handlerResult = zodOpenapiHonoHandler(openAPI, output, test)"]
 *   ZC --> ZD{"handlerResult.ok ?"}
 *   ZD -->|No| ZE["return { ok:false, error: handlerResult.error }"]
 *   ZD -->|Yes| ZF["return { ok:true, value: 'Generated code and template files written' }"]
 * ```
 *
 * @param input - Input OpenAPI file (`.yaml`, `.json`, or `.tsp`).
 * @param output - Output `.ts` file path.
 * @param exportSchema - Whether to export schemas.
 * @param exportType - Whether to export types.
 * @param template - Whether to generate templates.
 * @param test - Whether to generate test files.
 * @param basePath - Optional base path for template output.
 * @returns A `Result` containing a success message or an error string.
 */
export async function takibi(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  exportSchema: boolean,
  exportType: boolean,
  template: boolean,
  test: boolean,
  basePath?: string,
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
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const honoResult = await fmt(zodOpenAPIHono(openAPI, exportSchema, exportType))
  if (!honoResult.ok) {
    return { ok: false, error: honoResult.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, honoResult.value)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  /** template */
  if (template && output.includes('/')) {
    const appResult = await fmt(app(openAPI, output, basePath))
    if (!appResult.ok) {
      return { ok: false, error: appResult.error }
    }
    const dir = path.dirname(output)
    const readdirResult = await readdir(dir)
    if (!readdirResult.ok) {
      return { ok: false, error: readdirResult.error }
    }
    const files = readdirResult.value
    const target = path.join(dir, files.includes('index.ts') ? 'main.ts' : 'index.ts')
    const writeResult = await writeFile(target, appResult.value)
    if (!writeResult.ok) {
      return { ok: false, error: writeResult.error }
    }
    const handlerResult = await zodOpenapiHonoHandler(openAPI, output, test)
    if (!handlerResult.ok) {
      return { ok: false, error: handlerResult.error }
    }
    return { ok: true, value: 'Generated code and template files written' }
  }
  return {
    ok: true,
    value: `Generated code written to ${output}`,
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
async function zodOpenapiHonoHandler(
  openapi: OpenAPI,
  output: string,
  test: boolean,
): Promise<
  | {
      readonly ok: true
      readonly value: undefined
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const paths: OpenAPIPaths = openapi.paths
  const handlers: {
    fileName: `${string}.ts`
    testFileName: `${string}.ts`
    routeHandlerContents: string[]
    routeNames: string[]
  }[] = []
  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method] of Object.entries(pathItem)) {
      if (!isHttpMethod(method)) continue
      const routeHandlerContent = `export const ${methodPath(method, path)}RouteHandler:RouteHandler<typeof ${methodPath(method, path)}Route>=async(c)=>{}`
      const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''
      const pathName = (rawSegment === '' ? 'index' : rawSegment)
        .replace(/\{([^}]+)\}/g, '$1')
        .replace(/[^0-9A-Za-z._-]/g, '_')
        .replace(/^[._-]+|[._-]+$/g, '')
        .replace(/__+/g, '_')
        .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
      const fileName: `${string}.ts` =
        pathName.length === 0 ? 'indexHandler.ts' : `${pathName}Handler.ts`
      const testFileName: `${string}.ts` =
        pathName.length === 0 ? 'indexHandler.test.ts' : `${pathName}Handler.test.ts`
      handlers.push({
        fileName,
        testFileName,
        routeHandlerContents: [routeHandlerContent],
        routeNames: [`${methodPath(method, path)}Route`],
      })
    }
  }

  const mergedHandlers = groupHandlersByFileName(handlers)

  for (const handler of mergedHandlers) {
    const dirPath = output?.replace(/\/[^/]+\.ts$/, '')
    const handlerPath = dirPath === 'index.ts' ? 'handlers' : `${dirPath}/handlers`
    const mkdirResult = await mkdir(handlerPath)
    if (!mkdirResult.ok) {
      return { ok: false, error: mkdirResult.error }
    }
    const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')
    const match = output?.match(/[^/]+\.ts$/)
    const matchPath = match ? match[0] : ''
    const path = output === '.' || output === './' ? output : `../${matchPath}`
    const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${path}';` : ''
    const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${importRouteTypes}`
    const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`
    const formatCode = await fmt(fileContent)
    if (!formatCode.ok) {
      return { ok: false, error: formatCode.error }
    }
    const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, formatCode.value)
    if (!writeResult.ok) writeResult
    if (test) {
      const writeResult = await writeFile(`${handlerPath}/${handler.testFileName}`, '')
      if (!writeResult.ok) {
        return { ok: false, error: writeResult.error }
      }
    }
  }
  return { ok: true, value: undefined }
}
