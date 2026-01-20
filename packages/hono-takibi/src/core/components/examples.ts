/**
 * Example component generation module.
 *
 * Handles generation of JSON exports from OpenAPI example components
 * with support for split mode and $ref resolution.
 *
 * @module core/components/examples
 */
import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeRef } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../../utils/index.js'

/**
 * Type guard for $ref property.
 *
 * @param val - Value to check
 * @returns True if value has $ref property
 */
const hasRef = (val: unknown): val is { readonly $ref: string } =>
  typeof val === 'object' && val !== null && '$ref' in val && typeof val.$ref === 'string'

/**
 * Generates example component files.
 *
 * @param examples - OpenAPI examples object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate examples in single file
 * await examples(
 *   { UserExample: { value: { id: 1, name: 'John' } } },
 *   'src/examples.ts',
 *   false
 * )
 *
 * // Generate examples in split mode
 * await examples(
 *   { UserExample: {...}, PostExample: {...} },
 *   'src/examples',
 *   true
 * )
 * // Creates: src/examples/userExample.ts, src/examples/postExample.ts, src/examples/index.ts
 * ```
 */
export async function examples(
  examples: Components['examples'],
  output: string,
  split: boolean,
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!examples) return { ok: false, error: 'No examples found' }

  const keys = Object.keys(examples)
  if (keys.length === 0) return { ok: true, value: 'No examples found' }

  const asConst = readonly ? ' as const' : ''

  if (split) {
    const outDir = output.replace(/\.ts$/, '')

    // Generate index.ts with sorted exports
    const indexCode = `${keys
      .sort()
      .map((v) => `export * from './${lowerFirst(v)}.ts'`)
      .join('\n')}\n`

    const results = await Promise.all([
      ...keys.map((key) => {
        const v = examples[key]
        const name = toIdentifierPascalCase(ensureSuffix(key, 'Example'))
        const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)

        // Handle $ref references: generate import + re-export
        if (hasRef(v)) {
          const refName = makeRef(v.$ref)
          const refKey = v.$ref.split('/').at(-1) ?? ''
          const importPath = `./${lowerFirst(refKey)}.ts`
          const body = `import { ${refName} } from '${importPath}'\n\nexport const ${name} = ${refName}\n`
          return core(body, path.dirname(filePath), filePath)
        }

        // Inline value: generate JSON export
        const body = `export const ${name} = ${JSON.stringify(v)}${asConst}\n`
        return core(body, path.dirname(filePath), filePath)
      }),
      core(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])

    const firstError = results.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated Example code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const code = makeExportConst(examples, 'Example', readonly)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated examples code written to ${output}` }
}
