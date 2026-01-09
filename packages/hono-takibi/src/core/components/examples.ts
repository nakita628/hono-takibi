/**
 * Example component generation module.
 *
 * Handles generation of JSON exports from OpenAPI example components
 * with support for split mode.
 *
 * @module core/components/examples
 */
import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

/**
 * Generates example component files.
 *
 * @param examples - OpenAPI examples object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
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
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!examples) return { ok: false, error: 'No examples found' }

  const keys = Object.keys(examples)
  if (keys.length === 0) return { ok: true, value: 'No examples found' }

  if (split) {
    const exportsResult = await makeExports(examples, 'Example', output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const code = makeExportConst(examples, 'Example')
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated examples code written to ${output}` }
}
