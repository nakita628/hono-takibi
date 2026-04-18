import path from 'node:path'

import { mkdir, writeFile } from '../../fsp/index.js'
import { makeDocs } from '../../generator/docs/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { core } from '../../helper/core.js'

export { makeDocs } from '../../generator/docs/index.js'

export async function docs(
  openAPI: OpenAPI,
  output: string,
  entry = 'src/index.ts',
  basePath = '/',
  curl = false,
  baseUrl?: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const markdown = makeDocs(openAPI, entry, basePath, curl, baseUrl)
  const coreResult = await core(markdown, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated docs written to ${output}` }
}
