import path from 'node:path'
import { fmt } from '../../format/index.js'
import { readFile, writeFile } from '../../fsp/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/index.js'
import { zodOpenAPIHonoHandler } from '../../helper/handler.js'
import { core } from '../../helper/index.js'
import { mergeAppFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates app template (index.ts) and stub handler files from an OpenAPI spec.
 *
 * Used by both `takibi()` (output + template mode) and the CLI (routes-only + template mode).
 */
export async function makeTemplate(
  openAPI: OpenAPI,
  routeOutput: `${string}.ts`,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const isIndexFile = routeOutput.endsWith('/index.ts')
  const dir = isIndexFile ? path.dirname(path.dirname(routeOutput)) : path.dirname(routeOutput)
  const target = path.join(dir, 'index.ts')

  const [appFmtResult, stubHandlersResult] = await Promise.all([
    fmt(app(openAPI, routeOutput, basePath, pathAlias, routeImport)),
    zodOpenAPIHonoHandler(openAPI, routeOutput, test, pathAlias, routeImport),
  ])
  if (!appFmtResult.ok) return { ok: false, error: appFmtResult.error }
  if (!stubHandlersResult.ok) return { ok: false, error: stubHandlersResult.error }

  // Merge app file (index.ts) with existing user modifications
  const existingResult = await readFile(target)
  if (!existingResult.ok) return { ok: false, error: existingResult.error }

  const merged =
    existingResult.value !== null
      ? mergeAppFile(existingResult.value, appFmtResult.value)
      : appFmtResult.value

  const finalFmtResult = await fmt(merged)
  const appContent = finalFmtResult.ok ? finalFmtResult.value : merged

  const writeResult = await writeFile(target, appContent)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: '🔥 Generated code and template files written' }
}

/** Generates TypeScript code from an OpenAPI spec and optional templates. */
export async function takibi(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  template: boolean,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
  componentsOptions: {
    readonly readonly?: boolean | undefined
    // OpenAPI Components Object order
    readonly exportSchemas: boolean
    readonly exportSchemasTypes: boolean
    readonly exportResponses: boolean
    readonly exportParameters: boolean
    readonly exportParametersTypes: boolean
    readonly exportExamples: boolean
    readonly exportRequestBodies: boolean
    readonly exportHeaders: boolean
    readonly exportHeadersTypes: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
    readonly exportPathItems: boolean
    readonly exportMediaTypes: boolean
    readonly exportMediaTypesTypes: boolean
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  // zodOpenAPIHono() throws on invalid schemas
  try {
    // Normal generation (routes.ts)
    const coreResult = await core(
      zodOpenAPIHono(openAPI, componentsOptions),
      path.dirname(output),
      output,
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  // --template: Generate app + handlers
  if (template) {
    return makeTemplate(openAPI, output, test, basePath, pathAlias, routeImport)
  }

  return {
    ok: true,
    value: `🔥 Generated code written to ${output}`,
  }
}
