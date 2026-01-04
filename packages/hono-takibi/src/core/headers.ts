import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core, makeBarell } from '../helper/index.js'
import type { Header, OpenAPI, Reference } from '../openapi/index.js'
import {
  ensureSuffix,
  findSchema,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

const isReference = (v: unknown): v is Reference =>
  typeof v === 'object' && v !== null && '$ref' in v

const isHeader = (v: unknown): v is Header => typeof v === 'object' && v !== null && !('$ref' in v)

/**
 * Builds a header schema definition.
 */
function buildHeaderSchema(
  key: string,
  header: Header | Reference,
  exportHeader: boolean,
  exportType: boolean,
): string {
  const constName = toIdentifierPascalCase(ensureSuffix(key, 'HeaderSchema'))
  const typeName = toIdentifierPascalCase(key)
  const zInfer = exportType ? `\n\nexport type ${typeName} = z.infer<typeof ${constName}>` : ''
  const exportPrefix = exportHeader ? 'export const' : 'const'

  if (isReference(header) && header.$ref) {
    const refName = header.$ref.split('/').pop() ?? key
    return `${exportPrefix} ${constName} = ${toIdentifierPascalCase(ensureSuffix(refName, 'HeaderSchema'))}${zInfer}`
  }

  if (isHeader(header)) {
    if (header.schema) {
      const schema = zodToOpenAPI(header.schema, { headers: header })
      return `${exportPrefix} ${constName} = ${schema}${zInfer}`
    }
  }

  return `${exportPrefix} ${constName} = z.any()${zInfer}`
}

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

      const code = buildHeaderSchema(key, header, true, exportType)
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
  const defs = Object.keys(headers)
    .map((key) => {
      const header = headers[key]
      if (!header) return ''
      return buildHeaderSchema(key, header, true, exportType)
    })
    .filter(Boolean)
    .join('\n\n')

  const outFile = String(output)
  const schemaTokens = findSchema(defs)
  const importSchemas = schemaTokens.length > 0 ? renderNamedImport(schemaTokens, './schemas') : ''
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated header code written to ${outFile}` }
}
