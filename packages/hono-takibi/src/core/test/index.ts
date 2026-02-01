import path from 'node:path'
import { generateTestFile } from '../../generator/test/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function test(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split: boolean,
): Promise<{ readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }> {
  try {
    const testCode = generateTestFile(openAPI, importPath)
    const coreResult = await core(testCode, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated test file written to ${output}` }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
