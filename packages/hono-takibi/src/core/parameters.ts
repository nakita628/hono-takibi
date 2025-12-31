import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import type { OpenAPI, Parameter } from '../openapi/index.js'
import {
  ensureSuffix,
  findSchema,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../utils/index.js'

/**
 * Generates `components.parameters` schemas as Zod definitions.
 *
 * - Always emits `export const ...Schema = ...`.
 * - When `split=true`, writes one file per parameter (and an `index.ts`).
 */
export async function parameters(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
  imports?: {
    readonly schemas?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const parameters = openAPI.components?.parameters
  if (!parameters || Object.keys(parameters).length === 0)
    return { ok: false, error: 'No parameters found' }

  const importZ = `import { z } from '@hono/zod-openapi'`

  const buildImportSchemas = (
    fromFile: string,
    code: string,
    exclude: ReadonlySet<string>,
  ): string => {
    const target = imports?.schemas
    if (!target) return ''
    const tokens = findSchema(code).filter((t) => !exclude.has(t))
    if (tokens.length === 0) return ''
    const spec = target.import ?? moduleSpecFrom(fromFile, target)
    return renderNamedImport(tokens, spec)
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(parameters)) {
      const p: Parameter | undefined = parameters[key]
      if (!p) continue

      const schemaName = toIdentifierPascalCase(ensureSuffix(key, 'ParamsSchema'))
      const z = zodToOpenAPI(p.schema, {
        parameters: p,
      })
      const code = zodToOpenAPISchema(schemaName, z, true, exportType, true)

      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const importSchemas = buildImportSchemas(
        filePath,
        code,
        new Set([toIdentifierPascalCase(ensureSuffix(schemaName, 'ParamsSchema'))]),
      )
      const fileCode = [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')

      const fmtResult = await fmt(fileCode)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const indexBody = `${Object.keys(parameters)
      .map((n) => `export * from './${lowerFirst(n)}'`)
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

  const defs = Object.keys(parameters)
    .map((key) => {
      const p: Parameter | undefined = parameters[key]
      const schemaName = toIdentifierPascalCase(ensureSuffix(key, 'ParamsSchema'))
      const z = p
        ? zodToOpenAPI(p.schema, {
            parameters: {
              ...p,
            },
          })
        : 'z.any()'
      return zodToOpenAPISchema(schemaName, z, true, exportType, true)
    })
    .join('\n\n')

  const outFile = String(output)
  const locals = new Set(
    Object.keys(parameters).map((k) => toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema'))),
  )
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
