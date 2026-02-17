import path from 'node:path'
import { fmt } from '../../format/index.js'
import { mkdir, readFile, writeFile } from '../../fsp/index.js'
import { makeTestFile } from '../../generator/test/index.js'
import { mergeTestFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function test(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  basePath = '/',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const testCode = makeTestFile(openAPI, importPath, basePath)

  const [fmtResult, mkdirResult, existingResult] = await Promise.all([
    fmt(testCode),
    mkdir(path.dirname(output)),
    readFile(output),
  ])
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  if (!existingResult.ok) return { ok: false, error: existingResult.error }

  const merged =
    existingResult.value !== null
      ? mergeTestFile(existingResult.value, fmtResult.value)
      : fmtResult.value

  const finalFmtResult = await fmt(merged)
  const content = finalFmtResult.ok ? finalFmtResult.value : merged

  const writeResult = await writeFile(output, content)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated test file written to ${output}` }
}
