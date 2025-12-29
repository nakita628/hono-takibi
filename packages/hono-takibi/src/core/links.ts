import path from 'node:path'
import { core } from '../helper/core.js'
import { exports } from '../helper/exports.js'
import { parseOpenAPI } from '../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../utils/index.js'

export async function links(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const ls = openAPI.components?.links
  if (!ls || Object.keys(ls).length === 0) return { ok: false, error: 'No links found' }

  if (split) {
    const result = await exports(ls, 'Link', String(output))
    return result
  }

  const outFile = String(output)
  const defs = Object.keys(ls)
    .map(
      (key) =>
        `export const ${toIdentifier(ensureSuffix(key, 'Link'))} = ${JSON.stringify(ls[key] ?? {})}`,
    )
    .join('\n\n')

  const coreResult = await core(defs, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated links code written to ${outFile}` }
}
