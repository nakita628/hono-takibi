import path from 'node:path'
import { makeBarell } from '../helper/barell.js'
import { buildFileCode } from '../helper/code.js'
import { core } from '../helper/core.js'
import { makeRequestBody } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'

const coerceDateIfNeeded = (expr: string): string =>
  expr.includes('z.date()') ? expr.replace(/z\.date\(\)/g, 'z.coerce.date()') : expr

/**
 * Generates `components.requestBodies` constants (objects containing Zod schemas).
 */
export async function requestBodies(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const bodies = openAPI.components?.requestBodies
  if (!bodies || Object.keys(bodies).length === 0)
    return { ok: false, error: 'No requestBodies found' }

  const makeOne = (key: string): { name: string; code: string } => {
    const body = bodies[key]
    const expr = body ? coerceDateIfNeeded(makeRequestBody(body)) : '{}'
    const name = toIdentifierPascalCase(ensureSuffix(key, 'RequestBody'))
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(bodies)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const fileCode = buildFileCode(one.code, '../schemas')
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      makeBarell(bodies),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = Object.keys(bodies)
    .map((key) => {
      const body = bodies[key]
      const expr = body ? coerceDateIfNeeded(makeRequestBody(body)) : '{}'
      return `export const ${toIdentifierPascalCase(ensureSuffix(key, 'RequestBody'))} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const fileCode = buildFileCode(defs, './schemas')
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated requestBodies code written to ${outFile}` }
}
