import { makeCallbacks } from '../../../../helper/components.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'

export function callbacks(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  const exportKeyword = exportCallbacks ? 'export ' : ''

  return Object.entries(callbacks)
    .map(([callbackName, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallbacks(callbackOrRef)
      return callbackCode
        ? `${exportKeyword}const ${callbackName}Callbacks = {${callbackCode}}`
        : undefined
    })
    .filter(Boolean)
    .join('\n\n')
}
