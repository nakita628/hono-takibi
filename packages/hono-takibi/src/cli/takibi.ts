import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, readdir, writeFile } from '../fsp/index.js'
import { app } from '../generator/zod-openapi-hono/app/index.js'
import { zodOpenapiHonoHandler } from '../generator/zod-openapi-hono/handler/zod-openapi-hono-handler.js'
import zodOpenAPIHono from '../generator/zod-openapi-hono/openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'

/**
 * Generates TypeScript code from an OpenAPI spec and optional templates.
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
      ok: true
      value: string
    }
  | {
      ok: false
      error: string
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
