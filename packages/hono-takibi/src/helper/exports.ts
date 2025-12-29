import path from 'node:path'
import { ensureSuffix, lowerFirst, toIdentifier } from '../utils/index.js'
import { core } from './core.js'

export async function exports(
  value: { readonly [k: string]: unknown },
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
  output: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const keys = Object.keys(value)

  const outDir = output.replace(/\.ts$/, '')

  for (const key of keys) {
    const v = value[key]
    const name = toIdentifier(ensureSuffix(key, suffix))
    const body = `export const ${name} = ${JSON.stringify(v ?? {})}\n`
    const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
    const result = await core(body, path.dirname(filePath), filePath)
    if (!result.ok) return { ok: false, error: result.error }
  }

  // sort abc
  const code = `${keys
    .sort()
    .map((v) => `export * from './${lowerFirst(toIdentifier(ensureSuffix(v, suffix)))}'`)
    .join('\n')}\n`
  const coreResult = await core(
    code,
    path.dirname(path.join(outDir, 'index.ts')),
    path.join(outDir, 'index.ts'),
  )
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return {
    ok: true,
    value: `Generated ${suffix} code written to ${outDir}/*.ts (index.ts included)`,
  }
}
