/**
 * Callback component generation module.
 *
 * Handles generation of JSON exports from OpenAPI callback components
 * with support for split mode.
 *
 * @module core/components/callbacks
 */
import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

/**
 * Generates callback component files.
 *
 * @param callbacks - OpenAPI callbacks object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate callbacks in single file
 * await callbacks(
 *   { onPaymentComplete: { '{$request.body#/callbackUrl}': {...} } },
 *   'src/callbacks.ts',
 *   false
 * )
 *
 * // Generate callbacks in split mode
 * await callbacks(
 *   { onPaymentComplete: {...}, onOrderUpdate: {...} },
 *   'src/callbacks',
 *   true
 * )
 * // Creates: src/callbacks/onPaymentComplete.ts, src/callbacks/onOrderUpdate.ts, src/callbacks/index.ts
 * ```
 */
export async function callbacks(
  callbacks: Components['callbacks'],
  output: string,
  split: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!callbacks) return { ok: false, error: 'No callbacks found' }

  const keys = Object.keys(callbacks)
  if (keys.length === 0) return { ok: true, value: 'No callbacks found' }

  if (split) {
    const exportsResult = await makeExports(callbacks, 'Callback', output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const code = makeExportConst(callbacks, 'Callback')
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated callbacks code written to ${output}` }
}
