/**
 * Callback component generation module.
 *
 * Handles generation of OpenAPI callback components with proper $ref resolution
 * and support for split mode.
 *
 * @module core/components/callbacks
 */
import path from 'node:path'
import { makeConst } from '../../helper/code.js'
import { core, makeCallback, makeImports } from '../../helper/index.js'
import type { Callbacks, Components } from '../../openapi/index.js'
import { ensureSuffix, makeBarrel, toIdentifierPascalCase, uncapitalize } from '../../utils/index.js'

/**
 * Generates callback component files with $ref resolution.
 *
 * @param callbacks - OpenAPI callbacks object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param components - Schema import configuration for references
 * @param readonly - Whether to add `as const` assertion to the output.
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
  if (!callbacks) return { ok: false, error: 'No callbacks found' }

  const keys = Object.keys(callbacks)
  if (keys.length === 0) return { ok: true, value: 'No callbacks found' }

  const asConst = readonly ? ' as const' : ''
  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  const toFileCode = (code: string, filePath: string) =>
    makeImports(code, filePath, components, split)

  if (split) {
    const outDir = output.replace(/\.ts$/, '')

    // Generate individual callback files with $ref resolution
    const results = await Promise.all([
      ...keys.map((key) => {
        const callbackOrRef = callbacks[key]
        if (!isCallbacks(callbackOrRef)) return { ok: true, value: 'skipped' }

        const name = toIdentifierPascalCase(ensureSuffix(key, 'Callback'))
        const callbackCode = makeCallback(callbackOrRef)
        const body = callbackCode
          ? `export const ${name} = {${callbackCode}}${asConst}\n`
          : `export const ${name} = {}${asConst}\n`
        const filePath = path.join(outDir, `${uncapitalize(key)}.ts`)
        return core(toFileCode(body, filePath), path.dirname(filePath), filePath)
      }),
      core(makeBarrel(callbacks), outDir, path.join(outDir, 'index.ts')),
    ])

    const firstError = results.find(
      (r): r is { readonly ok: false; readonly error: string } => !r.ok,
    )
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated Callback code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  // Non-split mode: generate all callbacks in a single file
  const code = Object.entries(callbacks)
    .map(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallback(callbackOrRef)
      return callbackCode
        ? `${makeConst(true, k, 'Callback')}{${callbackCode}}${asConst}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')

  const coreResult = await core(toFileCode(code, output), path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated callbacks code written to ${output}` }
}
