import path from 'node:path'
import { parametersCode } from '../generator/zod-openapi-hono/openapi/components/parameters.js'
import { core, makeBarell, moduleSpecFrom } from '../helper/index.js'
import type { OpenAPI, Parameter } from '../openapi/index.js'
import {
  ensureSuffix,
  findSchema,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
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

      const code = parametersCode({ parameters: { [key]: p } }, true, exportType)
      const schemaName = toIdentifierPascalCase(ensureSuffix(key, 'ParamsSchema'))

      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const importSchemas = buildImportSchemas(filePath, code, new Set([schemaName]))
      const fileCode = [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexResult = await core(
      makeBarell(parameters),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!indexResult.ok) return { ok: false, error: indexResult.error }

    return {
      ok: true,
      value: `Generated parameter code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = parametersCode({ parameters }, true, exportType)

  const outFile = String(output)
  const locals = new Set(
    Object.keys(parameters).map((k) => toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema'))),
  )
  const importSchemas = buildImportSchemas(outFile, defs, locals)
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated parameter code written to ${outFile}` }
}
