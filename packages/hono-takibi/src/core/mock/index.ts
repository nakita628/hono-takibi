import path from 'node:path'
import { generateMockServer } from '../../generator/mock/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function mock(
  openAPI: OpenAPI,
  output: string,
  readonly?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  try {
    const mockCode = generateMockServer(openAPI, '/', { readonly })
    const coreResult = await core(mockCode, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated mock server written to ${output}` }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
