import path from 'node:path'
import { mkdir, writeFile } from '../../fsp/index.js'
import { makeDocs } from '../../generator/docs/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export { makeDocs } from '../../generator/docs/index.js'

export async function docs(
  openAPI: OpenAPI,
  output: string,
  entry: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  try {
    const markdown = makeDocs(openAPI, entry)
    const mkdirResult = await mkdir(path.dirname(output))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(output, markdown)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }
    return { ok: true, value: `Generated docs written to ${output}` }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
