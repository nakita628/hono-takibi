import path from 'node:path'
import { headersCode } from '../generator/zod-openapi-hono/openapi/components/headers.js'
import { core, makeBarell } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { findSchema, lowerFirst, renderNamedImport } from '../utils/index.js'

/**
 * Generates `components.headers` as Zod schemas.
 *
 * - Emits `<HeaderName>Header` consts.
 * - When `split=true`, writes one file per header (and an `index.ts`).
 */
export async function headers(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<{ ok: true; value: string } | { ok: false; error: string }> {
  const headers = openAPI.components?.headers
  if (headers === undefined) return { ok: false, error: 'No headers found' }

  const importZ = `import { z } from '@hono/zod-openapi'`

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(headers)) {
      const header = headers[key]
      if (!header) continue

      const code = headersCode({ headers: { [key]: header } }, true, exportType)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const schemaTokens = findSchema(code)
      const importSchemas =
        schemaTokens.length > 0 ? renderNamedImport(schemaTokens, '../schemas') : ''
      const fileCode = [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexResult = await core(
      makeBarell(headers),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!indexResult.ok) return { ok: false, error: indexResult.error }

    return {
      ok: true,
      value: `Generated header code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  // Non-split mode: single file
  const defs = headersCode({ headers }, true, exportType)

  const outFile = String(output)
  const schemaTokens = findSchema(defs)
  const importSchemas = schemaTokens.length > 0 ? renderNamedImport(schemaTokens, './schemas') : ''
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated header code written to ${outFile}` }
}
