import path from 'node:path'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/index.js'
import { makeStubHandlers } from '../../helper/handler.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

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
 *   M -->|Yes| O{"template ?"}
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
 *   ZA -->|Yes| ZC["stubHandlersResult = makeStubHandlers(openAPI, output, test)"]
 *   ZC --> ZD{"stubHandlersResult.ok ?"}
 *   ZD -->|No| ZE["return { ok:false, error: stubHandlersResult.error }"]
 *   ZD -->|Yes| ZF["return { ok:true, value: 'Generated code and template files written' }"]
 * ```
 */
export async function takibi(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  template: boolean,
  test: boolean,
  basePath: string,
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
    // Normal generation (routes.ts)
    const coreResult = await core(
      zodOpenAPIHono(openAPI, componentsOptions),
      path.dirname(output),
      output,
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    // --template: Generate app + handlers
    if (template) {
      const dir = path.dirname(output)
      const target = path.join(dir, 'index.ts')
      const [appResult, stubHandlersResult] = await Promise.all([
        core(app(openAPI, output, basePath), dir, target),
        makeStubHandlers(openAPI, output, test),
      ])
      if (!appResult.ok) return { ok: false, error: appResult.error }
      if (!stubHandlersResult.ok) return { ok: false, error: stubHandlersResult.error }
      return { ok: true, value: '🔥 Generated code and template files written' }
    }

    return {
      ok: true,
      value: `🔥 Generated code written to ${output}`,
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
