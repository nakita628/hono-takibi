import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core } from '../helper/core.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import {
  findSchema,
  isRecord,
  lowerFirst,
  renderNamedImport,
  sanitizeIdentifier,
} from '../utils/index.js'

const headerBaseName = (key: string): string => {
  const safe = sanitizeIdentifier(key)
  if (safe.endsWith('HeaderSchema')) return safe.slice(0, -'Schema'.length)
  if (safe.endsWith('Header')) return safe
  return `${safe}Header`
}

const schemaVarName = (schemaName: string): string => sanitizeIdentifier(`${schemaName}Schema`)

/**
 * Generates `components.headers` as Zod schemas.
 *
 * - Emits `<HeaderName>HeaderSchema` consts.
 * - When `split=true`, writes one file per header (and an `index.ts`).
 */
export async function headers(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
  // imports?: {
  //   readonly schemas?: {
  //     readonly output: string | `${string}.ts`
  //     readonly split?: boolean
  //     readonly import?: string
  //   }
  // },
) {
  const headers = openAPI.components?.headers
  if (headers === undefined) return { ok: false, error: 'No headers found' }

  const importZ = `import { z } from '@hono/zod-openapi'`

  Object.entries(headers).map(([k, h]) => {
    const schemaName = k
    const z = zodToOpenAPI(h)
    return zodToOpenAPISchema(schemaName, z, true, exportType, true)
  })

  // const buildImportSchemas = (
  //   fromFile: string,
  //   code: string,
  //   exclude: ReadonlySet<string>,
  // ): string => {
  //   const target = imports?.schemas
  //   if (!target) return ''
  //   const tokens = findSchema(code).filter((t) => !exclude.has(t))
  //   if (tokens.length === 0) return ''
  //   const spec = target.import ?? moduleSpecFrom(fromFile, target)
  //   return renderNamedImport(tokens, spec)
  // }

  // if (split) {
  //   const outDir = String(output).replace(/\.ts$/, '')

  //   for (const k of Object.keys(headers)) {
  //     const header = headers[k]
  //     if (!header) continue

  //     const schemaName = headerBaseName(k)
  //     const h = isRecord(header) ? header : {}
  //     const rawSchema = isRecord(h.schema) ? (h.schema) : {}
  //     const mergedSchema: Schema =
  //       header.description !== undefined && rawSchema.description === undefined
  //         ? { ...rawSchema, description: header.description }
  //         : rawSchema
  //     const z = zodToOpenAPI(mergedSchema)
  //     const code = zodToOpenAPISchema(schemaName, z, true, exportType, true)

  //     const filePath = path.join(outDir, `${lowerFirst(schemaName)}.ts`)
  //     const importSchemas = buildImportSchemas(filePath, code, new Set([schemaVarName(schemaName)]))
  //     const fileCode = [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')
  //     const coreResult = await core(fileCode, path.dirname(filePath), filePath)
  //     if (!coreResult.ok) return { ok: false, error: coreResult.error }
  //   }

  //   const indexBody = `${Object.keys(hs)
  //     .map((n) => `export * from './${lowerFirst(headerBaseName(n))}'`)
  //     .join('\n')}\n`

  //   const coreResult = await core(
  //     indexBody,
  //     path.dirname(path.join(outDir, 'index.ts')),
  //     path.join(outDir, 'index.ts'),
  //   )
  //   if (!coreResult.ok) return { ok: false, error: coreResult.error }

  //   return {
  //     ok: true,
  //     value: `Generated header code written to ${outDir}/*.ts (index.ts included)`,
  //   }
  // }

  // const defs = Object.keys(headers)
  //   .map((k) => {
  //     const header = headers[k]
  //     const schemaName = headerBaseName(k)
  //     const z = zodToOpenAPI(header)
  //     return zodToOpenAPISchema(schemaName, z, true, exportType, true)
  //   })
  //   .join('\n\n')

  // const outFile = String(output)
  // const locals = new Set(Object.keys(headers).map((k) => schemaVarName(headerBaseName(k))))
  // const importSchemas = buildImportSchemas(outFile, defs, locals)
  // const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')
  // const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  // if (!coreResult.ok) return { ok: false, error: coreResult.error }

  // return { ok: true, value: `Generated header code written to ${outFile}` }
}
