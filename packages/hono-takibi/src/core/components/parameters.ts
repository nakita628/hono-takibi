/**
 * Parameter component generation module.
 *
 * Handles generation of Zod schemas from OpenAPI parameter components
 * with support for split mode.
 *
 * @module core/components/parameters
 */
import path from 'node:path'
import { parametersCode } from '../../generator/zod-openapi-hono/openapi/components/parameters.js'
import { core, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

/**
 * Generates parameter component files.
 *
 * @param parameters - OpenAPI parameters object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param exportType - Whether to export TypeScript types
 * @param components - Schema import configuration for references
 * @param readonly - Whether to add `.readonly()` to Zod schemas
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate parameters in single file
 * await parameters(
 *   { userId: { name: 'userId', in: 'path', ... } },
 *   'src/parameters.ts',
 *   false,
 *   true
 * )
 *
 * // Generate parameters in split mode
 * await parameters(
 *   { userId: {...}, page: {...} },
 *   'src/parameters',
 *   true,
 *   true
 * )
 * // Creates: src/parameters/userId.ts, src/parameters/page.ts, src/parameters/index.ts
 * ```
 */
export async function parameters(
  parameters: Components['parameters'],
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
  if (!parameters) return { ok: false, error: 'No parameters found' }

  const parameterNames = Object.keys(parameters)
  if (parameterNames.length === 0) return { ok: true, value: 'No parameters found' }

  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, components, split)

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    const allResults = await Promise.all([
      ...parameterNames.map((parameterName) => {
        const singleComponent = { parameters: { [parameterName]: parameters[parameterName] } }
        const code = parametersCode(singleComponent, true, exportType, readonly)
        const filePath = path.join(outDir, `${uncapitalize(parameterName)}.ts`)
        return core(toFileCode(code, filePath), path.dirname(filePath), filePath)
      }),
      core(makeBarrel(parameters), outDir, path.join(outDir, 'index.ts')),
    ])

    const firstError = allResults.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated parameters code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const parameterDefinitions = parametersCode({ parameters }, true, exportType, readonly)
  const coreResult = await core(
    toFileCode(parameterDefinitions, output),
    path.dirname(output),
    output,
  )
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated parameters code written to ${output}` }
}
