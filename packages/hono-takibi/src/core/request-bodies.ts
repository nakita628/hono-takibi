import path from 'node:path'
import { requestBodiesCode } from '../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { core, makeBarell, makeFileCode, moduleSpecFrom } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { lowerFirst } from '../utils/index.js'

type ImportTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}

/**
 * Generates `components.requestBodies` constants (objects containing Zod schemas).
 */
export async function requestBodies(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  split?: boolean,
  imports?: {
    readonly schemas?: ImportTarget | undefined
    readonly examples?: ImportTarget | undefined
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const bodies = openAPI.components?.requestBodies
  if (!bodies || Object.keys(bodies).length === 0)
    return { ok: false, error: 'No requestBodies found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(bodies)) {
      const body = bodies[key]
      if (!body) continue
      const code = requestBodiesCode({ requestBodies: { [key]: body } }, true)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const schemasPath = imports?.schemas
        ? (imports.schemas.import ?? moduleSpecFrom(filePath, imports.schemas))
        : '../schemas'
      const examplesPath = imports?.examples
        ? (imports.examples.import ?? moduleSpecFrom(filePath, imports.examples))
        : '../examples'
      const fileCode = makeFileCode(code, schemasPath, undefined, [
        { suffix: 'Example', path: examplesPath },
      ])
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

  const defs = requestBodiesCode({ requestBodies: bodies }, true)
  const outFile = String(output)
  const schemasPath = imports?.schemas
    ? (imports.schemas.import ?? moduleSpecFrom(outFile, imports.schemas))
    : './schemas'
  const examplesPath = imports?.examples
    ? (imports.examples.import ?? moduleSpecFrom(outFile, imports.examples))
    : './examples'
  const fileCode = makeFileCode(defs, schemasPath, undefined, [
    { suffix: 'Example', path: examplesPath },
  ])
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated requestBodies code written to ${outFile}` }
}
