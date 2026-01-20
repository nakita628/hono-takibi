/**
 * Header component generation module.
 *
 * Handles generation of Zod schemas from OpenAPI header components
 * with support for split mode.
 *
 * @module core/components/headers
 */
import path from 'node:path'
import { headersCode } from '../../generator/zod-openapi-hono/openapi/components/headers.js'
import { core, makeBarrel, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../../utils/index.js'

/**
 * Generates header component files.
 *
 * @param headers - OpenAPI headers object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param exportType - Whether to export TypeScript types
 * @param components - Schema import configuration for references
 * @param readonly - Whether to add `.readonly()` to Zod schemas
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate headers in single file
 * await headers(
 *   { 'X-Request-Id': { schema: { type: 'string' } } },
 *   'src/headers.ts',
 *   false,
 *   true
 * )
 *
 * // Generate headers in split mode
 * await headers(
 *   { 'X-Request-Id': {...}, 'X-Correlation-Id': {...} },
 *   'src/headers',
 *   true,
 *   true
 * )
 * // Creates: src/headers/xRequestId.ts, src/headers/xCorrelationId.ts, src/headers/index.ts
 * ```
 */
export async function headers(
  headers: Components['headers'],
  output: string,
  split: boolean,
  exportType: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!headers) return { ok: false, error: 'No headers found' }

  const headerNames = Object.keys(headers)
  if (headerNames.length === 0) return { ok: true, value: 'No headers found' }

  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, components, split)

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    const allResults = await Promise.all([
      ...headerNames.map((headerName) => {
        const singleComponent = { headers: { [headerName]: headers[headerName] } }
        const code = headersCode(singleComponent, true, exportType, readonly)
        const filePath = path.join(outDir, `${lowerFirst(headerName)}.ts`)
        return core(toFileCode(code, filePath), path.dirname(filePath), filePath)
      }),
      core(makeBarrel(headers), outDir, path.join(outDir, 'index.ts')),
    ])

    const firstError = allResults.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated headers code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const headerDefinitions = headersCode({ headers }, true, exportType, readonly)
  const headerDefinitionsCode = `${importCode}\n\n${headerDefinitions}`
  const coreResult = await core(
    toFileCode(headerDefinitionsCode, output),
    path.dirname(output),
    output,
  )
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated headers code written to ${output}` }
}
