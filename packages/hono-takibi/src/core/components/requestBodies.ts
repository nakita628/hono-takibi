/**
 * RequestBody component generation module.
 *
 * Handles generation of Zod schemas from OpenAPI requestBody components
 * with support for split mode.
 *
 * @module core/components/requestBodies
 */
import path from 'node:path'
import { requestBodiesCode } from '../../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { core, makeBarell, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../../utils/index.js'

/**
 * Generates requestBody component files.
 *
 * @param requestBodies - OpenAPI requestBodies object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param imports - Schema import configuration for references
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate requestBodies in single file
 * await requestBodies(
 *   { CreateUser: { content: { 'application/json': { schema: {...} } } } },
 *   'src/requestBodies.ts',
 *   false
 * )
 *
 * // Generate requestBodies in split mode
 * await requestBodies(
 *   { CreateUser: {...}, UpdateUser: {...} },
 *   'src/requestBodies',
 *   true
 * )
 * // Creates: src/requestBodies/createUser.ts, src/requestBodies/updateUser.ts, src/requestBodies/index.ts
 * ```
 */
export async function requestBodies(
  requestBodies: Components['requestBodies'],
  output: string,
  split: boolean,
  imports?: { readonly output: string; readonly split?: boolean; readonly import?: string },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!requestBodies) return { ok: false, error: 'No requestBodies found' }

  const bodyNames = Object.keys(requestBodies)
  if (bodyNames.length === 0) return { ok: true, value: 'No requestBodies found' }

  const prefix = split ? '..' : '.'
  const componentImports = imports ? { schemas: imports } : undefined
  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, componentImports, false, prefix)

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    const allResults = await Promise.all([
      ...bodyNames.map((bodyName) => {
        const singleComponent = { requestBodies: { [bodyName]: requestBodies[bodyName] } }
        const code = requestBodiesCode(singleComponent, true)
        const filePath = path.join(outDir, `${lowerFirst(bodyName)}.ts`)
        return core(toFileCode(code, filePath), path.dirname(filePath), filePath)
      }),
      core(makeBarell(requestBodies), outDir, path.join(outDir, 'index.ts')),
    ])

    const firstError = allResults.find((r) => !r.ok)
    if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

    return {
      ok: true,
      value: `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const bodyDefinitions = requestBodiesCode({ requestBodies }, true)
  const bodyDefinitionsCode = `${importCode}\n\n${bodyDefinitions}`
  const coreResult = await core(
    toFileCode(bodyDefinitionsCode, output),
    path.dirname(output),
    output,
  )
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated requestBodies code written to ${output}` }
}
