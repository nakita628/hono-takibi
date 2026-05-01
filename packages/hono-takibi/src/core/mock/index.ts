import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeMock } from '../../generator/mock/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function mock(openAPI: OpenAPI, output: string, basePath: string, readonly?: boolean) {
  const mockCode = makeMock(openAPI, basePath, readonly !== undefined ? { readonly } : {})
  const emitResult = await emit(mockCode, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated mock server written to ${output}` } as const
}
