import path from 'node:path'

import { makeMock } from '../../generator/mock/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function mock(openAPI: OpenAPI, output: string, basePath: string, readonly?: boolean) {
  const mockCode = makeMock(openAPI, basePath, readonly !== undefined ? { readonly } : {})
  const coreResult = await core(mockCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error } as const
  return { ok: true, value: `Generated mock server written to ${output}` } as const
}
