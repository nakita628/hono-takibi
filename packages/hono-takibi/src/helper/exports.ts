import path from 'node:path'

import { emit } from '../emit/index.js'
import { ensureSuffix, toIdentifierPascalCase, uncapitalize } from '../utils/index.js'

export async function makeExports(
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
    | 'Callback'
    | 'PathItem'
    | 'Webhook',
  output: string,
  readonly?: boolean,
) {
  const keys = Object.keys(value)
  const outDir = output.replace(/\.ts$/, '')
  /* sort abc */
  const indexCode = `${keys
    .sort()
    .map((v) => `export * from './${uncapitalize(v)}.ts'`)
    .join('\n')}\n`
  const asConst = readonly ? ' as const' : ''
  const results = await Promise.all([
    ...keys.map((k) => {
      const v = value[k]
      const name = toIdentifierPascalCase(ensureSuffix(k, suffix))
      const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
      const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
      return emit(body, path.dirname(filePath), filePath)
    }),
    emit(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
  ])
  const e = results.find((result) => !result.ok)
  if (e) return e
  return {
    ok: true,
    value: `Generated ${suffix} code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
