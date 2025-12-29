import path from 'node:path'
import { core } from '../helper/core.js'
import { exports } from '../helper/exports.js'
import { parseOpenAPI } from '../openapi/index.js'
import { exportConst } from '../utils/index.js'

export async function examples(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const examples = openAPI.components?.examples
  if (!examples || Object.keys(examples).length === 0)
    return { ok: false, error: 'No examples found' }

  if (split) {
    const exportsResult = await exports(examples, 'Example', output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const outFile = output

  const code = exportConst(examples, 'Example')

  const coreResult = await core(code, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated examples code written to ${outFile}` }
}
