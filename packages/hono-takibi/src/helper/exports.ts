import path from 'node:path'
import { ensureSuffix, toIdentifierPascalCase, uncapitalize } from '../utils/index.js'
import { core } from './core.js'

/**
 * Generates TypeScript export files for OpenAPI components in split mode.
 *
 * @param value - Object containing component definitions
 * @param suffix - Component type suffix (e.g., 'Example', 'Schema')
 * @param output - Output directory path
 * @param readonly - Whether to add `as const` assertion to the output
 * @returns Result object with success/error status
 */
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
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const keys = Object.keys(value)
  const outDir = output.replace(/\.ts$/, '')

  // sort abc
  const indexCode = `${keys
    .sort()
    .map((v) => `export * from './${uncapitalize(v)}.ts'`)
    .join('\n')}\n`

  const asConst = readonly ? ' as const' : ''
  const results = await Promise.all([
    ...keys.map((key) => {
      const v = value[key]
      const name = toIdentifierPascalCase(ensureSuffix(key, suffix))
      const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
      const filePath = path.join(outDir, `${uncapitalize(key)}.ts`)
      return core(body, path.dirname(filePath), filePath)
    }),
    core(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError) return firstError

  return {
    ok: true,
    value: `Generated ${suffix} code written to ${outDir}/*.ts (index.ts included)`,
  }
}
