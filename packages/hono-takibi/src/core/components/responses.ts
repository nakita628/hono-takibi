/**
 * Response component generation module.
 *
 * Handles generation of Zod schemas from OpenAPI response components
 * with support for split mode.
 *
 * @module core/components/responses
 */
import path from 'node:path'
import { responsesCode } from '../../generator/zod-openapi-hono/openapi/components/responses.js'
import { core, makeBarell, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../../utils/index.js'

/**
 * Generates response component files.
 *
 * @param responses - OpenAPI responses object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param components - Schema import configuration for references
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate responses in single file
 * await responses(
 *   { NotFound: { description: 'Not found', content: {...} } },
 *   'src/responses.ts',
 *   false
 * )
 *
 * // Generate responses in split mode
 * await responses(
 *   { NotFound: {...}, Unauthorized: {...} },
 *   'src/responses',
 *   true
 * )
 * // Creates: src/responses/notFound.ts, src/responses/unauthorized.ts, src/responses/index.ts
 * ```
 */
export async function responses(
  responses: Components['responses'],
  output: string,
  split: boolean,
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
  if (!responses) return { ok: false, error: 'No responses found' }

  const responseNames = Object.keys(responses)
  if (responseNames.length === 0) return { ok: true, value: 'No responses found' }

  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, components, split)

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    const allResults = await Promise.all([
      ...responseNames.map((responseName) => {
        const singleComponent = { responses: { [responseName]: responses[responseName] } }
        const code = responsesCode(singleComponent, true, readonly)
        const filePath = path.join(outDir, `${lowerFirst(responseName)}.ts`)
        return core(toFileCode(code, filePath), path.dirname(filePath), filePath)
      }),
      core(makeBarell(responses), outDir, path.join(outDir, 'index.ts')),
    ])

    const firstError = allResults.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated responses code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const responseDefinitions = responsesCode({ responses }, true, readonly)
  const responseDefinitionsCode = `${importCode}\n\n${responseDefinitions}`
  const coreResult = await core(
    toFileCode(responseDefinitionsCode, output),
    path.dirname(output),
    output,
  )
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated responses code written to ${output}` }
}
