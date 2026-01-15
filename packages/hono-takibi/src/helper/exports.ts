import path from 'node:path'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'
import { core } from './core.js'

/**
 * Generates TypeScript export files for OpenAPI components in split mode.
 *
 * Creates individual TypeScript files for each component with proper exports.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B["Get component keys"]
 *   B --> C["Generate index.ts"]
 *   C --> D["For each component"]
 *   D --> E["Generate JSON export"]
 *   E --> F["Write to file"]
 *   F --> G{More components?}
 *   G -->|Yes| D
 *   G -->|No| H(["Return result"])
 * ```
 *
 * @param value - Object containing component definitions
 * @param suffix - Component type suffix (e.g., 'Example', 'Schema')
 * @param output - Output directory path
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
    | 'Callback',
  output: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const keys = Object.keys(value)
  const outDir = output.replace(/\.ts$/, '')

  // sort abc
  const indexCode = `${keys
    .sort()
    .map((v) => `export * from './${lowerFirst(v)}.ts'`)
    .join('\n')}\n`

  const results = await Promise.all([
    ...keys.map((key) => {
      const v = value[key]
      const name = toIdentifierPascalCase(ensureSuffix(key, suffix))
      const body = `export const ${name} = ${JSON.stringify(v ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
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
