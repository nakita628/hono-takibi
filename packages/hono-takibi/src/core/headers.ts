import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { barell } from '../helper/barell.js'
import type { Header, OpenAPI, Reference } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'

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
  const constName = toIdentifierPascalCase(ensureSuffix(key, 'Header'))
  const typeName = toIdentifierPascalCase(key)
  const zInfer = exportType ? `\n\nexport type ${typeName} = z.infer<typeof ${constName}>` : ''
  const exportPrefix = exportHeader ? 'export const' : 'const'

  if (isReference(header) && header.$ref) {
    const refName = header.$ref.split('/').pop() ?? key
    return `${exportPrefix} ${constName} = ${toIdentifierPascalCase(ensureSuffix(refName, 'Header'))}${zInfer}`
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
      const fileCode = [importZ, '\n', code, ''].filter(Boolean).join('\n')

      const fmtResult = await fmt(fileCode)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const fmtResult = await fmt(barell(headers))
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(path.join(outDir, 'index.ts')))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(path.join(outDir, 'index.ts'), fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

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
  const fileCode = [importZ, '\n', defs, ''].filter(Boolean).join('\n')

  const fmtResult = await fmt(fileCode)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated header code written to ${outFile}` }
}
