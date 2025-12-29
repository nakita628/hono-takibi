import path from 'node:path'
import { core } from '../helper/core.js'
import { exports } from '../helper/exports.js'
import { parseOpenAPI } from '../openapi/index.js'
import { exportConst } from '../utils/index.js'

export async function callbacks(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const callbacks = openAPI.components?.callbacks
  if (!callbacks || Object.keys(callbacks).length === 0)
    return { ok: false, error: 'No callbacks found' }

  if (split) {
    const exportsResult = await exports(callbacks, 'Callback', output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const outFile = output
  const code = exportConst(callbacks, 'Callback')

  const coreResult = await core(code, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated callbacks code written to ${outFile}` }
}
