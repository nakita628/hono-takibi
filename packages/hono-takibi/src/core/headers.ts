import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import type { Components, Schema } from '../openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { sanitizeIdentifier } from '../utils/index.js'
import { moduleSpecFrom } from './rel-import.js'

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isSchema = (v: unknown): v is Schema => isRecord(v)

const lowerFirst = (s: string) => (s ? (s[0]?.toLowerCase() ?? '') + s.slice(1) : s)

const findSchemaTokens = (code: string): string[] =>
  Array.from(
    new Set(
      Array.from(code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )

const headerBaseName = (key: string): string => {
  const safe = sanitizeIdentifier(key)
  if (safe.endsWith('HeaderSchema')) return safe.slice(0, -'Schema'.length)
  if (safe.endsWith('Header')) return safe
  return `${safe}Header`
}

const schemaVarName = (schemaName: string): string => sanitizeIdentifier(`${schemaName}Schema`)

type HeaderComponent = NonNullable<Components['headers']>[string]

const mergeHeaderSchema = (header: HeaderComponent): Schema => {
  const base = header.schema
  return header.description !== undefined && base.description === undefined
    ? { ...base, description: header.description }
    : base
}

/**
 * Generates `components.headers` as Zod schemas.
 *
 * - Emits `<HeaderName>HeaderSchema` consts.
 * - When `split=true`, writes one file per header (and an `index.ts`).
 */
export async function headers(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
  imports?: {
    readonly schemas?: { readonly output: string | `${string}.ts`; readonly split?: boolean }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const hs = openAPI.components?.headers
  if (!hs || Object.keys(hs).length === 0) return { ok: false, error: 'No headers found' }

  const importZ = `import { z } from '@hono/zod-openapi'`

  const buildImportSchemas = (
    fromFile: string,
    code: string,
    exclude: ReadonlySet<string>,
  ): string => {
    const target = imports?.schemas
    if (!target) return ''
    const tokens = findSchemaTokens(code).filter((t) => !exclude.has(t))
    if (tokens.length === 0) return ''
    const spec = moduleSpecFrom(fromFile, target)
    return `import { ${tokens.join(',')} } from '${spec}'`
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(hs).sort()) {
      const header = hs[key]
      if (!header) continue

      const schemaName = headerBaseName(key)
      const z = zodToOpenAPI(mergeHeaderSchema(header))
      const code = zodToOpenAPISchema(schemaName, z, true, exportType, true)

      const filePath = path.join(outDir, `${lowerFirst(schemaName)}.ts`)
      const importSchemas = buildImportSchemas(filePath, code, new Set([schemaVarName(schemaName)]))
      const fileCode = [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')

      const fmtResult = await fmt(fileCode)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const indexBody = `${Object.keys(hs)
      .sort()
      .map((n) => `export * from './${lowerFirst(headerBaseName(n))}'`)
      .join('\n')}\n`

    const fmtResult = await fmt(indexBody)
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

  const defs = Object.keys(hs)
    .sort()
    .map((key) => {
      const header = hs[key]
      const schemaName = headerBaseName(key)
      const schema = header ? mergeHeaderSchema(header) : {}
      const z = isSchema(schema) ? zodToOpenAPI(schema) : 'z.any()'
      return zodToOpenAPISchema(schemaName, z, true, exportType, true)
    })
    .join('\n\n')

  const outFile = String(output)
  const locals = new Set(Object.keys(hs).map((k) => schemaVarName(headerBaseName(k))))
  const importSchemas = buildImportSchemas(outFile, defs, locals)
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const fmtResult = await fmt(fileCode)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated header code written to ${outFile}` }
}
