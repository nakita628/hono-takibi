# callbacks

## References

[Callback Object](https://spec.openapis.org/oas/v3.2.0.html#callback-object)

```ts
export type Callbacks = {
  readonly [k: string]: PathItem
}
```

## Generator

```ts
import { makeCallbacks } from '../../../../helper/components.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'

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
        ? `${exportCallbacks ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Callbacks'))} = {${callbackCode}}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
```

