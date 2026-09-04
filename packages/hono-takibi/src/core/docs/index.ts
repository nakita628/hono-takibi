import path from 'node:path'

import { Effect } from 'effect'

import { mkdir, writeFile } from '../../file/index.js'
import { makeDocs } from '../../generator/docs/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function docs(
  openAPI: OpenAPI,
  output: string,
  entry = 'src/index.ts',
  basePath = '/',
  curl = false,
  baseUrl?: string,
) {
  return Effect.gen(function* () {
    const markdown = makeDocs(openAPI, entry, basePath, curl, baseUrl)
    yield* mkdir(path.dirname(output))
    yield* writeFile(output, markdown)
    return `Generated docs written to ${output}`
  })
}
