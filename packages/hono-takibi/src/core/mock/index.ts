import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { makeMock } from '../../generator/mock/index.js'
import type { MockOptions } from '../../generator/mock/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function mock(
  openAPI: OpenAPI,
  output: string,
  basePath: string,
  options: MockOptions = {},
) {
  return Effect.gen(function* () {
    const mockCode = makeMock(openAPI, basePath, options)
    yield* emit(mockCode, path.dirname(output), output)
    return `Generated mock server written to ${output}`
  })
}
