import path from 'node:path'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

/** Generates TypeScript code from an OpenAPI spec. */
export async function takibi(
  openAPI: OpenAPI,
  output: `${string}.ts`,
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
    const coreResult = await core(
      zodOpenAPIHono(openAPI, componentsOptions),
      path.dirname(output),
      output,
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return {
      ok: true,
      value: `🔥 Generated code written to ${output}`,
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
