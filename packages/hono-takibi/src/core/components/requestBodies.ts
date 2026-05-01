import path from 'node:path'

import { emit } from '../../emit/index.js'
import { requestBodiesCode } from '../../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

/**
 * Generates requestBody component files.
 *
 * @param requestBodies - OpenAPI requestBodies object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param components - Schema import configuration for references
 * @param readonly - Whether to add `as const` assertion to the output.
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
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!requestBodies) return { ok: false, error: 'No requestBodies found' } as const
  const bodyNames = Object.keys(requestBodies)
  if (bodyNames.length === 0) return { ok: true, value: 'No requestBodies found' } as const
  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, components, split)
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const results = await Promise.all([
      ...bodyNames.map((bodyName) => {
        const singleComponent = { requestBodies: { [bodyName]: requestBodies[bodyName] } }
        const code = requestBodiesCode(singleComponent, true, readonly)
        const filePath = path.join(outDir, `${uncapitalize(bodyName)}.ts`)
        return emit(toFileCode(code, filePath), path.dirname(filePath), filePath)
      }),
      emit(makeBarrel(requestBodies), outDir, path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const bodyDefinitions = requestBodiesCode({ requestBodies }, true, readonly)
  const emitResult = await emit(toFileCode(bodyDefinitions, output), path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated requestBodies code written to ${output}` } as const
}
