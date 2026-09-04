import path from 'node:path'

import { Effect } from 'effect'

import { mkdir, readFile, writeFile } from '../../file/index.js'
import { fmt } from '../../format/index.js'
import { makeTestFile } from '../../generator/test/index.js'
import { mergeTestFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function test(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
) {
  return Effect.gen(function* () {
    const testCode = makeTestFile(openAPI, importPath, basePath, testFramework)
    const [formatted, , existing] = yield* Effect.all(
      [fmt(testCode), mkdir(path.dirname(output)), readFile(output)],
      { concurrency: 'unbounded' },
    )
    const merged = existing !== null ? mergeTestFile(existing, formatted) : formatted
    // A merge can produce source oxfmt rejects; the unformatted merge is still the
    // right file to write.
    const content = yield* fmt(merged).pipe(Effect.orElseSucceed(() => merged))
    yield* writeFile(output, content)
    return `Generated test file written to ${output}`
  })
}
