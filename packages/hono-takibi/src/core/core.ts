import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { type OpenAPI, parseOpenAPI } from '../openapi/index.js'

export default async function core(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  importCode: string,
  value: string,
  fn: (openapi: OpenAPI, importCode: string) => string,
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
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const fnResult = await fmt(fn(openAPI, importCode))
  if (!fnResult.ok) {
    return { ok: false, error: fnResult.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, fnResult.value)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  return {
    ok: true,
    value: `${value} ${output}`,
  }
}
