import { makeConst } from '../../../../helper/code.js'
import { makeCallback } from '../../../../helper/index.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component callbacks.
 *
 * Converts callback definitions to JavaScript object constants.
 *
 * @param components - The OpenAPI components object.
 * @param exportCallbacks - Whether to export the callback constants.
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns A string of TypeScript code with callback definitions.
 *
 * @example
 * ```ts
 * callbacksCode(components, true)
 * // → 'export const OnDataCallback = { "{$request.body#/callbackUrl}": {...} }'
 *
 * callbacksCode(components, true, true)
 * // → 'export const OnDataCallback = { "{$request.body#/callbackUrl}": {...} } as const'
 * ```
 */
export function callbacksCode(
  components: Components,
  exportCallbacks: boolean,
  readonly?: boolean | undefined,
): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const asConst = readonly ? ' as const' : ''
  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(callbacks)
    .map(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallback(callbackOrRef)
      return callbackCode
        ? `${makeConst(exportCallbacks, k, 'Callback')}{${callbackCode}}${asConst}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
