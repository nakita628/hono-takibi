import { makeConst } from '../../../../helper/code.js'
import { makeCallbacks } from '../../../../helper/index.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'

export function callbacks(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(callbacks)
    .map(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallbacks(callbackOrRef)
      return callbackCode
        ? `${makeConst(exportCallbacks, k, 'Callback')}{${callbackCode}}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
