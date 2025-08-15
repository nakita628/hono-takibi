import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { type OpenAPI, parseOpenAPI } from '../openapi/index.js'

export async function core(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  importCode: string,
  value: string,
  fn: (openapi: OpenAPI, importCode: string) => string,
): Promise<
  | {
      ok: true
      value: string
    }
  | {
      ok: false
      error: string
    }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const honoRpcResult = await fmt(fn(openAPI, importCode))
  if (!honoRpcResult.ok) {
    return { ok: false, error: honoRpcResult.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, honoRpcResult.value)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  return {
    ok: true,
    value: `${value} ${output}`,
  }
}
