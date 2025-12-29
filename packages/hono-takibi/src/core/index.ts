import path from 'node:path'
import { core } from '../helper/core.js'
import { exports } from '../helper/exports.js'
import type { Components } from '../openapi/index.js'
import { exportConst } from '../utils/index.js'

export async function componentsCore(
  components: Components,
  suffix:
    | 'Schema'
    | 'Parameter'
    | 'SecurityScheme'
    | 'RequestBody'
    | 'Response'
    | 'Header'
    | 'Example'
    | 'Link'
    | 'Callback',
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!components) return { ok: false, error: 'No components found' }
  if (split) {
    const exportsResult = await exports(components, suffix, output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }
  const code = exportConst(components, suffix)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated components code written to ${output}` }
}
