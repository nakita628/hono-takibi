import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import type { Parameters } from '../openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { sanitizeIdentifier } from '../utils/index.js'
import { moduleSpecFrom } from './rel-import.js'

const lowerFirst = (s: string) => (s ? (s[0]?.toLowerCase() ?? '') + s.slice(1) : s)

const findSchemaTokens = (code: string): string[] =>
  Array.from(
    new Set(
      Array.from(code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )

const parameterSchemaName = (key: string): string => key

const schemaVarName = (schemaName: string): string => sanitizeIdentifier(`${schemaName}Schema`)

/**
 * Generates `components.parameters` schemas as Zod definitions.
 *
 * - Always emits `export const ...Schema = ...`.
 * - When `split=true`, writes one file per parameter (and an `index.ts`).
 */
export async function parameter(
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

  const params = openAPI.components?.parameters
  if (!params || Object.keys(params).length === 0)
    return { ok: false, error: 'No parameters found' }

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

    for (const key of Object.keys(params).sort()) {
      const p: Parameters | undefined = params[key]
      if (!p) continue

      const schemaName = parameterSchemaName(key)
      const z = zodToOpenAPI(p.schema, p.name, p.in)
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

    const indexBody = `${Object.keys(params)
      .sort()
      .map((n) => `export * from './${lowerFirst(parameterSchemaName(n))}'`)
      .join('\n')}\n`

    const fmtResult = await fmt(indexBody)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(path.join(outDir, 'index.ts')))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(path.join(outDir, 'index.ts'), fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

    return {
      ok: true,
      value: `Generated parameter code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = Object.keys(params)
    .sort()
    .map((key) => {
      const p: Parameters | undefined = params[key]
      const schemaName = parameterSchemaName(key)
      const z = p ? zodToOpenAPI(p.schema, p.name, p.in) : 'z.any()'
      return zodToOpenAPISchema(schemaName, z, true, exportType, true)
    })
    .join('\n\n')

  const outFile = String(output)
  const locals = new Set(Object.keys(params).map((k) => schemaVarName(parameterSchemaName(k))))
  const importSchemas = buildImportSchemas(outFile, defs, locals)
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const fmtResult = await fmt(fileCode)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated parameter code written to ${outFile}` }
}
