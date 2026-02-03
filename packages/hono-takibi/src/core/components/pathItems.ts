/**
 * PathItems component generation module.
 *
 * Handles generation of JSON exports from OpenAPI pathItems components
 * with support for split mode.
 *
 * @module core/components/pathItems
 */
import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

/**
 * Generates pathItems component files.
 *
 * @param pathItems - OpenAPI pathItems object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate pathItems in single file
 * await pathItems(
 *   { UserOperations: { get: {...}, put: {...} } },
 *   'src/pathItems.ts',
 *   false
 * )
 *
 * // Generate pathItems in split mode
 * await pathItems(
 *   { UserOperations: {...}, ProductOperations: {...} },
 *   'src/pathItems',
 *   true
 * )
 * // Creates: src/pathItems/UserOperations.ts, src/pathItems/ProductOperations.ts, src/pathItems/index.ts
 * ```
 */
export async function pathItems(
  pathItems: Components['pathItems'],
  output: string,
  split: boolean,
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!pathItems) return { ok: false, error: 'No pathItems found' }

  const keys = Object.keys(pathItems)
  if (keys.length === 0) return { ok: true, value: 'No pathItems found' }

  if (split) {
    const exportsResult = await makeExports(pathItems, 'PathItem', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const code = makeExportConst(pathItems, 'PathItem', readonly)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated pathItems code written to ${output}` }
}
